const test = require('node:test');
const assert = require('node:assert');
const { parseCodes, createAccessPolicy } = require('../access');
const { generateCode } = require('../scripts/generate-access-codes');
const { MODULE_EXTRAS } = require('../moduleExtras');

test('parseCodes trims, uppercases and drops empties', () => {
    assert.deepStrictEqual([...parseCodes(' ai-aaaa , ,AI-BBBB ')], ['AI-AAAA', 'AI-BBBB']);
    assert.strictEqual(parseCodes(undefined).size, 0);
});

test('paywall is off when no codes are configured', () => {
    const policy = createAccessPolicy({ accessCodes: '', freeModules: '3' });
    assert.strictEqual(policy.enabled, false);
    assert.strictEqual(policy.isLocked(14, ''), false);
});

test('first N modules are free, the rest need a valid code', () => {
    const policy = createAccessPolicy({ accessCodes: 'AI-GOOD-CODE-0001', freeModules: '3' });
    assert.strictEqual(policy.isLocked(3, ''), false);
    assert.strictEqual(policy.isLocked(4, ''), true);
    assert.strictEqual(policy.isLocked(4, 'wrong'), true);
    assert.strictEqual(policy.isLocked(4, 'ai-good-code-0001'), false);
});

test('invalid FREE_MODULES falls back to 3', () => {
    assert.strictEqual(createAccessPolicy({ accessCodes: 'X', freeModules: 'abc' }).freeModules, 3);
});

test('generated codes have the expected shape and are unique', () => {
    const codes = new Set(Array.from({ length: 200 }, generateCode));
    assert.strictEqual(codes.size, 200);
    for (const c of codes) assert.match(c, /^AI-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);
});

test('every module has cases and practice content', () => {
    for (let n = 1; n <= 14; n++) {
        assert.ok(MODULE_EXTRAS[n].cases.length > 0, `module ${n} cases`);
        assert.ok(MODULE_EXTRAS[n].practice.length > 0, `module ${n} practice`);
    }
});
