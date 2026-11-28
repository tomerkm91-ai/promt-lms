// בדיקות HTTP מול השרת האמיתי, עם אימות Google ורשימת רוכשים מדומים (אין גישה ל-Google מהבדיקות)
const test = require('node:test');
const assert = require('node:assert');
const createApp = require('../server');
const { createMemoryPurchaseStore, createMemoryWaitlistStore } = require('../purchases');

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
// שעון קבוע אחרי תאריכי הפרסום של כל המודולים - בדיקות התזמון עצמן נמצאות בסוף הקובץ
const afterAllReleases = () => new Date('2030-01-01T12:00:00Z');

let server;
let base;
test.before(async () => {
    const app = createApp({ env, verifyGoogleToken: fakeVerify, purchaseStore: store, waitlistStore: createMemoryWaitlistStore(), now: afterAllReleases });
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
        price: '35 ₪', googleClientId: 'client-id.apps.googleusercontent.com', promoUntil: null, tipPhone: null, languages: ['he', 'en']
    });
});

test('anonymous visitors get modules 4+ locked and without content', async () => {
    const modules = await getModules();
    assert.strictEqual(modules.length, 17);
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
    assert.deepStrictEqual(me, { email: 'stranger@example.com', hasFullAccess: false, onWaitlist: false });

    const buyer = await login('paid@example.com');
    assert.ok((await getModules(buyer)).every(m => !m.locked && m.content));
    assert.strictEqual((await fetch(`${base}/api/modules/5/quiz`, { headers: { Cookie: buyer } })).status, 200);

    const owner = await login('owner@example.com');
    assert.ok((await getModules(owner)).every(m => !m.locked));
});

test('HIDDEN_MODULES hides modules from visitors and buyers, and owners still preview them', async () => {
    const hidden = [16, 17];
    const app = createApp({
        env: { ...env, HIDDEN_MODULES: ' 16, 17 ,x' }, verifyGoogleToken: fakeVerify, purchaseStore: store,
        waitlistStore: createMemoryWaitlistStore(), now: afterAllReleases
    });
    const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
    const url = `http://127.0.0.1:${srv.address().port}`;
    const list = cookie => fetch(`${url}/api/modules`, { headers: cookie ? { Cookie: cookie } : {} }).then(r => r.json());
    const loginHere = async email => (await fetch(`${url}/api/auth/google`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential: `good:${email}` })
    })).headers.get('set-cookie').split(';')[0];
    try {
        const buyer = await loginHere('paid@example.com');
        for (const cookie of [undefined, buyer]) {
            const mods = await list(cookie);
            assert.strictEqual(mods.length, 15);
            assert.ok(hidden.every(n => !mods.some(m => m.moduleNumber === n)));
            const headers = cookie ? { Cookie: cookie } : {};
            assert.strictEqual((await fetch(`${url}/api/modules/16/quiz`, { headers })).status, 403);
            const sub = await fetch(`${url}/api/submissions`, {
                method: 'POST', headers: { 'Content-Type': 'application/json', ...headers },
                body: JSON.stringify({ studentName: 'Test', moduleNumber: 17, answers: {} })
            });
            assert.strictEqual(sub.status, 403);
        }
        const owner = await loginHere('owner@example.com');
        const ownerList = await list(owner);
        for (const n of hidden) {
            const m = ownerList.find(x => x.moduleNumber === n);
            assert.ok(m && m.preview && m.comingSoon && m.content, `owner should preview module ${n}`);
        }
        assert.strictEqual((await fetch(`${url}/api/modules/16/quiz`, { headers: { Cookie: owner } })).status, 200);
    } finally {
        srv.close();
    }
});

test('lesson images are served from /assets, and missing files return 404', async () => {
    const img = await fetch(`${base}/assets/m16-chart-he.png`);
    assert.strictEqual(img.status, 200);
    assert.match(img.headers.get('content-type'), /image\/png/);
    assert.strictEqual((await fetch(`${base}/assets/nope.png`)).status, 404);
    assert.strictEqual((await fetch(`${base}/assets/../server.js`)).status, 404);
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
    const open = createApp({ env: {}, verifyGoogleToken: fakeVerify, purchaseStore: store, now: afterAllReleases });
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

test('an unreleased module is "coming soon" for everyone except the owner', async () => {
    // 17.10.2026 בשעה 23:30 בישראל = לפני הפרסום; חצי שעה אחר כך (18.10 בישראל) = אחרי
    let clock = new Date('2026-10-17T20:30:00Z');
    const app = createApp({ env, verifyGoogleToken: fakeVerify, purchaseStore: store, now: () => clock });
    const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
    const url = `http://127.0.0.1:${srv.address().port}`;
    const get = (path, cookie) => fetch(`${url}${path}`, { headers: cookie ? { Cookie: cookie } : {} });
    const loginHere = async email => (await fetch(`${url}/api/auth/google`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential: `good:${email}` })
    })).headers.get('set-cookie').split(';')[0];
    try {
        const buyer = await loginHere('paid@example.com');
        const m15 = (await (await get('/api/modules', buyer)).json()).find(m => m.moduleNumber === 15);
        assert.strictEqual(m15.comingSoon, true);
        assert.strictEqual(m15.availableFrom, '2026-10-18');
        assert.strictEqual(m15.locked, true);
        assert.strictEqual(m15.content, undefined);
        assert.strictEqual((await get('/api/modules/15/quiz', buyer)).status, 403);
        const submit = await fetch(`${url}/api/submissions`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: buyer },
            body: JSON.stringify({ studentName: 'בדיקה', moduleNumber: 15, answers: {} })
        });
        assert.strictEqual(submit.status, 403);

        const owner = await loginHere('owner@example.com');
        const preview = (await (await get('/api/modules', owner)).json()).find(m => m.moduleNumber === 15);
        assert.strictEqual(preview.preview, true);
        assert.strictEqual(preview.locked, false);
        assert.ok(preview.content);
        assert.strictEqual((await get('/api/modules/15/quiz', owner)).status, 200);

        clock = new Date('2026-10-17T21:30:00Z');
        const released = (await (await get('/api/modules', buyer)).json()).find(m => m.moduleNumber === 15);
        assert.strictEqual(released.comingSoon, undefined);
        assert.strictEqual(released.locked, false);
        assert.strictEqual((await get('/api/modules/15/quiz', buyer)).status, 200);
    } finally {
        srv.close();
    }
});

