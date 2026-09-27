// יצירת קודי גישה אקראיים לרוכשי הקורס.
// שימוש: npm run codes -- 20   (ברירת מחדל: 10 קודים)
// את הקודים מוסיפים למשתנה ACCESS_CODES ב-Render, מופרדים בפסיקים.
const crypto = require('crypto');

// בלי תווים שקל להתבלבל ביניהם (0/O, 1/I/L)
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function randomBlock(length) {
    let out = '';
    for (let i = 0; i < length; i++) out += ALPHABET[crypto.randomInt(ALPHABET.length)];
    return out;
}

function generateCode() {
    return `AI-${randomBlock(4)}-${randomBlock(4)}-${randomBlock(4)}`;
}

if (require.main === module) {
    const count = Math.min(Math.max(Number.parseInt(process.argv[2], 10) || 10, 1), 500);
    const codes = Array.from({ length: count }, generateCode);
    console.log(codes.join('\n'));
    console.log('\nלהדבקה ב-ACCESS_CODES:\n' + codes.join(','));
}

module.exports = { generateCode };
