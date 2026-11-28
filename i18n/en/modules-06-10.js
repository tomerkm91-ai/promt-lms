// English translation of lessons 06–10 (faithful translation of the Hebrew in server.js / moduleExtras.js / quiz.js).
// Quiz answer keys come only from quiz.js.

const modules = {
    6: {
        title: 'Gemini and Gemini Notebook',
        description: 'How to work with Google\'s Gemini: the context window and its limits, connecting to Gmail, Drive and Docs with @, and researching your own sources in Gemini Notebook (formerly NotebookLM).',
        content: `<h3>📘 Lesson 6: Google's Gemini, and Gemini Notebook for Researching Your Own Material</h3>
                  <p><b>Gemini</b> is Google's chatbot. You open it at gemini.google.com (or in the phone app) and sign in with a Google account. There's a free tier with a usage limit.</p>
                  <p>In this lesson you'll learn three things that make it stand out: a large context window, a connection to Google services like Gmail and Drive, and the Gemini Notebook tool, which answers from the material you give it.</p>

                  <h4>📏 A large context window, but it depends on your plan</h4>
                  <p>A <b>token</b> is a small unit of text that the model reads, roughly a word or part of a word. The <b>context window</b> is the amount of text the model can "keep in mind" in one conversation: the prompt, the files you attached and the previous answers.</p>
                  <p>Gemini has a very large context window: in the advanced models it reaches about a million tokens. Note: in the Gemini app, the size depends on your plan. According to Google's help page (at the time this lesson was written), an account without a paid plan gets a 32,000-token window, the AI Plus plan gets 128,000, and only the AI Pro and AI Ultra plans reach a million. In other words, on a free account the window is much smaller.</p>
                  <p>You can also attach several files at once (up to 10 files per message), and videos too. A free account has a limit on video length: up to 5 minutes of video in total, compared with up to an hour on the AI Pro and AI Ultra plans. The limits change from time to time, so if something won't upload, check Google's help page.</p>

                  <h4>🔗 Connecting to Google services with @</h4>
                  <p>When you type <code>@</code> in Gemini's message box, a list of services opens: <b>Gmail</b> (email), <b>Google Drive</b> (files in the cloud), <b>Google Docs</b> (documents), <b>Calendar</b>, <b>Keep</b> (notes) and <b>Tasks</b>. You choose a service from the list and write your request. It's important to choose the right service: emails are in Gmail, not in Drive.</p>
                  <ul>
                      <li><b>Email:</b> type @, choose Gmail, and write: "Summarize the email thread with the supplier from the past week, and list what was agreed".</li>
                      <li><b>A file in Drive:</b> type @, choose Google Drive, and write: "Find the file 'Budget 2026' and list the three largest expenses".</li>
                      <li><b>A document in Docs:</b> type @, choose Google Docs, and write: "Find the document 'Team meeting minutes' and list the decisions that were made".</li>
                  </ul>
                  <p><b>What you need for this to work:</b></p>
                  <ul>
                      <li>A personal Google account. On a work or school account, your organization's administrator decides whether the connection is available.</li>
                      <li>Connect Gmail and Drive in Gemini's settings, in the connected apps area (the names in the menu change from time to time). Availability varies and isn't always offered on every account.</li>
                      <li>Know the limitation: Gemini doesn't see comments or images inside Docs documents and emails.</li>
                  </ul>
                  <p><b>No connection?</b> Copy the text of the emails and paste it straight into the chat. This works on any account.</p>

                  <h4>📚 Gemini Notebook (formerly called NotebookLM)</h4>
                  <p><b>Gemini Notebook</b> is a research tool from Google. Until July 2026 it was called <b>NotebookLM</b>, so you'll still come across both names. You open it at notebook.google (some Google pages also show the address notebooklm.google) and sign in with a Google account. You can sign up for free with a Google account; there are also paid plans with higher limits.</p>
                  <p>The difference from a regular chat: you add <b>sources</b>, such as PDF files, links to websites, YouTube videos, audio files, and documents or presentations from Google Docs and Slides. The tool answers <b>from your sources</b>, and next to each claim there's a <b>citation</b>: a small number you click to see which passage in the source it was taken from. If the information isn't in the sources, it may say it has no answer instead of making one up.</p>
                  <ul>
                      <li><b>Study guide, FAQ and Briefing:</b> organized summaries of the material.</li>
                      <li><b>Audio Overview:</b> a podcast-style audio file. By default (Deep Dive), two computer-generated "hosts" discuss the material. There are also other formats: Brief, Critique and Debate. You'll find it in the Studio panel. It's available in more than 80 languages; the language is set by your Google account language, and you can change it.</li>
                  </ul>
                  <p>Google itself notes that the Audio Overview may include inaccuracies. <b>Check important points against the source.</b></p>

                  <h4>🔒 Privacy</h4>
                  <p>When you connect Gmail or upload documents, the information goes to Google's servers. Don't upload sensitive documents (medical, financial, customer information) without checking what your policies allow. For practice, use public material, like a Wikipedia article, or the sample material from this lesson.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Go to Gemini Notebook (notebook.google), create a new notebook and add one source: an educational article, a PDF, or a link to a Wikipedia article on a topic that interests you. Ask for a study guide with questions and answers, and click one of the citations to check that the answer really appears in the source. The full step-by-step instructions are waiting in the "Hands-on practice" tab.
                  </div>`
    },
    7: {
        title: 'DeepSeek and Reasoning Models',
        description: 'What a reasoning model is, how to use DeepSeek for logic puzzles and finding bugs, what MoE and open weights are, and the limitations: speed, mistakes and privacy.',
        content: `<h3>📘 Lesson 7: DeepSeek and Reasoning Models</h3>
                  <p><b>DeepSeek</b> is a chatbot from a Chinese AI company of the same name. You can use it for free at chat.deepseek.com and in the phone app. Through it we'll get to know an idea that exists today in almost every tool: <b>reasoning models</b>, which first write a "thinking draft" and only then answer.</p>

                  <h4>📰 Why everyone was talking about DeepSeek</h4>
                  <p>In January 2025 the company released <b>DeepSeek-R1</b>, a reasoning model that made headlines around the world. Three things were at the center:</p>
                  <ul>
                      <li><b>A low reported training cost:</b> DeepSeek made waves when it reported a training cost far lower than usual for a high-performing model. The published figure (about $5.6 million to train DeepSeek-V3) covers only the final training run, without the costs of the research, experiments and hardware that came before it.</li>
                      <li><b>MoE architecture:</b> <b>Architecture</b> is the way the model is built on the inside. DeepSeek uses an architecture called MoE (Mixture of Experts): the model is made of many "expert" sub-networks, and at each step only a small part of them is activated, which makes the computation cheaper.</li>
                      <li><b>Open weights:</b> <b>Weights</b> are the numbers the model learned during training, in other words its "knowledge". The company publishes the weights of its models to the public, so anyone can download and run them.</li>
                  </ul>
                  <p><b>And today?</b> R1 is already history. In April 2026 the next generation, DeepSeek-V4, came out, followed by updates such as V4-Pro and V4.1-Flash. The chat site usually lets you choose between a fast mode and a mode that thinks in depth (in April 2026 they were called Instant Mode and Expert Mode; the names change).</p>

                  <h4>🧠 What is a reasoning model?</h4>
                  <p>A regular model starts writing the answer right away. A <b>reasoning model</b> works differently. During training, reasoning models go through a process called <b>reinforcement learning</b>, which teaches them to break problems into steps. Because of this, when you ask them a question, they first write a long "thinking draft" and only then the final answer.</p>
                  <p><b>Reinforcement learning</b> = a training method in which the model gets a "score" for its answers and learns over time what leads to a correct answer. This happens during training, not while you're chatting with it.</p>
                  <p>In the interface you'll see a separate area (usually you can open and close it) that shows the thinking process. There you can see how the model breaks down the problem, checks options, and sometimes corrects itself.</p>
                  <p>Reasoning models aren't just DeepSeek: ChatGPT, Claude and Gemini also have reasoning modes today.</p>

                  <h4>🎯 When is it worth turning on reasoning mode?</h4>
                  <ul>
                      <li><b>Worth it:</b> math, logic puzzles, finding bugs in code (a <b>bug</b> = a mistake in code that makes it work incorrectly), and planning with lots of conditions.</li>
                      <li><b>Not needed:</b> a simple question, drafting a short email or a translation. There the fast mode is usually enough and saves time.</li>
                  </ul>

                  <h4>⚠️ Limitations you should know</h4>
                  <div style="background-color:#fef2f2; border-left:4px solid #dc2626; padding:10px; margin:10px 0; border-radius:4px;">
                      <ul>
                          <li><b>Slower:</b> the thinking draft takes time, sometimes much longer than a regular answer.</li>
                          <li><b>Can still be wrong:</b> reasoning improves performance in math, logic and code, but the model can still make mistakes, and even make things up. A long, convincing thinking draft is not proof that the answer is correct. Check the answer, and with code, run it yourself.</li>
                          <li><b>Privacy:</b> according to DeepSeek's privacy policy (February 2025 version), the information is stored on servers in the People's Republic of China. Don't paste work code, personal information or sensitive documents into it.</li>
                      </ul>
                  </div>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> A logic puzzle with a solution is waiting for you in the "Hands-on practice" tab. Go to chat.deepseek.com and give it the puzzle once in fast mode and once in reasoning mode, both times without examples (Zero-shot, meaning just the question, with no sample solution). Compare: what changed in the answer and in the waiting time? For programmers, there's also a short piece of code with a bug in the "Templates & case studies" tab. Not a programmer? Choose the puzzle.
                  </div>`
    },
    8: {
        title: 'Comparing Models: Which Tool for Which Task',
        description: 'A starter table for choosing between Claude, ChatGPT, Gemini and DeepSeek by type of task, what requires a paid plan, and practice: run the same prompt in several tools and compare them for accuracy, length and style.',
        content: `<h3>📘 Lesson 8: Which AI Tool Fits Which Task?</h3>
                  <p>It's worth knowing several tools and choosing the right one for each task. In this lesson you'll get a table that helps you decide where to start, and you'll learn to check for yourself: run the same prompt in several tools and compare.</p>

                  <h4>🧰 The four tools in brief</h4>
                  <ul>
                      <li><b>Claude</b> (claude.ai): the chatbot from Anthropic.</li>
                      <li><b>ChatGPT</b> (chatgpt.com): the chatbot from OpenAI.</li>
                      <li><b>Gemini</b> (gemini.google.com): Google's chatbot (Lesson 6).</li>
                      <li><b>DeepSeek</b> (chat.deepseek.com): the chatbot from a Chinese company of the same name (Lesson 7).</li>
                  </ul>
                  <p>All four have a free tier with a usage limit. Some features, or their full version, are available only on paid plans.</p>

                  <h4>📊 Starter table: a starting point, not a rule</h4>
                  <p>The table summarizes strengths that many users report. Some of them, especially about the quality of writing and code, are <b>estimates and opinions</b> rather than precise measurements, and the tools change every few months. Use it to decide where to start, and then check for yourself.</p>
                  <div style="overflow-x:auto;">
                  <table dir="ltr" style="width:100%; text-align:left; border-collapse:collapse; margin-top:15px; margin-bottom:15px; font-size:0.95em;">
                    <thead>
                    <tr style="background-color:#1e40af; color:white;">
                      <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">Tool</th>
                      <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">Main strengths</th>
                      <th style="padding:10px; border:1px solid #cbd5e1; text-align:left;">When is it worth starting with it?</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;"><b>Claude (Anthropic)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">Considered strong at writing code, high-quality writing and working with long documents (the view of many users, not a measurement).</td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">Writing code and building small apps, writing long articles, analyzing complex documents.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;"><b>ChatGPT (OpenAI)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">Analyzing data and files (it runs Python code by itself), creating images with the built-in ChatGPT Images tool, and custom assistants with fixed instructions and files (Projects).</td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">Analyzing Excel files and reports, varied everyday work, creating images. Image creation is available on all plans, with a limit on the free tier.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;"><b>DeepSeek (reasoning mode)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">Step-by-step reasoning, logic and math problems, a low price for use through the API, and open weights.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">Finding bugs in code, math, logic puzzles. Not for work code and not for sensitive information (privacy, Lesson 7).</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;"><b>Gemini (Google)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">A very large context window (up to about a million tokens on the advanced plans), and a connection to Gmail, Drive and Docs that lets you search and summarize emails and files.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1; text-align:left; vertical-align:top;">Summarizing very long documents, working with Google emails and files. On a free account the window is much smaller (32,000 tokens).</td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
                  <p><b>Important:</b> today all the tools in the table have a "reasoning" mode for hard problems: in ChatGPT (the Think option, also available to free users), in Claude (Extended thinking) and in Gemini. DeepSeek's standout advantage is mainly its low price and open weights.</p>
                  <p><b>API</b> = a way for software to talk to the model directly, without the chat interface, paying by the amount of use. This is mainly relevant for developers.</p>

                  <h4>💳 What requires a paid plan?</h4>
                  <ul>
                      <li><b>Gemini:</b> the full context window (about a million tokens) is available only on the AI Pro and AI Ultra plans.</li>
                      <li><b>ChatGPT:</b> image creation is available on all plans, but the free tier has a limit on how many.</li>
                      <li><b>All the tools:</b> the free tier has a usage limit. When you reach it, you wait or switch to another tool. The limits change, so check each tool's website.</li>
                  </ul>

                  <h4>⚖️ How to compare tools yourself</h4>
                  <p>Copy the same prompt into two or three tools in separate windows, and compare them by three criteria:</p>
                  <ul>
                      <li><b>Accuracy:</b> are the facts and numbers correct, and does the answer meet the requirements you wrote? Check at least one thing yourself.</li>
                      <li><b>Length:</b> is the answer the length you asked for, or too long?</li>
                      <li><b>Style:</b> do the tone and language suit your audience?</li>
                  </ul>
                  <p>To keep the comparison fair: paste exactly the same text, and open a new conversation in each tool.</p>

                  <h4>🗺️ Breaking a project into stages</h4>
                  <p>A real project includes several kinds of work. Instead of one tool for everything, you break it into stages and choose a tool for each stage. Example: planning a birthday party. A budget in a spreadsheet (ChatGPT, thanks to its data analysis), a written invitation (the tool whose style you liked in the comparison), and a summary of reviews of venues (any chatbot, with a check of the sources).</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Choose one prompt (for example: "Write a short invitation to a 40th birthday party in the park, in a warm tone, up to 60 words"), copy it into two or three tools in separate windows, and compare them for accuracy, length and style. You don't have to open an account on every tool: a comparison between two tools is enough. The full prompt for the comparison is waiting in the "Hands-on practice" tab.
                  </div>`
    },
    9: {
        title: 'AI in the Real World',
        description: 'How AI is used in real work tasks: content creation, research, data analysis, programming and customer service, how to turn a recurring task into a reusable prompt, and where human review is a must.',
        content: `<h3>📘 Lesson 9: AI at Work: What Works, and Where to Be Careful</h3>
                  <p>Prompt engineering can save time on recurring work tasks. In this lesson we'll go through five areas, and for each one: what AI does well, and where a person has to check.</p>

                  <h4>📅 Content creation: a monthly content calendar</h4>
                  <p>A <b>content calendar</b> is a table that plans what you publish, where and when. When you give the model a <b>persona</b> (a description of the typical customer), a brand tone and clear constraints, it can produce a full table of ideas, headlines and texts. You go over the table, fix it and approve it. A full case is waiting in the "Templates & case studies" tab.</p>

                  <h4>🔎 Research: summarizing sources with citations</h4>
                  <p>You can give the model several sources (articles, reports) and ask for a summary in which every claim is marked with its source, for example in Gemini Notebook (Lesson 6). The rule: check every source. Open it and make sure it exists and that it really says what the summary says.</p>

                  <h4>📈 Data analysis: a table for ChatGPT</h4>
                  <p>Paste a small table or upload an Excel or CSV file to ChatGPT (chatgpt.com, there's a free tier with a usage limit), and ask for trends, calculations or a chart. ChatGPT runs Python code by itself to calculate. Ask it to show the calculation, and check one number yourself. Don't upload real customer data without permission. Here's a small (made-up) table for practice:</p>
                  <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m9-sales">Store sales data (made-up data for practice)
Quarter 1: sales $120,000, 300 customers
Quarter 2: sales $150,000, 340 customers
Quarter 3: sales $135,000, 360 customers
Quarter 4: sales $180,000, 400 customers</pre>
                  <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m9-sales">📋 Copy the table</button>

                  <h4>💻 Programming: coding assistants</h4>
                  <p><b>Coding assistants</b> are tools for programmers that work inside the <b>code editor</b> (the software you write code in, for example VS Code). Two well-known ones: <b>GitHub Copilot</b> (github.com/features/copilot), an add-on for code editors, and <b>Cursor</b> (cursor.com), a complete code editor with AI. Both have a limited free version (Copilot Free and Cursor Free). You write a request in plain language, and the tool suggests code.</p>
                  <p>How much time does it save? Studies show different results: in one experiment, programmers finished a focused task 55.8% faster, and in another study (METR, 2025) experienced programmers on large projects actually worked slower (by about 19%). The savings depend on the task and on experience. Not a programmer? You can skip this part.</p>

                  <h4>💬 Customer service: chatbots on websites</h4>
                  <p>AI-based chatbots on company websites answer customers based on the company's information, for example a frequently asked questions (FAQ) file. They can save a lot of time, but they can make mistakes, and the company is responsible for what the bot says (we'll look at the Air Canada case in Lesson 15). That's why it's important to limit them to approved information and to define when to hand over to a human agent.</p>

                  <h4>✅ The rule that repeats in every area</h4>
                  <p>AI prepares a draft quickly; a person checks it before it goes out. The more expensive a mistake would be (with a customer, with money, with health), the more careful the check needs to be.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Choose a recurring task of yours, from work or home (for example, replying to similar messages in the parents' group chat, or weekly meal planning), and write a reusable prompt for it that you can use again, so the task takes just a few minutes. The full instructions and a sample prompt are waiting in the "Hands-on practice" tab.
                  </div>`
    },
    10: {
        title: 'Agents and Multi-Agent Systems',
        description: 'What an AI agent is, how to build a workflow of several agents with a stopping condition and human review, how to check whether the workflow is good, and how to simulate it by hand in any chat.',
        content: `<h3>📘 Lesson 10: Agents and Workflows with Several Agents</h3>
                  <p>Until now we've worked in a single chat with a single model. In this lesson we'll learn the next step: splitting a big task between several "agents", each responsible for one part. A system like this is called a <b>Multi-Agent System</b>.</p>

                  <h4>🤖 What is an agent?</h4>
                  <p>An agent is a language model that has been given a role, constraints and access to external tools (such as web search, running code or sending email). It works in a loop: it plans a step, carries it out, checks the result and decides on the next step, until the goal is achieved, without you having to guide it at every stage.</p>

                  <h4>🔄 A workflow of three agents</h4>
                  <p>Instead of asking "Write me code for a website", you build three roles that pass work to one another:</p>
                  <ul>
                      <li><b>Agent 1 (the programmer):</b> receives the request and writes the initial code.</li>
                      <li><b>Agent 2 (the software tester, QA):</b> receives the code, looks for bugs and security holes, and returns a list of findings. (<b>QA</b>, Quality Assurance = quality control.)</li>
                      <li><b>Agent 3 (the product manager):</b> checks whether the code meets the original requirements. If not, it sends it back to the programmer agent with feedback for fixing.</li>
                  </ul>
                  <p>Anthropic's guide called Building effective agents distinguishes between two things. When the steps are fixed in advance, as here (a writer, followed by a checker that sends it back for fixing), it's called a <b>workflow</b>, and its technical name is "evaluator-optimizer". An "agent" in the full sense is when the model itself decides which steps to take. The recommendation there: start with the simplest solution that works.</p>

                  <h4>🛑 When to stop, and when a person approves</h4>
                  <p>In a real system you also define when to stop (for example: at most 3 rounds of fixes) and when to ask a person for approval, because without this a small mistake can grow from round to round, and the cost goes up.</p>
                  <ul>
                      <li><b>Stopping condition:</b> a maximum number of rounds, or "stop when all the criteria are met", whichever comes first.</li>
                      <li><b>Human approval point:</b> before any action that's hard to undo, such as sending an email, publishing or paying.</li>
                  </ul>
                  <p><b>Decisions about people:</b> decisions about people, such as who gets hired, require human review; in some countries there are special legal obligations around them (for example, in the European Union AI systems for recruitment are classified as "high-risk"). Design the agents as assistants to the person who decides, not as the deciders.</p>

                  <h4>📏 How do you check whether the workflow is good?</h4>
                  <p>Prepare 3-5 sample tasks with a desired answer, run the workflow on them, and rate each result against a fixed list of criteria (correctness, completeness, meeting the requirements). Also compare with the result of a single prompt: if the workflow doesn't come out better, there's no reason to complicate things.</p>

                  <h4>🛠️ How to try it without special tools</h4>
                  <p>You can simulate the workflow by hand in any chat, as in the exercise. Tools for building automated agents exist, but they usually require technical knowledge or a paid plan. In the manual simulation you "pass the note": you open a separate conversation for each agent, and copy the output from one conversation into the next.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> In the "Templates & case studies" tab you'll find ready-made instructions for three agents that write a blog post: a writer, a copy editor and a fact-checker. In the "Hands-on practice" tab you'll run them by hand, in three separate conversations, and stop after 2-3 rounds at most.
                  </div>`
    }
};

