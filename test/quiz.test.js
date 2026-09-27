const test = require('node:test');
const assert = require('node:assert');
const { QUIZZES, PASSING_SCORE, publicQuiz, gradeQuiz } = require('../quiz');

test('every module 1-14 has a well-formed quiz', () => {
    for (let n = 1; n <= 14; n++) {
        const questions = QUIZZES[n];
        assert.ok(Array.isArray(questions) && questions.length >= 3, `module ${n} needs at least 3 questions`);
        const ids = new Set();
        for (const q of questions) {
            assert.ok(!ids.has(q.id), `duplicate question id ${q.id} in module ${n}`);
            ids.add(q.id);
            const optionIds = q.options.map(o => o.id);
            assert.strictEqual(new Set(optionIds).size, optionIds.length, `duplicate option id in module ${n} ${q.id}`);
            assert.ok(q.options.length >= 3, `module ${n} ${q.id} needs at least 3 options`);
            assert.ok(optionIds.includes(q.correct), `module ${n} ${q.id} correct answer is not an option`);
            assert.ok(q.explanation && q.explanation.length > 0, `module ${n} ${q.id} missing explanation`);
        }
    }
});

test('correct answers are not always in the same position', () => {
    const positions = new Set();
    for (const questions of Object.values(QUIZZES)) {
        for (const q of questions) positions.add(q.options.findIndex(o => o.id === q.correct));
    }
    assert.ok(positions.size > 1);
});

test('publicQuiz never exposes answers or explanations', () => {
    const json = JSON.stringify(publicQuiz(1));
    assert.ok(!json.includes('"correct"'));
    assert.ok(!json.includes('"explanation"'));
    assert.strictEqual(publicQuiz(999), null);
});

test('gradeQuiz scores all-correct, all-wrong and partial answers', () => {
    const questions = QUIZZES[2];
    const allCorrect = Object.fromEntries(questions.map(q => [q.id, q.correct]));
    const full = gradeQuiz(2, allCorrect);
    assert.strictEqual(full.score, 100);
    assert.strictEqual(full.passed, true);

    const allWrong = Object.fromEntries(questions.map(q => [q.id, q.options.find(o => o.id !== q.correct).id]));
    const zero = gradeQuiz(2, allWrong);
    assert.strictEqual(zero.score, 0);
    assert.strictEqual(zero.passed, false);

    const oneMissing = { ...allCorrect };
    delete oneMissing[questions[0].id];
    const partial = gradeQuiz(2, oneMissing);
    assert.strictEqual(partial.correctCount, questions.length - 1);
    assert.strictEqual(partial.results[0].answered, false);
    assert.strictEqual(partial.passed, partial.score >= PASSING_SCORE);
});

test('gradeQuiz rejects unknown modules and tolerates bad input', () => {
    assert.strictEqual(gradeQuiz(999, {}), null);
    assert.strictEqual(gradeQuiz(1, null).score, 0);
    assert.strictEqual(gradeQuiz(1, { q1: ['a'] }).results[0].isCorrect, false);
});
