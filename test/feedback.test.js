const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createFeedbackHandler } = require('../feedback');

async function submit(body, { lang = 'en', limited = false, saved = true } = {}) {
    const rows = [];
    const handler = createFeedbackHandler({
        language: () => lang,
        isLimited: () => limited,
        save: async row => { rows.push(row); return saved; }
    });
    const res = { status(code) { this.code = code; return this; }, json(data) { this.data = data; } };
    await handler({ body, ip: 'test' }, res);
    return { ...res, rows };
}

test('stores each rating, preserves optional feedback and leaves the quiz score empty', async () => {
    for (const rating of [1, 2, 3, 4, 5]) {
        const { code, data, rows } = await submit({ rating, comment: ' =example ' }, { lang: 'he' });
        assert.equal(code, 201);
        assert.deepEqual(data, { saved: true });
        assert.match(rows[0].id, /^review-/);
        assert.equal(rows[0]['תשובה'], rating + '/5');
        assert.equal(rows[0]['ציון'], '');
        assert.equal(rows[0].feedback, '[HE] =example');
    }
    assert.equal((await submit({rating: 4})).code, 201);
});
test('rejects invalid ratings and comments before saving', async () => {
    for (const rating of [0, 6, 3.5, '5', undefined, null]) {
        const result = await submit({rating});
        assert.equal(result.code, 400);
        assert.equal(result.rows.length, 0);
    }
    for (const comment of [null, 4, 'x'.repeat(1001)]) {
        assert.equal((await submit({rating: 5, comment})).code, 400);
    }
});
test('reports failed persistence and rate limits in the selected language', async () => {
    const failed = await submit({rating: 4}, { saved: false, lang: 'he' });
    assert.equal(failed.code, 503);
    assert.match(failed.data.error, /לא נשמר/);
    const limited = await submit({rating: 5}, {limited: true});
    assert.equal(limited.code, 429);
    assert.equal(limited.rows.length, 0);
});
