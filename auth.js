// 🔐 התחברות עם Google וניהול סשן.
// הדפדפן מקבל מ-Google אסימון זהות (ID token), השרת מאמת אותו מול Google,
// ואז שומר את האימייל בעוגייה חתומה (HMAC) - בלי מסד נתונים של סשנים.
const crypto = require('crypto');

const SESSION_COOKIE = 'lms_session';
const SESSION_DAYS = 30;

function createGoogleVerifier(clientId) {
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client();
    // מחזיר את האימייל המאומת, או null אם האסימון לא תקין
    return async function verifyGoogleToken(idToken) {
        try {
            const ticket = await client.verifyIdToken({ idToken, audience: clientId });
            const payload = ticket.getPayload();
            if (!payload || !payload.email || payload.email_verified !== true) return null;
            return payload.email.toLowerCase();
        } catch (e) {
            return null;
        }
    };
}

function sign(value, secret) {
    return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function createSessionToken(email, secret, now = Date.now()) {
    const payload = Buffer.from(JSON.stringify({
        email,
        exp: now + SESSION_DAYS * 24 * 60 * 60 * 1000
    })).toString('base64url');
    return `${payload}.${sign(payload, secret)}`;
}

function readSessionToken(token, secret, now = Date.now()) {
    if (typeof token !== 'string' || !token.includes('.')) return null;
    const [payload, signature] = token.split('.');
    const expected = sign(payload, secret);
    const a = Buffer.from(signature || '');
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    try {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (typeof data.email !== 'string' || typeof data.exp !== 'number' || data.exp < now) return null;
        return data.email;
    } catch (e) {
        return null;
    }
}

function parseCookies(header) {
    const cookies = {};
    String(header || '').split(';').forEach(part => {
        const i = part.indexOf('=');
        if (i > 0) cookies[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
    });
    return cookies;
}

function sessionCookie(value, { secure, maxAgeSeconds }) {
    return [
        `${SESSION_COOKIE}=${encodeURIComponent(value)}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        `Max-Age=${maxAgeSeconds}`,
        secure ? 'Secure' : ''
    ].filter(Boolean).join('; ');
}

module.exports = {
    SESSION_COOKIE,
    SESSION_DAYS,
    createGoogleVerifier,
    createSessionToken,
    readSessionToken,
    parseCookies,
    sessionCookie
};
