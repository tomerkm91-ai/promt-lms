// 🌍 English translation of the course content.
// The Hebrew content (server.js, moduleExtras.js, quiz.js) is the source of truth.
// A module is shown in English only when it has all three parts here: modules, extras and quizzes.
// Until then, English visitors see the Hebrew original of that module with a short notice.
//
// Quizzes: only the texts are translated. The question ids, option ids and the correct answer
// always come from the Hebrew quiz (quiz.js), so a translation mistake can never change which
// answer is graded as correct. test/i18n.test.js checks that the ids match exactly.
// Layout: English pages are left-to-right, so callout borders use the left side (border-l-4 / border-left).

const modules = {};
const extras = {};
const quizzes = {};

for (const part of [
    require('./i18n/en/modules-01-05'),
    require('./i18n/en/modules-06-10'),
    require('./i18n/en/modules-11-15'),
    require('./i18n/en/modules-16-17')
]) {
    Object.assign(modules, part.modules);
    Object.assign(extras, part.extras);
    Object.assign(quizzes, part.quizzes);
}

module.exports = { modules, extras, quizzes };
