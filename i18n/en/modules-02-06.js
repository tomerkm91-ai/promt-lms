// English translation of modules 2-6 (source of truth: server.js, moduleExtras.js, quiz.js).
// Quizzes carry no "correct" field: the answer key always comes from the Hebrew quiz.

const modules = {
    2: {
        title: 'Anatomy of a Prompt',
        description: 'Role, Context, Objective, Constraints and output format.',
        content: `<h3>📘 Lesson 2: Five components you can test</h3>
                  <p>Use these five components as a checklist. Include the parts that help a reader carry out this particular task.</p>

                  <ol>
                      <li><b>Role (persona):</b> Tells the model which professional point of view to work from. <i>Example: "Act as a senior Full Stack developer with expertise in information security".</i></li>
                      <li><b>Context (background):</b> Provides the setting and the reason for the task. <i>Example: "We're launching a new app for managing internal tasks at our company, and we have a bug in the login system".</i></li>
                      <li><b>Objective (the task):</b> A precise definition of what needs to be done. <i>Example: "Analyze the following JavaScript code and find where the security vulnerability is".</i></li>
                      <li><b>Constraints (limits and rules):</b> Hard rules that define the boundaries of the answer. <i>Example: "Don't suggest any new external libraries, write only in English, and don't write an introduction or a conclusion".</i></li>
                      <li><b>Output Format:</b> The visual or structural shape of the answer. <i>Example: "Present the answer in a table with 3 columns: the broken line, a description of the bug, and the fixed code".</i></li>
                  </ol>

                  <h4>📝 An example of a complete, engineered prompt:</h4>
                  <pre style="background-color:#f3f4f6; padding:12px; border-radius:6px; font-family:monospace; direction:ltr; text-align:left; overflow-x:auto;">
[Role]: Act as an expert copywriter.
[Context]: We are launching a premium eco-friendly water bottle.
[Objective]: Write 3 catchy slogans for Instagram ads.
[Constraints]: Maximum 5 words per slogan. Do not use the word "Green".
[Output Format]: Numbered list.
                  </pre>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Take a task from your work or studies and break it down into a prompt built from these 5 components. Run it with the model and see how much better the output is compared with a short question.
                  </div>`
    },
    3: {
        title: 'Professional Techniques',
        description: 'Use examples, compare prompt versions and check a result against a known answer.',
        content: `<h3>Lesson 3. How would you know if a prompt improved?</h3>
                <p>A zero-shot prompt gives the task directly. A few-shot prompt adds examples of inputs and acceptable outputs. Examples help when a category boundary is hard to describe. Keep at least one example out of the prompt so you can test that boundary.</p>
                <h4>Reasoning tasks</h4>
                <p>Give a reasoning model the goal, relevant facts and success criteria. Ask for evidence you can inspect, such as the formula used or a quote that supports a claim. A fluent explanation can accompany a wrong answer. Check the result independently.</p>
                <h4>Chain prompting</h4>
                <p>Break work into stages when you need to review an intermediate result. For a meeting summary, extract decisions and owners first. Check the list against the notes before turning it into a follow-up email.</p>
                <p><a href="https://developers.openai.com/api/docs/guides/reasoning-best-practices">OpenAI guidance on prompting reasoning models</a></p>`
    },
    4: {
        title: 'ChatGPT',
        description: 'Use a spreadsheet, check a calculation and turn the result into a chart.',
        content: `<h3>Lesson 4. Analyze a spreadsheet with ChatGPT</h3>
                <p>A team says attendance improved. Before choosing a chart, decide what “improved” means. Total attendance measures reach. Attendance divided by registrations measures the share who came. Those two measures can move in opposite directions.</p>
                <p>With data analysis available, ChatGPT can use Python to inspect a CSV or spreadsheet, calculate results and create charts. Identify the units and denominator in your prompt. Ask to see the figures behind the chart.</p>
                <h4>Reusing instructions</h4>
                <p>Projects group related chats and files. A custom GPT can reuse instructions and reference files across tasks. For a recurring report, save a definition of attendance rate and specify what to do with a missing registration count.</p>
                <p><a href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt">ChatGPT data analysis guide</a></p>`
    },
    5: {
        title: 'Claude',
        description: 'Build a reusable Claude Artifact and test how it behaves.',
        content: `<h3>Lesson 5. Build an interactive study tool with Claude</h3>
                <p>An Artifact is a self-contained piece of work you can revisit and edit. It can be a document, a chart or a small interactive tool. A Project can keep the source material and instructions for a series of related chats.</p>
                <p>Give Claude a short brief covering the learner, the task and what should happen after a choice. A larger context window can help compare passages that are far apart. Ask for section references and check them against the original.</p>
                <p><a href="https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them">Claude Artifacts guide</a></p>`
    },
    6: {
        title: 'Gemini',
        description: 'Use Gemini with Workspace and use Gemini Notebook to answer from selected sources.',
        content: `<h3>Lesson 6. Which source answers the question?</h3>
                <p>Gemini can use a connected Google Workspace account to find material in Drive or summarize a Gmail thread when the account and its permissions allow it. Name the file and ask for the passage that supports the answer.</p>
                <p>Gemini Notebook (formerly NotebookLM) lets you select sources and ask questions about them. Follow a citation back to its passage. A passage can support the date of a decision while leaving the person responsible unknown. An Audio Overview can help you review the material after checking the facts.</p>
                <p>A context window limits how much material a model can consider in one request. Limits vary by model and interface. For a long report, check that the answer covers the relevant sections.</p>
                <p><a href="https://support.google.com/gemini/answer/15229592">Gemini and Workspace</a> · <a href="https://support.google.com/gemininotebook/answer/16179559">Gemini Notebook citations</a></p>`
    }
};

