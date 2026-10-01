// 🔒 מדיניות גישה למודולים בתשלום.
// המודל: FREE_MODULES המודולים הראשונים חינם, השאר פתוחים רק לחשבון Google שמופיע ברשימת הרוכשים.
// חומת התשלום פעילה רק כשהוגדר PAYWALL=on וכל ההגדרות הנדרשות קיימות - אחרת כל התוכן פתוח
// (עדיף תוכן פתוח זמנית מאשר לנעול קונים שכבר שילמו בגלל הגדרה חסרה).

function parseList(raw, normalize) {
    return new Set(
        String(raw || '')
            .split(',')
            .map(s => normalize(s.trim()))
            .filter(Boolean)
    );
}

const parseCodes = raw => parseList(raw, s => s.toUpperCase());
const parseEmails = raw => parseList(raw, s => s.toLowerCase());

function createAccessPolicy(env = {}) {
    const parsedFree = Number.parseInt(env.FREE_MODULES, 10);
    const freeModules = Number.isFinite(parsedFree) && parsedFree >= 0 ? parsedFree : 3;
    // מבצע השקה: עד PROMO_UNTIL (כולל, שעון ישראל) פתוחים PROMO_FREE_MODULES מודולים בחינם
    const parsedPromo = Number.parseInt(env.PROMO_FREE_MODULES, 10);
    const promoUntil = /^\d{4}-\d{2}-\d{2}$/.test(env.PROMO_UNTIL || '') ? env.PROMO_UNTIL : null;
    const promoModules = promoUntil && Number.isFinite(parsedPromo) && parsedPromo > freeModules ? parsedPromo : null;
    const promoActiveOn = date => Boolean(promoModules) && typeof date === 'string' && date <= promoUntil;
    const freeModulesOn = date => promoActiveOn(date) ? promoModules : freeModules;
    const codes = parseCodes(env.ACCESS_CODES);
    const owners = parseEmails(env.OWNER_EMAILS);

    const requested = String(env.PAYWALL || '').toLowerCase() === 'on';
    const missing = ['GOOGLE_CLIENT_ID', 'SESSION_SECRET', 'SHEETDB_URL'].filter(k => !env[k]);
    if (env.SESSION_SECRET && env.SESSION_SECRET.length < 32 && !missing.includes('SESSION_SECRET')) {
        missing.push('SESSION_SECRET (לפחות 32 תווים)');
    }
    const enabled = requested && missing.length === 0;

    return {
        enabled,
        requested,
        missing,
        freeModules,
        promoUntil: promoModules ? promoUntil : null,
        promoActiveOn,
        freeModulesOn,
        checkoutUrl: env.CHECKOUT_URL || null,
        price: env.COURSE_PRICE || null,
        // date (YYYY-MM-DD) - כדי שמבצע ההשקה יסתיים אוטומטית; בלי תאריך נבדק רק המצב הרגיל
        isFree: (moduleNumber, date) => !enabled || moduleNumber <= freeModulesOn(date),
        isOwner: email => Boolean(email) && owners.has(String(email).toLowerCase()),
        isValidCode: code => typeof code === 'string' && codes.has(code.trim().toUpperCase())
    };
}

module.exports = { parseCodes, parseEmails, createAccessPolicy };
