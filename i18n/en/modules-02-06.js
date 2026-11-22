// English translation of modules 2-6 (source of truth: server.js, moduleExtras.js, quiz.js).
// Quizzes carry no "correct" field: the answer key always comes from the Hebrew quiz.

const modules = {
    2: {
        title: 'Anatomy of a Prompt',
        description: 'Role, Context, Objective, Constraints and output format.',
        content: `<h3>📘 Lesson 2: The Structure of the Perfect Prompt (Component-Based Engineering)</h3>
                  <p>To get accurate, consistent output every time, prompt engineers use a fixed structure made up of 5 core components:</p>

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
        description: 'Zero-shot, Few-shot, Chain Prompting and Meta Prompting.',
        content: `<h3>📘 Lesson 3: Advanced Techniques - From a Simple Query to System Engineering</h3>
                  <p>When tasks are complex or require mathematical and logical precision, we use advanced engineering techniques:</p>

                  <h4>1. Zero-shot vs. Few-shot Prompting</h4>
                  <p><b>Zero-shot:</b> Asking for the task directly (for example: "Translate this sentence into Arabic").<br>
                  <b>Few-shot:</b> Giving examples inside the prompt to teach the model the pattern you want before it tackles the real task.</p>
                  <i>When should you use it?</i> When you want the model to write in a specific tone, sort emails into predefined categories, or produce output in a strict structure.

                  <h4>2. Chain of Thought (CoT)</h4>
                  <p>The most important technique for reducing hallucinations and improving math abilities. By adding the instruction <b>"Let's think step by step"</b>, you force the model to lay out its logic in text before it settles on the final result.</p>

                  <h4>3. Chain Prompting</h4>
                  <p>Breaking a huge task into several chats or defined steps. For example: Step 1 - ask for an outline of an article. Step 2 (in the same chat) - expand section 1 only. Step 3 - write a summary.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Give the model a hard logic puzzle with no instructions (Zero-shot) and check whether it got it right. Then open a new chat and give it the same puzzle, but this time add at the end: "Describe your thought process and solve it step by step". Compare the results.
                  </div>`
    },
    4: {
        title: 'ChatGPT',
        description: 'Working with files, research, images, Projects and GPTs.',
        content: `<h3>📘 Lesson 4: ChatGPT - Data Analysis, Advanced Tools and Custom Bots</h3>
                  <p>The ChatGPT Plus / Enterprise interface includes capabilities that let it work as an analyst and an all-round personal assistant:</p>

                  <h4>📊 Advanced Data Analysis</h4>
                  <p>You can upload Excel, CSV and PDF files or source code. Behind the scenes, ChatGPT writes and runs Python code in an isolated environment, analyzes the file, performs calculations and produces charts you can download. This makes it the ultimate tool for analyzing financial reports or marketing trends.</p>

                  <h4>🤖 Custom GPTs & Projects</h4>
                  <p><b>Custom GPTs:</b> Let you create a customized version of ChatGPT that is preloaded with fixed system instructions and your organization's knowledge files (for example: a bot that reviews contracts according to your company's rules only).</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Upload a simple Excel file or a text file with data to ChatGPT, and write: "Act as a data analyst, run a trend analysis of the attached file and show me a visual chart of the results".
                  </div>`
    },
    5: {
        title: 'Claude',
        description: 'Projects, Artifacts, large documents, code and MCP.',
        content: `<h3>📘 Lesson 5: Claude - The Expert in Logic, Code and Long Documents</h3>
                  <p>Anthropic's Claude model is considered a market leader in writing code, legal wording and complex logic, thanks to its clean architecture and huge Context Window.</p>

                  <h4>🛠️ The Artifacts feature</h4>
                  <p>When you ask Claude to create code (HTML/JS, CSS, SVG, Python and so on), it doesn't just show you blocks of text. It opens a dedicated interactive panel on the side of the screen that shows you <b>a live app that works in real time</b>, games, or designs you can try out with the click of a button.</p>

                  <h4>📂 Claude Projects</h4>
                  <p>A workspace for long-term projects. You can upload all of your website files or technical documentation there, set a base instruction for the project, and hold focused conversations that build on all of these materials without uploading them again in every message.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Go to Claude and write this prompt: "Build me an interactive calculator for planning a monthly budget using HTML and Tailwind CSS". Watch how the Artifacts panel opens and shows you the calculator working on the side.
                  </div>`
    },
    6: {
        title: 'Gemini',
        description: 'Integration with Google Workspace, Drive, Docs and NotebookLM.',
        content: `<h3>📘 Lesson 6: Gemini - Google's Ecosystem and the Research Revolution with NotebookLM</h3>
                  <p>Google's Gemini model stands out for its unprecedented context window (up to 2 million tokens in the advanced models), which lets you feed it entire books, hour-long videos or hundreds of files at once.</p>

                  <h4>🌐 Google Workspace extensions</h4>
                  <p>By using the <code>@</code> sign (for example <code>@Google Drive</code>), you can ask Gemini to search, summarize and analyze files directly from your cloud account or your email, in real time and securely.</p>

                  <h4>📚 NotebookLM, a phenomenal research tool</h4>
                  <p>A dedicated research tool from Google, built on Gemini. You upload sources to it (documents, website links, audio files) and the tool becomes a private expert on your materials only. It produces summaries and study guides, and it can create an automatic <b>voice podcast (Audio Overview)</b> in which two AI hosts hold a fascinating conversation analyzing your materials.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Go to Google's NotebookLM website, upload a study document or a link to an article, and ask it to create a "Study Guide" for you with questions and answers about the material.
                  </div>`
    }
};

const extras = {
    2: {
        cases: `
                    <h3>🔥 Case Studies and Templates: Anatomy of a Prompt</h3>
                    <p>Here you'll see how adding <b>Constraints</b> saves projects from information overload or hallucinations.</p>
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
        practice: `
                    <h3>🏋️ Hands-on Exercise: Chain of Thought</h3>
                    <p>Give the model a complex accounting task that involves calculating VAT, stacked discounts and corporate tax. Tell it to solve the task in two ways: once directly, and once explicitly using the Chain of Thought technique. Then compare the financial accuracy.</p>`,
        promptScenarios: [
            'Ask a model to sort customer service requests into predefined categories (service/sales/complaint) using Few-shot Prompting.',
            'Ask a model to solve a complex accounting problem (VAT, a stacked discount and corporate tax) using Chain of Thought.',
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
        practice: `<h3>🏋️ Hands-on Exercise: Automatic Data Analysis</h3>
                                <p><b>Your task:</b> Upload an Excel or CSV file with sales data (real or made up) to ChatGPT, and ask it to act as a senior data analyst: identify the three main trends, calculate the monthly growth rate, and produce a chart that illustrates the most significant finding.</p>`,
        promptScenarios: [
            'Ask ChatGPT to analyze an Excel file of sales data and produce key insights and a chart.',
            'Build System Instructions for a Custom GPT that checks contracts against a list of forbidden clauses.',
            'Ask ChatGPT to create a marketing image for a new product based on a precise brief.'
        ]
    },
    5: {
        cases: `<h3>🔥 Case Studies and Templates: Claude for Writing Code and Analyzing Documents</h3>
                                <h4>💡 Analyzing a long 80-page contract in one go:</h4>
                                <p>Thanks to the huge context window, you can paste an entire legal document into Claude and ask it to find internal contradictions between different clauses, instead of splitting it into parts.</p>
                                <h4>📋 A prompt template for building a live Artifact:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Act as a senior frontend developer.
Build a single-file HTML/JS/Tailwind widget that [describe feature].
Requirements: fully interactive, no external dependencies, mobile responsive.
Open it as an Artifact so I can test it live.</pre>`,
        practice: `<h3>🏋️ Hands-on Exercise: Building an Interactive Tool</h3>
                                <p><b>Your task:</b> Ask Claude to build you an interactive Tip Calculator in HTML and Tailwind CSS. Watch the Artifacts panel that opens, then ask for a design change (for example, a different color) and see how it updates the live code instantly.</p>`,
        promptScenarios: [
            'Ask Claude to build an interactive monthly budget calculator app in HTML and Tailwind.',
            'Describe a long legal document and ask Claude to find internal contradictions between clauses.',
            'Ask Claude to analyze existing code and find a possible security vulnerability in it.'
        ]
    },
    6: {
        cases: `<h3>🔥 Case Studies and Templates: Gemini and Google Workspace</h3>
                                <h4>💡 Summarizing a long email thread before a meeting:</h4>
                                <p>With <code>@Google Drive</code> you can ask Gemini to summarize a long file or thread into three action items, without opening it yourself.</p>
                                <h4>📋 A prompt template with a Workspace extension:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
@Google Drive summarize the file "[file name]".
List only the 3 open action items and who owns each one.
Format as a checklist.</pre>`,
        practice: `<h3>🏋️ Hands-on Exercise: Building a Study Guide in NotebookLM</h3>
                                <p><b>Your task:</b> Upload an article or a study chapter to NotebookLM, ask it to create a "Study Guide" with questions and answers, and finally turn on the Audio Overview feature to hear how the two AI hosts summarize the material out loud.</p>`,
        promptScenarios: [
            'Ask Gemini to summarize a long email thread from Gmail into three action items.',
            'Describe an article you uploaded to NotebookLM and ask for a study guide with questions and answers.',
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
            question: 'Which instruction triggers the Chain of Thought technique?',
            options: [
                { id: 'a', text: '"Answer in one word only".' },
                { id: 'b', text: '"Translate into English".' },
                { id: 'c', text: '"Let\'s think step by step".' },
                { id: 'd', text: '"Don\'t explain, just give the answer".' }
            ],
            explanation: 'This instruction makes the model lay out its logic in text before it settles on the result.'
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
            question: 'Which task is especially well suited to ChatGPT\'s data analysis capability?',
            options: [
                { id: 'a', text: 'Analyzing trends in a sales file and producing a chart.' },
                { id: 'b', text: 'Sending emails on your behalf without approval.' },
                { id: 'c', text: 'Directly accessing the company\'s internal database without uploading a file.' },
                { id: 'd', text: 'Editing a full-length video.' }
            ],
            explanation: 'You upload a file, and the model analyzes it, runs calculations and produces charts you can download.'
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
            question: 'What is the Claude feature that opens a separate panel with an app or code running in real time called?',
            options: [
                { id: 'a', text: 'Projects' },
                { id: 'b', text: 'Artifacts' },
                { id: 'c', text: 'Plugins' },
                { id: 'd', text: 'Canvas Mode' }
            ],
            explanation: 'Artifacts show the generated code as a live app in a side panel.'
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
            question: 'What is the Google tool, built on Gemini, that becomes an expert on the materials you upload and can also create a podcast-style audio summary?',
            options: [
                { id: 'a', text: 'Google Docs' },
                { id: 'b', text: 'NotebookLM' },
                { id: 'c', text: 'Google Translate' },
                { id: 'd', text: 'Google Sheets' }
            ],
            explanation: 'NotebookLM works only from the sources you uploaded and produces summaries, study guides and an Audio Overview.'
        },
        {
            id: 'q2',
            question: 'How do you ask Gemini to work directly with files in Google Drive?',
            options: [
                { id: 'a', text: 'By using the @ sign and referring to the extension, for example @Google Drive.' },
                { id: 'b', text: 'By downloading the file and pasting it in as an image.' },
                { id: 'c', text: 'By emailing the file to Google.' },
                { id: 'd', text: 'It isn\'t possible in Gemini.' }
            ],
            explanation: 'Workspace extensions are triggered with @ and let you search, summarize and analyze files and emails.'
        },
        {
            id: 'q3',
            question: 'What characterizes NotebookLM\'s answers?',
            options: [
                { id: 'a', text: 'They are based on the entire internet, without distinction.' },
                { id: 'b', text: 'They are based on the sources you uploaded.' },
                { id: 'c', text: 'They are always in table format.' },
                { id: 'd', text: 'They are only available in English.' }
            ],
            explanation: 'The tool becomes a private expert on your materials - that is what sets it apart from a general chatbot.'
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
