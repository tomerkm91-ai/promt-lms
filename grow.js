// 💳 קליטת הודעות תשלום (Webhooks) מ-Grow.
// לפי התיעוד (https://developers.grow.business/docs/webhooks) יש כמה פורמטים:
// - קישורי תשלום (מערכת חדשה): הפרטים בתוך data, עם status/statusCode ו-sum.
// - דפי תשלום ותשלומי API (מערכת ישנה): הפרטים ברמה העליונה, עם webhookKey ו-paymentSum.
// הפונקציה מחזירה תיאור אחיד של התשלום, בלי להניח איזה פורמט הגיע.

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

function parseMaybeJson(value) {
    if (typeof value !== 'string') return value;
    try { return JSON.parse(value); } catch (e) { return value; }
}

function toNumber(value) {
    const n = Number(String(value ?? '').replace(/[^\d.]/g, ''));
    return Number.isFinite(n) && String(value ?? '').trim() !== '' ? n : null;
}

function cleanEmail(value) {
    const e = String(value || '').trim().toLowerCase();
    return EMAIL_RE.test(e) ? e : null;
}

// אימיילים משדות מותאמים (למשל שדה "אימייל של חשבון Google" בדף התשלום)
function customFieldEmails(payload) {
    const found = [];
    const dynamic = parseMaybeJson(payload.dynamicFields);
    if (Array.isArray(dynamic)) {
        dynamic.forEach(f => found.push(f && f.field_value));
    }
    const custom = parseMaybeJson(payload.purchaseCustomField);
    if (custom && typeof custom === 'object') {
        Object.values(custom).forEach(v => found.push(v));
    }
    return found.map(cleanEmail).filter(Boolean);
}

function parseGrowPayment(body) {
    const root = parseMaybeJson(body) || {};
    const data = parseMaybeJson(root.data);
    const p = data && typeof data === 'object' ? data : root;

    // בפורמט החדש יש סטטוס מפורש; statusCode 2 = "שולם" לפי הדוגמה בתיעוד
    const hasStatus = p.statusCode !== undefined || p.status !== undefined;
    const paid = hasStatus
        ? String(p.statusCode) === '2' || String(p.status).trim() === 'שולם'
        : Boolean(p.transactionCode || p.asmachta);

    const emails = [...new Set([...customFieldEmails(p), cleanEmail(p.payerEmail || p.email)].filter(Boolean))];

    return {
        paid,
        transactionId: String(p.transactionCode || p.transactionId || p.asmachta || '').trim() || null,
        sum: toNumber(p.sum ?? p.paymentSum ?? p.amount),
        emails,
        webhookKey: String(root.webhookKey || root.webhook_key || p.webhookKey || p.webhook_key || '').trim() || null
    };
}

module.exports = { parseGrowPayment, toNumber };
