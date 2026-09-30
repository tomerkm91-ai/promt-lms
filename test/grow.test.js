// דוגמאות מתוך התיעוד של Grow: https://developers.grow.business/docs/webhooks
const test = require('node:test');
const assert = require('node:assert');
const { parseGrowPayment } = require('../grow');

const paymentLink = {
    err: '', status: '1',
    data: {
        asmachta: '12345', status: 'שולם', statusCode: '2', sum: '35',
        fullName: 'דוד דוד', payerEmail: 'Buyer@Example.com', transactionId: '1234567',
        dynamicFields: [{ key: '', label: 'אימייל של חשבון Google', option_label: '', option_key: '', field_value: 'google.user@gmail.com' }]
    }
};

const legacyPage = {
    webhookKey: 'ABC1234', transactionCode: 'ABCD1234', paymentSum: 35, paymentType: 'רגיל',
    asmachta: '123456789', fullName: 'Full Name', payerEmail: 'legacy@example.com',
    purchaseCustomField: { city: 'abc' }
};

test('payment link format (new system): paid, sum, both emails', () => {
    const p = parseGrowPayment(paymentLink);
    assert.strictEqual(p.paid, true);
    assert.strictEqual(p.sum, 35);
    assert.strictEqual(p.transactionId, '1234567');
    assert.deepStrictEqual(p.emails, ['google.user@gmail.com', 'buyer@example.com']);
});

test('legacy page format: paid, webhookKey and payer email', () => {
    const p = parseGrowPayment(legacyPage);
    assert.strictEqual(p.paid, true);
    assert.strictEqual(p.sum, 35);
    assert.strictEqual(p.transactionId, 'ABCD1234');
    assert.strictEqual(p.webhookKey, 'ABC1234');
    assert.deepStrictEqual(p.emails, ['legacy@example.com']);
});

test('unpaid status and junk bodies do not count as paid', () => {
    assert.strictEqual(parseGrowPayment({ data: { ...paymentLink.data, status: 'נכשל', statusCode: '5' } }).paid, false);
    assert.strictEqual(parseGrowPayment({}).paid, false);
    assert.strictEqual(parseGrowPayment('not json').paid, false);
    assert.deepStrictEqual(parseGrowPayment({ payerEmail: 'not-an-email' }).emails, []);
});

test('form-encoded bodies with JSON strings are understood', () => {
    const p = parseGrowPayment({ data: JSON.stringify(paymentLink.data) });
    assert.strictEqual(p.paid, true);
    assert.strictEqual(p.emails.length, 2);
});
