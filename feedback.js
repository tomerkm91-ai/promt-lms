const { randomUUID } = require('node:crypto');

function createFeedbackHandler({ save, isLimited, language }) {
    return async function submitCourseFeedback(req, res) {
        const lang = language(req);
        const localized = (en, he) => lang === 'en' ? en : he;
        if (isLimited(req.ip)) {
            return res.status(429).json({ error: localized('Please try again in 15 minutes.', 'אפשר לנסות שוב בעוד 15 דקות.') });
        }
        const { rating, comment = '' } = req.body || {};
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ error: localized('Choose one to five stars.', 'בחרו בין כוכב אחד לחמישה.') });
        }
        if (typeof comment !== 'string' || comment.length > 1000) {
            return res.status(400).json({ error: localized('Use up to 1,000 characters.', 'אפשר לכתוב עד 1,000 תווים.') });
        }
        const row = {
            id: 'review-' + randomUUID(),
            'שם': '',
            'מספר מודל': '',
            'שאלה': 'Course rating / דירוג הקורס',
            'תשובה': rating + '/5',
            feedback: '[' + lang.toUpperCase() + '] ' + comment.trim(),
            'ציון': ''
        };
        if (!await save(row)) {
            return res.status(503).json({ error: localized('Your feedback could not be saved. Please try again.', 'המשוב לא נשמר. אפשר לנסות שוב.') });
        }
        return res.status(201).json({ saved: true });
    };
}

module.exports = { createFeedbackHandler };