test('every module in the syllabus has lesson, cases, practice and a quiz', async () => {
    const buyer = await login('paid@example.com');
    const modules = await getModules(buyer);
    for (const m of modules) {
        assert.ok(m.content && m.cases && m.practice, `module ${m.moduleNumber} content`);
        const quiz = await fetch(`${base}/api/modules/${m.moduleNumber}/quiz`, { headers: { Cookie: buyer } });
        assert.strictEqual(quiz.status, 200, `module ${m.moduleNumber} quiz`);
    }
});

test('privacy page is served, with the contact email only when it is valid', async () => {
    const html = await (await fetch(`${base}/privacy`)).text();
    assert.match(html, /מדיניות פרטיות/);
    assert.ok(!html.includes('{{CONTACT}}'));
    const withMail = createApp({ env: { CONTACT_EMAIL: 'owner@example.com' }, now: afterAllReleases });
    const bad = createApp({ env: { CONTACT_EMAIL: '<script>x</script>@a.b' }, now: afterAllReleases });
    for (const [app, expectMail] of [[withMail, true], [bad, false]]) {
        const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
        try {
            const page = await (await fetch(`http://127.0.0.1:${srv.address().port}/privacy`)).text();
            assert.strictEqual(page.includes('mailto:owner@example.com'), expectMail);
            assert.ok(!page.includes('<script>x'));
        } finally {
            srv.close();
        }
    }
});

test('Grow webhook: secret URL, grants access once, rejects low sums and bad keys', async () => {
    const SECRET = 'grow-secret-1234567890';
    const buyers = createMemoryPurchaseStore([]);
    const app = createApp({
        env: { ...env, GROW_WEBHOOK_SECRET: SECRET, GROW_WEBHOOK_KEY: 'KEY1' },
        verifyGoogleToken: fakeVerify, purchaseStore: buyers, now: afterAllReleases
    });
    const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
    const url = `http://127.0.0.1:${srv.address().port}`;
    const hook = (secret, body, type = 'application/json') => fetch(`${url}/api/webhooks/grow/${secret}`, {
        method: 'POST', headers: { 'Content-Type': type },
        body: type === 'application/json' ? JSON.stringify(body) : new URLSearchParams(body).toString()
    });
    const paid = { webhookKey: 'KEY1', data: { statusCode: '2', sum: '35', payerEmail: 'new.buyer@example.com', transactionId: 'T1' } };
    try {
        assert.strictEqual((await hook('wrong-secret-0000000000', paid)).status, 404);
        assert.strictEqual((await hook(SECRET, { ...paid, webhookKey: 'nope' })).status, 403);

        const low = await (await hook(SECRET, { ...paid, data: { ...paid.data, sum: '1', transactionId: 'T0' } })).json();
        assert.strictEqual(low.granted, false);

        const ok = await (await hook(SECRET, paid)).json();
        assert.deepStrictEqual(ok, { ok: true, granted: true });
        const again = await (await hook(SECRET, paid)).json();
        assert.strictEqual(again.duplicate, true);
        assert.strictEqual(buyers.rows.length, 1);
        assert.deepStrictEqual(buyers.rows[0], { email: 'new.buyer@example.com', code: 'GROW-T1' });

        // טופס (form-encoded) בפורמט הישן
        const form = await (await hook(SECRET, { webhookKey: 'KEY1', transactionCode: 'L2', paymentSum: '35', payerEmail: 'form@example.com' }, 'application/x-www-form-urlencoded')).json();
        assert.strictEqual(form.granted, true);

        // הקונה מתחבר ורואה את הקורס פתוח
        const login = await fetch(`${url}/api/auth/google`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential: 'good:new.buyer@example.com' })
        });
        const cookie = login.headers.get('set-cookie').split(';')[0];
        const modules = await (await fetch(`${url}/api/modules`, { headers: { Cookie: cookie } })).json();
        assert.ok(modules.every(m => !m.locked));
    } finally {
        srv.close();
    }
});

