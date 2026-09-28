// 🧾 רשימת הרוכשים: לשונית "buyers" בגיליון Google Sheets (דרך SheetDB).
// עמודות: email | code | date
// שורה עם אימייל = גישה מלאה לחשבון Google הזה. אפשר להוסיף שורות גם ידנית בגיליון.

const CACHE_TTL_MS = 5 * 60 * 1000;
const MIN_REFRESH_MS = 30 * 1000;

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function normalizeCode(code) {
    return String(code || '').trim().toUpperCase();
}

// מאגר שמבוסס על לשונית בגיליון. fetchImpl ניתן להחלפה בבדיקות.
function createSheetPurchaseStore({ url, sheet = 'buyers', fetchImpl = fetch }) {
    const base = url.replace(/\/+$/, '');
    let rows = null;
    let loadedAt = 0;

    async function load(force = false) {
        const age = Date.now() - loadedAt;
        if (rows && !force && age < CACHE_TTL_MS) return rows;
        if (rows && force && age < MIN_REFRESH_MS) return rows;
        const response = await fetchImpl(`${base}?sheet=${encodeURIComponent(sheet)}`);
        if (!response.ok) throw new Error(`SheetDB read failed: ${response.status}`);
        const data = await response.json();
        rows = Array.isArray(data) ? data : [];
        loadedAt = Date.now();
        return rows;
    }

    async function find(predicate) {
        const found = (await load()).find(predicate);
        if (found) return found;
        // אולי נוסף עכשיו (למשל ידנית בגיליון) - רענון אחד מבוקר
        return (await load(true)).find(predicate) || null;
    }

    return {
        async hasAccess(email) {
            const e = normalizeEmail(email);
            return Boolean(e) && Boolean(await find(r => normalizeEmail(r.email) === e));
        },
        async findByCode(code) {
            const c = normalizeCode(code);
            if (!c) return null;
            await load(true);
            return rows.find(r => normalizeCode(r.code) === c) || null;
        },
        async add({ email, code }) {
            const response = await fetchImpl(`${base}?sheet=${encodeURIComponent(sheet)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: [{
                        email: normalizeEmail(email),
                        code: normalizeCode(code),
                        date: new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })
                    }]
                })
            });
            if (!response.ok) throw new Error(`SheetDB write failed: ${response.status}`);
            rows = null; // הקריאה הבאה תטען מחדש
        }
    };
}

// מאגר בזיכרון - לבדיקות אוטומטיות בלבד (לא שורד הפעלה מחדש של השרת)
function createMemoryPurchaseStore(initial = []) {
    const rows = initial.map(r => ({ email: normalizeEmail(r.email), code: normalizeCode(r.code) }));
    return {
        async hasAccess(email) { return rows.some(r => r.email === normalizeEmail(email)); },
        async findByCode(code) { return rows.find(r => r.code && r.code === normalizeCode(code)) || null; },
        async add({ email, code }) { rows.push({ email: normalizeEmail(email), code: normalizeCode(code) }); },
        rows
    };
}

module.exports = { createSheetPurchaseStore, createMemoryPurchaseStore, normalizeEmail, normalizeCode };
