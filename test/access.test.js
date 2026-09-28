const test = require('node:test');
const assert = require('node:assert');
const { parseCodes, createAccessPolicy } = require('../access');
const { generateCode } = require('../scripts/generate-access-codes');
const { MODULE_EXTRAS } = require('../moduleExtras');
const { createSessionToken, readSessionToken, parseCookies } = require('../auth');
const { createSheetPurchaseStore } = require('../purchases');

const FULL_ENV = {
    PAYWALL: 'on',
    GOOGLE_CLIENT_ID: 'client-id.apps.googleusercontent.com',
    SESSION_SECRET: 'x'.repeat(40),
    SHEETDB_URL: 'https://sheetdb.example/api/v1/abc',
    ACCESS_CODES: 'AI-GOOD-CODE-0001',
    OWNER_EMAILS: 'Owner@Example.com'
};

test('parseCodes trims, uppercases and drops empties', () => {
    assert.deepStrictEqual([...parseCodes(' ai-aaaa , ,AI-BBBB ')], ['AI-AAAA', 'AI-BBBB']);
    assert.strictEqual(parseCodes(undefined).size, 0);
});

test('paywall stays off unless PAYWALL=on and everything is configured', () => {
    assert.strictEqual(createAccessPolicy({}).enabled, false);
    const partial = createAccessPolicy({ ...FULL_ENV, GOOGLE_CLIENT_ID: '' });
    assert.strictEqual(partial.enabled, false);
    assert.ok(partial.missing.includes('GOOGLE_CLIENT_ID'));
    assert.strictEqual(createAccessPolicy({ ...FULL_ENV, SESSION_SECRET: 'short' }).enabled, false);
    assert.strictEqual(createAccessPolicy(FULL_ENV).enabled, true);
});

test('free modules, owners and codes', () => {
    const policy = createAccessPolicy(FULL_ENV);
    assert.strictEqual(policy.isFree(3), true);
    assert.strictEqual(policy.isFree(4), false);
    assert.strictEqual(policy.isOwner('owner@example.com'), true);
    assert.strictEqual(policy.isOwner('someone@example.com'), false);
    assert.strictEqual(policy.isValidCode('ai-good-code-0001'), true);
    assert.strictEqual(policy.isValidCode('nope'), false);
    assert.strictEqual(createAccessPolicy({}).isFree(14), true);
});

test('invalid FREE_MODULES falls back to 3', () => {
    assert.strictEqual(createAccessPolicy({ FREE_MODULES: 'abc' }).freeModules, 3);
});

test('session tokens are signed and expire', () => {
    const secret = 's'.repeat(40);
    const token = createSessionToken('a@b.com', secret);
    assert.strictEqual(readSessionToken(token, secret), 'a@b.com');
    assert.strictEqual(readSessionToken(token, 'other-secret-'.repeat(4)), null);
    const [payload, sig] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ email: 'evil@x.com', exp: Date.now() + 1e9 })).toString('base64url');
    assert.strictEqual(readSessionToken(`${forged}.${sig}`, secret), null);
    assert.strictEqual(readSessionToken(`${payload}.`, secret), null);
    const old = createSessionToken('a@b.com', secret, Date.now() - 31 * 24 * 3600 * 1000);
    assert.strictEqual(readSessionToken(old, secret), null);
    assert.strictEqual(readSessionToken(undefined, secret), null);
});

test('parseCookies reads multiple cookies', () => {
    assert.deepStrictEqual(parseCookies('a=1; lms_session=x.y'), { a: '1', lms_session: 'x.y' });
    assert.deepStrictEqual(parseCookies(undefined), {});
});

test('sheet purchase store reads the buyers tab and appends rows', async () => {
    const calls = [];
    const sheetRows = [{ email: 'Buyer@Example.com', code: '', date: '' }];
    const fakeFetch = async (url, opts = {}) => {
        calls.push({ url, method: opts.method || 'GET', body: opts.body });
        if (opts.method === 'POST') {
            sheetRows.push(JSON.parse(opts.body).data[0]);
            return { ok: true, status: 201, json: async () => ({ created: 1 }) };
        }
        return { ok: true, status: 200, json: async () => sheetRows.slice() };
    };
    const store = createSheetPurchaseStore({ url: 'https://sheetdb.example/api/v1/abc', fetchImpl: fakeFetch });
    assert.strictEqual(await store.hasAccess('buyer@example.com'), true);
    assert.strictEqual(calls[0].url, 'https://sheetdb.example/api/v1/abc?sheet=buyers');
    await store.add({ email: 'New@Example.com', code: 'ai-x' });
    const post = calls.find(c => c.method === 'POST');
    assert.deepStrictEqual(JSON.parse(post.body).data[0].email, 'new@example.com');
    assert.strictEqual(JSON.parse(post.body).data[0].code, 'AI-X');
    assert.strictEqual((await store.findByCode('AI-X')).email, 'new@example.com');
});

test('generated codes have the expected shape and are unique', () => {
    const codes = new Set(Array.from({ length: 200 }, generateCode));
    assert.strictEqual(codes.size, 200);
    for (const c of codes) assert.match(c, /^AI-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
});

test('every module has cases and practice content', () => {
    for (const n of Object.keys(MODULE_EXTRAS)) {
        assert.ok(MODULE_EXTRAS[n].cases.length > 0, `module ${n} cases`);
        assert.ok(MODULE_EXTRAS[n].practice.length > 0, `module ${n} practice`);
    }
});