const extras = {
    2: {
        cases: `
                    <h3>🔥 Case Studies and Templates: Anatomy of a Prompt</h3>
                    <p>A constraint can keep a report focused. Check each finding against the supplied records.</p>
                    <h4>📋 A complete prompt template (tables and analysis):</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
[Role]: Data Analyst Specialist.
[Context]: Analyzing customer churn for a telecom app.
[Objective]: Summarize key reasons customers leave.
[Constraints]: Do not use bullet points. Use an HTML table only.
[Output Format]: Table with columns: Reason, Impact, Action Item.</pre>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Building a Component-Based Prompt</h3>
                    <p><b>Your task:</b> Write a complete prompt that helps a marketing manager build a weekly work plan. You must use all five components explicitly and label each one: Role, Context, Objective, Constraints, Output Format.</p>`,
        promptScenarios: []
    },
    3: {
        cases: `
                    <h3>🔥 Case Studies and Templates: Professional Techniques</h3>
                    <h4>💡 An essential example of Few-shot Prompting:</h4>
                    <p>Say you want the model to accurately sort customer support requests into predefined departments:</p>
                    <pre class="bg-slate-100 text-slate-800 p-4 rounded-lg text-xs font-mono text-left" dir="ltr">
Request: "My account is locked and I can't log in" -> Department: Security & Technical Support
Request: "I wanted to know how much your annual subscription costs" -> Department: Sales & Billing
Request: "Do you offer a military discount?" -> Department: [the model completes this automatically]</pre>`,
        practice: `<h3>Lab. Can the model calculate a completion rate?</h3>
                <p>Six people registered. Four attended. Three of the attendees finished the workshop. In a fresh chat ask, “What was the completion rate?” Save the answer, including any question or assumption. In a second chat ask, “What percentage of attendees finished? Show the numerator, denominator and result.”</p>
                <p><b>Check:</b> 3 / 4 = 75% of attendees and 3 / 6 = 50% of registrants. The first question leaves room for either denominator. Credit an answer that identifies the ambiguity. The second answer must use four. Try a workshop with zero attendees. An acceptable answer says the rate is undefined.</p>`,
        promptScenarios: [
            'Ask a model to sort customer service requests into predefined categories (service/sales/complaint) using Few-shot Prompting.',
            'Ask for a workshop completion rate, including the counts and the denominator.',
            'Ask a model to rewrite a marketing paragraph from dry language into persuasive language, in two separate steps (Chain Prompting).'
        ]
    },
    4: {
        cases: `<h3>🔥 Case Studies and Templates: ChatGPT as an Analytical Tool</h3>
                                <h4>💡 Building a Custom GPT for analyzing legal contracts:</h4>
                                <p>A company wants every employee to be able to upload a contract and get a quick check against a list of forbidden clauses, without having to explain the company's policy again in every conversation.</p>
                                <h4>📋 A System Instructions template for a Custom GPT:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
You are a Contract Compliance Assistant for [Company Name].
Always check uploaded contracts against this list of forbidden clauses: [list].
If a forbidden clause is found, quote it and explain the risk in plain language.
Never approve a contract yourself - always end with "Escalate to Legal: Yes/No".</pre>`,
        practice: `<h3>Lab. Which workshop improved?</h3>
                <p>Save these three lines as a CSV, or paste them into a chat with data analysis available.</p>
                <pre>month,registrations,attendees
April,20,15
May,40,24</pre>
                <p>Ask for attendance totals and rates, a chart with labeled units, and a one-sentence summary for the organizer. Check the arithmetic before accepting the chart.</p>
                <p><b>Answer key:</b> Nine more people attended in May. Attendance rate fell from 75% to 60%, a drop of 15 percentage points. A summary that just says “attendance improved” omits an important part of the story.</p>`,
        promptScenarios: [
            'Ask ChatGPT to analyze an Excel file of sales data and produce key insights and a chart.',
            'Build System Instructions for a Custom GPT that checks contracts against a list of forbidden clauses.',
            'Ask ChatGPT to create a marketing image for a new product based on a precise brief.'
        ]
    },
    5: {
        cases: `<h3>Case. Turn a checklist into a reusable tool</h3>
                <p>A trainer wants a self-check for new hires. Give Claude the checklist, the intended audience and the rule for marking an item complete. Ask for a one-page interactive Artifact and keep a copy of the original checklist for comparison.</p>
                <pre>Build a checklist with three items: read the brief, complete the practice task, submit feedback. Show a count of completed items. Unchecking an item must decrease the count. Include a reset button.</pre>`,
        practice: `<h3>Lab. Build a two-question tutor</h3>
                <p>Ask Claude for an interactive Artifact that shows one question at a time. Use these facts: 3 of 4 attendees finished a workshop (75%); 3 of 6 registrants finished (50%). Ask about each denominator. Offer 50% and 75% as choices, give feedback naming the denominator, and include a restart button.</p>
                <p><b>Test it:</b> Select the wrong answer on question one. Check the feedback. Finish question two, restart, and confirm the score returns to zero. Submit the prompt, the Artifact and one change you made after testing.</p>`,
        promptScenarios: [
            'Ask Claude to build an interactive monthly budget calculator app in HTML and Tailwind.',
            'Describe a long legal document and ask Claude to find internal contradictions between clauses.',
            'Ask Claude to analyze existing code and find a possible security vulnerability in it.'
        ]
    },
    6: {
        cases: `<h3>Case. An agenda with traceable action items</h3>
                <p>With Google Workspace connected, ask Gemini to find a named meeting note in Drive. Request an action, an owner and the original sentence for each assignment. If several files have the same name, supply the intended date or select the file. Read the cited sentences before circulating the agenda.</p>`,
        practice: `<h3>Lab. Reconcile two versions of a decision</h3>
                <p>Create two text sources. “Draft, 2 May: The workshop is planned for 12 June. Sam will book the room.” “Approved minutes, 9 May: The workshop moves to 19 June. Room booking remains open.”</p>
                <p>Add both to Gemini Notebook. Ask for the approved date, the confirmed booking owner and a citation for each answer. Open each citation.</p>
                <p><b>Check:</b> The approved date is 19 June. The minutes confirm no owner. Sam appears in the draft only. Save a two-row evidence table that keeps the draft and approved decisions distinct.</p>`,
        promptScenarios: [
            'Ask Gemini to summarize a long email thread from Gmail into three action items.',
            'Ask Gemini Notebook to distinguish a draft decision from the approved minutes and cite each source.',
            'Ask Gemini to analyze a Google Sheets file and draw business insights from it.'
        ]
    }
};

