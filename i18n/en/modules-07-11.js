// English translation of modules 7-11 (source: server.js, moduleExtras.js, quiz.js).
// Quizzes contain no "correct" field - the answer key always comes from the Hebrew quiz.

const modules = {
    7: {
        title: 'DeepSeek',
        description: 'Test DeepSeek thinking mode on a problem with an independent answer key.',
        content: `<h3>Lesson 7. When is thinking mode worth the wait?</h3>
                <p>Reasoning models can spend additional computation on a task before returning an answer. DeepSeek offers thinking mode. Multi-step planning, mathematics and debugging are good candidates for a comparison. Record both the accuracy and the time it took.</p>
                <p>Model architecture and user settings are different concepts. In a mixture-of-experts (MoE) architecture, a router selects a subset of expert networks for each token. Thinking mode changes how the model approaches a request. Neither tells you whether any individual answer is correct.</p>
                <p>State the constraints explicitly and ask for a result you can test. For a scheduling problem, a proposed timetable lets you check each dependency yourself.</p>
                <p><a href="https://api-docs.deepseek.com/guides/thinking_mode/">DeepSeek thinking mode</a></p>`
    },
    8: {
        title: 'Comparing Models',
        description: 'Run a small, repeatable comparison using a scoring rubric.',
        content: `<h3>Lesson 8. Choose a model with a small experiment</h3>
                <p>A team wants to turn meeting notes into action items. The right tool must copy owners and due dates accurately, flag missing details and handle a changed decision. Write down these criteria before reading any outputs.</p>
                <ol><li>Prepare three notes: an explicit assignment, a missing owner and a revised deadline.</li><li>Give two tools the same notes and instructions in fresh chats. Record the model, date and enabled tools.</li><li>Hide the model names while scoring. Award one point for each correctly extracted field. Record unsupported details separately.</li><li>Repeat the comparison once. Explain your choice using the scores, time and editing effort.</li></ol>
                <p>Compare like with like. If one tool has access to the original document and the other has only an excerpt, the result measures that difference as well.</p>
                <p><a href="https://developers.openai.com/api/docs/guides/prompting">Prompt testing and iteration</a></p>`
    },
    9: {
        title: 'AI in the Real World',
        description: 'Research, programming, data analysis, automation and content creation.',
        content: `<h3>📘 Lesson 9: Practical Applications at Work and in Business</h3>
                  <p>Prompt engineering isn't just a hobby - it's a tool that saves hours of daily work in organizations and companies:</p>

                  <h4>🚀 Examples of real-world applications:</h4>
                  <ul>
                      <li><b>Marketing and content creation:</b> Creating a comprehensive monthly content calendar for social media. By feeding in the customer persona and strict constraints, the model produces a complete table with ideas, headlines and ready-to-publish copy.</li>
                      <li><b>Faster software development:</b> Using AI-based assistants such as GitHub Copilot or Cursor, which let developers write code with natural-language prompts directly inside their development environment, which can speed up routine edits when suggestions pass review.</li>
                      <li><b>Automated customer service:</b> Deploying small language models (SLMs) as chatbots on company websites. They draw on the organization's FAQ files and draft replies that can be checked against the current policy and escalated when a question falls outside it.</li>
                  </ul>`
    },
    10: {
        title: 'Master Level and Agents',
        description: 'Building AI systems, Multi-Agent Workflows and quality evaluation.',
        content: `<h3>📘 Lesson 10: Agent Architecture and the Future of AI</h3>
                  <p>The highest master level of prompt engineering is moving from managing a single chat with a model to building <b>autonomous agent systems (Multi-Agent Systems)</b>.</p>

                  <h4>🤖 What is an Agent?</h4>
                  <p>An agent is a language model that has been given a role, constraints and access to external tools (such as a Google search, running code or sending an email). It works in an independent loop to achieve a complex goal, without the user having to guide it at every step.</p>

                  <h4>🔄 An agent-based workflow (Multi-Agent Workflow):</h4>
                  <p>Instead of asking the model to "write me code for a website", we build a system made up of three agents that talk to each other:</p>
                  <ul>
                      <li><b>Agent 1 (the Developer):</b> Receives the request and writes the raw code.</li>
                      <li><b>Agent 2 (the Software Tester - QA):</b> Receives the code from the developer, runs logic checks and looks for bugs or security holes.</li>
                      <li><b>Agent 3 (the Architect / Product Manager):</b> Checks whether the code meets all of the user's original requirements. If problems are found, it sends the code back to the developer agent with feedback for fixing. Set a retry limit, log the checks and send unresolved issues to a reviewer.</li>
                  </ul>`
    },
    11: {
        title: 'APIs - Programming Interfaces and Integration',
        description: 'What an API is, how language models are exposed as APIs, access keys, and an example from this course itself.',
        content: `<h3>📘 Lesson 11: What Is an API, and How Do You "Talk" to a Language Model in Code?</h3>
                  <p>Up to now we've talked about AI through a chat interface. But to build an app of your own (just like this LMS), you need to know how one piece of software "talks" to another - and that is exactly the job of an <b>API (Application Programming Interface)</b>: an agreed, fixed interface that lets two different systems communicate in a structured way, without either one needing to know how the other is built on the inside.</p>

                  <h4>🔌 REST APIs in a nutshell</h4>
                  <p>Most APIs today (including language model APIs) work on the REST principle: you send an HTTP request to a specific address (an <b>Endpoint</b>), using a specific method (<code>GET</code> to get information, <code>POST</code> to send information), and you get back a response in <b>JSON</b> format. This is exactly how the server of this LMS works: the path <code>/api/modules</code> is a GET Endpoint that returns the list of modules, and the path <code>/api/submissions</code> is a POST Endpoint that receives quiz answers and returns a score.</p>

                  <h4>🔑 API Keys and why they are secret</h4>
                  <p>So that the API provider knows who is calling it (and can bill you or block misuse), every request is sent together with an <b>API key</b> - a secret string that is unique to your account. An API key is just like a password: you must <b>never</b> store it in code that gets pushed to GitHub (just as we saw in this course with the <code>.env</code> file that was accidentally exposed in the repo history) - store it on the server using a secret manager or securely configured environment variable.</p>

                  <h4>🧠 How this works for AI models specifically</h4>
                  <p>When you call the API of Claude, ChatGPT or Gemini, you send a POST request with the prompt, the name of the model you want, and parameters such as <code>temperature</code> (creativity level) and <code>max_tokens</code> (maximum response length). Check the provider documentation for the authentication header, supported parameters and response shape. This example illustrates a request and uses a placeholder URL.</p>
                  <pre dir="ltr" style="background-color:#f3f4f6; padding:12px; border-radius:6px; font-family:monospace; direction:ltr; text-align:left; overflow-x:auto;">
POST https://api.example.com/v1/messages
Headers: { "x-api-key": "YOUR_SECRET_KEY", "content-type": "application/json" }
Body: { "model": "claude-x", "max_tokens": 300, "messages": [{"role":"user","content":"Summarize this lesson for me"}] }</pre>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Open the official API documentation page of one of the AI models you've learned about, and find three things in it: the Endpoint address, the required field you need to send, and the explanation of the API key.
                  </div>`
    }
};

