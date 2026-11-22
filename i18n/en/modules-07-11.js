// English translation of modules 7-11 (source: server.js, moduleExtras.js, quiz.js).
// Quizzes contain no "correct" field - the answer key always comes from the Hebrew quiz.

const modules = {
    7: {
        title: 'DeepSeek',
        description: 'Capabilities, limitations, coding, logic and comparison with other models.',
        content: `<h3>📘 Lesson 7: The Reasoning Model Revolution and DeepSeek</h3>
                  <p>DeepSeek changed the rules of the game in the AI world by proving that cutting-edge performance can be reached with low development costs, using advanced open-source architectures (MoE - Mixture of Experts).</p>

                  <h4>🧠 Reasoning Models (DeepSeek-R1)</h4>
                  <p>Regular models try to produce the next word right away. Reasoning models, on the other hand, use a Reinforcement Learning loop and run a long internal thinking process before they give an answer.</p>
                  <p>In the interface you'll see a dedicated area called "Thought", where the model argues with itself, spots logical errors, checks alternative ways to solve the problem, and only when it is confident does it show the final output. This process gives a big boost to performance in math, hard logic and writing complex code.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Go to DeepSeek, turn on "DeepSeek-R1" mode (Reasoning), and give it a complex programming task or a hard logic puzzle. Follow its thinking process (Thought) to see how it breaks problems down.
                  </div>`
    },
    8: {
        title: 'Comparing Models',
        description: 'Which model fits which task, and practicing prompts side by side.',
        content: `<h3>📘 Lesson 8: A Decision Matrix for Matching the Best Model to the Task</h3>
                  <p>As expert prompt engineers, you must not rely on just one tool. You need to choose the model based on the type of task and the model's strengths:</p>

                  <table border="1" style="width:100%; text-align:left; border-collapse:collapse; margin-top:15px; margin-bottom:15px; font-size:0.95em;">
                    <tr style="background-color:#1e40af; color:white;">
                      <th style="padding:10px; border:1px solid #cbd5e1;">Model</th>
                      <th style="padding:10px; border:1px solid #cbd5e1;">Core strengths</th>
                      <th style="padding:10px; border:1px solid #cbd5e1;">When should you use it?</th>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>Claude (Anthropic)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">Writing code from scratch, strong logical understanding, very high-quality creative writing.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">Building apps, writing long articles, analyzing complex documents.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>ChatGPT (OpenAI)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">Analyzing data and files (built-in Python), connecting to automations, generating images (DALL-E).</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">Analyzing Excel files and reports, varied everyday work, building Custom GPTs.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>DeepSeek-R1</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">Deep thinking (Reasoning), solving logic and math problems, especially cost-effective.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">Debugging (fixing broken code), math, cracking code architectures.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>Gemini (Google)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">A huge context window (millions of tokens), seamless sync with Google Workspace.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">Scanning and summarizing entire books of knowledge, working with Google Drive files and emails.</td>
                    </tr>
                  </table>`
    },
    9: {
        title: 'AI in the Real World',
        description: 'Research, programming, data analysis, automation and content creation.',
        content: `<h3>📘 Lesson 9: Practical Applications at Work and in Business</h3>
                  <p>Prompt engineering isn't just a hobby - it's a tool that saves hours of daily work in organizations and companies:</p>

                  <h4>🚀 Examples of real-world applications:</h4>
                  <ul>
                      <li><b>Marketing and content creation:</b> Creating a comprehensive monthly content calendar for social media. By feeding in the customer persona and strict constraints, the model produces a complete table with ideas, headlines and ready-to-publish copy.</li>
                      <li><b>Faster software development:</b> Using AI-based assistants such as GitHub Copilot or Cursor, which let developers write code with natural-language prompts directly inside their development environment, cutting development time by tens of percent.</li>
                      <li><b>Automated customer service:</b> Deploying small language models (SLMs) as chatbots on company websites. They draw on the organization's FAQ files and answer customers with human-level accuracy.</li>
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
                      <li><b>Agent 3 (the Architect / Product Manager):</b> Checks whether the code meets all of the user's original requirements. If problems are found, it sends the code back to the developer agent with feedback for fixing. All of this happens completely automatically.</li>
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
                  <p>So that the API provider knows who is calling it (and can bill you or block misuse), every request is sent together with an <b>API key</b> - a secret string that is unique to your account. An API key is just like a password: you must <b>never</b> store it in code that gets pushed to GitHub (just as we saw in this course with the <code>.env</code> file that was accidentally exposed in the repo history) - it should be kept in environment variables only.</p>

                  <h4>🧠 How this works for AI models specifically</h4>
                  <p>When you call the API of Claude, ChatGPT or Gemini, you send a POST request with the prompt, the name of the model you want, and parameters such as <code>temperature</code> (creativity level) and <code>max_tokens</code> (maximum response length). The response comes back as JSON with the text the model generated.</p>
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
        cases: `
                    <h3>🔥 Case Studies and Templates: DeepSeek and Reasoning Models</h3>
                    <h4>💡 Debugging broken code with Reasoning:</h4>
                    <p>When a regular model "guesses" a wrong fix for a bug, a Reasoning model goes through every line of code in its visible thinking process before suggesting a solution - which significantly reduces mistakes.</p>
                    <h4>📋 A prompt template for deep debugging:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Here is a function that throws an error: [paste code].
Think step by step through the execution before answering.
Identify the exact line causing the failure and explain why, then provide the fixed code.</pre>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: A Regular Model vs. a Reasoning Model</h3>
                    <p><b>Your task:</b> Take a non-trivial math logic puzzle and run it on a regular model (Zero-shot) and on DeepSeek-R1 in Reasoning mode. Follow R1's "Thought" process and check whether its systematic approach led to a more accurate answer.</p>`,
        promptScenarios: [
            'Ask DeepSeek-R1 to solve a complex logic puzzle in Reasoning mode.',
            'Ask for deep debugging of broken code, with a line-by-line explanation before the solution is given.',
            'Build a prompt that compares a regular model\'s answer with a Reasoning model\'s answer to the same math problem.'
        ]
    },
    8: {
        cases: `
                    <h3>🔥 Case Studies and Templates: Choosing the Right Model for the Task</h3>
                    <h4>💡 Scenario: a mixed project that needs several kinds of work</h4>
                    <p>A product team needs to analyze an Excel file of user data, write code for a dashboard, and summarize an entire policy book. Each step is routed to the model best suited to it, instead of using one model for every task.</p>
                    <h4>📋 A template for routing tasks between models:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Step 1 (ChatGPT): Analyze users.csv and extract 3 key trends.
Step 2 (Claude): Build the dashboard UI code based on Step 1's findings.
Step 3 (Gemini): Summarize the 200-page policy document via Drive.</pre>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Mapping a Task to the Best Model</h3>
                    <p><b>Your task:</b> Take a real project from your work and break it into steps. For each step, decide which model (Claude / ChatGPT / Gemini / DeepSeek) fits best based on the core strengths you've learned, and explain your choice.</p>`,
        promptScenarios: [
            'Write a prompt that routes a complex task (data analysis, writing code and summarizing a document) between several different models.',
            'Choose the right model for a task of writing code from scratch, and explain your choice in the prompt itself.',
            'Choose the right model for a task of summarizing a huge policy book, and explain your choice in the prompt itself.'
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
        practice: `
                    <h3>🏋️ Hands-on Exercise: Automating a Repetitive Task</h3>
                    <p><b>Your task:</b> Identify a repetitive, tedious task from your work or studies (for example: replying to similar emails, sorting incoming requests, writing meeting summaries). Build an engineered prompt that turns this task into a one-minute process instead of twenty.</p>`,
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
        practice: `
                    <h3>🏋️ Hands-on Exercise: Planning an Agent Workflow</h3>
                    <p><b>Your task:</b> Plan a workflow of 3 AI agents for a task from your work. For each agent, define: its role, the input it receives, and the output it passes on. Run the workflow manually with a single model (open a new chat for each "agent") and check whether the final result is better than asking a single question.</p>`,
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
            question: 'What are models like DeepSeek-R1, which run a long internal thinking process before giving the final answer, called?',
            options: [
                { id: 'a', text: 'Vision Models' },
                { id: 'b', text: 'Reasoning Models' },
                { id: 'c', text: 'Translation Models' },
                { id: 'd', text: 'Small Language Models (SLMs)' }
            ],
            explanation: 'Reasoning models "think" before they answer: they check for errors and look at alternative ways to solve the problem.'
        },
        {
            id: 'q2',
            question: 'According to the lesson, which tasks do reasoning models especially excel at?',
            options: [
                { id: 'a', text: 'Math, hard logic and writing complex code.' },
                { id: 'b', text: 'Generating images.' },
                { id: 'c', text: 'Extra-fast answers to simple questions.' },
                { id: 'd', text: 'Video editing.' }
            ],
            explanation: 'The long thinking process improves performance on problems that require several steps of reasoning.'
        },
        {
            id: 'q3',
            question: 'According to the lesson, what did DeepSeek demonstrate to the AI world?',
            options: [
                { id: 'a', text: 'That very high performance can be reached with relatively low development costs.' },
                { id: 'b', text: 'That language models no longer need training data.' },
                { id: 'c', text: 'That only American companies can develop advanced models.' },
                { id: 'd', text: 'That reasoning models are always faster than regular models.' }
            ],
            explanation: 'The lesson presented this as a game changer, alongside the use of the MoE architecture.'
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
            question: 'According to the comparison matrix in the lesson, which model is mainly recommended for building apps and writing code from scratch?',
            options: [
                { id: 'a', text: 'Claude' },
                { id: 'b', text: 'Gemini' },
                { id: 'c', text: 'DeepSeek-R1' },
                { id: 'd', text: 'There\'s no difference - all models are the same' }
            ],
            explanation: 'In the matrix, Claude is marked as strong at writing code from scratch and analyzing complex documents.'
        },
        {
            id: 'q2',
            question: 'According to the matrix, which model is especially suited to summarizing an entire book of knowledge and working with Google Drive files?',
            options: [
                { id: 'a', text: 'DeepSeek-R1' },
                { id: 'b', text: 'Gemini' },
                { id: 'c', text: 'Claude' },
                { id: 'd', text: 'ChatGPT' }
            ],
            explanation: 'Gemini stands out thanks to its large context window and its connection to Google Workspace.'
        },
        {
            id: 'q3',
            question: 'According to the matrix, which task is DeepSeek-R1 especially suited to?',
            options: [
                { id: 'a', text: 'Debugging broken code and math problems.' },
                { id: 'b', text: 'Working with emails in Gmail.' },
                { id: 'c', text: 'Building a Custom GPT.' },
                { id: 'd', text: 'Generating marketing images.' }
            ],
            explanation: 'Deep thinking (Reasoning) makes it a good fit for logic and math problems and for fixing code.'
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
            explanation: 'This feedback loop is what makes the system autonomous and improves the result.'
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
            explanation: 'An API key is like a password - keep it in environment variables only.'
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
