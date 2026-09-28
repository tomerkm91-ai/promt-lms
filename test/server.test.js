// בדיקות HTTP מול השרת האמיתי, עם אימות Google ורשימת רוכשים מדומים (אין גישה ל-Google מהבדיקות)
const test = require('node:test');
const assert = require('node:assert');
const createApp = require('../server');
const { createMemoryPurchaseStore } = require('../purchases');

const CODE = 'AI-TEST-TEST-TEST';
const env = {
    PAYWALL: 'on',
    GOOGLE_CLIENT_ID: 'client-id.apps.googleusercontent.com',
    SESSION_SECRET: 'test-secret-'.repeat(4),
    SHEETDB_URL: 'https://sheetdb.example/api/v1/abc',
    ACCESS_CODES: CODE,
    FREE_MODULES: '3',
    CHECKOUT_URL: 'https://example.com/buy',
    COURSE_PRICE: '35 ₪',
    OWNER_EMAILS: 'owner@example.com'
};
// "אסימון" מדומה: good:<email> נחשב אסימון Google תקין
const fakeVerify = async token => token.startsWith('good:') ? token.slice(5) : null;
const store = createMemoryPurchaseStore([{ email: 'paid@example.com' }]);

let server;
let base;
test.before(async () => {
    const app = createApp({ env, verifyGoogleToken: fakeVerify, purchaseStore: store });
    await new Promise(resolve => { server = app.listen(0, resolve); });
    base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

const post = (path, body, cookie) => fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body)
});
async function login(email) {
    const res = await post('/api/auth/google', { credential: `good:${email}` });
    assert.strictEqual(res.status, 200);
    const setCookie = res.headers.get('set-cookie');
    assert.match(setCookie, /HttpOnly/);
    assert.match(setCookie, /SameSite=Lax/);
    return setCookie.split(';')[0];
}
const getModules = async cookie =>
    (await fetch(`${base}/api/modules`, { headers: cookie ? { Cookie: cookie } : {} })).json();

test('config exposes paywall settings and the Google client id', async () => {
    const res = await (await fetch(`${base}/api/config`)).json();
    assert.deepStrictEqual(res, {
        paywallEnabled: true, freeModules: 3, checkoutUrl: 'https://example.com/buy',
        price: '35 ₪', googleClientId: 'client-id.apps.googleusercontent.com'
    });
});

test('anonymous visitors get modules 4+ locked and without content', async () => {
    const modules = await getModules();
    assert.strictEqual(modules.length, 14);
    for (const m of modules) {
        if (m.moduleNumber <= 3) {
            assert.strictEqual(m.locked, false);
            assert.ok(m.content && m.cases && m.practice);
        } else {
            assert.strictEqual(m.locked, true);
            assert.strictEqual(m.content, undefined);
            assert.strictEqual(m.cases, undefined);
        }
    }
    assert.strictEqual((await fetch(`${base}/api/modules/5/quiz`)).status, 403);
    assert.strictEqual((await fetch(`${base}/api/modules/2/quiz`)).status, 200);
});

test('invalid Google tokens are rejected', async () => {
    assert.strictEqual((await post('/api/auth/google', { credential: 'forged' })).status, 401);
    assert.strictEqual((await post('/api/auth/google', {})).status, 401);
});

test('a forged session cookie does not grant access', async () => {
    const modules = await getModules('lms_session=eyJlbWFpbCI6InBhaWRAZXhhbXBsZS5jb20ifQ.fake');
    assert.ok(modules.find(m => m.moduleNumber === 5).locked);
});

test('signed-in non-buyer stays locked; buyer and owner are unlocked', async () => {
    const stranger = await login('stranger@example.com');
    assert.ok((await getModules(stranger)).find(m => m.moduleNumber === 5).locked);
    const me = await (await fetch(`${base}/api/me`, { headers: { Cookie: stranger } })).json();
    assert.deepStrictEqual(me, { email: 'stranger@example.com', hasFullAccess: false });

    const buyer = await login('paid@example.com');
    assert.ok((await getModules(buyer)).every(m => !m.locked && m.content));
    assert.strictEqual((await fetch(`${base}/api/modules/5/quiz`, { headers: { Cookie: buyer } })).status, 200);

    const owner = await login('owner@example.com');
    assert.ok((await getModules(owner)).every(m => !m.locked));
});

test('a code works once: it binds to the first account and is refused for others', async () => {
    assert.strictEqual((await post('/api/access/redeem', { code: CODE })).status, 401);

    const first = await login('first@example.com');
    assert.strictEqual((await post('/api/access/redeem', { code: 'AI-NOPE-NOPE-NOPE' }, first)).status, 400);
    const ok = await post('/api/access/redeem', { code: CODE.toLowerCase() }, first);
    assert.strictEqual(ok.status, 200);
    assert.ok((await getModules(first)).every(m => !m.locked));
    // אותו חשבון שמזין שוב - עדיין תקין
    assert.strictEqual((await post('/api/access/redeem', { code: CODE }, first)).status, 200);

    const second = await login('second@example.com');
    assert.strictEqual((await post('/api/access/redeem', { code: CODE }, second)).status, 409);
    assert.ok((await getModules(second)).find(m => m.moduleNumber === 9).locked);
});

test('locked submission is refused', async () => {
    const res = await post('/api/submissions', { studentName: 'בדיקה', moduleNumber: 5, answers: {} });
    assert.strictEqual(res.status, 403);
});

test('logout clears the session cookie', async () => {
    const res = await post('/api/auth/logout', {});
    assert.match(res.headers.get('set-cookie'), /Max-Age=0/);
});

test('the page itself does not contain paid content', async () => {
    const html = await (await fetch(`${base}/`)).text();
    assert.ok(!html.includes('Contract Compliance Assistant'));
});

test('with the paywall off, everything is open and login is unavailable', async () => {
    const open = createApp({ env: {}, verifyGoogleToken: fakeVerify, purchaseStore: store });
    const srv = await new Promise(resolve => { const s = open.listen(0, () => resolve(s)); });
    try {
        const url = `http://127.0.0.1:${srv.address().port}`;
        const modules = await (await fetch(`${url}/api/modules`)).json();
        assert.ok(modules.every(m => !m.locked && m.content));
        const res = await fetch(`${url}/api/auth/google`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential: 'good:a@b.com' })
        });
        assert.strictEqual(res.status, 404);
    } finally {
        srv.close();
    }
});
