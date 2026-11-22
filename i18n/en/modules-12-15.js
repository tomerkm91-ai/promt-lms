// English translation of modules 12-15 (MCP, Skills, Plugins, Fact-checking and hallucinations).

const modules = {
    12: {
        title: 'MCP - Model Context Protocol',
        description: 'The open protocol that connects AI models to external tools, databases and services.',
        content: `<h3>📘 Lesson 12: MCP - How to Turn a Chatbot into an Agent That Can "Do" Things</h3>
                  <p><b>MCP (Model Context Protocol)</b> is an open protocol developed by Anthropic to solve a central problem: how do you give a language model organized access to external tools, databases and files - without building a custom integration between every tool and every model?</p>

                  <h4>🔌 The analogy: USB-C for AI</h4>
                  <p>Before USB-C, every device had its own power connector. MCP does exactly this for artificial intelligence: it defines one standard "socket". Any tool built with MCP support (an <b>MCP server</b>) can connect to any model that supports MCP (an <b>MCP client</b>, such as Claude Desktop or Claude Code), and vice versa.</p>

                  <h4>⚙️ How it works in practice</h4>
                  <p>When a user sends a request that needs external information or an action ("Check what's in my Google Sheets spreadsheet"), the model recognizes on its own that it needs to call the right tool through the relevant MCP server. It gets the result back and continues answering the user based on real information - instead of guessing or making up an answer.</p>

                  <h4>🚀 Why it matters</h4>
                  <p>This is not just another "interface feature" like Artifacts. It is an architectural change: it's the difference between a chatbot that only answers with text and an <b>agent</b> that can act in the real world. It ties directly into what you learn in the agents module (Multi-Agent Systems) - MCP-based tools are how agents actually "do things", rather than just think about them.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Write down 3 tools or systems from your everyday work (for example: calendar, email, a CRM system) that you would like an AI agent to access directly through MCP, and describe what concrete task this would save you.
                  </div>`
    },
    13: {
        title: 'Skills - Packaged, Modular Capabilities',
        description: 'What a Skill is, how it differs from a regular prompt, and when to build one.',
        content: `<h3>📘 Lesson 13: Skills - When a Prompt Becomes a Permanent, Reusable Capability</h3>
                  <p>A regular prompt is a one-off instruction that you type again in every conversation. A <b>Skill</b> is a saved, modular package of instructions (and sometimes accompanying files and scripts) that the agent can "load" and run by name or by context - without you having to explain again what to do every time.</p>

                  <h4>🆚 A one-off prompt vs. a permanent Skill</h4>
                  <ul>
                      <li><b>Prompt:</b> You type "Check this code for bugs" every single time, and write the same instructions over and over again.</li>
                      <li><b>Skill:</b> There is a saved capability called, for example, <code>code-review</code>, which already knows exactly which checks to run, what format to return the results in, and when to activate itself - you just call it by name.</li>
                  </ul>

                  <h4>🧩 When to build a Skill instead of writing a prompt</h4>
                  <p>When a particular task repeats itself again and again in the same way (for example: writing weekly reports, checking contracts against a fixed list of clauses, designing presentations in a uniform company format), it's worth packaging it as a Skill. That way it is saved, it can be shared with others on your team, and you don't have to "reinvent the wheel" in every conversation.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Think of a recurring task from your work or studies, and describe how you would turn it into a Skill: what the Skill would be called, when it would be triggered, and exactly which instructions it would contain.
                  </div>`
    },
    14: {
        title: 'Plugins and Extensions',
        description: 'How plugins extend AI capabilities, how they differ from MCP, and when to use each.',
        content: `<h3>📘 Lesson 14: Plugins and Extensions - Adding Capabilities Without Building Everything from Scratch</h3>
                  <p>A <b>plugin</b> is an add-on component that extends the capabilities of an existing application without changing its core - just like a browser extension. In the AI world it comes in several forms: ChatGPT plugins (today Actions/Connectors), plugins for Claude Code (which include Skills, slash commands and subagents), and IDE extensions such as Copilot or Cursor.</p>

                  <h4>🆚 Plugin vs. MCP - what's the difference?</h4>
                  <p>It's easy to confuse the two because both "add capabilities" to the model, but the difference is fundamental:</p>
                  <ul>
                      <li><b>MCP:</b> An open, standard protocol that doesn't depend on any vendor - any MCP server can work with any client that supports the protocol.</li>
                      <li><b>Plugin:</b> Usually a proprietary mechanism of a specific vendor (for example, the ChatGPT plugin store) - it works only inside the system that built it, and sometimes uses MCP "under the hood".</li>
                  </ul>

                  <h4>🛠️ When to use each</h4>
                  <p>If you're an end user who wants a ready-made capability quickly (for example: searching for hotels inside the chat), an existing plugin is the simple solution. If you're building an organizational system that needs to connect several models to the same internal tools over time, MCP is the right choice because it doesn't lock you into a single vendor.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Go to the plugin/extension store of the AI tool you use, and find one plugin that's relevant to your work. Describe what concrete problem it solves, and how you would use it in a real task.
                  </div>`
    },
    15: {
        title: 'Fact-Checking and Hallucinations',
        description: 'How to spot a made-up answer, ask for sources and verify them before you rely on AI.',
        content: `<h3>📘 Lesson 15: Why AI Makes Things Up, and How Not to Fall for It</h3>
                  <p>A <b>hallucination</b> is an answer that sounds confident and professional - but is wrong or completely made up: a fact that doesn't exist, an incorrect number, a quote nobody ever said, or a source that doesn't exist at all. The problem is not that the model is "lying" on purpose, but that it phrases things with the same confidence whether it's right or wrong.</p>

                  <h4>💡 Why does this happen?</h4>
                  <p>As you learned in Lesson 1, a language model calculates the most likely continuation of a text - it doesn't check it against a database of facts. In 2025, researchers from OpenAI published a paper called <i>Why Language Models Hallucinate</i>, in which they argue that a large part of the problem comes from the way models are trained and tested: the standard evaluation methods reward <b>guessing</b> more than admitting "I don't know". Just like a student taking a multiple-choice exam who would rather guess than leave a question blank, the model also "learns" that it's better to guess.</p>

                  <h4>🚨 Where hallucinations are especially dangerous</h4>
                  <ul>
                      <li><b>Sources and citations:</b> Names of articles, court rulings, books and links that look completely credible - and don't exist.</li>
                      <li><b>Numbers and dates:</b> Statistics, prices, years and percentages.</li>
                      <li><b>Up-to-date information:</b> Things that happened after the model was trained, or prices and terms that change.</li>
                      <li><b>Niche topics:</b> The less information there is about a topic, the greater the chance that the model will "fill in the gaps".</li>
                  </ul>

                  <h4>🛡️ The five rules of protection</h4>
                  <ol>
                      <li><b>Give the model permission to say "I don't know":</b> Write explicitly: "If you're not sure, say that you don't know - don't guess".</li>
                      <li><b>Give it the material yourself (Grounding):</b> Paste in the document and instruct: "Answer only based on the attached text". This is much more reliable than asking it to answer "from memory".</li>
                      <li><b>Ask for an exact quote:</b> "Quote the exact sentence from the document that the answer is based on" - and then check that the sentence really is there.</li>
                      <li><b>Verify every source yourself:</b> Open every link, look up every article or court ruling. A source you couldn't find doesn't exist as far as you're concerned.</li>
                      <li><b>The higher the risk, the stricter the check needs to be:</b> An idea for a post doesn't need verification; legal, medical or financial advice always needs to be checked against a reliable source or a professional.</li>
                  </ol>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Ask a language model a question about a niche topic you know in depth (for example: a technical detail from your professional field), and ask it to include 3 sources. Check each source: Does it exist? Does it really say what the model claimed?
                  </div>`
    }
};