test('Grow webhook is disabled without a long enough secret', async () => {
    const app = createApp({ env: { ...env, GROW_WEBHOOK_SECRET: 'short' }, verifyGoogleToken: fakeVerify, purchaseStore: store, now: afterAllReleases });
    const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
    try {
        const res = await fetch(`http://127.0.0.1:${srv.address().port}/api/webhooks/grow/short`, { method: 'POST' });
        assert.strictEqual(res.status, 404);
    } finally {
        srv.close();
    }
});

test('launch promo: 10 free modules until the end date, then back to 3 automatically', async () => {
    let clock = new Date('2026-10-14T20:30:00Z'); // 14.10 23:30 בישראל - היום האחרון של המבצע
    const app = createApp({
        env: { ...env, PROMO_FREE_MODULES: '10', PROMO_UNTIL: '2026-10-14' },
        verifyGoogleToken: fakeVerify, purchaseStore: store, waitlistStore: createMemoryWaitlistStore(), now: () => clock
    });
    const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
    const url = `http://127.0.0.1:${srv.address().port}`;
    try {
        let config = await (await fetch(`${url}/api/config`)).json();
        assert.strictEqual(config.freeModules, 10);
        assert.strictEqual(config.promoUntil, '2026-10-14');
        let modules = await (await fetch(`${url}/api/modules`)).json();
        assert.deepStrictEqual(modules.filter(m => !m.locked).map(m => m.moduleNumber), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.strictEqual((await fetch(`${url}/api/modules/10/quiz`)).status, 200);
        assert.strictEqual((await fetch(`${url}/api/modules/11/quiz`)).status, 403);

        clock = new Date('2026-10-14T21:30:00Z'); // 15.10 00:30 בישראל - המבצע נגמר
        config = await (await fetch(`${url}/api/config`)).json();
        assert.strictEqual(config.freeModules, 3);
        assert.strictEqual(config.promoUntil, null);
        modules = await (await fetch(`${url}/api/modules`)).json();
        assert.deepStrictEqual(modules.filter(m => !m.locked).map(m => m.moduleNumber), [1, 2, 3]);
        assert.strictEqual((await fetch(`${url}/api/modules/10/quiz`)).status, 403);
    } finally {
        srv.close();
    }
});

test('waitlist: requires sign-in, records phase and progress once per email', async () => {
    let clock = new Date('2026-10-10T12:00:00Z');
    const list = createMemoryWaitlistStore();
    const app = createApp({
        env: { ...env, PROMO_FREE_MODULES: '10', PROMO_UNTIL: '2026-10-14' },
        verifyGoogleToken: fakeVerify, purchaseStore: store, waitlistStore: list, now: () => clock
    });
    const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
    const url = `http://127.0.0.1:${srv.address().port}`;
    const join = (body, cookie) => fetch(`${url}/api/waitlist`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body)
    });
    const loginHere = async email => (await fetch(`${url}/api/auth/google`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential: `good:${email}` })
    })).headers.get('set-cookie').split(';')[0];
    try {
        assert.strictEqual((await join({ passed: 3 })).status, 401);
        const early = await loginHere('Early@Example.com');
        assert.deepStrictEqual(await (await join({ passed: 10 }, early)).json(), { ok: true });
        assert.deepStrictEqual(await (await join({ passed: 10 }, early)).json(), { ok: true, already: true });
        const me = await (await fetch(`${url}/api/me`, { headers: { Cookie: early } })).json();
        assert.strictEqual(me.onWaitlist, true);

        clock = new Date('2026-10-20T12:00:00Z');
        const late = await loginHere('late@example.com');
        assert.deepStrictEqual(await (await join({ passed: 'hack' }, late)).json(), { ok: true });

        assert.deepStrictEqual(list.rows, [
            { email: 'early@example.com', passed: 10, phase: 'במבצע' },
            { email: 'late@example.com', passed: 0, phase: 'אחרי המבצע' }
        ]);
    } finally {
        srv.close();
    }
});

test('TIP_PHONE: אתר פתוח מחזיר את מספר הטלפון לטיפ, וערך לא תקין מתעלמים ממנו', async () => {
    async function configWith(tipPhone) {
        const app = createApp({ env: { TIP_PHONE: tipPhone }, now: afterAllReleases });
        const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
        try {
            return await (await fetch(`http://127.0.0.1:${srv.address().port}/api/config`)).json();
        } finally { srv.close(); }
    }
    const ok = await configWith(' 050-1234567 ');
    assert.strictEqual(ok.paywallEnabled, false);
    assert.strictEqual(ok.tipPhone, '050-1234567');
    assert.strictEqual((await configWith('+972 50 123 4567')).tipPhone, '+972 50 123 4567');
    assert.strictEqual((await configWith('<script>alert(1)</script>')).tipPhone, null);
    assert.strictEqual((await configWith('12345')).tipPhone, null);
    assert.strictEqual((await configWith(undefined)).tipPhone, null);
});