const extras = {
    6: {
        cases: `
                    <h3>🔥 Case Study: Summarizing a Long Email Thread Before a Meeting</h3>
                    <p><b>The story:</b> Tomorrow morning there's a team meeting about the company conference. A long thread is waiting in your inbox, and there's no time to read it all. You want to know: what was decided, who's responsible for what, and what's still open.</p>
                    <p>Don't have a thread like this, or Gmail isn't connected? Here's a short sample thread (<b>written especially for this exercise</b>). Copy it and paste it into a chat with Gemini, instead of using Gmail. You can also ask Gemini to write a sample email thread of 8 messages, and then summarize it.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm space-y-2" id="m6-thread"><p><b>Email 1, Rachel, Sunday:</b> We need to close all the bookings for the team conference by Thursday. Jake, can you check venue prices?</p>
<p><b>Email 2, Jake, Monday:</b> I checked. A venue in Haifa costs $4,000, and a venue in Tel Aviv $6,500. I recommend Haifa. Who's taking the catering?</p>
<p><b>Email 3, Sarah, Monday:</b> I'll handle the catering. I need a final number of participants by Wednesday.</p>
<p><b>Email 4, Rachel, Tuesday:</b> I'm approving the venue in Haifa. So far 42 people have signed up. Danny, can you send a registration reminder to the whole team?</p>
<p><b>Email 5, Danny, Tuesday:</b> I'll send it tomorrow morning. By the way, we also need a projector, and it's not clear whether the venue has one.</p></div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m6-thread">📋 Copy the sample thread</button>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"@Google Drive summarize the emails about the conference for me."</div>
                    <ul>
                        <li>❌ <b>Wrong service:</b> the emails are in Gmail, not in Drive.</li>
                        <li>❌ <b>"The emails about the conference" is vague:</b> which thread? From what period?</li>
                        <li>❌ <b>No structure for the answer:</b> you'll get a general paragraph instead of a task list.</li>
                        <li>❌ <b>No instruction for what to do when there's no owner,</b> so the model may "fill in" an owner nobody assigned.</li>
                    </ul>

                    <h4>✅ An engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m6-good-prompt"><b>Role:</b> Act as an organized personal assistant who prepares me for a meeting.<br>
<b>Context:</b> Tomorrow there's a meeting about the team conference. Find in Gmail the email thread with the subject "Team conference" from the past week (or use the thread I pasted below the prompt).<br>
<b>Task:</b> List what was decided, which tasks are open, who is responsible for each task and by when.<br>
<b>Constraints:</b> Rely only on what's written in the emails. If a task has no owner or date, write "Not set" and don't guess.<br>
<b>Format:</b> Three headings: "Decided", "Tasks" (a checklist: task, owner, date), "Open questions".</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m6-good-prompt">📋 Copy the prompt</button>
                    <p class="text-sm text-slate-600">With Gmail connected: type @ at the start of the message, choose Gmail from the list, and only then paste the prompt (pasting just the word doesn't always activate the connection). Without a connection: paste the prompt, and below it the sample thread.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer to the sample thread look like? (try it yourself first)</summary>
                        <p class="mt-2"><b>Decided:</b> the venue in Haifa ($4,000), approved by Rachel. All bookings need to be closed by Thursday.</p>
                        <p><b>Tasks:</b></p>
                        <ul>
                            <li>☐ Catering: Sarah. Needs a final number of participants by Wednesday.</li>
                            <li>☐ Registration reminder to the whole team: Danny. "Tomorrow morning", meaning Wednesday.</li>
                            <li>☐ Actually booking the venue: Not set.</li>
                        </ul>
                        <p><b>Open questions:</b> Is there a projector at the venue, and who's checking? Who passes the final number to Sarah (currently 42)?</p>
                        <p class="text-sm text-slate-600">Notice: a good answer marks what was <b>not</b> set, and doesn't invent an owner. Check every line against the emails.</p>
                    </details>

                    <h4>📋 A ready-made prompt template for any thread:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m6-template">[Type @ and choose Gmail, or paste the text of the emails below the prompt]
Find the email thread with the subject "[subject]" from [period].
List: what was decided, which tasks are open, who is responsible for each task and by when.
Rely only on what's written in the emails. If an owner or date is missing, write "Not set" and don't guess.
Format: "Decided", "Tasks" (a checklist), "Open questions".</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m6-template">📋 Copy the template</button>
                    <p class="text-sm text-slate-600">For a file saved in Drive: the same template, just choose Google Drive from the list and write the file name instead of the thread subject.</p>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: A Study Guide and an Audio Overview in Gemini Notebook</h3>
                    <p><b>What you need:</b> a Google account, Gemini Notebook (notebook.google), and one source to practice with. The exercise takes about 20 minutes. No material? Paste a link to a Wikipedia article on a topic that interests you. No Google account? Do steps 3-5 in any chatbot: paste the text of the article and ask it to answer only from it, quoting the sentence each answer is based on.</p>
                    <ol>
                        <li><b>Step 1, opening:</b> Go to notebook.google, sign in with a Google account and create a new notebook.</li>
                        <li><b>Step 2, source:</b> Add one source: a PDF of an educational article, or a link to a website (for example a Wikipedia article). Don't upload personal or work documents.</li>
                        <li><b>Step 3, a question with a citation:</b> Ask a question whose answer is in the source, and click the small number (the citation) next to the answer. Does the passage that opens really say that?</li>
                        <li><b>Step 4, a question with no answer in the source:</b> Ask something that definitely doesn't appear in the source (for example about an event that will happen next year). Does the tool say the information isn't there, or does it make something up?</li>
                        <li><b>Step 5, study guide:</b> Ask for a study guide with 5 questions and answers. Choose two answers and check them against the source.</li>
                        <li><b>Step 6, Audio Overview:</b> In the Studio panel, create an Audio Overview. You can keep the default (Deep Dive) or choose Brief. Listen for two minutes and write down one claim, then check it against the source. (The names and locations in the interface change from time to time.)</li>
                    </ol>

                    <h4>❓ Decision question: you asked Gemini Notebook a question, and it answered that the information doesn't appear in your sources. What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-6" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Rephrase the question again and again, until it answers</summary><p class="mt-2">❌ If the information isn't in the sources, rephrasing may just push it toward an answer that isn't based on them. That's exactly what the tool is designed to prevent.</p></details>
                    <details name="practice-6" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Add a source that contains the information, or look for it elsewhere and check</summary><p class="mt-2">✅ Correct. "Not in the sources" is a useful answer: it tells you a source is missing. Add a suitable source, or search with a regular search and check the source you found.</p></details>
                    <details name="practice-6" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Conclude that the tool doesn't work, and switch to a general chat that will answer from memory</summary><p class="mt-2">❌ A general chat might answer, but without a citation and with the risk of a made-up answer (we'll go into this in Lesson 15). If you switch, check the answer against a source.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You added at least one source, and checked one citation: the passage that opened really supports the answer.</li>
                        <li>You checked what the tool does when the information isn't in the source, and wrote down the result.</li>
                        <li>You checked at least two answers from the study guide against the source.</li>
                        <li>You wrote down one claim from the Audio Overview and checked it against the source.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>For each task, what would you choose: Gemini with Gmail, Gemini with Google Drive, or Gemini Notebook? (1) Summarizing an email thread with a supplier. (2) Studying for a test from three course PDF files, with citations. (3) Finding a presentation you saved in the cloud and summarizing it.</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">(1) @ and then Gmail, because emails are in Gmail. (2) Gemini Notebook, because it answers from the sources and shows where each claim comes from. (3) @ and then Google Drive, because the file is saved in Drive. And in any case: if there's no connection, you can paste the text straight into the chat.</p></details>`,
        promptScenarios: [
            'Write a prompt for Gemini that summarizes an email thread about a team conference (from Gmail, or from text you\'ll paste) under three headings: what was decided, tasks with an owner and a date, and open questions, and instructs it to write "Not set" when an owner is missing.',
            'Write a prompt for Gemini Notebook that asks for a study guide with 5 questions and answers about a source you added (for example a Wikipedia article), with a citation for each answer, and instructs it to write "Not in the source" when there\'s no answer.',
            'Upload a spreadsheet file (Excel / CSV) to a chat with Gemini and ask for insights: write a prompt that defines the model\'s role, what\'s in the file, which 3 insights you want, and in what format to present them.'
        ]
    },
    7: {
        cases: `
                    <h3>🔥 Case Study: Finding a Bug with Reasoning Mode</h3>
                    <p><b>The story:</b> You wrote a short function in Python that calculates an average. It worked in testing, but when the list is empty the program crashes. You want the model to find the problem and explain it. Not a programmer? You can read the case for the idea, and practice with the puzzle in the "Hands-on practice" tab.</p>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr" id="m7-buggy-code">def average(numbers):
    return sum(numbers) / len(numbers)

print(average([]))</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m7-buggy-code">📋 Copy the code</button>
                    <p class="text-sm text-slate-600">What the code is supposed to do: add up all the numbers in the list (sum) and divide by the number of items (len). The last line runs it with an empty list. No code of your own to practice with? Ask the model to write a short function with one bug, and then in a new conversation ask it to find it.</p>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"The code doesn't work, fix it."</div>
                    <ul>
                        <li>❌ <b>No code and no error message,</b> so the model has to guess.</li>
                        <li>❌ <b>It doesn't say what the code is supposed to do,</b> so there's no way to know what counts as "working".</li>
                        <li>❌ <b>"Fix it" without an explanation:</b> you'll get new code without understanding what was broken, and you won't be able to check the fix.</li>
                    </ul>

                    <h4>✅ An engineered prompt (for reasoning mode):</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m7-good-prompt"><b>Role:</b> Act as an experienced Python programmer who explains things to beginners.<br>
<b>Context:</b> The function I'll paste below the prompt is supposed to return the average of a list of numbers. When the list is empty, the program crashes.<br>
<b>Task:</b> Think step by step about what happens when you run the code with an empty list. State the exact line that causes the error, the name of the error, and why it happens. Then suggest a fix.<br>
<b>Constraints:</b> Change only what's needed. Don't add external libraries. Decide explicitly what the function returns for an empty list, and explain why.<br>
<b>Format:</b> 1. An explanation of the bug in two sentences. 2. The fixed code. 3. Two short tests I can run to make sure the fix works.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m7-good-prompt">📋 Copy the prompt</button>
                    <p class="text-sm text-slate-600">Paste the prompt, and below it the code from the block above. Remember: don't paste work code into DeepSeek.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (try it yourself first)</summary>
                        <p class="mt-2"><b>The bug:</b> on the line with return. When the list is empty, len(numbers) is 0, and Python doesn't divide by zero, so an error called ZeroDivisionError is raised.</p>
                        <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr">def average(numbers):
    if not numbers:
        return None
    return sum(numbers) / len(numbers)

print(average([]))         # None
print(average([2, 4, 6]))  # 4.0</pre>
                        <p class="mt-2"><b>The decision:</b> for an empty list the function returns None ("no value"). Another reasonable option: raise an error with a clear message (ValueError). What matters is that the decision is written down and explained.</p>
                        <p class="text-sm text-slate-600">And don't settle for the explanation: run the two tests yourself. No Python on your computer? There are websites that run short Python code in the browser, or ask the model to explain what each line will print, and check that it makes sense.</p>
                    </details>

                    <h4>📋 A ready-made prompt template for any bug:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m7-template">Think step by step before you answer.
What the code is supposed to do: [one-sentence description]
What actually happens: [the error message, or the wrong result]
1. State the exact line that causes the problem, and explain why.
2. Suggest a minimal fix, without changing things that work.
3. Give two short tests I can run to make sure the fix works.
The code:
[paste the code here]</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m7-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Fast Mode vs. Reasoning Mode</h3>
                    <p><b>What you need:</b> DeepSeek (chat.deepseek.com, free), or any other chatbot with a reasoning mode (ChatGPT, Claude or Gemini), and the puzzle below. The exercise takes about 15 minutes. No access to any tool? Solve the puzzle on paper, write down your reasoning steps, and compare with the solution.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm space-y-2" id="m7-puzzle"><p><b>The puzzle:</b> Owen, Nora and Tess each work in a different field: teaching, medicine and cooking. Each one lives in a different city: Haifa, Jerusalem and Eilat.</p>
<p>1. Owen doesn't live in Haifa.<br>
2. The person who works in cooking lives in Eilat.<br>
3. Nora lives in Jerusalem.<br>
4. Tess doesn't work in teaching.</p>
<p><b>The question:</b> Which field does each person work in, and which city do they live in?</p></div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m7-puzzle">📋 Copy the puzzle</button>
                    <ol>
                        <li><b>Step 1, on your own (2 minutes):</b> Try to solve the puzzle yourself, without AI. Don't open the solution yet.</li>
                        <li><b>Step 2, fast mode:</b> Open a new conversation in fast mode, and paste only the puzzle, with no examples and no hints (Zero-shot). Write down the answer and roughly how long you waited.</li>
                        <li><b>Step 3, reasoning mode:</b> Open a <b>new conversation</b> (so the previous answer doesn't influence it), turn on reasoning mode and paste the same puzzle. Open the thinking area and follow along: which clue did it start from? Did it correct itself along the way?</li>
                        <li><b>Step 4, check:</b> Check both answers against all four clues, one by one, and only then open the solution below.</li>
                        <li><b>Step 5, for programmers (optional):</b> Do the same with the code from the "Templates & case studies" tab: paste the engineered prompt and the code below it, and run the fix the model suggested yourself.</li>
                    </ol>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">The solution to the puzzle (try it on your own first)</summary>
                        <p class="mt-2">Nora lives in Jerusalem (clue 3). Owen doesn't live in Haifa (clue 1), and Jerusalem is taken, so Owen lives in Eilat and Tess in Haifa. The person who works in cooking lives in Eilat (clue 2), and only Owen lives in Eilat, so Owen works in cooking. Tess doesn't work in teaching (clue 4), and cooking is taken, so Tess is in medicine. Nora is left with teaching.</p>
                        <p><b>The answer:</b> Owen: cooking, Eilat. Nora: teaching, Jerusalem. Tess: medicine, Haifa. This is the only solution that satisfies all four clues.</p>
                    </details>

                    <h4>❓ Decision question: in reasoning mode you got an answer to the puzzle, with a long, convincing thinking draft. What's the next step?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-7" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Trust it, because the model thought for a long time</summary><p class="mt-2">❌ Reasoning improves the chance of a correct answer, but doesn't guarantee it. A reasoning model can also be wrong.</p></details>
                    <details name="practice-7" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Check the answer against each clue yourself</summary><p class="mt-2">✅ Correct. With a puzzle you check every clue; with code you run the code. That's how you catch a mistake, even when the explanation sounds good.</p></details>
                    <details name="practice-7" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Ask the model "Are you sure?" and accept whatever it answers</summary><p class="mt-2">❌ The model may change a correct answer just because you asked, or insist on a wrong one. The check has to be against the clues, not against its confidence.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You tried to solve it on your own before opening the tool.</li>
                        <li>You ran the puzzle twice, in two separate conversations: in fast mode and in reasoning mode, without examples.</li>
                        <li>For each mode you wrote down: what the answer was, whether it was correct, and roughly how long you waited.</li>
                        <li>You checked the answers against the four clues, not just against the solution.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Write one sentence about when you'll turn on reasoning mode and when you won't, and one sentence about what you don't paste into DeepSeek and why.</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">Reasoning mode: for problems with several steps, like a puzzle, a calculation or a bug; for a simple question, a short email or a translation, fast mode is enough. Don't paste work code, personal information or sensitive documents, because according to DeepSeek's privacy policy the information is stored on servers in China.</p></details>`,
        promptScenarios: [
            'Write a prompt for DeepSeek\'s reasoning mode that solves this puzzle and explains each step: Owen, Nora and Tess work in teaching, medicine and cooking, and live in Haifa, Jerusalem and Eilat (each in a different field and a different city). Owen doesn\'t live in Haifa; the person who works in cooking lives in Eilat; Nora lives in Jerusalem; Tess doesn\'t work in teaching. At the end, ask for a table and a check of each clue.',
            'Write a debugging prompt for the function def average(numbers): return sum(numbers) / len(numbers), which crashes when you run it with an empty list: ask for a step-by-step explanation, the exact line, a minimal fix and two tests to run.',
            'Write a prompt that asks the model to solve a short math problem (a product\'s price went up by 20% and then down by 20%: is it back to the original price?), show the solution steps, and finish with a check using a sample price.'
        ]
    },
    8: {
        cases: `
                    <h3>🔥 Case Study: One Project, Three Kinds of Work</h3>
                    <p><b>The story:</b> A product team needs three things: to analyze a user data file called users.csv, to build a simple dashboard that shows the findings, and to summarize a 200-page policy document. (<b>CSV</b> = a simple table file, where each row is a record. <b>Dashboard</b> = a screen that shows data in numbers and charts.)</p>
                    <p><b>Don't have files like these?</b> Ask ChatGPT to generate a sample users.csv file with 50 rows. For the long document: any long public document, like terms of service or an annual report.</p>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">[All the files attached, in one tool] "Analyze the data, build a dashboard and summarize the policy."</div>
                    <ul>
                        <li>❌ <b>Three different tasks in one request:</b> it's hard to check each one, and the answer comes out shallow.</li>
                        <li>❌ <b>One tool for everything:</b> a 200-page document may not fit in the context window of a free tier.</li>
                        <li>❌ <b>No definition</b> of what you're looking for in the data, who the dashboard is for, and what the summary should produce.</li>
                    </ul>

                    <h4>✅ An engineered prompt: one stage per tool</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m8-good-prompt"><b>Stage 1, in ChatGPT (data analysis):</b> Act as a data analyst. The attached users.csv file contains user data. Find 3 main trends, and for each one show the numbers it's based on and the calculation. If a column is unclear, ask before drawing conclusions. Format: a table with trend, supporting figure and a short explanation.<br><br>
<b>Stage 2, in Claude (code):</b> Act as a developer. Build a dashboard in a single HTML file that shows the following 3 trends: [paste the table from stage 1]. The audience: managers with no technical background. No libraries that require installation. Format: complete code in one file, followed by three lines explaining how to open it.<br><br>
<b>Stage 3, in Gemini (long document):</b> Act as a policy consultant. Summarize the attached document into 5 points relevant to a product team. For each point, state a page or section number. If something in the document is unclear, say so and don't fill it in from memory. Format: a numbered list.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m8-good-prompt">📋 Copy the prompts</button>
                    <p class="text-sm text-slate-600">On a free Gemini account the context window is much smaller, so you may need to split a very long document into parts and summarize each part separately. If the document is saved in Drive, you can type @ and choose Google Drive instead of attaching it.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good result look like? (click to open)</summary>
                        <p class="mt-2"><b>Stage 1:</b> a table with 3 trends, each with a number you can check in the file. Check at least one number yourself (for example: count how many rows meet a certain condition).</p>
                        <p><b>Stage 2:</b> a single HTML file that opens in the browser and shows the three trends. Open it and check that the numbers match the table from stage 1.</p>
                        <p><b>Stage 3:</b> 5 points, each with a section or page. Open at least two sections in the document and check that they really say that.</p>
                        <p class="text-sm text-slate-600">The tools in the plan are a recommendation based on the starter table. If you compared and another tool worked better for you at one of the stages, use it.</p>
                    </details>

                    <h4>📋 A template for planning a project across several tools:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m8-template">Project: [short description]
Stage 1: [task] | Tool: [name] | Why: [the relevant strength] | How I'll check the result: [check]
Stage 2: [task] | Tool: [name] | Why: [the relevant strength] | How I'll check the result: [check]
Stage 3: [task] | Tool: [name] | Why: [the relevant strength] | How I'll check the result: [check]
For each stage, write a separate prompt with: role, context, task, constraints, format.</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m8-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: The Same Prompt, Several Tools</h3>
                    <p><b>What you need:</b> two or three of the tools in the table (they all have a free tier). The exercise takes about 20-25 minutes. You don't have to open an account on every tool to do the exercise; it's enough to justify your choice. No access to any tool? Do steps 1 and 4 on paper, based on the starter table.</p>
                    <ol>
                        <li><b>Step 1, project:</b> Choose a project from work or home, or use the example: planning a birthday party (a budget in a spreadsheet, a written invitation, a summary of reviews of venues). Break it into 3 stages.</li>
                        <li><b>Step 2, a prompt for comparison:</b> Copy the prompt below into two or three tools, each in a separate window and a new conversation.</li>
                        <li><b>Step 3, comparison:</b> Give each tool a score of 1-3 for accuracy, length and style. For accuracy: add up the prices in the table yourself and check that they don't go over the budget. Count the words in the invitation.</li>
                        <li><b>Step 4, decision:</b> For each of the 3 stages in the project, write which tool you'll choose, and a one-sentence reason (from the table or from the comparison you did).</li>
                    </ol>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m8-compare-prompt"><b>Role:</b> Act as an event planner.<br>
<b>Context:</b> I'm organizing a 40th birthday party for a friend, in the park, for about 20 guests, on a budget of $1,500.<br>
<b>Task:</b> Write a short invitation for WhatsApp, and a list of 5 items to buy, with an estimated price for each one.<br>
<b>Constraints:</b> The invitation is up to 60 words, in a warm tone. The total of the items must not exceed the budget.<br>
<b>Format:</b> The invitation, followed by a table: item, estimated price, and a total row.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m8-compare-prompt">📋 Copy the comparison prompt</button>

                    <h4>❓ Decision question: two tools wrote a shopping table that totals $1,400. The third tool wrote a longer, more impressive answer, but when you added it up yourself it came to $1,850. Which one gets a high score for accuracy?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-8" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">The third tool, because its answer is more detailed</summary><p class="mt-2">❌ Detail isn't accuracy. It went over the budget you set in the constraints, so it failed on accuracy, even if its style is good.</p></details>
                    <details name="practice-8" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">The two tools that stayed within the budget, after you added up the total yourself</summary><p class="mt-2">✅ Correct. You check accuracy against the requirements and against your own calculation, not by what sounds impressive. Sometimes a tool also writes a wrong total row, so add it up yourself.</p></details>
                    <details name="practice-8" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">There's no way to know, all the tools are equally good</summary><p class="mt-2">❌ That's exactly why you do a comparison. There's a clear criterion here that you can check: the budget.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You ran exactly the same prompt in at least two tools, each in a new conversation.</li>
                        <li>You gave each tool a score for accuracy, length and style, and checked at least one figure yourself.</li>
                        <li>You broke a project into 3 stages, and for each stage chose a tool with a one-sentence reason.</li>
                        <li>You didn't upload sensitive information to any tool.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Which tool would you turn to first, and why? (1) Summarizing 30 emails about a project in Gmail. (2) Analyzing an Excel file of expenses and making a chart. (3) Understanding why a short piece of your code returns a wrong result.</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">(1) Gemini, because of the connection to Gmail. (2) ChatGPT, because it runs Python for data analysis. (3) A tool in reasoning mode: DeepSeek, or the reasoning mode of ChatGPT, Claude or Gemini (and if it's work code, not in DeepSeek). Any other choice with a good reason and an actual check is accepted: the table is a starting point, not a rule.</p></details>`,
        promptScenarios: [
            'Write a prompt that breaks a birthday party planning project (a budget in a spreadsheet, a written invitation, a summary of reviews of venues) into 3 stages, and for each stage asks the model to recommend a tool (Claude, ChatGPT, Gemini or DeepSeek) and give a one-sentence reason.',
            'Write a prompt for coding a simple HTML page (for example a restaurant tip calculator), and state in the prompt itself which tool you chose and why, and how you\'ll check that the code works.',
            'Write a prompt for summarizing a long public document (like terms of service or an annual report) into 5 points with a section number for each point, and state in the prompt which tool you chose and why, and what you\'ll do if the document is too long for the free tier.'
        ]
    },
    9: {
        cases: `
                    <h3>🔥 Case Study: A Monthly Content Calendar for a Yoga Studio</h3>
                    <p><b>The story:</b> You manage the social media of a small neighborhood yoga studio (a made-up business for this exercise). You need a content calendar for next month, on Instagram and Facebook.</p>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Write me posts for a yoga studio for next month."</div>
                    <ul>
                        <li>❌ <b>No target audience:</b> a post for beginners who work at a computer is very different from a post for athletes.</li>
                        <li>❌ <b>No tone and no constraints,</b> so the model may write promises like "cures back pain", which you're not allowed to claim.</li>
                        <li>❌ <b>No quantity and no format:</b> you'll get a long list instead of a table you can work with.</li>
                    </ul>

                    <h4>✅ An engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m9-good-prompt"><b>Role:</b> Act as a social media content manager for small businesses.<br>
<b>Context:</b> A neighborhood yoga studio. Target audience: beginners aged 30-55 who work at a computer and are looking for a break from the screen. Tone: warm, simple, no professional jargon.<br>
<b>Task:</b> Build a content calendar for 4 weeks: each week, one post for Instagram and one post for Facebook.<br>
<b>Constraints:</b> No medical promises (like "cures" or "makes pain go away"). No prices and no promotions, I'll add them. Each text up to 50 words.<br>
<b>Format:</b> A table with the columns: week, network, headline, post text, image idea.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m9-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (two sample rows)</summary>
                        <ul class="mt-2">
                            <li><b>Week 1, Instagram:</b> Headline: "5 minutes between meetings". Text: "Sitting in front of the screen all day? Try three simple stretches by your desk, no mat and no special clothes. And in the evening, come and try our beginners' class." Image: a stretch next to a work desk.</li>
                            <li><b>Week 1, Facebook:</b> Headline: "Your first class". Text: "You don't need to be flexible to start. In the first class you learn to breathe, stand and stretch at your own pace. Feel free to ask us any question in the comments." Image: the studio room, empty and bright.</li>
                        </ul>
                        <p class="text-sm text-slate-600">Check in your answer: there are 8 rows, no medical promises, no prices, and each text is up to 50 words. Then read each post as if you were the customer.</p>
                    </details>

                    <h4>📋 A prompt template for a content calendar:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m9-template">Role: Act as a social media content manager for [type of business].
Context: Target audience: [persona]. Brand tone: [tone].
Task: Build a content calendar for [number] weeks, [number] posts per week, on [networks].
Constraints: [what must not be written]. Each text up to [number] words.
Format: A table with the columns: week, network, headline, post text, image idea.</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m9-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: A Reusable Prompt for a Recurring Task</h3>
                    <p><b>What you need:</b> any chatbot (ChatGPT, Claude or Gemini) and a task that keeps coming back for you. The exercise takes about 20 minutes. No task from work? Choose replying to similar messages in the parents' group chat (there's a sample prompt below), or weekly meal planning. No chatbot? Write the prompt on paper and check it against the self-check.</p>
                    <ol>
                        <li><b>Step 1, choice:</b> Write down a task you do again and again in the same way (for example: replying to similar emails, sorting requests, summarizing a meeting).</li>
                        <li><b>Step 2, examples:</b> Collect 3 examples of input (for example 3 messages), and remove names, phone numbers and identifying details from them.</li>
                        <li><b>Step 3, prompt:</b> Write a prompt with the 5 components (role, context, task, constraints, format). Add a constraint for an exceptional case, for example: "If someone asks something that isn't written here, write 'I'll check and get back to you'".</li>
                        <li><b>Step 4, check:</b> Run the prompt on the 3 examples. In each answer check: is it correct? The right length? The right tone?</li>
                        <li><b>Step 5, improve and save:</b> Fix the prompt based on what you found, and save it in a notes file so you can use it again.</li>
                    </ol>
                    <p><b>Sample prompt (the kindergarten parents' group):</b></p>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m9-example-prompt"><b>Role:</b> Help me draft replies to messages in the kindergarten parents' WhatsApp group.<br>
<b>Context:</b> I'm the parents' committee representative, and people ask me the same questions again and again. The approved information: the parents' meeting is on Tuesday at 19:00 at the kindergarten. The contribution to the teacher's gift is $50, by transfer to the parents' committee by the end of the month.<br>
<b>Task:</b> Draft a reply to the message I'll paste below the prompt.<br>
<b>Constraints:</b> Use only the approved information. If someone asks something else, write "I'll check and get back to you". Up to 2 sentences, in a friendly tone.<br>
<b>Format:</b> Text ready to copy into WhatsApp.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m9-example-prompt">📋 Copy the sample prompt</button>
                    <p class="text-sm text-slate-600">Three messages for testing (made-up): "Hi, when is the meeting?" / "How much do we put in for the gift, and by when?" / "Does anyone know if the kindergarten is open during the holiday break?". For the third message the correct answer is "I'll check and get back to you", because the information isn't in the prompt.</p>

                    <h4>❓ Decision question: your prompt answered the 3 examples nicely. What do you do before using it every day?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-9" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Copy the answers and send them without reading, after all it worked</summary><p class="mt-2">❌ Three examples aren't many. An exceptional case (like the question about the holiday break) could get a made-up answer. Read every answer before you send it.</p></details>
                    <details name="practice-9" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Keep reading every answer before sending, and update the approved information when something changes</summary><p class="mt-2">✅ Correct. The prompt saves you the drafting, but responsibility for what gets sent stays with you. And when a date or amount changes, update the prompt.</p></details>
                    <details name="practice-9" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Delete the "I'll check and get back to you" constraint, so it answers everything</summary><p class="mt-2">❌ That's exactly the constraint that stops the model from making up answers. Just like with a customer service bot: you define when it stops and hands over to a person.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>The task you chose repeats itself in the same way, at least a few times a month.</li>
                        <li>The prompt includes the 5 components, and a constraint for an exceptional case.</li>
                        <li>You tested it on 3 examples without identifying details, and fixed at least one thing.</li>
                        <li>You saved the prompt somewhere you'll find it again.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>In the sample sales table from the lesson, quarter 3 had sales of $135,000 and quarter 4 had $180,000. By what percentage did sales rise? And if a model wrote "25%", what was its mistake?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">An increase of $45,000. Divide by the previous value: 45,000 ÷ 135,000 ≈ 33%. The result "25%" comes from dividing by the new value (45,000 ÷ 180,000). This is a common mistake, which is why you ask the model to show the calculation and check what it divided by.</p></details>`,
        promptScenarios: [
            'Build a prompt for a monthly content calendar for a neighborhood yoga studio: a target audience of beginners aged 30-55 who work at a computer, a warm and simple tone, one post a week for Instagram and one for Facebook, no medical promises, in a table with week, network, headline and text.',
            'Build a prompt that drafts replies to recurring customer emails for an online store (questions about shipping and returns), that uses only approved information you write into the prompt, and defines when not to answer and to hand over to a human agent.',
            'Build a prompt for analyzing quarterly sales data and producing a short management report, using this table: Quarter 1: $120,000 (300 customers), Quarter 2: $150,000 (340), Quarter 3: $135,000 (360), Quarter 4: $180,000 (400). Ask it to show every calculation.'
        ]
    },
    10: {
        cases: `
                    <h3>🔥 Case Study: A Team of Three Agents for a Blog Post</h3>
                    <p><b>The story:</b> You need a short post for the business blog: "5 tips for saving electricity in the summer". With a single prompt the model writes, edits and checks itself all at once, and it's easy to miss mistakes. We'll split the work into three roles, and simulate them by hand in three conversations.</p>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Write a blog post about saving electricity in the summer, and check that there are no mistakes and that the facts are correct."</div>
                    <ul>
                        <li>❌ <b>Writing, editing and fact-checking in one request:</b> the model checks itself, and tends to approve what it has already written.</li>
                        <li>❌ <b>No criteria:</b> what counts as "no mistakes"? What's the length? Who's the post for?</li>
                        <li>❌ <b>No stopping condition and no point where you decide.</b></li>
                    </ul>

                    <h4>✅ Ready-made instructions for three agents:</h4>
                    <p><b>Agent 1, the writer:</b></p>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m10-agent1"><b>Role:</b> You are a content writer for a small business blog.<br>
<b>Context:</b> Target audience: families in Israel who want to save on their electricity bill in the summer.<br>
<b>Task:</b> Write a post titled "5 tips for saving electricity in the summer".<br>
<b>Constraints:</b> Up to 300 words. Don't write numbers or percentages you're not sure about; if you want to mention a figure, mark it [to check]. If you receive feedback, fix only what it mentions.<br>
<b>Format:</b> A title, an opening paragraph of 2 sentences, and 5 numbered tips.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m10-agent1">📋 Copy agent 1's instructions</button>
                    <p><b>Agent 2, the copy editor:</b></p>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m10-agent2"><b>Role:</b> You are a copy editor for English-language text.<br>
<b>Context:</b> Below these instructions, a blog post written by another writer will be pasted.<br>
<b>Task:</b> Find spelling and grammar mistakes, sentences that are too long and unclear words.<br>
<b>Constraints:</b> Don't change the content and don't add facts. Don't rewrite the post.<br>
<b>Format:</b> A list of corrections (what it was and what was fixed), followed by the corrected post.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m10-agent2">📋 Copy agent 2's instructions</button>
                    <p><b>Agent 3, the fact-checker:</b></p>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m10-agent3"><b>Role:</b> You are a careful fact-checker.<br>
<b>Context:</b> Below these instructions, a blog post about saving electricity will be pasted.<br>
<b>Task:</b> Go over every claim and every figure in the post. For each one, decide: "Seems reasonable", "Needs a source" or "Probably wrong", and explain in one sentence.<br>
<b>Constraints:</b> Don't make up sources. If you're not sure, write "Needs a source". At the end, write one decision: "Approved" or "Send back to the writer", and if sending back, an exact list of corrections.<br>
<b>Format:</b> A table: claim, verdict, explanation. Followed by the decision.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m10-agent3">📋 Copy agent 3's instructions</button>
                    <p><b>Stopping condition:</b> 2-3 rounds at most. <b>Human approval point:</b> even if agent 3 wrote "Approved", you read the post and decide whether to publish.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good result look like? (click to open)</summary>
                        <p class="mt-2"><b>Agent 1:</b> a post of up to 300 words with 5 tips, and figures it isn't sure about are marked [to check] instead of made-up numbers.</p>
                        <p><b>Agent 2:</b> a short list of wording corrections, with no change to the content.</p>
                        <p><b>Agent 3:</b> a table in which every figure without a source is marked "Needs a source", and a "Send back to the writer" decision with an exact list, for example: "Tip 2: delete the percentage, or add a source".</p>
                        <p class="text-sm text-slate-600">Notice: agent 3's "Approved" is not a source. A figure marked "Needs a source" you check yourself, or delete. And if after 2-3 rounds there's still no approval, you stop and you decide.</p>
                    </details>

                    <h4>📋 A template for defining an agent in the workflow:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m10-template">Agent [number]: [role name]
Role: You are [role].
Input: [what it receives, and from which agent]
Task: [what it does]
Constraints: [what it must not do]. If you're not sure, say so.
Output: [what it passes on, and in what format]
---
Stopping condition: at most [number] rounds of fixes.
Human approval point: [before which action a person approves]</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m10-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: A Manual Simulation of Three Agents</h3>
                    <p><b>What you need:</b> any chatbot (ChatGPT, Claude, Gemini or another), and the three agents' instructions from the "Templates & case studies" tab (each one has a copy button). The exercise takes about 25 minutes. No task from work? Use the blog post workflow (writer, editor, fact-checker). No chatbot? Plan the workflow on paper using the template, and check it against the self-check.</p>
                    <ol>
                        <li><b>Step 1, conversation 1 (writer):</b> Open a new conversation, paste agent 1's instructions, and get a post.</li>
                        <li><b>Step 2, conversation 2 (editor):</b> Open another new conversation. Paste agent 2's instructions, and below them the post from conversation 1. (A separate conversation for each agent, so each "agent" sees only what you passed to it.)</li>
                        <li><b>Step 3, conversation 3 (fact-checker):</b> In a third new conversation, paste agent 3's instructions, and below them the corrected post from conversation 2.</li>
                        <li><b>Step 4, a round of fixes:</b> If agent 3 wrote "Send back to the writer", go back to conversation 1, paste the list of corrections and write "Fix according to the feedback". Pass the result through agents 2 and 3 again.</li>
                        <li><b>Step 5, stop:</b> Stop after 2-3 rounds at most, even if there's still no "Approved". Read the post yourself and decide: what to delete, what to check, what to publish.</li>
                        <li><b>Step 6, evaluation:</b> Write the same post with a single prompt (the bad prompt from the tab). Compare the two versions by three criteria: correctness, completeness, and meeting the requirements (up to 300 words, 5 tips). Is the workflow worth the effort?</li>
                    </ol>

                    <h4>❓ Decision question: agent 3 is sending the post back for fixes for the third time, each time because of a different figure that has no source. What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-10" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Continue to a fourth and fifth round, until it writes "Approved"</summary><p class="mt-2">❌ Without a stopping condition the loop can go on and on, and every round costs time (and in an automated system, money too). You set 2-3 rounds in advance.</p></details>
                    <details name="practice-10" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Stop and decide yourself: delete the figures that have no source, or look for a source yourself</summary><p class="mt-2">✅ Correct. That's exactly the role of the human approval point: when the workflow gets stuck, a person decides.</p></details>
                    <details name="practice-10" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Drop agent 3, so the post gets through</summary><p class="mt-2">❌ It found a real problem: figures without a source. Dropping the checker doesn't solve it, it only hides it.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You ran each agent in a separate conversation, and passed only the output between them.</li>
                        <li>You had a clear limit of 2-3 rounds, and stopped at it.</li>
                        <li>You read the final post yourself before you "approved" it.</li>
                        <li>You compared it with a single prompt by three criteria, and wrote which version came out better and why.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Plan a workflow of three agents for a small marketing campaign for a neighborhood café. For each agent write a role, input and output, and add a stopping condition and one human approval point.</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">Example: <b>Agent 1 (audience researcher):</b> input: a description of the café; output: 3 customer personas. <b>Agent 2 (copywriter):</b> input: the personas; output: 3 versions of an ad. <b>Agent 3 (checker):</b> input: the ads and the requirements (tone, length, no promises that can't be kept); output: "Approved" or feedback to agent 2. <b>Stopping condition:</b> at most 2 rounds of fixes. <b>Approval point:</b> a person approves before publishing or paying for advertising.</p></details>`,
        promptScenarios: [
            'Plan a workflow of 3 agents (programmer, QA and product manager) for developing a small feature, for example a "Forgot password" button on a website: for each agent write a role, input, output and constraints, and add a stopping condition of up to 3 rounds of fixes.',
            'Plan an agent workflow that helps a recruiter sort résumés for a job (a summary of each candidate against the job requirements and a list of interview questions), where the decision on who gets hired stays with a person, and without considering age, gender or ethnic origin.',
            'Plan an agent workflow for a small marketing campaign for a neighborhood café (audience researcher, copywriter and checker), with a stopping condition and a human approval point before publishing.'
        ]
    }
};