const extras = {
    12: {
        cases: `<h3>🔥 Case Studies and Templates: MCP</h3>
                                <h4>💡 An AI agent that reads a live spreadsheet on its own:</h4>
                                <p>Instead of copying and pasting data by hand, you connect the model to an MCP server that gives it access to Google Sheets - and it can read and update the spreadsheet directly, on its own, as needed.</p>
                                <h4>📋 A template for defining an agent's permissions on an MCP server:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Available MCP tools: [Google Sheets: read-only, Gmail: read-only].
Task: Summarize this week's sales numbers from the sheet and draft (do not send) a summary email.
Never use a tool that is not explicitly listed above.</pre>`,
        practice: `<h3>🏋️ Hands-on Exercise: Mapping Tools for an MCP Connection</h3>
                                <p><b>Your task:</b> Write down 3 tools or systems from your everyday work (calendar, email, CRM, etc.) that you would like an AI agent to access directly through MCP, and describe what concrete task this would save you.</p>`,
        promptScenarios: [
            'Write a prompt that tells an AI agent which MCP servers (tools) it may use for a given task, and which it may not.',
            'Write a prompt that asks the model to explain to management, in business language rather than technical language, why it\'s worth connecting the company chatbot to MCP.',
            'Write a prompt for planning a new MCP server that will give the model access to an internal CRM system.'
        ]
    },
    13: {
        cases: `<h3>🔥 Case Studies and Templates: Skills</h3>
                                <h4>💡 Building a permanent Skill for checking contracts:</h4>
                                <p>Instead of explaining in every conversation which clauses are forbidden in a contract, you build a permanent Skill called <code>contract-check</code> that already "knows" all the rules - and you call it by name whenever you need it.</p>
                                <h4>📋 A template for defining a new Skill:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Skill name: contract-check
Trigger: when the user uploads a contract or asks to review one.
Instructions: check against this list of forbidden clauses: [list].
Output: quote the risky clause and explain it in plain language.</pre>`,
        practice: `<h3>🏋️ Hands-on Exercise: Designing Your Own Skill</h3>
                                <p><b>Your task:</b> Think of a recurring task from your work or studies, and describe how you would turn it into a Skill: what the Skill would be called, when it would be triggered, and exactly which instructions it would contain.</p>`,
        promptScenarios: [
            'Write a prompt that defines a new Skill - its name, when it is triggered, and which instructions it includes - for a recurring task from your work.',
            'Write a prompt that compares using a one-off prompt with building a permanent Skill for the same task, and explains when each one is the better fit.',
            'Write a prompt that asks the model to review an existing Skill and suggest an improvement.'
        ]
    },
    14: {
        cases: `<h3>🔥 Case Studies and Templates: Plugins and Extensions</h3>
                                <h4>💡 Extending capabilities without building everything from scratch:</h4>
                                <p>Instead of developing a hotel search capability yourself, you install an existing plugin in your AI tool that provides it ready-made - just like installing a browser extension.</p>
                                <h4>📋 A template for comparing solutions: an existing plugin vs. your own MCP server:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Need: connect our internal CRM to the chat assistant.
Option A (Plugin): use the vendor's existing marketplace plugin - fast, but locked to that vendor.
Option B (MCP server): build a small MCP server for our CRM - more work, but works with any MCP client.</pre>`,
        practice: `<h3>🏋️ Hands-on Exercise: Reviewing an Existing Plugin</h3>
                                <p><b>Your task:</b> Go to the plugin/extension store of the AI tool you use, find one plugin that's relevant to your work, and describe what concrete problem it solves.</p>`,
        promptScenarios: [
            'Write a prompt that checks which plugins/extensions exist for a particular AI tool and summarizes the three most useful ones for your needs.',
            'Write a prompt that explains the difference between a proprietary plugin and an open, MCP-based tool.',
            'Write a prompt that designs a new plugin (as an idea only) that would solve an everyday problem you have at work.'
        ]
    },
    15: {
        cases: `<h3>🔥 Case Studies and Templates: When a Hallucination Gets Expensive</h3>
                <h4>⚖️ Case 1: The lawyers and the court rulings that didn't exist (Mata v. Avianca, 2023)</h4>
                <p>In a lawsuit against the airline Avianca in a federal court in New York, the plaintiff's lawyers submitted a filing that cited six court rulings - and not one of them existed. They had been generated by ChatGPT, including made-up case numbers and quotes. In June 2023 the judge fined the lawyers and their firm $5,000, in part because they did not check the sources even after questions had been raised about them.</p>
                <p><b>The lesson:</b> The model didn't "know" it was making things up. The person responsible is the one who submitted the document without checking it.</p>

                <h4>✈️ Case 2: Air Canada's chatbot (Moffatt v. Air Canada, 2024)</h4>
                <p>A customer who asked the chatbot on Air Canada's website about a discounted fare after a family member's death received an answer that did not match the company's actual policy. In February 2024 a tribunal in Canada ruled that the company was responsible for the information its chatbot gave, and ordered it to compensate the customer.</p>
                <p><b>The lesson:</b> A business that puts AI in front of customers is responsible for what the AI says. This is exactly the place to define constraints and to hand sensitive questions over to a human agent.</p>

                <h4>📋 A prompt template that reduces hallucinations:</h4>
                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto" dir="ltr">
Answer ONLY based on the document between the &lt;doc&gt; tags.
If the answer is not in the document, reply exactly: "Not found in the document".
For every claim, quote the exact sentence from the document that supports it.
Do not guess. Do not use outside knowledge.

&lt;doc&gt;
[paste the document here]
&lt;/doc&gt;

Question: [your question]</pre>`,
        practice: `<h3>🏋️ Hands-on Exercise: Catching the Model Making Things Up</h3>
                <p><b>Your task:</b> Pick a topic you know well. Ask the model for "a list of 5 articles or books on the topic, with the author's name and year". Then check each item with a regular search and mark it: exists and accurate / exists but the details are wrong / doesn't exist at all.</p>
                <p><b>Step 2:</b> Run the same request again, this time with the template from the "Case Studies" tab and with a real document that you pasted in yourself. Compare how many mistakes each version had.</p>`,
        promptScenarios: [
            'Write a prompt that asks the model to summarize an attached document, with an explicit constraint to answer only based on the document and to quote the exact sentence for every claim.',
            'Write a prompt for a customer service chatbot that instructs it to say "I don\'t know" and hand over to a human agent when the answer doesn\'t appear in the company\'s policy.',
            'Write a prompt that asks the model to review a text you wrote and flag every factual claim that needs to be verified against an external source.'
        ]
    }
};