const extras = {
    7: {
        cases: `<h3>Case. Can two reviewers finish earlier?</h3>
                <p>A team must review three files. File A takes 20 minutes and B takes 15. C takes 10 minutes and can start only after A. With two reviewers, ask for start and end times for each file.</p>
                <p>A and B can start together. C follows A, so the earliest finish is minute 30. A schedule claiming 25 minutes violates the dependency.</p>`,
        practice: `<h3>Lab. Check a schedule against its constraints</h3>
                <p>Run the file-review case in two fresh chats with thinking mode on and off where available. Use the same task and time each run. Change the dependency so that C must follow both A and B, then change B to 35 minutes.</p>
                <p><b>Check:</b> With both dependencies and the longer B, C starts no earlier than minute 35 and ends at minute 45. Score feasibility and finish time separately. Record when the extra computation changed the result.</p>`,
        promptScenarios: [
            'Ask DeepSeek for a feasible review schedule and a finish time.',
            'Ask for a minimal failing input and a test that checks a proposed code fix.',
            'Compare two answers to a scheduling problem using the same constraints.'
        ]
    },
    8: {
        cases: `<h3>Case. One report, several tool requirements</h3>
                <p>For a spreadsheet, check whether the tool can calculate and expose its results. For a quiz, check whether learners can interact with it. For a policy summary, check whether you can trace the answer to the current document. Any candidate that meets the requirement can enter your comparison.</p>`,
        practice: `<h3>Lab. A blind comparison with an answer key</h3>
                <p>Use three notes: “Maya will send the agenda by Friday.” “Send the slides by Tuesday; owner unassigned.” “Earlier draft: Lee will book the room on Monday. Approved update: Lee will book it on Wednesday.”</p>
                <p>Run the same extraction prompt in two tools. Score owner and deadline separately for each row, for a total of six points. The expected pairs are Maya/Friday, unassigned/Tuesday and Lee/Wednesday. If both score six, compare editing time and repeat on a new note.</p>`,
        promptScenarios: [
            'Write a prompt that routes a complex task (data analysis, writing code and summarizing a document) between several different models.',
            'Write a prompt and two test cases for comparing code from two models.',
            'Define three criteria for scoring summaries of the same policy excerpt.'
        ]
    },
    9: {
        cases: `
                    <h3>🔥 Case Studies and Templates: AI in a Real Work Environment</h3>
                    <h4>💡 Building a monthly social media content calendar:</h4>
                    <p>A marketing manager feeds in a target audience persona and strict brand constraints, and the model produces a full table of ideas, headlines and ready-to-publish copy for every week of the month.</p>
                    <h4>📋 A prompt template for a content plan:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
[Role]: Social media strategist for a [industry] brand.
[Context]: Target audience is [persona]. Brand tone is [tone].
[Objective]: Build a 4-week content calendar (Instagram + LinkedIn).
[Output Format]: Table with columns: Week, Platform, Headline, Post Copy.</pre>`,
        practice: `<h3>Lab. Turn verified data into a decision slide with Canva AI</h3>
                <p>A training organizer has one minute to brief a director. Use these figures: April had 15 attendees out of 20 registrations. May had 24 out of 40. First draft a headline, one chart and a question for the director. Then use the brief to generate a presentation draft in Canva AI.</p>
                <p><b>Check the slide:</b> The counts rose by nine and the rate fell by 15 percentage points. Check each chart label, remove any invented cause, and deliver one slide with one decision question. Example: “Should we ask May registrants why they missed the session?”</p>
                <p><a href="https://www.canva.com/help/using-magic-presentations/">Creating presentations with Canva AI</a></p>`,
        promptScenarios: [
            'Build a monthly social media content calendar, with a target audience persona and strict brand constraints.',
            'Build a prompt that automates replies to recurring customer service emails.',
            'Build a prompt that analyzes quarterly sales data and produces a structured executive report.'
        ]
    },
    10: {
        cases: `
                    <h3>🔥 Case Studies and Templates: Multi-Agent Systems</h3>
                    <h4>💡 An AI team for end-to-end feature development:</h4>
                    <p>Instead of a single prompt, three agents work in sequence: one agent writes the code, a second agent checks security and logic, and a third agent makes sure it matches the product requirements - and sends back feedback for fixing if needed.</p>
                    <h4>📋 A template for defining agent roles:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Agent 1 (Developer): Write the code for [feature].
Agent 2 (QA): Review Agent 1's code for bugs and security issues. List them.
Agent 3 (Product Manager): Check if the fixed code meets the original requirements.
If not, send it back to Agent 1 with specific feedback.</pre>`,
        practice: `<h3>Lab. Design a draft-only follow-up with Make</h3>
                <p>A training team keeps feedback in a spreadsheet. Design a Make scenario in which a new row supplies a comment, an AI step drafts a reply, and a reviewer sees the draft. Give the AI only the comment and the published workshop policy. A workflow with fixed steps is enough here. An agent becomes useful if it must choose a tool or a next step.</p>
                <p>Test with three invented rows: “Where are the slides?” with an available link, an empty comment, and a refund request outside the supplied policy. Expect a draft containing the supplied link, a skipped row, and a review flag respectively. Use test data and a draft action. Count the drafts before and after running the same row again; one response per row is the acceptance criterion.</p>
                <p>If Make is unavailable, trace the same inputs on paper and record the expected action at each step.</p>
                <p><a href="https://www.make.com/integrations/google-sheets/google-email">Google Sheets and Gmail in Make</a></p>`,
        promptScenarios: [
            'Plan a 3-agent workflow (developer, QA and product manager) for developing a new feature.',
            'Plan an agent workflow for an automated end-to-end hiring process.',
            'Plan an agent workflow for creating an end-to-end marketing campaign.'
        ]
    },
    11: {
        cases: `
                    <h3>🔥 Case Studies and Templates: APIs and Integration</h3>
                    <h4>💡 Connecting an internal app to a language model API:</h4>
                    <p>A company wants every support request that comes into its CRM system to be classified automatically by a language model, with no human involvement - this is done with an automatic API call from the company's server to the model provider.</p>
                    <h4>📋 A template for a standard API request:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
POST /v1/messages
Headers: { "x-api-key": "[SECRET_KEY]", "content-type": "application/json" }
Body: { "model": "[model-name]", "max_tokens": 200,
        "messages": [{"role": "user", "content": "[your text]"}] }</pre>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Making a Real API Call</h3>
                    <p><b>Your task:</b> Open the API documentation of one of the AI models you've learned about, and try to identify: what the Endpoint address is, which Headers are required, and exactly how the secret key (API Key) is passed in the request.</p>`,
        promptScenarios: [
            'Write a prompt that instructs an AI agent to call an external weather API and summarize today\'s forecast.',
            'Write a prompt that explains what an API Key is and when it must never be exposed, as if you were explaining it to a beginner developer.',
            'Write a prompt that asks a model to write short documentation for an Endpoint of an existing API.'
        ]
    }
};

