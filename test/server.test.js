// בדיקות HTTP מול השרת האמיתי: מוודא שתוכן נעול באמת לא נשלח בלי קוד
const test = require('node:test');
const assert = require('node:assert');

const CODE = 'AI-TEST-TEST-TEST';
process.env.ACCESS_CODES = CODE;
process.env.FREE_MODULES = '3';
process.env.CHECKOUT_URL = 'https://example.com/buy';
delete process.env.SHEETDB_URL;

const app = require('../server');
let server;
let base;

test.before(async () => {
    await new Promise(resolve => { server = app.listen(0, resolve); });
    base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

test('config exposes paywall settings', async () => {
    const res = await (await fetch(`${base}/api/config`)).json();
    assert.deepStrictEqual(res, { paywallEnabled: true, freeModules: 3, checkoutUrl: 'https://example.com/buy' });
});

test('without a code, modules 4+ come back locked and without content', async () => {
    const modules = await (await fetch(`${base}/api/modules`)).json();
    assert.strictEqual(modules.length, 14);
    for (const m of modules) {
        if (m.moduleNumber <= 3) {
            assert.strictEqual(m.locked, false);
            assert.ok(m.content && m.cases && m.practice);
        } else {
            assert.strictEqual(m.locked, true);
            assert.strictEqual(m.content, undefined);
            assert.strictEqual(m.cases, undefined);
            assert.strictEqual(m.practice, undefined);
        }
    }
});

test('with a valid code, all modules are unlocked', async () => {
    const modules = await (await fetch(`${base}/api/modules`, { headers: { 'X-Access-Code': CODE } })).json();
    assert.ok(modules.every(m => m.locked === false && m.content));
});

test('locked quiz and submission return 403 without a code', async () => {
    assert.strictEqual((await fetch(`${base}/api/modules/5/quiz`)).status, 403);
    assert.strictEqual((await fetch(`${base}/api/modules/2/quiz`)).status, 200);
    const sub = await fetch(`${base}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName: 'בדיקה', moduleNumber: 5, answers: {} })
    });
    assert.strictEqual(sub.status, 403);
});

test('quiz opens with a valid code', async () => {
    const res = await fetch(`${base}/api/modules/5/quiz`, { headers: { 'X-Access-Code': CODE } });
    assert.strictEqual(res.status, 200);
});

test('code verification endpoint accepts only valid codes', async () => {
    const check = async code => (await (await fetch(`${base}/api/access/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
    })).json()).valid;
    assert.strictEqual(await check(CODE.toLowerCase()), true);
    assert.strictEqual(await check('AI-NOPE-NOPE-NOPE'), false);
});

test('the page itself does not contain paid content', async () => {
    const html = await (await fetch(`${base}/`)).text();
    assert.ok(!html.includes('Contract Compliance Assistant'));
});