const quizzes = {
    12: [
        {
            id: 'q1',
            question: 'What is MCP (Model Context Protocol)?',
            options: [
                { id: 'a', text: 'An open protocol for connecting language models to external tools, files and databases in a standard way.' },
                { id: 'b', text: 'A new language model from Anthropic.' },
                { id: 'c', text: 'An extension for the Chrome browser.' },
                { id: 'd', text: 'A method for compressing files.' }
            ],
            explanation: 'MCP defines one standard "socket" instead of a separate integration for every tool and every model.'
        },
        {
            id: 'q2',
            question: 'What is the component that gives the model access to a specific tool (for example, reading from Google Sheets) called?',
            options: [
                { id: 'a', text: 'An MCP client' },
                { id: 'b', text: 'An MCP server' },
                { id: 'c', text: 'An Artifact' },
                { id: 'd', text: 'A Custom GPT' }
            ],
            explanation: 'An MCP server exposes a capability; an MCP client (for example, Claude Desktop) is what connects to it.'
        },
        {
            id: 'q3',
            question: 'Which analogy was used in the lesson to explain MCP?',
            options: [
                { id: 'a', text: 'USB-C - one standard socket that fits many devices.' },
                { id: 'b', text: 'A car engine.' },
                { id: 'c', text: 'A public library.' },
                { id: 'd', text: 'A remote control.' }
            ],
            explanation: 'Like USB-C: any MCP server can connect to any client that supports the protocol.'
        },
        {
            id: 'q4',
            question: 'Why is MCP considered an architectural change and not just another feature?',
            options: [
                { id: 'a', text: 'Because it changes the colors of the interface.' },
                { id: 'b', text: 'Because it turns a chatbot that only answers with text into an agent that can act in real systems.' },
                { id: 'c', text: 'Because it replaces the need for prompts.' },
                { id: 'd', text: 'Because it only works on new computers.' }
            ],
            explanation: 'Through MCP tools the agent gets real information and performs actions, instead of guessing.'
        }
    ],
    13: [
        {
            id: 'q1',
            question: 'How is a Skill different from a one-off prompt?',
            options: [
                { id: 'a', text: 'It is a saved, modular package of instructions that the agent loads and runs by name or by context.' },
                { id: 'b', text: 'It is simply a longer prompt.' },
                { id: 'c', text: 'It only works in English.' },
                { id: 'd', text: 'There is no difference at all.' }
            ],
            explanation: 'A Skill is saved and run again and again, without you having to write the instructions from scratch.'
        },
        {
            id: 'q2',
            question: 'When is it worth building a Skill instead of writing a prompt?',
            options: [
                { id: 'a', text: 'When a task repeats again and again in the same way.' },
                { id: 'b', text: 'For a one-off question that won\'t come up again.' },
                { id: 'c', text: 'Only when writing code.' },
                { id: 'd', text: 'Never - a prompt is always better.' }
            ],
            explanation: 'For example, weekly reports or checking contracts against a fixed list.'
        },
        {
            id: 'q3',
            question: 'What can a Skill include besides instructions?',
            options: [
                { id: 'a', text: 'Accompanying files and scripts.' },
                { id: 'b', text: 'Only images.' },
                { id: 'c', text: 'Only passwords.' },
                { id: 'd', text: 'Nothing but text.' }
            ],
            explanation: 'According to the lesson, a Skill is a package of instructions, and sometimes also accompanying files and scripts.'
        },
        {
            id: 'q4',
            question: 'What is another advantage of packaging a task as a Skill, beyond saving time?',
            options: [
                { id: 'a', text: 'You can share it with others on your team and get a consistent result.' },
                { id: 'b', text: 'It makes the model free to use.' },
                { id: 'c', text: 'It removes the need to check the results.' },
                { id: 'd', text: 'It enlarges the context window.' }
            ],
            explanation: 'A shared Skill creates a consistent standard of work across the team.'
        }
    ],
    14: [
        {
            id: 'q1',
            question: 'What is the main difference between a plugin and MCP?',
            options: [
                { id: 'a', text: 'A plugin is usually a proprietary mechanism of a specific vendor, while MCP is an open protocol that doesn\'t depend on any vendor.' },
                { id: 'b', text: 'MCP only works in ChatGPT.' },
                { id: 'c', text: 'A plugin is always free and MCP always costs money.' },
                { id: 'd', text: 'There is no difference between them at all.' }
            ],
            explanation: 'MCP is open and standard; a plugin usually works only inside the system that built it.'
        },
        {
            id: 'q2',
            question: 'An organization wants to connect several different models to the same internal tools over time. According to the lesson, what is the right choice?',
            options: [
                { id: 'a', text: 'A proprietary plugin from a single vendor.' },
                { id: 'b', text: 'MCP, because it doesn\'t lock the organization into a single vendor.' },
                { id: 'c', text: 'Copying the data into each chat by hand.' },
                { id: 'd', text: 'Giving up on the connection.' }
            ],
            explanation: 'An open protocol lets you swap or add models without rebuilding everything.'
        },
        {
            id: 'q3',
            question: 'What is a plugin?',
            options: [
                { id: 'a', text: 'An add-on component that extends an existing application without changing its core.' },
                { id: 'b', text: 'A standalone language model.' },
                { id: 'c', text: 'A computer virus.' },
                { id: 'd', text: 'A free version of a piece of software.' }
            ],
            explanation: 'Just like a browser extension - it adds a capability without touching the core.'
        },
        {
            id: 'q4',
            question: 'An end user wants a ready-made capability quickly (for example, searching for hotels inside the chat). What is the simplest solution?',
            options: [
                { id: 'a', text: 'Build an MCP server from scratch.' },
                { id: 'b', text: 'Use an existing plugin.' },
                { id: 'c', text: 'Train a new language model.' },
                { id: 'd', text: 'Write their own API.' }
            ],
            explanation: 'For an end user, an existing plugin is the fastest way to get a ready-made capability.'
        }
    ],
    15: [
        {
            id: 'q1',
            question: 'What is a language model "hallucination"?',
            options: [
                { id: 'a', text: 'An answer that sounds confident and professional, but is wrong or made up.' },
                { id: 'b', text: 'A situation where the model refuses to answer.' },
                { id: 'c', text: 'A technical fault where the model\'s server crashes.' },
                { id: 'd', text: 'An answer that is too long.' }
            ],
            explanation: 'The danger is that the made-up answer is phrased with the same confidence as a correct answer.'
        },
        {
            id: 'q2',
            question: 'According to the paper by OpenAI researchers mentioned in the lesson, what is one of the main reasons for hallucinations?',
            options: [
                { id: 'a', text: 'The models are programmed to lie on purpose.' },
                { id: 'b', text: 'Training and evaluation methods reward guessing more than admitting "I don\'t know".' },
                { id: 'c', text: 'The models don\'t have enough computer memory.' },
                { id: 'd', text: 'Users write their prompts in English.' }
            ],
            explanation: 'Like a student who would rather guess on a multiple-choice exam than leave a question blank.'
        },
        {
            id: 'q3',
            question: 'What is the most reliable way to get an answer about a specific document?',
            options: [
                { id: 'a', text: 'Ask the model about the document from memory, without attaching it.' },
                { id: 'b', text: 'Paste in the document and instruct: "Answer only based on the attached text, and quote the exact sentence".' },
                { id: 'c', text: 'Ask the model to answer faster.' },
                { id: 'd', text: 'Ask the same question three times and pick the longest answer.' }
            ],
            explanation: 'Grounding the answer in the document and quoting it exactly let you check every claim.'
        },
        {
            id: 'q4',
            question: 'What was the main lesson of the Mata v. Avianca case?',
            options: [
                { id: 'a', text: 'You must never use AI for legal work under any circumstances.' },
                { id: 'b', text: 'The responsibility for checking sources lies with whoever submits the document, not with the model.' },
                { id: 'c', text: 'ChatGPT always cites real court rulings.' },
                { id: 'd', text: 'Courts don\'t accept documents written on a computer.' }
            ],
            explanation: 'The lawyers were fined because they submitted made-up court rulings without verifying them.'
        }
    ]
};

module.exports = { modules, extras, quizzes };