const quizzes = {
    6: [
        {
            id: 'q1',
            question: 'Which Google tool answers from the sources you added, with citations, and can also produce a podcast-style audio overview?',
            options: [
                { id: 'a', text: 'Google Docs' },
                { id: 'b', text: 'Gemini Notebook (formerly NotebookLM)' },
                { id: 'c', text: 'Google Translate' },
                { id: 'd', text: 'Google Sheets' }
            ],
            explanation: 'Gemini Notebook (called NotebookLM until July 2026) answers from your sources, shows citations, and produces study guides and an Audio Overview.'
        },
        {
            id: 'q2',
            question: 'You want Gemini to summarize an email thread from your inbox. What do you do?',
            options: [
                { id: 'a', text: 'Type @, choose Gmail and write the request (and if there\'s no connection, paste the text of the emails).' },
                { id: 'b', text: 'Choose @Google Drive, because that\'s where all of Google\'s information is stored.' },
                { id: 'c', text: 'Send the emails to Google by mail.' },
                { id: 'd', text: 'It isn\'t possible in Gemini.' }
            ],
            explanation: 'The emails are in Gmail, so you choose Gmail from the list that opens after @. Google Drive is for files saved in Drive.'
        },
        {
            id: 'q3',
            question: 'What characterizes Gemini Notebook\'s answers?',
            options: [
                { id: 'a', text: 'They\'re based on the whole internet without distinction.' },
                { id: 'b', text: 'They\'re based on the sources you added, with citations.' },
                { id: 'c', text: 'They\'re always in table format.' },
                { id: 'd', text: 'They\'re available only in English.' }
            ],
            explanation: 'The tool answers from your sources and shows which passage each claim was taken from. If the information isn\'t in the sources, it may say it has no answer.'
        },
        {
            id: 'q4',
            question: 'What is true about Gemini\'s context window, according to the lesson?',
            options: [
                { id: 'a', text: 'In the advanced models it reaches about a million tokens, but in the app the size depends on your plan, and on a free account it\'s much smaller.' },
                { id: 'b', text: 'It removes the need to write a prompt.' },
                { id: 'c', text: 'It\'s the same on all plans: 2 million tokens.' },
                { id: 'd', text: 'It lets you work without an internet connection.' }
            ],
            explanation: 'According to Google, an account without a paid plan gets a 32,000-token window, AI Plus gets 128,000, and only AI Pro and AI Ultra reach a million.'
        }
    ],
    7: [
        {
            id: 'q1',
            question: 'What are models like DeepSeek-R1, or the reasoning modes of ChatGPT, Claude and Gemini, which first write a thinking draft and only then the final answer, called?',
            options: [
                { id: 'a', text: 'Vision Models' },
                { id: 'b', text: 'Reasoning Models' },
                { id: 'c', text: 'Translation Models' },
                { id: 'd', text: 'Small models (SLMs)' }
            ],
            explanation: 'Reasoning models learned during training (through reinforcement learning) to break problems into steps, so they first write a thinking draft and then answer.'
        },
        {
            id: 'q2',
            question: 'For which tasks are reasoning models especially useful, according to the lesson?',
            options: [
                { id: 'a', text: 'Math, logic puzzles and finding bugs in code.' },
                { id: 'b', text: 'Creating images.' },
                { id: 'c', text: 'Especially fast answers to simple questions.' },
                { id: 'd', text: 'Video editing.' }
            ],
            explanation: 'Step-by-step reasoning improves performance on problems that require several steps of logic. Even there the model can be wrong, so you check the answer.'
        },
        {
            id: 'q3',
            question: 'According to the lesson, why did DeepSeek make waves in the AI world?',
            options: [
                { id: 'a', text: 'It showed that a high-performing model can be trained at a relatively low reported training cost.' },
                { id: 'b', text: 'It showed that language models no longer need training data.' },
                { id: 'c', text: 'It showed that only American companies can develop advanced models.' },
                { id: 'd', text: 'It showed that reasoning models are always faster than regular models.' }
            ],
            explanation: 'DeepSeek reported a cost of about $5.6 million to train DeepSeek-V3. Note: the figure covers only the final training run, without the costs of the research, experiments and hardware that came before it.'
        },
        {
            id: 'q4',
            question: 'What does MoE (Mixture of Experts) mean?',
            options: [
                { id: 'a', text: 'A team of human experts who check every answer.' },
                { id: 'b', text: 'An architecture in which the model is made of many "expert" sub-networks, and at each step only a small part of them is activated.' },
                { id: 'c', text: 'A combination of several AI companies in one product.' },
                { id: 'd', text: 'A mode in which the model answers only experts.' }
            ],
            explanation: 'In MoE only a small part of the network is activated at each step, which makes the computation cheaper. MoE is an architecture; what DeepSeek publishes to the public is the model weights (open weights).'
        }
    ],
    8: [
        {
            id: 'q1',
            question: 'According to the starter table in the lesson, which tool is worth starting with for writing code and building small apps?',
            options: [
                { id: 'a', text: 'Claude' },
                { id: 'b', text: 'Gemini' },
                { id: 'c', text: 'DeepSeek' },
                { id: 'd', text: 'There\'s no difference, all the tools are the same' }
            ],
            explanation: 'In the table, Claude is marked as considered strong at writing code and at writing. It\'s a starting point, not a rule: it\'s worth checking for yourself on your own task.'
        },
        {
            id: 'q2',
            question: 'According to the table, which tool is especially suited to summarizing very long documents and working with Google emails and files?',
            options: [
                { id: 'a', text: 'DeepSeek' },
                { id: 'b', text: 'Gemini' },
                { id: 'c', text: 'Claude' },
                { id: 'd', text: 'ChatGPT' }
            ],
            explanation: 'Gemini is marked for its large context window (up to about a million tokens on the advanced plans) and its connection to Gmail, Drive and Docs. On a free account the window is much smaller.'
        },
        {
            id: 'q3',
            question: 'According to the table, which task is DeepSeek (reasoning mode) especially suited to?',
            options: [
                { id: 'a', text: 'Finding bugs in code and math problems.' },
                { id: 'b', text: 'Working with emails in Gmail.' },
                { id: 'c', text: 'Creating a marketing video.' },
                { id: 'd', text: 'Creating marketing images.' }
            ],
            explanation: 'Step-by-step reasoning suits logic problems, math and finding bugs. But today all the tools in the table have a reasoning mode; DeepSeek\'s standout advantage is mainly its low price and open weights.'
        },
        {
            id: 'q4',
            question: 'What is the main principle of the lesson on comparing models?',
            options: [
                { id: 'a', text: 'Choose one tool and use only it for every task.' },
                { id: 'b', text: 'Always choose the cheapest tool.' },
                { id: 'c', text: 'Match the tool to the type of task, and check for yourself by comparing.' },
                { id: 'd', text: 'Use the newest tool in every case.' }
            ],
            explanation: 'It\'s worth knowing several tools, using the table as a starting point, and comparing for yourself by accuracy, length and style.'
        }
    ],
    9: [
        {
            id: 'q1',
            question: 'What is one of the main benefits of AI at work, according to the lesson?',
            options: [
                { id: 'a', text: 'Saving time on recurring tasks, while a person still checks the result.' },
                { id: 'b', text: 'Completely removing the need for human oversight.' },
                { id: 'c', text: 'A guarantee that every output will be 100% accurate.' },
                { id: 'd', text: 'It has no real use in the business world.' }
            ],
            explanation: 'AI prepares a draft quickly, and a person checks it before it goes out. The more expensive a mistake would be, the more careful the check.'
        },
        {
            id: 'q2',
            question: 'What do coding assistants like GitHub Copilot or Cursor let you do?',
            options: [
                { id: 'a', text: 'Write code using requests in plain language, directly inside the code editor.' },
                { id: 'b', text: 'Design a logo only.' },
                { id: 'c', text: 'Manage bank accounts.' },
                { id: 'd', text: 'Translate movies.' }
            ],
            explanation: 'These are tools for programmers that work inside the code editor. How much time they save depends on the task and on experience: studies show different results.'
        },
        {
            id: 'q3',
            question: 'For a model to produce a good monthly content calendar for social media, what should you include in the prompt?',
            options: [
                { id: 'a', text: 'Just the word "content".' },
                { id: 'b', text: 'A target audience persona, the brand tone, constraints and an output format (for example a table).' },
                { id: 'c', text: 'Just the company name.' },
                { id: 'd', text: 'As few details as possible, so the model can be creative.' }
            ],
            explanation: 'This applies the 5 components of a prompt: role, context (persona and tone), task, constraints and format.'
        },
        {
            id: 'q4',
            question: 'An AI-based customer service chatbot relies on the company\'s frequently asked questions (FAQ) file. What is true about it?',
            options: [
                { id: 'a', text: 'It will never make a mistake, so there\'s no need to check it.' },
                { id: 'b', text: 'It can make mistakes, and the company is responsible for what it says, so you limit it to approved information and define when to hand over to a human agent.' },
                { id: 'c', text: 'It doesn\'t need any information about the company.' },
                { id: 'd', text: 'It can only work in English.' }
            ],
            explanation: 'A bot like this can save a lot of time, but it can make mistakes. Limiting it to approved information and handing over to an agent are important constraints.'
        }
    ],
    10: [
        {
            id: 'q1',
            question: 'What is the term for a system in which several AI agents work together to achieve a complex goal?',
            options: [
                { id: 'a', text: 'Few-shot Prompting' },
                { id: 'b', text: 'Multi-Agent System' },
                { id: 'c', text: 'Prompt Template' },
                { id: 'd', text: 'Context Window' }
            ],
            explanation: 'A Multi-Agent System is a system of several agents that pass work to one another.'
        },
        {
            id: 'q2',
            question: 'What is an "agent", according to the lesson?',
            options: [
                { id: 'a', text: 'A human customer service representative.' },
                { id: 'b', text: 'A language model that has been given a role, constraints and access to external tools, and works in a loop to achieve a goal.' },
                { id: 'c', text: 'Antivirus software.' },
                { id: 'd', text: 'An especially long prompt.' }
            ],
            explanation: 'An agent combines a model, a role, constraints and tools, and works in a loop without close guidance at every step. In a real system you also define a stopping condition and human approval points for it.'
        },
        {
            id: 'q3',
            question: 'In the workflow from the lesson, what is the role of the QA agent?',
            options: [
                { id: 'a', text: 'To write the initial code.' },
                { id: 'b', text: 'To check the programmer\'s code and look for bugs and security holes.' },
                { id: 'c', text: 'To market the product.' },
                { id: 'd', text: 'To approve a payment.' }
            ],
            explanation: 'QA is quality control: the agent receives the code, checks it and returns a list of findings.'
        },
        {
            id: 'q4',
            question: 'According to the workflow in the lesson, what does the product manager agent do when it finds that the code doesn\'t meet the original requirements?',
            options: [
                { id: 'a', text: 'Stops the system completely without explaining.' },
                { id: 'b', text: 'Sends the code back to the programmer agent with feedback for fixing.' },
                { id: 'c', text: 'Deletes the project.' },
                { id: 'd', text: 'Approves the code anyway.' }
            ],
            explanation: 'This is the feedback loop that improves the result. In a real system you limit the number of rounds (for example up to 3) and define when a person approves.'
        }
    ]
};

module.exports = { modules, extras, quizzes };
