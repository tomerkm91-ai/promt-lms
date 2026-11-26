// 🌍 English translation of the course content.
// The Hebrew content (server.js, moduleExtras.js, quiz.js) is the source of truth.
// A module is shown in English only when it has all three parts here: modules, extras and quizzes.
// Until then, English visitors see the Hebrew original of that module with a short notice.
//
// Quizzes: only the texts are translated. The question ids, option ids and the correct answer
// always come from the Hebrew quiz (quiz.js), so a translation mistake can never change which
// answer is graded as correct. test/i18n.test.js checks that the ids match exactly.
// Layout: English pages are left-to-right, so callout borders use the left side (border-l-4 / border-left).

const modules = {
    1: {
        title: 'AI Foundations',
        description: 'What a language model is, how AI "thinks", and the golden rules.',
        content: `<h3>📘 Lesson 1: A Deep Introduction to LLMs and Core Principles</h3>
                  <p>A Large Language Model (LLM) is an artificial neural network trained on enormous amounts of text. The model does not understand meaning the way a human does. Instead, at every moment it calculates a distribution of possible next tokens, based on the context you gave it.</p>

                  <h4>💡 How it works: tokenization and context</h4>
                  <p>When you type text, the model breaks it into small units called <b>tokens</b> (a word, part of a word or a single character). The model uses a mechanism called Attention to work out which words in the text are most relevant to each other.</p>

                  <h4>🌟 The three golden rules of professional prompting:</h4>
                  <ul>
                      <li><b>1. Clarity and specificity:</b> Avoid vague requests like "write me something about marketing". Instead: "Write a 100-word Facebook marketing post whose goal is to sell a digital course to young mothers".</li>
                      <li><b>2. Rich context:</b> Give the model background. Who are you? What is the goal? Which platform? For example: "I'm a business consultant preparing a presentation for CEOs...".</li>
                      <li><b>3. Separate the data (Delimiters):</b> Use special markers such as <code>"""</code>, <code>---</code> or XML tags like <code>&lt;text&gt;</code> to clearly separate your instructions from the text the model needs to process.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Open ChatGPT or Claude and write a prompt asking for a summary of an article. Use the tags <code>&lt;article&gt;[paste the article here]&lt;/article&gt;</code> and tell the model to return only the 3 most important key points.
                  </div>`
    }
};

const extras = {
    1: {
        cases: `
                    <h3>🔥 Case Studies and Templates: AI Foundations</h3>
                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-4">"Write me a resignation email for my manager"</div>

                    <h4>✅ An engineered prompt (Master Level):</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-4">
                        <b>Role:</b> Act as an expert career advisor who writes formal letters.<br>
                        <b>Context:</b> I'm leaving my job as a project manager at a tech company after 3 years to take on a new challenge. I have an excellent relationship with my manager and want to stay on good terms.<br>
                        <b>Task:</b> Write a formal, respectful and professional resignation letter.<br>
                        <b>Constraints:</b> Respectful but businesslike tone, no more than 120 words, no drama.<br>
                        <b>Format:</b> A formal letter structure with a subject line, body and closing.
                    </div>
                    <h4>📋 A ready-to-copy prompt template:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Act as a [ROLE].
I need to achieve [OBJECTIVE] because [CONTEXT].
Please make sure to follow these rules: [CONSTRAINTS].
Format the final output as a [FORMAT].</pre>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Cracking the Context Principle</h3>
                    <p><b>The scenario:</b> Your CEO asked you to write a LinkedIn post summarizing the company's quarterly report, but gave you only one sentence: "We made a $2 million profit this year".</p>
                    <p><b>Your task:</b> Build a prompt based on the "golden rules" from Lesson 1 (clarity, context and separation). Use <code>&lt;data&gt;&lt;/data&gt;</code> tags to feed in the raw figure, and tell the model to write a business post aimed at potential investors.</p>`,
        promptScenarios: []
    }
};

const quizzes = {
    1: [
        {
            id: 'q1',
            question: 'At the architecture level, what is a Large Language Model (LLM)?',
            options: [
                { id: 'a', text: 'A neural network that estimates probabilities for possible next tokens given the context.' },
                { id: 'b', text: 'Conscious software that understands meaning and emotions like a human.' },
                { id: 'c', text: 'A database that retrieves ready-made answers by keyword.' },
                { id: 'd', text: 'A search engine that returns the first result from the internet.' }
            ],
            explanation: 'During generation the model estimates next-token probabilities. The decoding settings affect which token is selected.'
        },
        {
            id: 'q2',
            question: 'What is a "token"?',
            options: [
                { id: 'a', text: 'A password that gives access to the model.' },
                { id: 'b', text: 'A small unit of text - a word, part of a word or a single character - that the model breaks the input into.' },
                { id: 'c', text: 'A full sentence that the model processes at a time.' },
                { id: 'd', text: 'A fixed payment unit per conversation.' }
            ],
            explanation: 'The model breaks text into tokens - a word, part of a word or a single character - and works at that level.'
        },
        {
            id: 'q3',
            question: 'What are delimiters such as """ or XML tags in a prompt for?',
            options: [
                { id: 'a', text: 'To make the model answer faster.' },
                { id: 'b', text: 'To hide information from the model.' },
                { id: 'c', text: 'To clearly separate your instructions from the text the model needs to process.' },
                { id: 'd', text: 'To switch the model into a special programming mode.' }
            ],
            explanation: 'Delimiters show the model which part is the instructions and which is the raw material, which reduces confusion.'
        },
        {
            id: 'q4',
            question: 'Which of these prompts best applies the "clarity and specificity" principle?',
            options: [
                { id: 'a', text: '"Write me something about marketing".' },
                { id: 'b', text: '"Write a 100-word Facebook marketing post whose goal is to sell a digital course to young mothers".' },
                { id: 'c', text: '"Help me with something for Facebook".' },
                { id: 'd', text: '"Marketing, Facebook, course".' }
            ],
            explanation: 'A specific prompt defines the length, platform, goal and target audience - exactly like the example in the lesson.'
        }
    ]
};

// Modules 2-15 live in i18n/en/, one file per group of modules, merged here
for (const part of [
    require('./i18n/en/modules-02-06'),
    require('./i18n/en/modules-07-11'),
    require('./i18n/en/modules-12-15')
]) {
    Object.assign(modules, part.modules);
    Object.assign(extras, part.extras);
    Object.assign(quizzes, part.quizzes);
}

module.exports = { modules, extras, quizzes };