const quizzes = {
    2: [
        {
            id: 'q1',
            question: 'Which prompt component is responsible for setting the rules the model must not break (for example: "Don\'t make up data")?',
            options: [
                { id: 'a', text: 'Role (persona)' },
                { id: 'b', text: 'Context (background)' },
                { id: 'c', text: 'Constraints (limits and rules)' },
                { id: 'd', text: 'Output Format' }
            ],
            explanation: 'Constraints are the "hard rules" that define the boundaries of the answer.'
        },
        {
            id: 'q2',
            question: 'The sentence "Act as a senior Full Stack developer with expertise in information security" is an example of which component?',
            options: [
                { id: 'a', text: 'Role' },
                { id: 'b', text: 'Objective' },
                { id: 'c', text: 'Constraints' },
                { id: 'd', text: 'Output Format' }
            ],
            explanation: 'Role tells the model which professional point of view to work from.'
        },
        {
            id: 'q3',
            question: 'The instruction "Present the answer in a table with 3 columns" belongs to which component?',
            options: [
                { id: 'a', text: 'Context' },
                { id: 'b', text: 'Output Format' },
                { id: 'c', text: 'Role' },
                { id: 'd', text: 'Objective' }
            ],
            explanation: 'Output Format sets the structural or visual shape of the answer.'
        },
        {
            id: 'q4',
            question: 'What is the job of the Context component?',
            options: [
                { id: 'a', text: 'To set the maximum length of the answer.' },
                { id: 'b', text: 'To choose which AI model will answer.' },
                { id: 'c', text: 'To provide the setting and the reason for the task - the background the model needs to answer correctly.' },
                { id: 'd', text: 'To translate the prompt into English.' }
            ],
            explanation: 'Context explains to the model what situation you are in and why the task is needed.'
        }
    ],
    3: [
        {
            id: 'q1',
            question: 'What is the Few-shot Prompting technique?',
            options: [
                { id: 'a', text: 'Sending an empty prompt and giving the model complete freedom.' },
                { id: 'b', text: 'Providing a few examples of the desired input and output inside the prompt to teach the model the pattern.' },
                { id: 'c', text: 'Sending the same prompt several times until you get a good answer.' },
                { id: 'd', text: 'Cutting the prompt down to as few words as possible.' }
            ],
            explanation: 'With Few-shot, you show the model the pattern you want before it tackles the real task.'
        },
        {
            id: 'q2',
            question: 'A model reports a 75% completion rate. Which follow-up best helps you verify it?',
            options: [
                { id: 'a', text: 'Repeat the percentage in words.' },
                { id: 'b', text: 'Translate the response.' },
                { id: 'c', text: 'Show the counts and identify who is in the denominator.' },
                { id: 'd', text: 'Write a more confident conclusion.' }
            ],
            explanation: 'The counts let you check both the arithmetic and the definition of the rate.'
        },
        {
            id: 'q3',
            question: 'What is Chain Prompting?',
            options: [
                { id: 'a', text: 'Breaking a big task into several defined steps, where each step builds on the one before it.' },
                { id: 'b', text: 'Sending one prompt to several models at the same time.' },
                { id: 'c', text: 'Adding a chain of exclamation marks to stress importance.' },
                { id: 'd', text: 'Copying someone else\'s prompt.' }
            ],
            explanation: 'For example: an outline, then expanding one section, and finally a summary.'
        },
        {
            id: 'q4',
            question: 'According to the lesson, when is Few-shot especially useful?',
            options: [
                { id: 'a', text: 'When you want a creative and completely unpredictable answer.' },
                { id: 'b', text: 'When you want sorting into predefined categories or output in a strict structure.' },
                { id: 'c', text: 'Only when you work in English.' },
                { id: 'd', text: 'When the prompt is too long and needs to be shortened.' }
            ],
            explanation: 'Examples give the model a clear pattern - ideal for classification, a specific tone and a fixed structure.'
        }
    ],
    4: [
        {
            id: 'q1',
            question: 'In which programming language does ChatGPT write and run code behind the scenes to analyze Excel/CSV files and produce charts?',
            options: [
                { id: 'a', text: 'Java, directly in the user\'s browser.' },
                { id: 'b', text: 'Python, in an isolated environment.' },
                { id: 'c', text: 'C++, on the user\'s computer.' },
                { id: 'd', text: 'It doesn\'t run code - it just guesses the results.' }
            ],
            explanation: 'With its data analysis capability, ChatGPT writes and runs Python code in an isolated environment.'
        },
        {
            id: 'q2',
            question: 'What is a Custom GPT?',
            options: [
                { id: 'a', text: 'A customized version of ChatGPT with fixed system instructions and preloaded knowledge files.' },
                { id: 'b', text: 'A new language model that you train from scratch on your personal computer.' },
                { id: 'c', text: 'A browser extension for translating websites.' },
                { id: 'd', text: 'A paid subscription that makes answers faster.' }
            ],
            explanation: 'A Custom GPT is built on top of ChatGPT with fixed instructions and files - for example, a bot that reviews contracts according to company rules.'
        },
        {
            id: 'q3',
            question: 'What happened to workshop attendance in the April and May example?',
            options: [
                { id: 'a', text: 'The number increased while the rate fell.' },
                { id: 'b', text: 'Both the number and the rate increased.' },
                { id: 'c', text: 'The rate fell by nine percentage points.' },
                { id: 'd', text: 'Both months had the same attendance rate.' }
            ],
            explanation: '15/20 is 75% and 24/40 is 60%. May had more attendees and a lower rate.'
        },
        {
            id: 'q4',
            question: 'In the lesson\'s System Instructions template for the contract-review bot, why does the bot always end with "Escalate to Legal: Yes/No" instead of approving a contract itself?',
            options: [
                { id: 'a', text: 'Because ChatGPT can\'t read contracts.' },
                { id: 'b', text: 'Because the final decision stays with a qualified person, and the bot only flags risks.' },
                { id: 'c', text: 'To make the answer shorter.' },
                { id: 'd', text: 'Because it\'s a technical requirement of every Custom GPT.' }
            ],
            explanation: 'This is a deliberate Constraint: the bot assists, but it doesn\'t make the decision in place of the legal team.'
        }
    ],
    5: [
        {
            id: 'q1',
            question: 'Which Claude feature can produce a self-contained interactive checklist?',
            options: [
                { id: 'a', text: 'Project instructions' },
                { id: 'b', text: 'Artifacts' },
                { id: 'c', text: 'A conversation title' },
                { id: 'd', text: 'File search' }
            ],
            explanation: 'An Artifact can contain the checklist interface and the logic for counting checked items.'
        },
        {
            id: 'q2',
            question: 'What is the main advantage of Claude Projects?',
            options: [
                { id: 'a', text: 'They run the code on your own private server.' },
                { id: 'b', text: 'A long-term workspace with files and a fixed base instruction, so you don\'t have to upload the materials again in every conversation.' },
                { id: 'c', text: 'They let you chat with several models from different companies in the same window.' },
                { id: 'd', text: 'They automatically delete your conversation history.' }
            ],
            explanation: 'Projects keep your materials and a fixed instruction, so every conversation in the project builds on them.'
        },
        {
            id: 'q3',
            question: 'Why is a large Context Window useful for analyzing documents?',
            options: [
                { id: 'a', text: 'It lets you feed in an entire long document at once, for example to find contradictions between clauses that are far apart.' },
                { id: 'b', text: 'It guarantees that the model will never make a mistake.' },
                { id: 'c', text: 'It cuts down the user\'s typing time.' },
                { id: 'd', text: 'It translates the document automatically.' }
            ],
            explanation: 'When the whole document is in context, the model can compare different parts of it without splitting it up.'
        },
        {
            id: 'q4',
            question: 'Which prompt is best suited to getting an interactive Artifact?',
            options: [
                { id: 'a', text: '"What is HTML?"' },
                { id: 'b', text: '"Build me an interactive monthly budget calculator in HTML and Tailwind CSS".' },
                { id: 'c', text: '"Summarize this article for me in three points".' },
                { id: 'd', text: '"Translate this sentence into French".' }
            ],
            explanation: 'A request to build a tool with runnable code is exactly what Artifacts are designed to display.'
        }
    ],
    6: [
        {
            id: 'q1',
            question: 'Which Google tool lets you build a notebook around selected sources?',
            options: [
                { id: 'a', text: 'Google Docs' },
                { id: 'b', text: 'Gemini Notebook (formerly NotebookLM)' },
                { id: 'c', text: 'Google Translate' },
                { id: 'd', text: 'Google Sheets' }
            ],
            explanation: 'Gemini Notebook supports questions and citations based on the sources in a notebook.'
        },
        {
            id: 'q2',
            question: 'What is needed for Gemini to find a private file directly in your Google Drive?',
            options: [
                { id: 'a', text: 'A connected Workspace account with permission to read the file.' },
                { id: 'b', text: 'The name of any Gmail user.' },
                { id: 'c', text: 'A larger context window.' },
                { id: 'd', text: 'An audio summary.' }
            ],
            explanation: 'The connection and your access permissions determine which material Gemini can retrieve.'
        },
        {
            id: 'q3',
            question: 'The draft names Sam, but the approved minutes leave room booking open. What should the summary say?',
            options: [
                { id: 'a', text: 'Sam is the confirmed owner.' },
                { id: 'b', text: 'The approved minutes leave the owner unconfirmed.' },
                { id: 'c', text: 'The workshop was cancelled.' },
                { id: 'd', text: 'The draft overrides the minutes.' }
            ],
            explanation: 'Link each statement to its source. A draft assignment alone does not establish a confirmed owner.'
        },
        {
            id: 'q4',
            question: 'According to the lesson, what is the advantage of Gemini\'s large context window?',
            options: [
                { id: 'a', text: 'It lets you feed in very long materials - entire books, long videos or many files at once.' },
                { id: 'b', text: 'It removes the need for a prompt.' },
                { id: 'c', text: 'It lets the model work without an internet connection.' },
                { id: 'd', text: 'It lowers the subscription price.' }
            ],
            explanation: 'A large context window lets the model process a very large amount of material in a single request.'
        }
    ]
};

module.exports = { modules, extras, quizzes };
