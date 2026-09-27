// 🔒 הרשאות גישה למודולים בתשלום.
// המודל: X המודולים הראשונים חינם, השאר נפתחים עם קוד גישה שהקונה מקבל אחרי תשלום.
// אם לא הוגדרו קודי גישה בכלל - חומת התשלום כבויה וכל התוכן פתוח (כמו לפני השינוי).

function parseCodes(raw) {
    return new Set(
        String(raw || '')
            .split(',')
            .map(c => c.trim().toUpperCase())
            .filter(Boolean)
    );
}

function createAccessPolicy({ accessCodes, freeModules, checkoutUrl }) {
    const codes = parseCodes(accessCodes);
    const parsedFree = Number.parseInt(freeModules, 10);
    const free = Number.isFinite(parsedFree) && parsedFree >= 0 ? parsedFree : 3;
    const enabled = codes.size > 0;

    function isValidCode(code) {
        return typeof code === 'string' && codes.has(code.trim().toUpperCase());
    }

    function isLocked(moduleNumber, code) {
        if (!enabled) return false;
        if (moduleNumber <= free) return false;
        return !isValidCode(code);
    }

    return {
        enabled,
        freeModules: free,
        checkoutUrl: checkoutUrl || null,
        isValidCode,
        isLocked
    };
}

module.exports = { parseCodes, createAccessPolicy };