const quizzes = {
    7: [
        {
            id: 'q1',
            question: 'Which term describes models that can spend additional computation on a task before answering?',
            options: [
                { id: 'a', text: 'Vision models' },
                { id: 'b', text: 'Reasoning models' },
                { id: 'c', text: 'Translation models' },
                { id: 'd', text: 'Speech encoders' }
            ],
            explanation: 'Reasoning models are designed to use extra computation on tasks such as planning or mathematics.'
        },
        {
            id: 'q2',
            question: 'Which task in the lesson provides a useful test of thinking mode?',
            options: [
                { id: 'a', text: 'Schedule dependent jobs and check the earliest feasible finish.' },
                { id: 'b', text: 'Pick a background color.' },
                { id: 'c', text: 'Copy a short label.' },
                { id: 'd', text: 'Play a recorded sound.' }
            ],
            explanation: 'The schedule has explicit constraints and an answer that can be checked independently.'
        },
        {
            id: 'q3',
            question: 'A takes 20 minutes, B takes 35 and C takes 10. Two reviewers are available. C follows both. What is the earliest finish?',
            options: [
                { id: 'a', text: '45 minutes.' },
                { id: 'b', text: '35 minutes.' },
                { id: 'c', text: '30 minutes.' },
                { id: 'd', text: '65 minutes.' }
            ],
            explanation: 'A and B can run together. C starts at minute 35 and ends at minute 45.'
        },
        {
            id: 'q4',
            question: 'What does MoE (Mixture of Experts) mean?',
            options: [
                { id: 'a', text: 'A team of human experts who check every answer.' },
                { id: 'b', text: 'An architecture in which the model is made up of several "expert" sub-networks, and only some of them are activated at a time.' },
                { id: 'c', text: 'Combining several AI companies into one product.' },
                { id: 'd', text: 'A mode in which the model answers only experts.' }
            ],
            explanation: 'In MoE, only part of the network is active for each token, which saves on computing costs.'
        }
    ],
    8: [
        {
            id: 'q1',
            question: 'What should you prepare before reading either output?',
            options: [
                { id: 'a', text: 'Test inputs, expected fields and a scoring rubric.' },
                { id: 'b', text: 'The name of the winning model.' },
                { id: 'c', text: 'A longer answer from your favorite tool.' },
                { id: 'd', text: 'A prettier chart.' }
            ],
            explanation: 'A rubric written in advance keeps the selection tied to the task.'
        },
        {
            id: 'q2',
            question: 'One tool saw the full minutes and the other only a summary. What should you do to compare the models on extraction?',
            options: [
                { id: 'a', text: 'Ignore the difference.' },
                { id: 'b', text: 'Repeat with the same source and instructions.' },
                { id: 'c', text: 'Choose the longer output.' },
                { id: 'd', text: 'Score only the formatting.' }
            ],
            explanation: 'Equal source access removes a confounding difference between the runs.'
        },
        {
            id: 'q3',
            question: 'The note says the owner is unassigned. Which output earns the owner point?',
            options: [
                { id: 'a', text: 'Unassigned.' },
                { id: 'b', text: 'Maya, because she owns another task.' },
                { id: 'c', text: 'The meeting organizer.' },
                { id: 'd', text: 'The person who wrote the note.' }
            ],
            explanation: 'An explicit missing value is the reference answer for this row.'
        },
        {
            id: 'q4',
            question: 'What is the main principle of the model comparison lesson?',
            options: [
                { id: 'a', text: 'Pick one model and use only that model for every task.' },
                { id: 'b', text: 'Always pick the cheapest model.' },
                { id: 'c', text: 'Match the model to the type of task and to the model\'s strengths.' },
                { id: 'd', text: 'Always use the newest model, no matter what.' }
            ],
            explanation: 'The lesson stresses: don\'t rely on a single tool - choose based on the task.'
        }
    ],
    9: [
        {
            id: 'q1',
            question: 'According to the lesson, what is one of the main benefits of bringing AI into your work?',
            options: [
                { id: 'a', text: 'Saving hours of work on repetitive tasks and improving productivity.' },
                { id: 'b', text: 'Completely removing the need for human oversight.' },
                { id: 'c', text: 'A guarantee that every output will be 100% accurate.' },
                { id: 'd', text: 'It has no real use in the business world.' }
            ],
            explanation: 'The lesson presents prompt engineering as a tool for saving time in organizations.'
        },
        {
            id: 'q2',
            question: 'What do tools like GitHub Copilot or Cursor let you do?',
            options: [
                { id: 'a', text: 'Write code using natural-language instructions directly inside the development environment.' },
                { id: 'b', text: 'Design logos only.' },
                { id: 'c', text: 'Manage bank accounts.' },
                { id: 'd', text: 'Translate movies.' }
            ],
            explanation: 'These are AI tools built into the IDE that help developers write code faster.'
        },
        {
            id: 'q3',
            question: 'For a model to produce a good monthly social media content calendar, what should you include in the prompt?',
            options: [
                { id: 'a', text: 'Just the word "content".' },
                { id: 'b', text: 'A target audience persona, the brand tone, constraints and an output format (for example, a table).' },
                { id: 'c', text: 'Just the company name.' },
                { id: 'd', text: 'As few details as possible, so the model can be creative.' }
            ],
            explanation: 'This is, once again, applying the 5 prompt components to a real business task.'
        },
        {
            id: 'q4',
            question: 'An AI customer service chatbot relies on the company\'s FAQ file. What is true about it?',
            options: [
                { id: 'a', text: 'It will never make a mistake, so there is no need to check it.' },
                { id: 'b', text: 'The quality of its answers depends on the quality of the information it was given, and it\'s a good idea to define when to hand over to a human agent.' },
                { id: 'c', text: 'It doesn\'t need any information about the company.' },
                { id: 'd', text: 'It can only work in English.' }
            ],
            explanation: 'A bot is only as good as its knowledge sources; defining a handover to a human agent is an important constraint.'
        }
    ],
    10: [
        {
            id: 'q1',
            question: 'What is the term for a system in which several AI agents work together to achieve a complex goal?',
            options: [
                { id: 'a', text: 'Few-shot Prompting' },
                { id: 'b', text: 'Multi-Agent System' },
                { id: 'c', text: 'Custom GPT' },
                { id: 'd', text: 'Context Window' }
            ],
            explanation: 'A Multi-Agent System is a system of several agents that pass work to one another.'
        },
        {
            id: 'q2',
            question: 'According to the lesson, what is an "agent"?',
            options: [
                { id: 'a', text: 'A human customer service representative.' },
                { id: 'b', text: 'A language model that has been given a role, constraints and access to external tools, and works in an independent loop to achieve a goal.' },
                { id: 'c', text: 'Antivirus software.' },
                { id: 'd', text: 'An especially long prompt.' }
            ],
            explanation: 'An agent combines a model, a role, constraints and tools - and works without close guidance at every step.'
        },
        {
            id: 'q3',
            question: 'In the workflow from the lesson, what is the QA agent\'s job?',
            options: [
                { id: 'a', text: 'To write the initial code.' },
                { id: 'b', text: 'To check the developer\'s code and look for bugs and security holes.' },
                { id: 'c', text: 'To market the product.' },
                { id: 'd', text: 'To approve a payment.' }
            ],
            explanation: 'The QA agent receives the code, checks it and sends back its findings.'
        },
        {
            id: 'q4',
            question: 'What happens when the product manager agent finds that the code doesn\'t meet the original requirements?',
            options: [
                { id: 'a', text: 'The system stops completely.' },
                { id: 'b', text: 'It sends the code back to the developer agent with feedback for fixing.' },
                { id: 'c', text: 'It deletes the project.' },
                { id: 'd', text: 'It approves the code anyway.' }
            ],
            explanation: 'The feedback loop enables another attempt. Set a retry limit and route unresolved issues to a reviewer.'
        }
    ],
    11: [
        {
            id: 'q1',
            question: 'What is an API?',
            options: [
                { id: 'a', text: 'An agreed, fixed interface that lets two pieces of software communicate in a structured way.' },
                { id: 'b', text: 'A type of language model.' },
                { id: 'c', text: 'A programming language for building websites.' },
                { id: 'd', text: 'The ChatGPT chat screen.' }
            ],
            explanation: 'An API lets programs talk to each other without knowing how the other one is built on the inside.'
        },
        {
            id: 'q2',
            question: 'Where is the right place to store an API key?',
            options: [
                { id: 'a', text: 'Directly in the code, so it\'s easy to find.' },
                { id: 'b', text: 'In a file that gets pushed to GitHub.' },
                { id: 'c', text: 'In environment variables, outside the code saved in the repo.' },
                { id: 'd', text: 'In the website\'s header.' }
            ],
            explanation: 'An API key is like a password - use server-side secret storage.'
        },
        {
            id: 'q3',
            question: 'Which HTTP method is usually used to send a prompt to a language model API?',
            options: [
                { id: 'a', text: 'GET' },
                { id: 'b', text: 'POST' },
                { id: 'c', text: 'DELETE' },
                { id: 'd', text: 'No HTTP request is needed' }
            ],
            explanation: 'POST is used to send information - the prompt, the model name and the parameters are sent in the request body.'
        },
        {
            id: 'q4',
            question: 'What does the max_tokens parameter control in a call to a model?',
            options: [
                { id: 'a', text: 'How creative the response is.' },
                { id: 'b', text: 'The maximum length of the response.' },
                { id: 'c', text: 'The number of authorized users.' },
                { id: 'd', text: 'The language of the response.' }
            ],
            explanation: 'max_tokens limits the length of the output; temperature is what controls the creativity level.'
        }
    ]
};

module.exports = { modules, extras, quizzes };
