// 🌍 בדיקות התרגום לאנגלית: מבנה זהה לעברית, ותשובה נכונה שתמיד נקבעת לפי המבחן בעברית
const test = require('node:test');
const assert = require('node:assert');
const EN = require('../content.en');
const { QUIZZES, publicQuiz, gradeQuiz } = require('../quiz');
const { MODULE_EXTRAS } = require('../moduleExtras');
const createApp = require('../server');

const nonEmpty = v => typeof v === 'string' && v.trim().length > 0;
const hebrew = /[֐-׿]/;

test('every English quiz has exactly the same question and option ids as the Hebrew quiz', () => {
    for (const [num, enQuiz] of Object.entries(EN.quizzes)) {
        const heQuiz = QUIZZES[num];
        assert.ok(heQuiz, `module ${num} has no Hebrew quiz`);
        assert.deepStrictEqual(enQuiz.map(q => q.id), heQuiz.map(q => q.id), `module ${num}: question ids differ`);
        enQuiz.forEach((q, i) => {
            assert.deepStrictEqual(q.options.map(o => o.id), heQuiz[i].options.map(o => o.id), `module ${num} ${q.id}: option ids differ`);
            assert.ok(nonEmpty(q.question) && nonEmpty(q.explanation), `module ${num} ${q.id}: missing text`);
            q.options.forEach(o => assert.ok(nonEmpty(o.text), `module ${num} ${q.id}/${o.id}: empty option`));
            assert.strictEqual(q.correct, undefined, `module ${num} ${q.id}: the correct answer must come from the Hebrew quiz only`);
        });
    }
});

test('translated modules have English title, description, content and the same number of practice scenarios', () => {
    for (const [num, mod] of Object.entries(EN.modules)) {
        assert.ok(nonEmpty(mod.title) && nonEmpty(mod.description) && nonEmpty(mod.content), `module ${num}: missing text`);
        assert.ok(!hebrew.test(mod.title + mod.description + mod.content), `module ${num}: Hebrew left in the English lesson`);
        const extras = EN.extras[num];
        assert.ok(extras && nonEmpty(extras.cases) && nonEmpty(extras.practice), `module ${num}: missing English extras`);
        assert.ok(!hebrew.test(extras.cases + extras.practice + extras.promptScenarios.join('')), `module ${num}: Hebrew left in the English extras`);
        assert.strictEqual(extras.promptScenarios.length, (MODULE_EXTRAS[num].promptScenarios || []).length, `module ${num}: scenario count differs`);
    }
    for (const [num, q] of Object.entries(EN.quizzes)) {
        assert.ok(!hebrew.test(JSON.stringify(q)), `module ${num}: Hebrew left in the English quiz`);
    }
});

test('grading in English uses the Hebrew answer key', () => {
    for (const num of Object.keys(EN.quizzes)) {
        const allCorrect = Object.fromEntries(QUIZZES[num].map(q => [q.id, q.correct]));
        const he = gradeQuiz(num, allCorrect, 'he');
        const en = gradeQuiz(num, allCorrect, 'en');
        assert.strictEqual(en.score, 100);
        assert.strictEqual(en.score, he.score);
        assert.ok(!hebrew.test(en.results.map(r => r.question + r.correctAnswer + r.explanation).join('')));
    }
    // מודול בלי תרגום נשאר בעברית גם כשמבקשים אנגלית
    const untranslated = Object.keys(QUIZZES).find(n => !EN.quizzes[n]);
    if (untranslated) assert.ok(hebrew.test(publicQuiz(untranslated, 'en')[0].question));
});

test('API: lang=en returns translated modules in English and untranslated ones in Hebrew, with English errors', async () => {
    const app = createApp({ env: {}, now: () => new Date('2030-01-01T12:00:00Z') });
    const srv = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)); });
    const url = `http://127.0.0.1:${srv.address().port}`;
    try {
        const en = await (await fetch(`${url}/api/modules?lang=en`)).json();
        const he = await (await fetch(`${url}/api/modules`)).json();
        assert.strictEqual(en.length, he.length);
        for (const m of en) {
            if (EN.modules[m.moduleNumber]) {
                assert.strictEqual(m.contentLang, 'en');
                assert.strictEqual(m.title, EN.modules[m.moduleNumber].title);
            } else {
                assert.strictEqual(m.contentLang, 'he');
                assert.strictEqual(m.title, he.find(x => x.moduleNumber === m.moduleNumber).title);
            }
        }
        assert.ok(he.every(m => m.contentLang === 'he'));

        const quiz = await (await fetch(`${url}/api/modules/1/quiz?lang=en`)).json();
        assert.strictEqual(quiz.lang, EN.quizzes[1] ? 'en' : 'he');

        const bad = await fetch(`${url}/api/submissions?lang=en`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentName: '', moduleNumber: 1, answers: {} })
        });
        assert.strictEqual(bad.status, 400);
        assert.match((await bad.json()).error, /full name/);

        const config = await (await fetch(`${url}/api/config`)).json();
        const allTranslated = he.every(m => EN.modules[m.moduleNumber] && EN.extras[m.moduleNumber] && EN.quizzes[m.moduleNumber]);
        assert.deepStrictEqual(config.languages, allTranslated ? ['he', 'en'] : ['he']);
    } finally {
        srv.close();
    }
});
