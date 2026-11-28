// English translation of lessons 01–05 (faithful translation of the Hebrew in server.js / moduleExtras.js / quiz.js).
// Quiz answer keys come only from quiz.js.

const modules = {
    1: {
        title: 'AI Foundations',
        description: 'What a language model is and how it produces an answer, what tokens are, and three core principles for writing a prompt: clarity, context and separating your data.',
        content: `<h3>📘 Lesson 1: An Introduction to Language Models and Core Principles</h3>
                  <p>Tools like ChatGPT and Claude are called <b>chatbots</b>: you write them a message and they reply in text. Behind every chatbot like this is a <b>Large Language Model (LLM for short)</b>. In this lesson you'll briefly see how a model like this produces an answer, and you'll learn three core principles for writing a <b>prompt</b>, meaning the instruction or question you write to the model.</p>

                  <h4>🧰 The tools we'll use in the course</h4>
                  <ul>
                      <li><b>ChatGPT</b> (chatgpt.com): the chatbot made by OpenAI.</li>
                      <li><b>Claude</b> (claude.ai): the chatbot made by Anthropic.</li>
                  </ul>
                  <p>Both have a free plan with a usage limit, and signing up is free. The free plan of either one is enough for all the exercises in the course. You can write prompts in your own language.</p>
                  <p><b>Privacy:</b> don't paste personal or confidential details into the chat, such as ID numbers, customer data or internal documents from work. For the exercises, use the material that appears in the lesson.</p>

                  <h4>🔤 Tokens: the units the model works with</h4>
                  <p>When you send text, the model breaks it into small units called <b>tokens</b>: a word, part of a word or a single character, for example a punctuation mark. The model reads and writes at the level of tokens, not whole words.</p>

                  <h4>🧠 How does a language model produce an answer?</h4>
                  <p>A language model is a kind of <b>neural network</b>, meaning software that learns patterns from a huge number of examples. It was trained on enormous amounts of text.</p>
                  <p>At its core, a language model was trained to predict the next token in a text, based on everything written before it. At each step it calculates which tokens are likely to come next and picks one of them, not always the most likely one, which is why the same question can get different answers. After this basic training, models go through additional training (for example, using feedback from people) that teaches them to answer like a helpful assistant. They don't think like people, so it's important to check what they write.</p>
                  <p>To connect the parts of a text, the model uses a mechanism called <b>Attention</b>: for each token it checks which other tokens, <b>anywhere in the text it received</b> and not only in the same sentence, are relevant to it. That's how an instruction you wrote at the start of your message affects the way it handles the text you pasted at the end.</p>
                  <p><b>What does this mean for you?</b> The model only knows what it learned in training and what you wrote to it. It doesn't know who you are, what the goal is or who the audience is, unless you tell it. That's where the three principles come from.</p>

                  <h4>🌟 Three core principles for writing a prompt</h4>
                  <ol>
                      <li><b>Clarity and specificity:</b> avoid vague requests like "Write me something about marketing". Instead write: "Write a 100-word marketing post for Facebook whose goal is to sell a digital course to an audience of young mothers". Say what you want, how long, for which platform and for whom.</li>
                      <li><b>Rich context:</b> give the model background: who you are, what the goal is, what the platform is. For example: "I'm a business consultant, and I'm preparing a presentation for CEOs of small companies".</li>
                      <li><b>Separating data (Delimiters):</b> delimiters are markers that show the model where the material it needs to process starts and ends, for example """ or --- or <b>XML-style tags</b>: a word inside angle brackets that opens a section, like &lt;text&gt;, and the same word with a slash that closes it, like &lt;/text&gt;. It's only a marker, and you don't need to know how to code. This way the model doesn't confuse your instructions with the text: if an article says "summarize", it will understand that this is part of the article and not an instruction.</li>
                  </ol>

                  <h4>📄 Practice material: a short article</h4>
                  <p>The following article <b>was written especially for practice and is not real news</b>. You can also copy a few paragraphs from a Wikipedia article (en.wikipedia.org) instead.</p>
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m1-article">The council of a fictional town called Palm Hill has decided to replace all the street lights in town with energy-saving LED bulbs. According to the council's announcement, the project will last two years and will begin in the older neighborhoods. The head of the council said the main goal is to save on the electricity bill and put the money toward playgrounds. Some residents are worried that the new light will be too strong and will keep them from sleeping. So in the first stage the council will install new lights on just two streets and collect feedback from residents. At the same time, a form for reporting broken street lights will open on the council's website. The decision on whether to continue the project will be made after a three-month trial.</div>
                  <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m1-article">📋 Copy the article</button>
                  <p>And here's the prompt. Paste the article in the marked place, between the tags:</p>
                  <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m1-summary-prompt">Summarize the article inside the tags in 3 key points only.
Each point in one sentence, in plain language.
Use only information that appears in the article.

&lt;article&gt;
[Paste the article here]
&lt;/article&gt;</pre>
                  <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m1-summary-prompt">📋 Copy the prompt</button>
                  <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good summary look like? (Try it yourself first)</summary>
                      <ol class="mt-2">
                          <li>Palm Hill is replacing its street lights with LED bulbs, to save on electricity and put the money toward playgrounds.</li>
                          <li>Because of concern that the light will disturb sleep, they're starting with a trial on two streets and collecting feedback from residents.</li>
                          <li>The decision on whether to continue will be made after a three-month trial.</li>
                      </ol>
                      <p class="text-sm text-slate-600">Your wording may be different. What matters: only three points, and all the information comes from the article.</p>
                  </details>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Open chatgpt.com or claude.ai. Copy the prompt above, replace "[Paste the article here]" with the article, and send it. Compare it with the sample summary. Then open a new chat and send only the word "Summarize" followed by the article, with no tags and no 3-point limit. What changed in the length and structure of the answer?
                  </div>`
    },
    2: {
        title: 'Anatomy of a Prompt',
        description: 'The five components of a good prompt: role, context, task, constraints and output format, and how constraints help you control the answer and reduce hallucinations.',
        content: `<h3>📘 Lesson 2: Anatomy of a Prompt, the Five Components</h3>
                  <p>In Lesson 1 you saw that the model only knows what you wrote to it. So what should you write? A convenient and common way to build a prompt is to divide it into 5 components. It's not a requirement or an official "standard", but it's a good checklist that helps you not forget anything important.</p>
                  <p>Throughout the lesson we'll use one example: the owner of a small yoga studio wants to let her customers know the studio is moving to a new location.</p>

                  <h4>🧩 The five components</h4>
                  <ul>
                      <li><b>Role:</b> the professional point of view the model answers from. It affects the style and what it emphasizes. Example: "Act as a copywriter who writes for small businesses".</li>
                      <li><b>Context:</b> the situation and the reason for the task: who you are, what happened and who the audience is. Example: "I run a small yoga studio. On the 1st of next month we're moving to a new building, a 5-minute walk from the current location, and it has parking. Most of our customers have been coming to us for years."</li>
                      <li><b>Objective (task):</b> exactly what needs to be done, in one clear action. Example: "Write a WhatsApp message to customers announcing the move."</li>
                      <li><b>Constraints:</b> the rules the answer must follow: length, tone and what's not allowed. Example: "Up to 60 words, a warm tone, and don't make up deals or perks I didn't mention."</li>
                      <li><b>Output Format:</b> what the answer will look like: a paragraph, a numbered list or a table. Example: "One paragraph, and below it a separate line with the new address." Want a table? Write, for example, "Show the answer in a table with 3 columns: date, what's changing, what the customer needs to do". And if you don't want any text around the table, add "Show the table only".</li>
                  </ul>

                  <h4>🚧 Why are constraints so important?</h4>
                  <p>Constraints help you control the length and structure of the answer and prevent "information overload". To reduce <b>hallucinations</b> (information the model makes up and presents as if it were true), add constraints like "Use only the information I gave you" and "If you don't have enough information, say you don't know". Even then, check important facts yourself.</p>
                  <p>A rule like "Don't make up data" also belongs to the Constraints component.</p>

                  <h4>📝 A full example</h4>
                  <p>This is what a complete prompt looks like, with each component labeled on its own line:</p>
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m2-full-example"><b>Role:</b> Act as an experienced copywriter for social media ads.<br>
<b>Context:</b> We're launching a reusable, eco-friendly water bottle, priced above average. The audience: people who work out and care about quality.<br>
<b>Objective:</b> Write 3 catchy slogans for Instagram ads.<br>
<b>Constraints:</b> Up to 5 words per slogan. Don't use the word "green".<br>
<b>Output Format:</b> A numbered list, with no explanations.</div>
                  <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m2-full-example">📋 Copy the example</button>
                  <p>The labels ("Role:", "Context:" and so on) aren't required, but they help you see what's missing, and help the model understand which part is which.</p>

                  <h4>🔧 How do you use the list in practice?</h4>
                  <ul>
                      <li><b>Not every task needs all five.</b> For a short question, like "What's the difference between heat and temperature?", the task alone is enough. The more important or complex the task, the more it pays to add components.</li>
                      <li><b>The order matters less.</b> The main thing is that every component you need is there.</li>
                      <li><b>Answer not good? Check which component is missing.</b> Too long: a constraint is missing. Too generic: context is missing. In an awkward structure: format is missing.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Pick a real task from work, school or home. No ideas? Use this one: "Plan a Friday dinner for eight people, one of whom is vegetarian". In a chatbot (chatgpt.com or claude.ai), first send a short one-line question. Then, in a new chat, send a prompt with all five components, each on a labeled line. Compare: what changed in the answer?
                  </div>`
    },
    3: {
        title: 'Professional Techniques',
        description: 'Zero-shot and Few-shot, Chain of Thought, Chain Prompting and Meta Prompting, and when each one helps.',
        content: `<h3>📘 Lesson 3: Professional Techniques: Examples, Steps and a Prompt That Writes a Prompt</h3>
                  <p>In Lesson 2 you built a prompt from five components. In this lesson you'll get to know four techniques that help when the task requires a fixed structure, a calculation, or several steps.</p>

                  <h4>1️⃣ Zero-shot and Few-shot: without examples or with examples</h4>
                  <ul>
                      <li><b>Zero-shot:</b> you ask for the task directly, without examples. For example: "Translate this sentence into Arabic". This is enough for most simple tasks.</li>
                      <li><b>Few-shot:</b> inside the prompt you give a few examples of input and the desired output, and only then the real task. The model learns the pattern from the examples.</li>
                  </ul>
                  <p><b>When do you use Few-shot?</b> When you want a particular tone, classification into predefined categories (for example sorting customer requests), or output in a fixed, rigid structure. A full example of classifying requests is waiting for you in the "Templates & case studies" tab.</p>

                  <h4>2️⃣ Chain of Thought</h4>
                  <p>Chain of Thought helps especially with problems involving arithmetic, logic and planning: you ask the model to break the problem into steps before the final answer, which also makes it easy for you to see where it went wrong. The classic instruction is "Let's think step by step".</p>
                  <p>To reduce <b>hallucinations</b> (information the model makes up and presents as if it were true), it's just as important to give the model the material itself, ask it to quote from it, and allow it to write "I don't know".</p>
                  <p><b>Note:</b> in some chatbots you can choose between a fast mode and a "Thinking" mode, in which the model spends more time before it answers. The names vary between tools. Many of the newer models (in "Thinking" mode) already think step by step on their own. With them, the instruction "Let's think step by step" usually won't change much. It's still useful with fast models that have no thinking mode, and when you want to see the full solution so you can check it.</p>

                  <h4>3️⃣ Chain Prompting</h4>
                  <p>Breaking a big task into several steps, where the answer from each step is the basis for the next one: in the same chat, or by copying the result into a new chat. For example, writing an article:</p>
                  <ol>
                      <li>Step A: "Write an outline for an article about saving electricity at home."</li>
                      <li>Step B: "Expand only section 1, in two paragraphs."</li>
                      <li>Step C: "Write a 3-sentence summary of the article."</li>
                  </ol>
                  <p>The advantage: you check and fix each step before moving on, instead of getting one long result all at once that's hard to fix.</p>

                  <h4>4️⃣ Meta Prompting: asking the model to help write the prompt</h4>
                  <p>Meta Prompting: you ask the model to help write the prompt itself. For example: "Ask me 5 questions, and then write me the best prompt for...". This is useful when you're not sure what's important to write.</p>
                  <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m3-meta-prompt">I want a prompt that will help me [your task, for example: plan a two-day family trip up north].
Before you write it, ask me 5 questions about what matters to me, and wait for my answers.
After I answer, write me the best prompt for the task, using this structure: role, context, task, constraints and format.</pre>
                  <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m3-meta-prompt">📋 Copy the prompt</button>
                  <p class="mt-2">Read and correct the prompt you get before you use it. You know the task better than the model does.</p>

                  <h4>🧩 A riddle for practice</h4>
                  <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m3-riddle">A bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. How much does the ball cost?</div>
                  <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m3-riddle">📋 Copy the riddle</button>
                  <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">The solution (try it yourself first)</summary>
                      <p class="mt-2">The intuitive answer is 10 cents, and it's wrong: if the ball costs 10 cents, the bat costs $1.10, and together they cost $1.20.</p>
                      <p>The step-by-step solution: the price of the ball is x, so the bat costs x + 1. Together: 2x + 1 = 1.10, so 2x = 0.10 and x = 0.05. <b>The ball costs 5 cents</b>, and the bat $1.05. Check: 0.05 + 1.05 = 1.10, and the difference between them is $1.00.</p>
                  </details>

                  <h4>🧭 Which technique when?</h4>
                  <ul>
                      <li><b>A simple task:</b> Zero-shot.</li>
                      <li><b>A fixed structure, tone or categories:</b> Few-shot.</li>
                      <li><b>Arithmetic, logic and planning, or when you want to check the reasoning:</b> Chain of Thought.</li>
                      <li><b>A long task with several parts:</b> Chain Prompting.</li>
                      <li><b>Not sure what to write:</b> Meta Prompting.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Copy the riddle above, paste it into a chatbot (chatgpt.com or claude.ai), and add: "Answer with a number only". Check whether it's right. Then open a <b>new chat</b>, paste the same riddle, and add: "Solve it step by step, and show each step before the final answer". Compare the answers with each other and with the solution. The model may answer correctly the first time, especially in thinking mode. That's a result too: notice in which answer it's easier for you to check the reasoning.
                  </div>`
    },
    4: {
        title: 'ChatGPT',
        description: 'Analyzing files and data, creating images and Projects in ChatGPT, and what\'s happening with Custom GPTs.',
        content: `<h3>📘 Lesson 4: ChatGPT: Data Analysis, Images and Projects</h3>
                  <p><b>ChatGPT</b> (chatgpt.com) is the chatbot made by OpenAI. Beyond a regular conversation, you can upload files to it, ask it to analyze data, create images and organize work in projects.</p>
                  <p>Most of the features in this lesson are also available on the free plan (uploading files, data analysis, creating images), but with usage limits; on paid plans the limits are higher. The names of buttons and menus are updated from time to time, so if something looks different, look for it in the menu or in the message box.</p>

                  <h4>📊 Data analysis</h4>
                  <p>You upload a file, usually through the <b>+</b> button or the paperclip 📎 in the message box, and ask it to analyze it. ChatGPT supports Excel files (.xls, .xlsx), CSV and PDF. <b>CSV</b> is a simple text file holding a table: each line is a record, and the values in it are separated by commas. Excel can open it.</p>
                  <p>Behind the scenes, ChatGPT writes and runs code in the <b>Python</b> programming language, inside an <b>isolated environment</b>: a closed, separate environment that can't reach websites on the internet. That's how it calculates, summarizes and creates charts. You don't need to know Python: ChatGPT writes and runs the code for you.</p>
                  <p>It's a very useful tool for analyzing reports and trends, but always check important numbers. Tip: ask it to write how it calculated each number, and check at least one number yourself.</p>

                  <h4>🗂️ Projects</h4>
                  <p>A project in ChatGPT is a "smart folder" that brings together chats, files and standing instructions. You write instructions for the project and upload background files, and every chat in the project builds on them, without explaining everything again. Projects are also available on the free plan (with a limit on the number of files: 5 files per project for free). You usually create a new project from the sidebar.</p>
                  <p><b>Example:</b> a project for reviewing contracts. In the instructions you write what to check, and you upload a file with the list of clauses the business doesn't accept. Each new contract is reviewed in a new chat inside the project. The instructions state that the model only flags risks and doesn't approve a contract on its own: <b>the final decision stays with an authorized person</b>. You'll find the full instructions in the "Templates & case studies" tab.</p>
                  <p class="text-sm text-slate-600"><b>And what about Custom GPTs?</b> In the past you could build "Custom GPTs", but OpenAI stopped allowing new GPTs to be created in personal accounts, and they are expected to be retired on December 11, 2026 and replaced by Plugins. You can keep using existing GPTs until then. That's why in this course we'll work with projects.</p>

                  <h4>🎨 Creating images (ChatGPT Images)</h4>
                  <p>ChatGPT also creates images from a description. Image creation is available on all plans, and the free plan has a usage limit. To get a useful image, describe:</p>
                  <ul>
                      <li><b>Subject:</b> what you see in the image.</li>
                      <li><b>Style:</b> photo, illustration, watercolor painting and so on.</li>
                      <li><b>Colors:</b> the main colors, or the brand colors.</li>
                      <li><b>Aspect ratio:</b> for example square (1:1) for a post, or portrait (9:16) for a story.</li>
                      <li><b>What must not appear:</b> for example "no text and no logo".</li>
                  </ul>
                  <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m4-image-prompt">Create an image of a dark blue reusable water bottle, on a wooden table by a window, in soft morning light.
Style: professional product photography.
Colors: blue, white and wood tones.
Aspect ratio: square (1:1), for an Instagram post.
No text and no logo in the image.</pre>
                  <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m4-image-prompt">📋 Copy the image prompt</button>

                  <h4>🧭 Two more things worth knowing</h4>
                  <ul>
                      <li><b>Research:</b> some plans also have a "deep research" mode that searches the web and returns a report with links. There too, open the links and check.</li>
                      <li><b>Privacy:</b> don't upload real company or customer data (names, phone numbers, internal data) without permission. For practice, use the sample data from the lesson.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> In the "Hands-on practice" tab, sample sales data (12 months, 3 products) is waiting for you with a copy button. Go to chatgpt.com, paste it and write above it: "Act as a data analyst. Describe the trend of each product and show a chart of sales by month." Then check one number from the answer yourself.
                  </div>`
    },
    5: {
        title: 'Claude',
        description: 'What\'s special about Claude: the context window and working with long documents, Artifacts for building small tools without coding, Projects, and a first look at MCP and connectors.',
        content: `<h3>📘 Lesson 5: Claude: Long Documents, Artifacts and Projects</h3>
                  <p>Claude, the model made by Anthropic, is especially known for its abilities in writing code, analyzing long documents and tasks that require reasoning. One of the reasons is its large context window: the amount of text it can "keep in mind" in a single conversation.</p>
                  <p>You work with it at <b>claude.ai</b>. Signing up is free, and the free plan has a usage limit. The names of buttons and settings are updated from time to time.</p>

                  <h4>📏 The Context Window</h4>
                  <p>The context window is the amount of text the model can take into account at once: your messages, the files you uploaded and its own replies. It's measured in tokens (the units of text from the first lesson). Whatever doesn't fit in the window, the model doesn't "see".</p>
                  <p>On paid plans, with the newest models, Claude's window reaches up to one million tokens (and with older models 500,000 or 200,000). The size depends on the plan and the model, and Claude isn't the only one with a large window.</p>
                  <p><b>Why is this useful?</b> You can paste a whole long document at once, for example an agreement, and ask it to find contradictions between clauses that are far apart, without splitting it into parts. A large window doesn't mean the model makes no mistakes: check every finding against the document itself.</p>

                  <h4>🛠️ Artifacts: tools and documents in a separate window</h4>
                  <p>When you ask Claude to create something complete and self-contained, like a one-page website, a small tool, a game or a document, it usually opens it in a separate window next to the chat (an Artifact), and if it's a tool, you can try it out there. No window opened? Ask "Create this as an Artifact", and check in the settings that the option for running code and creating files is turned on.</p>
                  <ul>
                      <li><b>What can be an Artifact:</b> for example an HTML website, an interactive tool, a diagram or a document. Claude opens an Artifact when the content is substantial and stands on its own, usually more than 15 lines.</li>
                      <li><b>Availability:</b> Artifacts are available on all plans, including the free one.</li>
                      <li><b>The setting:</b> in Settings, in the Capabilities section, the option "Cloud code execution and file creation" needs to be turned on.</li>
                      <li><b>HTML</b> is the language web pages are built in. Sometimes you'll also see <b>Tailwind</b>, a ready-made design kit for web pages. You don't need to ask for it.</li>
                      <li><b>You don't need to code:</b> Claude writes the code. You describe what the tool should do, try it out and ask for fixes in words.</li>
                  </ul>

                  <h4>📂 Projects</h4>
                  <p>Claude has projects too: a workspace for an ongoing topic. You upload files to the project, write standing instructions for it, and every chat in the project builds on them without uploading them again. Projects are available on all plans, and on the free plan you can create up to 5 projects.</p>

                  <h4>🔌 MCP and Connectors</h4>
                  <p>MCP (Model Context Protocol) is an open standard that lets Claude connect to external tools and data sources. In Claude this appears as "Connectors", and you can use connectors on the free plan too. We'll go deeper into this in Lesson 12.</p>

                  <h4>🔒 Privacy</h4>
                  <p>Don't upload confidential documents, such as real contracts, customer data or internal documents, without permission. For practice, use the sample agreement in the "Templates & case studies" tab, or the public terms of use of any website.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> Go to claude.ai and sign up for free (the free plan has a usage limit). In a new chat, write: "Build me an interactive monthly budget calculator as an Artifact, in a single HTML file: a field for income, fields for expenses by category, and a summary of how much is left that updates instantly. In English." When the window opens, type in numbers and check that the summary is correct. No window opened? Write "Create this as an Artifact".
                  </div>`
    }
};

const extras = {
    1: {
        cases: `
                    <h3>🔥 Case study: a resignation letter</h3>
                    <p><b>The story:</b> You've been a project manager at a tech company for 3 years, and you've decided to move on to a new challenge. You have a very good relationship with your manager, and you want to leave respectfully. You ask a chatbot to draft the resignation letter.</p>

                    <h4>❌ Bad prompt (intuitive):</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Write me a resignation email for my manager"</div>
                    <ul>
                        <li>❌ <b>No context:</b> the model doesn't know your role, how long you worked there or what your relationship with your manager is like, so it will write a generic letter.</li>
                        <li>❌ <b>No constraints:</b> no length or tone was set, so the letter may come out too long or too emotional.</li>
                        <li>❌ <b>No format:</b> it's not clear whether you want a formal letter, a short email or a message.</li>
                    </ul>

                    <h4>✅ Engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m1-good-prompt"><b>Role:</b> Act as a career advisor who drafts formal letters.<br>
<b>Context:</b> I'm leaving my job as a project manager at a tech company after 3 years, to take on a new challenge. I have a very good relationship with my manager, and I want to keep it positive.<br>
<b>Task:</b> Draft a formal, respectful and professional resignation letter.<br>
<b>Constraints:</b> A respectful, matter-of-fact tone, up to 120 words, no drama. If you're missing a detail (for example a date), leave square brackets to fill in.<br>
<b>Format:</b> A formal letter with a subject line, a greeting, the body of the letter and a signature.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m1-good-prompt">📋 Copy the prompt</button>
                    <p>This prompt applies the three principles: <b>clarity</b> (a clear task, length, tone and format), <b>context</b> (who you are and what the situation is) and a <b>clear structure</b> in which every part is labeled. We'll study the five parts (role, context, task, constraints, format) in depth in Lesson 2.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (Click to open)</summary>
                        <p class="mt-2"><b>Subject:</b> Notice of resignation</p>
                        <p>Dear [Manager's name],</p>
                        <p>I'm writing to let you know that I am resigning from my position as project manager at the company. My last working day will be [date], in line with my notice period.</p>
                        <p>After three meaningful years, I've decided to take on a new professional challenge. Thank you for your trust, your guidance and the opportunity to lead challenging projects. I've learned a great deal from you.</p>
                        <p>In the time remaining, I'll make sure the projects I'm responsible for are handed over smoothly, and I'll be glad to help with the handover. I would very much like to stay in touch.</p>
                        <p>Best regards,<br>[Name]</p>
                        <p class="text-sm text-slate-600">Notice: the model left brackets for the date and the names, because we didn't give them to it. That's exactly what we asked for: an empty slot is better than an invented detail.</p>
                    </details>

                    <h4>📋 A ready-to-copy prompt template:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m1-template">Act as [role].
Background: [who I am, what the situation is, who the audience is].
Task: [exactly what needs to be done].
Follow these rules: [length, tone, what not to do].
Present the result in this format: [letter / list / table].</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m1-template">📋 Copy the template</button>
                    <p class="mt-4">You can write prompts in your own language, and the template above works well. Here is another common way to phrase the same template:</p>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm font-mono text-left whitespace-pre-wrap" dir="ltr" id="m1-template-en">Act as a [ROLE].
I need to achieve [OBJECTIVE] because [CONTEXT].
Please make sure to follow these rules: [CONSTRAINTS].
Format the final output as a [FORMAT].</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m1-template-en">📋 Copy the alternative template</button>`,
        practice: `
                    <h3>🏋️ Hands-on exercise: a LinkedIn post from one sentence</h3>
                    <p><b>The scenario:</b> The CEO asked you for a LinkedIn post (a professional social network) summarizing the company's year. All they gave you was one sentence: "We made $2 million this year". The post is aimed at potential investors.</p>
                    <p><b>What you need:</b> ChatGPT (chatgpt.com) or Claude (claude.ai), on the free plan. The exercise takes about 15 minutes. No access to a chatbot? Write the prompt on paper or in a file, and check it against the sample prompt and the self-check list below.</p>
                    <ol>
                        <li><b>Step 1, the short attempt:</b> In a new chat, write only: "Write a LinkedIn post: we made $2 million this year". Note for yourself: who is the post addressed to? Were numbers or details added that you didn't give?</li>
                        <li><b>Step 2, planning:</b> Before you write, answer for yourself: who the audience is (potential investors), what the goal is (to spark interest in the company), which platform (LinkedIn), what length and what tone.</li>
                        <li><b>Step 3, writing:</b> Write a prompt using the three principles: clarity, context and separation. Put the data inside &lt;data&gt; and &lt;/data&gt; tags, and add a rule: "Don't add numbers or facts that don't appear inside the tags".</li>
                        <li><b>Step 4, running it:</b> Open a <b>new chat</b> (so the model isn't influenced by the previous attempt) and run your prompt. Compare with the result from Step 1.</li>
                        <li><b>Step 5, comparing:</b> Open the sample prompt below and check what's missing in yours, or what you did better.</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Sample prompt (try it on your own first)</summary>
                        <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm my-2" id="m1-practice-prompt"><b>Role:</b> Act as a business content writer for professional social networks.<br>
<b>Context:</b> I work at a [company's field] company. The CEO asked for a LinkedIn post summarizing the year. The audience: potential investors who don't know us yet. The goal: to spark interest and invite them to get in touch.<br>
<b>Task:</b> Write a post based on the data inside the tags.<br>
<b>Constraints:</b> Up to 120 words, a professional and optimistic tone without exaggeration. Don't add numbers or facts that don't appear inside the tags. If important information is missing, write a list of questions worth asking the CEO after the post.<br>
<b>Format:</b> An opening sentence, two short paragraphs and a call to action at the end.<br>
&lt;data&gt;We made $2 million this year&lt;/data&gt;</div>
                        <button type="button" class="copy-btn mb-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m1-practice-prompt">📋 Copy the sample prompt</button>
                        <p class="text-sm text-slate-600">Notice: "we made" could mean profit, or the CEO may have meant revenue. That's exactly the kind of question worth clarifying before you publish to investors.</p>
                    </details>

                    <h4>❓ Decision question: the model wrote "40% profit growth compared to last year" in the post. What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-1" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Keep it, it sounds impressive</summary><p class="mt-2">❌ That number wasn't in the data you gave. The model invented it, and publishing a wrong figure to investors could harm the company.</p></details>
                    <details name="practice-1" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Delete the number, ask it to rewrite based only on what's inside the tags, and if you want a comparison figure, check it with the CEO</summary><p class="mt-2">✅ Correct. Every number in the post should come from a source you know. This is exactly where the rule "Don't add numbers that don't appear inside the tags" helps.</p></details>
                    <details name="practice-1" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Change it to "about 40% growth"</summary><p class="mt-2">❌ The word "about" doesn't make an invented number correct. You have no information at all about last year.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>The post is addressed to investors, and not, for example, to customers or employees.</li>
                        <li>The figure "$2 million" is inside &lt;data&gt; tags.</li>
                        <li>You defined a platform, a length and a tone.</li>
                        <li>You checked that the post contains no numbers or facts you didn't give.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>What's missing in this prompt, and how would you improve it? "Write an email to customers about the price change."</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2"><b>Context</b> is missing (who you are, what business, what exactly changed and when) and <b>clarity</b> is missing (length, tone, what the customer needs to do). A sample improved version: "I run a small Pilates studio. From the 1st of next month, the price of a class pass goes up from $400 to $450. Write a short email to customers, up to 80 words, in a warm and respectful tone, that explains the change and mentions that passes already bought will be honored at the old price." And if you attach existing text, for example the old price list, put it between tags.</p></details>`,
        promptScenarios: []
    },
    2: {
        cases: `
                    <h3>🔥 Case study: the same request, with and without constraints</h3>
                    <p><b>The story:</b> You have a small online clothing store. You received six customer reviews, and you want to quickly understand what people are complaining about and what to fix first. The reviews <b>were written especially for this exercise</b>.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m2-reviews">Review 1: "The delivery arrived after 12 days, much later than promised."<br>
Review 2: "The product itself is excellent, but the package arrived torn."<br>
Review 3: "I waited two weeks for the delivery, and nobody answered me in the chat."<br>
Review 4: "The size didn't fit, and the return process was complicated."<br>
Review 5: "Customer service didn't get back to me after three requests."<br>
Review 6: "Fast delivery and a quality product, I'll buy again."</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m2-reviews">📋 Copy the reviews</button>

                    <h4>❌ Before: a prompt without components</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Summarize these reviews for me" [followed by the six reviews]</div>
                    <p>A typical answer to a prompt like this (an illustrative example): <i>"Overall, customers are happy with the quality of the products, but some complain about high prices, delivery times and service..."</i></p>
                    <ul>
                        <li>❌ <b>No role and no context:</b> the model doesn't know you want to decide what to fix first.</li>
                        <li>❌ <b>No constraints:</b> the example mentions "high prices", but no review mentioned price. That's a hallucination.</li>
                        <li>❌ <b>No format:</b> it's hard to see how many times each problem came up, so it's hard to decide what's urgent.</li>
                    </ul>

                    <h4>✅ After: the same request with the five components</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m2-good-prompt"><b>Role:</b> Act as a customer service analyst.<br>
<b>Context:</b> I have a small online clothing store. I want to decide which problem to fix first, based on the reviews inside the tags.<br>
<b>Task:</b> Find the reasons for complaints in the reviews, and count how many reviews mentioned each reason.<br>
<b>Constraints:</b> Use only what is written in the reviews. A positive review is not a complaint. If there isn't enough information to determine something, write "Not enough information". No introduction and no summary.<br>
<b>Format:</b> Show the table only, with the columns: reason, number of reviews (with the review numbers in parentheses), suggested action. Sort from the most common reason to the least common.<br>
&lt;reviews&gt;<br>
[Paste the six reviews here]<br>
&lt;/reviews&gt;</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m2-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (Click to open)</summary>
                        <table class="mt-2 w-full text-sm border border-slate-200">
                            <thead><tr class="bg-slate-50"><th class="p-2 border">Reason</th><th class="p-2 border">Number of reviews</th><th class="p-2 border">Suggested action</th></tr></thead>
                            <tbody>
                                <tr><td class="p-2 border">Delivery delays</td><td class="p-2 border">2 (reviews 1, 3)</td><td class="p-2 border">Check the shipping company and update the real delivery time on the website</td></tr>
                                <tr><td class="p-2 border">No response from customer service</td><td class="p-2 border">2 (reviews 3, 5)</td><td class="p-2 border">Set a maximum response time for requests</td></tr>
                                <tr><td class="p-2 border">Damaged packaging</td><td class="p-2 border">1 (review 2)</td><td class="p-2 border">Check the packaging materials</td></tr>
                                <tr><td class="p-2 border">Complicated return and wrong size</td><td class="p-2 border">1 (review 4)</td><td class="p-2 border">Simplify the return process and add a size chart</td></tr>
                            </tbody>
                        </table>
                        <p class="text-sm text-slate-600 mt-2">Review 6 is positive, so it doesn't appear. And review 3 was counted twice, because it mentions two problems. Compare the model's table with the reviews themselves: does it include a reason that wasn't written?</p>
                    </details>

                    <p><b>What's the difference?</b> With the same six reviews, the second prompt defines a goal (what to fix first), forbids adding information, and asks for a structure you can check line by line.</p>

                    <h4>📋 A ready-to-copy prompt template:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m2-template">Role: Act as [role].
Context: [who I am, what the situation is, why I need this].
Objective: [one clear action].
Constraints: [length, tone, what not to do]. Use only the information I gave you. If there isn't enough information, say you don't know.
Output Format: [numbered list / paragraph / table with the columns ...].
&lt;data&gt;
[Your material, if any]
&lt;/data&gt;</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m2-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on exercise: a weekly work plan from five components</h3>
                    <p><b>The scenario:</b> Nora runs marketing for a neighborhood café, and she asks you for a prompt that will build her a work plan for next week. This is all the information you have (the case <b>was written for this exercise</b>):</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m2-brief">A neighborhood café. Next week (Sunday to Thursday) a winter menu launches, on Tuesday. Nora has 3 hours a day for marketing. The channels: Instagram, and an email mailing list of 400 customers. The advertising budget for the week: $300.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m2-brief">📋 Copy the information</button>
                    <p><b>What you need:</b> ChatGPT (chatgpt.com) or Claude (claude.ai), on the free plan. The exercise takes about 15 minutes. No access to a chatbot? Write the prompt in a file or on paper, and compare it with the sample solution and the self-check list.</p>
                    <ol>
                        <li><b>Step 1, mapping:</b> Read the information and note for yourself which detail belongs to which component (for example: the channels and the budget are context and also the basis for a constraint).</li>
                        <li><b>Step 2, writing:</b> Write the prompt, each component on a separate, labeled line: role, context, task, constraints, format.</li>
                        <li><b>Step 3, constraints:</b> Make sure there's at least one constraint against making things up, for example "Use only the channels and budget I mentioned".</li>
                        <li><b>Step 4, format:</b> Ask for "Show the table only" with columns you choose, for example: day, task, channel, estimated time, cost.</li>
                        <li><b>Step 5, running and checking:</b> Run it in a new chat. Add up the costs and the hours for each day yourself: is everything within the limits you gave?</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Sample solution (try it on your own first)</summary>
                        <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm my-2" id="m2-practice-prompt"><b>Role:</b> Act as an experienced marketing manager for small businesses.<br>
<b>Context:</b> I run marketing for a neighborhood café. Next Tuesday we're launching a winter menu. I have 3 hours a day for marketing, Sunday to Thursday. The channels: Instagram and an email mailing list of 400 customers. The advertising budget for the week: $300.<br>
<b>Objective:</b> Build me a weekly work plan for marketing the launch.<br>
<b>Constraints:</b> No more than 3 hours of work a day. Use only the channels and budget I mentioned, and don't add channels, people or expenses I didn't mention. If something isn't clear to you, write one question at the end.<br>
<b>Output Format:</b> Show the table only, with the columns: day, task, channel, estimated time, cost.</div>
                        <button type="button" class="copy-btn mb-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m2-practice-prompt">📋 Copy the sample solution</button>
                        <p class="text-sm text-slate-600">A reasonable plan will include, for example, preparing photos and a "coming soon" post at the start of the week, an email to the mailing list on launch day, and a sponsored promotion on Instagram with a budget of up to $300.</p>
                    </details>

                    <h4>❓ Decision question: which constraint best prevents the model from recommending an ad in the local newspaper?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-2" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">"Write in a professional way"</summary><p class="mt-2">❌ That's an instruction about tone, and it doesn't limit the content. The model can still suggest a channel you don't have.</p></details>
                    <details name="practice-2" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">"Use only the channels and budget I mentioned"</summary><p class="mt-2">✅ Correct. This constraint limits the answer to the information you gave, so it also reduces made-up content.</p></details>
                    <details name="practice-2" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">"Show the table only"</summary><p class="mt-2">❌ That's format. It decides what the answer looks like, not what it's allowed to suggest.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>All 5 components appear and are labeled.</li>
                        <li>The output came in the format you asked for (a table with the columns you chose).</li>
                        <li>The table has no channels or expenses you didn't give, and the total cost doesn't exceed $300.</li>
                        <li>No day in the table goes over 3 hours of work.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Which component does each sentence belong to?</p>
                    <ol>
                        <li>"Act as a study advisor."</li>
                        <li>"I'm the mother of a middle-school student who is preparing for his first math test."</li>
                        <li>"Write 5 tips for preparing for a test."</li>
                        <li>"Each tip up to 15 words, with no technical terms."</li>
                        <li>"A numbered list."</li>
                    </ol>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">1. Role. 2. Context. 3. Objective (task). 4. Constraints. 5. Output Format.</p></details>`,
        promptScenarios: []
    },
    3: {
        cases: `
                    <h3>🔥 Case study: sorting customer requests with examples (Few-shot)</h3>
                    <p><b>The story:</b> You're in charge of an app's support inbox. Every request needs to go into one of three fixed categories: <b>Technical support</b>, <b>Sales and billing</b> or <b>Complaint</b>. You want the model to sort into exactly these three, and not invent new categories.</p>

                    <h4>❌ Bad prompt (intuitive):</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Which department does this request belong to: 'Do you have a student discount?'"</div>
                    <p>A typical answer (an illustrative example): <i>"The request belongs to the customer service department or the promotions department."</i></p>
                    <ul>
                        <li>❌ <b>The model doesn't know which categories exist</b>, so it invents names.</li>
                        <li>❌ <b>No examples</b>, so there's no pattern to learn from.</li>
                        <li>❌ <b>No format:</b> a full-sentence answer is hard to pass along or count.</li>
                    </ul>

                    <h4>✅ Engineered prompt (Few-shot):</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m3-good-prompt">Sort each customer request into one of these three categories only: Technical support, Sales and billing, Complaint.<br>
Answer with the category name only. If a request doesn't fit any category, write "Unclear".<br>
<br>
Examples:<br>
Request: "My account is blocked and I can't log in" → Technical support<br>
Request: "How much does your annual subscription cost?" → Sales and billing<br>
Request: "I waited on the line for an hour and nobody answered" → Complaint<br>
<br>
Now sort:<br>
1. "Do you have a student discount?"<br>
2. "The app closes every time I open the settings"<br>
3. "The representative was rude, and I want to speak to a manager"</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m3-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What's the right answer? (Click to open)</summary>
                        <ol class="mt-2">
                            <li>"Student discount" → <b>Sales and billing</b> (a question about price).</li>
                            <li>"The app closes" → <b>Technical support</b> (a problem with the product).</li>
                            <li>"The representative was rude" → <b>Complaint</b> (dissatisfaction with the service).</li>
                        </ol>
                        <p class="text-sm text-slate-600">Check that the model used only the category names, exactly as written, with no explanations.</p>
                    </details>

                    <h4>📋 A ready-to-copy Few-shot template:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m3-template">Sort each [item, for example: request / email / review] into one of these categories only: [Category 1], [Category 2], [Category 3].
Answer with the category name only. If there's no match, write "Unclear".

Examples:
[Sample input 1] → [Category 1]
[Sample input 2] → [Category 2]
[Sample input 3] → [Category 3]

Now sort:
[Your items, each on a separate line]</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m3-template">📋 Copy the template</button>
                    <p class="mt-2 text-sm text-slate-600">Tip: give at least one example for each category, and use the category names in exactly the same wording everywhere in the prompt.</p>`,
        practice: `
                    <h3>🏋️ Hands-on exercise: calculating a price step by step (Chain of Thought)</h3>
                    <p><b>The problem (figures for this exercise only):</b> Suppose, for this exercise, a product priced at $1,000, a 10% discount and then an additional 5% discount on the reduced price, followed by VAT of 18% (a rate for this exercise only). What is the final price? (VAT = value-added tax, a tax added to the price.)</p>
                    <p><b>What you need:</b> ChatGPT (chatgpt.com) or Claude (claude.ai), and a calculator (for example on your phone). The exercise takes about 15 minutes. No chatbot? Solve it yourself with a calculator and compare with the sample solution.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m3-direct-prompt">A product costs $1,000. It has a 10% discount, followed by an additional 5% discount on the reduced price. VAT of 18% is added to the price after the discounts. What is the final price? Answer with a number only, no explanation.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m3-direct-prompt">📋 Copy prompt A (direct)</button>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m3-cot-prompt">A product costs $1,000. It has a 10% discount, followed by an additional 5% discount on the reduced price. VAT of 18% is added to the price after the discounts. What is the final price?<br>
Solve it step by step: show each calculation on a separate line, with the price after that step, and only at the end write the final price.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m3-cot-prompt">📋 Copy prompt B (step by step)</button>
                    <ol>
                        <li><b>Step 1, without AI:</b> Solve it yourself with a calculator and write down the result.</li>
                        <li><b>Step 2, directly:</b> In a new chat, paste prompt A. Write down the answer.</li>
                        <li><b>Step 3, step by step:</b> Open a <b>new chat</b> and paste prompt B.</li>
                        <li><b>Step 4, checking:</b> Compare both answers with the sample solution. If there's a mistake in the step-by-step answer, find the step where it crept in.</li>
                        <li><b>Step 5, thinking mode:</b> If your tool is in "Thinking" mode, both answers may be correct. That's expected: the model already thinks step by step on its own. The advantage of prompt B is that you see the calculation and can check it.</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Sample solution (try it on your own first)</summary>
                        <ol class="mt-2">
                            <li>A 10% discount: 1,000 × 0.90 = <b>$900</b>.</li>
                            <li>An additional 5% discount on 900: 900 × 0.95 = <b>$855</b> (5% of 900 is $45).</li>
                            <li>VAT of 18%: 855 × 1.18 = <b>$1,008.90</b> (the VAT itself: 855 × 0.18 = $153.90).</li>
                        </ol>
                        <p><b>The final price: $1,008.90.</b></p>
                    </details>

                    <h4>❓ Decision question: the model answered $1,003. What probably happened?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-3" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">It calculated the VAT incorrectly</summary><p class="mt-2">❌ 850 × 1.18 = 1,003, meaning the VAT was calculated correctly, but on the wrong price.</p></details>
                    <details name="practice-3" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">It added the two discounts together to make 15% and took them off 1,000</summary><p class="mt-2">✅ Correct. 1,000 minus 15% = 850, and 850 × 1.18 = 1,003. But the 5% discount is on the reduced price (900), not on 1,000. This is exactly why you ask to see the steps: the mistake shows up right away in the second step.</p></details>
                    <details name="practice-3" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">1,003 is correct, the difference comes from rounding</summary><p class="mt-2">❌ A gap of $5.90 is too big to be rounding. It comes from a mistake in the method of calculation.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You got $1,008.90 yourself, or found where you went wrong.</li>
                        <li>The step-by-step answer shows three calculations: 900, 855 and 1,008.90.</li>
                        <li>You checked whether the direct answer is correct, and if not, at which step it probably went wrong.</li>
                        <li>You opened a new chat for each attempt.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>A product priced at $200. A 20% discount, then an additional 10% discount on the reduced price, followed by VAT of 18% (for this exercise). What is the final price? Write out the steps.</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">200 × 0.80 = $160. Then 160 × 0.90 = $144. Then 144 × 1.18 = <b>$169.92</b>.</p></details>`,
        promptScenarios: [
            'Write a Few-shot prompt that classifies customer requests into one of three fixed categories: Technical support, Sales and billing or Complaint. Include one example for each category, and ask for an answer with the category name only.',
            'Write a Chain of Thought prompt that asks the model to calculate, step by step, the final price of a $1,000 product after a 10% discount, an additional 5% discount on the reduced price and VAT of 18% (a figure for this exercise), and to show each step on a separate line.',
            'Write the first step in a chain of prompts (Chain Prompting) for rewriting a dry marketing paragraph into persuasive language: in this step, ask only for a list of 3 key benefits from the paragraph, to serve as the basis for the next step.'
        ]
    },
    4: {
        cases: `
                    <h3>🔥 Case study: a project for reviewing supplier contracts</h3>
                    <p><b>The story:</b> You work at a small business that orders goods from suppliers. Before every signature, you need to make sure the contract has no clauses the business doesn't accept. Instead of explaining everything to ChatGPT from scratch every time, you build a project with standing instructions and a background file. The list and the contract here <b>were written for this exercise</b>.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m4-forbidden"><b>Forbidden clauses (the project's background file):</b><br>
1. Automatic renewal of the contract.<br>
2. Advance payment of more than 50% of the amount.<br>
3. The business waiving its right to cancel the contract.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m4-forbidden">📋 Copy the list of forbidden clauses</button>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m4-contract"><b>An excerpt from a supplier contract (to review):</b><br>
Clause 1: The supplier will supply 200 printed shirts by the 15th of the month.<br>
Clause 2: The customer will pay 30% of the amount on signing, and the balance on delivery.<br>
Clause 3: The contract will renew automatically every year, unless one of the parties gives notice otherwise.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m4-contract">📋 Copy the contract excerpt</button>

                    <h4>❌ Bad prompt (intuitive):</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">In a regular chat, from scratch every time: "Check whether this contract is OK" [followed by the contract]</div>
                    <ul>
                        <li>❌ <b>"OK" according to what?</b> The model doesn't know which list to check against.</li>
                        <li>❌ <b>You start from zero in every chat</b>, and it's easy to forget an important rule.</li>
                        <li>❌ <b>No limit on the role:</b> the model may "approve" the contract, and that's not its decision.</li>
                    </ul>

                    <h4>✅ Project instructions (engineered prompt):</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m4-good-prompt"><b>Role:</b> You are an assistant for the initial review of supplier contracts at our business.<br>
<b>Context:</b> The "Forbidden clauses" file in the project contains a list of clauses the business doesn't accept. In each chat I'll paste or upload a new contract.<br>
<b>Task:</b> Check every clause in the contract against the list. If a clause is problematic, quote it exactly and explain the risk in plain language.<br>
<b>Constraints:</b> Rely only on the contract and the list. If a clause is unclear, write "Unclear, needs checking" and don't guess. Never approve a contract yourself: the final decision stays with an authorized person.<br>
<b>Format:</b> A table with the columns: clause number, quote, rule from the list, risk. At the end, on a separate line: "Send for legal review: yes/no".</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m4-good-prompt">📋 Copy the instructions</button>

                    <p><b>How to set up the project:</b></p>
                    <ol>
                        <li>On chatgpt.com, in the sidebar, you'll usually choose "New project" and give it a name.</li>
                        <li>In the project settings, in the instructions area, paste the instructions above.</li>
                        <li>Add the list of forbidden clauses to the project as a file. Don't have a file? You can simply paste the list at the end of the instructions.</li>
                        <li>Open a new chat inside the project and paste the contract excerpt.</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (Click to open)</summary>
                        <table class="mt-2 w-full text-sm border border-slate-200">
                            <thead><tr class="bg-slate-50"><th class="p-2 border">Clause</th><th class="p-2 border">Quote</th><th class="p-2 border">Rule from the list</th><th class="p-2 border">Risk</th></tr></thead>
                            <tbody>
                                <tr><td class="p-2 border">3</td><td class="p-2 border">"The contract will renew automatically every year, unless one of the parties gives notice otherwise."</td><td class="p-2 border">1. Automatic renewal</td><td class="p-2 border">If you don't give notice in time, you'll be committed for another year.</td></tr>
                            </tbody>
                        </table>
                        <p class="mt-2">Clauses 1 and 2 don't violate the list: an advance payment of 30% is lower than 50%.</p>
                        <p><b>Send for legal review: yes</b></p>
                    </details>
                    <p class="text-sm text-slate-600"><b>Privacy:</b> before you upload real contracts, check with your managers what you're allowed to upload to an AI tool.</p>

                    <h4>📋 A ready-to-copy "project instructions" template:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m4-template">Role: You are [role] for [the business / the team].
Context: The files in the project contain [what's in the files]. In each chat I'll give you [type of material].
Task: [what to do with each new piece of material].
Constraints: Rely only on [the files / the material I give]. If something is missing or unclear, say so and don't guess. [What you must not decide on your own].
Format: [table / list], and at the end a fixed summary line: [for example "Needs human review: yes/no"].</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m4-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on exercise: analyzing sales data</h3>
                    <p><b>What you need:</b> ChatGPT (chatgpt.com) with a free account, and the sales data below. The exercise takes about 20 minutes. No account? You can do Step 4 yourself with a calculator and compare with the sample solution. Want different data? Ask ChatGPT to create a sample CSV file.</p>
                    <p>The data is <b>made up for this exercise</b>: monthly sales of a small store, in units.</p>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap" id="m4-sales-csv">Month,Water bottles,Backpacks,Hats
January,120,40,60
February,118,45,62
March,125,52,58
April,122,58,61
May,119,63,59
June,124,70,60
July,121,76,240
August,123,83,63
September,120,88,57
October,126,95,62
November,122,101,60
December,125,108,61</pre>
                    <button type="button" class="copy-btn mt-2 mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m4-sales-csv">📋 Copy the data (CSV)</button>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m4-analysis-prompt"><b>Role:</b> Act as a data analyst.<br>
<b>Context:</b> This is monthly sales data (in units) of a small store, for three products, over 12 months. The data appears below the instructions.<br>
<b>Task:</b> 1. Describe the trend of each product. 2. Find one notable anomaly. 3. For each product, calculate the change from January to December, in units and in percent. 4. Create a line chart of sales by month, one line per product.<br>
<b>Constraints:</b> Rely only on the data. Show how you calculated each number. If the data has no information that explains something, say so and don't guess a reason.<br>
<b>Format:</b> Three short bullet points of findings, a small table of the changes, and then the chart.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m4-analysis-prompt">📋 Copy the prompt</button>
                    <ol>
                        <li><b>Step 1, opening:</b> Go to chatgpt.com and open a new chat.</li>
                        <li><b>Step 2, pasting:</b> Paste the prompt, and below it the data. (You can also paste the data into a text file, save it as sales.csv and upload it with the + button or the paperclip.)</li>
                        <li><b>Step 3, the chart:</b> If no chart appeared, write: "Show this as a line chart".</li>
                        <li><b>Step 4, your check:</b> Calculate the change in backpacks from January to December yourself, and compare with what ChatGPT wrote.</li>
                        <li><b>Step 5, a follow-up question:</b> Ask "Why was there a jump in hats in July?" and check: did it admit there's no explanation for this in the data, or did it make up a reason?</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Sample solution (try it on your own first)</summary>
                        <ul class="mt-2">
                            <li><b>Backpacks, the trend:</b> a rise every month, from 40 in January to 108 in December. An increase of 68 units, which is 170% (68 ÷ 40 = 1.7).</li>
                            <li><b>Water bottles:</b> stable, between 118 and 126 a month. From 120 in January to 125 in December: an increase of 5 units, about 4% (5 ÷ 120).</li>
                            <li><b>Hats, the anomaly:</b> usually around 60 a month, but 240 in July, about 4 times the usual. From January (60) to December (61): an increase of one unit, less than 2%.</li>
                            <li><b>What the data doesn't tell you:</b> why there was a jump in July. That's a question for the sales team.</li>
                        </ul>
                    </details>

                    <h4>❓ Decision question: ChatGPT wrote "The jump in hats in July was due to a summer sale". What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-4" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Put it in the report, it sounds logical</summary><p class="mt-2">❌ The data contains no information at all about a sale. That's a hypothesis, not a finding.</p></details>
                    <details name="practice-4" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Write in the report that there was an anomaly in July, and check with the sales team what happened</summary><p class="mt-2">✅ Correct. You report what you see in the data, and you find out the reason from a source that knows.</p></details>
                    <details name="practice-4" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Delete July from the data, so the chart looks clean</summary><p class="mt-2">❌ An anomaly is information. You delete a data point only when you know it's a mistake, and then you write that you deleted it.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You used only the sample data, with no real customer data.</li>
                        <li>You identified the trend (backpacks rising) and the anomaly (hats in July).</li>
                        <li>You checked one number yourself (from 40 to 108 = an increase of 170%) and it matches, or you found a mistake.</li>
                        <li>Your conclusions don't include a reason that doesn't appear in the data.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Every week you prepare a sales report with the same instructions and the same background file. What should you set up in ChatGPT, and what will you put in it?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">A Project. In the instructions: what to analyze, in what format, and that every calculation must be shown. In the files: the background file, for example the list of products and targets (up to 5 files per project for free). Every week you open a new chat inside the project and upload only the new data.</p></details>`,
        promptScenarios: [
            'Write a prompt that asks ChatGPT to analyze a CSV file of monthly sales (12 months, 3 products), describe the trend of each product, find one anomaly, produce a chart and show how it calculated each number.',
            'Write instructions for a Project in ChatGPT that reviews supplier contracts against a list of forbidden clauses, quotes every problematic clause and always ends with the line "Send for legal review: yes/no", without approving a contract on its own.',
            'Write a prompt for ChatGPT to create a marketing image for a new product, specifying the subject, style, colors, aspect ratio and what must not appear in the image.'
        ]
    },
    5: {
        cases: `
                    <h3>🔥 Case study: finding contradictions in an agreement</h3>
                    <p><b>The story:</b> You received a draft agreement for office cleaning services. Before you sign, you want to know whether it has clauses that contradict each other. The agreement here is short, so you can check Claude yourself, and the same method works on documents dozens of pages long. The agreement <b>was written for this exercise and is not a real contract</b>.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m5-contract"><b>Cleaning services agreement (practice text)</b><br>
1. The company will provide cleaning services at the client's office twice a week, on Sundays and Wednesdays.<br>
2. The monthly payment is $2,000, and will be paid by the 10th of each month.<br>
3. Either party may cancel the agreement with 30 days' advance notice.<br>
4. Cleaning will take place in the evening, after 18:00.<br>
5. No cleaning will take place on public holidays, and it will not be replaced by another day.<br>
6. The monthly payment will be paid by the 1st of each month.<br>
7. The agreement cannot be cancelled in the first year.<br>
8. The company will supply the cleaning materials at its own expense.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m5-contract">📋 Copy the agreement</button>
                    <p>Want a longer document? Ask Claude to create one, and then check it <b>in a new chat</b>, so the model doesn't "remember" where it planted the contradictions:</p>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m5-make-contract">Write a fictional draft agreement for [field, for example: gardening] services, with 20 numbered clauses.
Deliberately include two contradictions between clauses that are far apart from each other.
At the end, after a dividing line, write which clauses contradict each other.</pre>
                    <button type="button" class="copy-btn mt-2 mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m5-make-contract">📋 Copy the prompt for creating an agreement</button>
                    <p class="text-sm text-slate-600">When you move the agreement to the new chat, copy it <b>without</b> the part after the dividing line.</p>

                    <h4>❌ Bad prompt (intuitive):</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Go over the contract and tell me if it's OK" [followed by the agreement]</div>
                    <ul>
                        <li>❌ <b>"OK" isn't defined:</b> the model may write general comments about the wording, instead of looking for contradictions.</li>
                        <li>❌ <b>No request to quote:</b> without a quote and a clause number, it's hard to check.</li>
                        <li>❌ <b>No limit on the role:</b> it may "recommend signing". That's your decision, and with real contracts it's worth consulting a professional.</li>
                    </ul>

                    <h4>✅ Engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m5-good-prompt"><b>Role:</b> Act as a careful and precise assistant for reviewing documents (not as a lawyer).<br>
<b>Context:</b> This is a draft agreement I'm considering signing. I want to know whether it has clauses that contradict each other.<br>
<b>Task:</b> Read the whole agreement inside the tags and find every pair of clauses that contradict each other.<br>
<b>Constraints:</b> A contradiction is two clauses that can't both be fulfilled together. In each contradiction, quote both clauses exactly, with their numbers. Don't report clauses that only look different. If there are no contradictions, say so. Don't give legal advice and don't recommend whether to sign.<br>
<b>Format:</b> A table with the columns: first clause, second clause, what the contradiction is, question to clarify with the other party.<br>
&lt;contract&gt;<br>
[Paste the agreement here]<br>
&lt;/contract&gt;</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m5-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (Click to open)</summary>
                        <table class="mt-2 w-full text-sm border border-slate-200">
                            <thead><tr class="bg-slate-50"><th class="p-2 border">First clause</th><th class="p-2 border">Second clause</th><th class="p-2 border">What the contradiction is</th><th class="p-2 border">Question to clarify</th></tr></thead>
                            <tbody>
                                <tr><td class="p-2 border">2: "will be paid by the 10th of each month"</td><td class="p-2 border">6: "will be paid by the 1st of each month"</td><td class="p-2 border">Two different due dates for the same payment</td><td class="p-2 border">What is the correct payment date?</td></tr>
                                <tr><td class="p-2 border">3: "Either party may cancel... with 30 days' advance notice"</td><td class="p-2 border">7: "cannot be cancelled in the first year"</td><td class="p-2 border">It can't be both cancellable at any time and not cancellable in the first year</td><td class="p-2 border">Is there a commitment period, and if so, what happens after it?</td></tr>
                            </tbody>
                        </table>
                        <p class="text-sm text-slate-600 mt-2">Clauses 1 and 5 are <b>not</b> a contradiction: clause 5 is an exception for public holidays. If the model flagged them, it reported something that only looks different. Check every row in the table against the agreement itself.</p>
                    </details>

                    <h4>📋 A template for building a tool as an Artifact:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m5-template">Build me a [type of tool, for example: calculator / to-do list / quiz] as an Artifact, in a single HTML file.
What the tool does: [a description in a sentence or two].
Fields and buttons: [what you type and what you click].
Requirements: in English, easy to use on a phone too, no external libraries.
Check: give me one example of input and what the correct result is, so I can check that the tool works.</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m5-template">📋 Copy the template</button>
                    <p class="mt-2 text-sm text-slate-600">"External libraries" are ready-made code that the page loads from another website. Asking for no libraries keeps the tool simple, in a single file.</p>`,
        practice: `
                    <h3>🏋️ Hands-on exercise: building a tip calculator without coding</h3>
                    <p><b>What you need:</b> A free account on claude.ai (the free plan has a usage limit). The exercise takes about 15 minutes. No account? Read the prompt, work out the results of the check in Step 3 yourself, and check yourself against the self-check list.</p>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" id="m5-tip-prompt">Build me a tip calculator as an Artifact, in a single HTML file.
Fields: the bill amount in dollars, the tip percentage (buttons for 10%, 12% and 15%), and the number of diners.
Show: the tip amount, the total amount, and how much each diner pays, rounded to the cent.
Requirements: in English, easy to use on a phone, no external libraries.</pre>
                    <button type="button" class="copy-btn mt-2 mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m5-tip-prompt">📋 Copy the prompt</button>
                    <ol>
                        <li><b>Step 1, signing up:</b> Go to claude.ai and sign up for free.</li>
                        <li><b>Step 2, the request:</b> Open a new chat and paste the prompt.</li>
                        <li><b>Step 3, checking:</b> In the Artifact window, enter: a bill of $200, a 10% tip, 4 diners. The correct result: a $20 tip, a total of $220, and $55 per diner.</li>
                        <li><b>Step 4, no window opened?</b> Write "Create this as an Artifact". If it still doesn't, check in the settings (Settings, then Capabilities) that the option "Cloud code execution and file creation" is turned on.</li>
                        <li><b>Step 5, a change in words:</b> Write: "Change the color of the buttons to green and add a 20% button". Check that the window shows an updated version, and that the calculation is still correct.</li>
                        <li><b>Step 6, optional:</b> Build a monthly budget calculator the same way, using the template from the "Templates & case studies" tab.</li>
                    </ol>

                    <h4>❓ Decision question: for $200, a 10% tip and 4 diners, the calculator shows $50 per diner. What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-5" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Leave it, 50 is close enough</summary><p class="mt-2">❌ 50 = 200 ÷ 4, meaning the tip wasn't included in the split. Each diner should pay $55 (220 ÷ 4).</p></details>
                    <details name="practice-5" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Write to Claude: "For $200, 10% and 4 diners it came out to $50 per diner, but it should come out to $55: the tip wasn't included in the split. Fix it."</summary><p class="mt-2">✅ Correct. Describing exactly the input, what came out and what should come out helps the model find the mistake. After the fix, check again.</p></details>
                    <details name="practice-5" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Open a new chat and send the same prompt</summary><p class="mt-2">❌ You may get the same mistake. It's better to describe the problem exactly in the same chat.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>An Artifact window opened, or you knew what to do when it didn't.</li>
                        <li>The check of $200, 10% and 4 diners gave $55 per diner.</li>
                        <li>You asked for a change in words, and saw an updated version in which the calculation is still correct.</li>
                        <li>You didn't write any code yourself, and you didn't enter any personal information.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>A bill of $300, a 15% tip, and 3 diners. What should the calculator show?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">Tip: 300 × 0.15 = $45. Total: $345. Per diner: 345 ÷ 3 = $115.</p></details>`,
        promptScenarios: [
            'Write a prompt that asks Claude to build an interactive monthly budget calculator as an Artifact, in a single HTML file: a field for income, fields for expenses by category and a summary that updates instantly, in English.',
            'Write a prompt that asks Claude to review a long agreement document that you\'ll paste, find contradictions between clauses, quote each pair of contradicting clauses with their numbers and present the findings in a table, without giving legal advice.',
            'Write a prompt that asks Claude to explain in plain language what a short piece of code that you\'ll paste does, find one possible problem in it and suggest a fix, and explain each change in one sentence.'
        ]
    }
};

const quizzes = {
    1: [
        {
            id: 'q1',
            question: 'What is a large language model (LLM), in one sentence?',
            options: [
                { id: 'a', text: 'A system trained to predict the next token based on the context it received, which at each step picks a token from the likely options.' },
                { id: 'b', text: 'Conscious software that understands meaning and emotions like a human being.' },
                { id: 'c', text: 'A database that retrieves pre-written answers based on keywords.' },
                { id: 'd', text: 'A search engine that returns the first result from the internet.' }
            ],
            explanation: 'A language model was trained to predict the next token. At each step it picks a token from the likely options, not always the most likely one, which is why the same question can get different answers. It doesn\'t think like a person, so you check what it writes.'
        },
        {
            id: 'q2',
            question: 'What is a "token"?',
            options: [
                { id: 'a', text: 'A password that gives access to the model.' },
                { id: 'b', text: 'A small unit of text, such as a word, part of a word or a single character, that the model breaks the input into.' },
                { id: 'c', text: 'A whole sentence that the model processes at a time.' },
                { id: 'd', text: 'A fixed payment unit for each conversation.' }
            ],
            explanation: 'The model breaks text into tokens (a word, part of a word or a single character) and reads and writes at that level.'
        },
        {
            id: 'q3',
            question: 'What are delimiters like """ or XML tags in a prompt for?',
            options: [
                { id: 'a', text: 'To make the model answer faster.' },
                { id: 'b', text: 'To hide information from the model.' },
                { id: 'c', text: 'To clearly separate your instructions from the text the model needs to process.' },
                { id: 'd', text: 'To turn on a special coding mode in the model.' }
            ],
            explanation: 'Delimiters show the model what the instructions are and what the material to process is, which reduces confusion. It\'s only a marker, and you don\'t need to know how to code.'
        },
        {
            id: 'q4',
            question: 'Which of the following prompts best applies the principle of "clarity and specificity"?',
            options: [
                { id: 'a', text: '"Write me something about marketing".' },
                { id: 'b', text: '"Write a 100-word marketing post for Facebook whose goal is to sell a digital course to young mothers".' },
                { id: 'c', text: '"Help me with something for Facebook".' },
                { id: 'd', text: '"Marketing, Facebook, course".' }
            ],
            explanation: 'A specific prompt defines the length, platform, goal and target audience, just like the example from the lesson.'
        }
    ],
    2: [
        {
            id: 'q1',
            question: 'Which component of a prompt is responsible for the rules the answer must follow (for example: "Don\'t make up data")?',
            options: [
                { id: 'a', text: 'Role' },
                { id: 'b', text: 'Context' },
                { id: 'c', text: 'Constraints' },
                { id: 'd', text: 'Output Format' }
            ],
            explanation: 'Constraints are the rules the answer must follow: length, tone and what\'s not allowed, including "Use only the information I gave you" and "Don\'t make up data".'
        },
        {
            id: 'q2',
            question: 'The sentence "Act as a copywriter who writes for small businesses" is an example of which component?',
            options: [
                { id: 'a', text: 'Role' },
                { id: 'b', text: 'Objective' },
                { id: 'c', text: 'Constraints' },
                { id: 'd', text: 'Output Format' }
            ],
            explanation: 'Role tells the model which professional point of view to answer from.'
        },
        {
            id: 'q3',
            question: 'The instruction "Show the answer in a table with 3 columns" belongs to the component:',
            options: [
                { id: 'a', text: 'Context' },
                { id: 'b', text: 'Output Format' },
                { id: 'c', text: 'Role' },
                { id: 'd', text: 'Objective' }
            ],
            explanation: 'Output Format decides what the answer will look like: a paragraph, a list or a table.'
        },
        {
            id: 'q4',
            question: 'What is the job of the Context component?',
            options: [
                { id: 'a', text: 'To set the maximum length of the answer.' },
                { id: 'b', text: 'To choose which AI model will answer.' },
                { id: 'c', text: 'To provide the situation and the reason for the task, meaning the background the model needs to answer correctly.' },
                { id: 'd', text: 'To translate the prompt into English.' }
            ],
            explanation: 'Context explains to the model who you are, what the situation is and who the audience is. The length of the answer, for example, belongs to constraints.'
        }
    ],
    3: [
        {
            id: 'q1',
            question: 'What is the Few-shot Prompting technique?',
            options: [
                { id: 'a', text: 'Sending an empty prompt and giving the model complete freedom.' },
                { id: 'b', text: 'Giving a few examples of input and the desired output inside the prompt, to teach the model the pattern.' },
                { id: 'c', text: 'Sending the same prompt several times until you get a good answer.' },
                { id: 'd', text: 'Shortening the prompt to as few words as possible.' }
            ],
            explanation: 'In Few-shot you demonstrate the desired pattern to the model before it tackles the real task.'
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
            explanation: 'The instruction asks the model to break the problem into steps before the final answer. Note: models in "Thinking" mode already do this on their own, and with them the instruction usually doesn\'t change much. It\'s useful with fast models, and when you want to see the solution so you can check it.'
        },
        {
            id: 'q3',
            question: 'What is Chain Prompting?',
            options: [
                { id: 'a', text: 'Breaking a big task into several steps, where the answer from each step is the basis for the next one.' },
                { id: 'b', text: 'Sending one prompt to several models at the same time.' },
                { id: 'c', text: 'Adding a chain of exclamation marks to stress importance.' },
                { id: 'd', text: 'Copying a prompt from someone else.' }
            ],
            explanation: 'For example: an outline, then expanding one section, and finally a summary. You can do it in the same chat, or by copying the result into a new chat.'
        },
        {
            id: 'q4',
            question: 'According to the lesson, when is Few-shot especially suitable?',
            options: [
                { id: 'a', text: 'When you want a creative and completely unpredictable answer.' },
                { id: 'b', text: 'When you want classification into predefined categories or output in a fixed structure.' },
                { id: 'c', text: 'Only when working in English.' },
                { id: 'd', text: 'When the prompt is too long and needs to be shortened.' }
            ],
            explanation: 'Examples dictate a clear pattern to the model, so they suit classification, a particular tone and a fixed structure.'
        }
    ],
    4: [
        {
            id: 'q1',
            question: 'In which programming language does ChatGPT write and run code behind the scenes to analyze Excel/CSV files and produce charts?',
            options: [
                { id: 'a', text: 'Java, directly in the user\'s browser.' },
                { id: 'b', text: 'Python, inside an isolated environment.' },
                { id: 'c', text: 'C++, on the user\'s computer.' },
                { id: 'd', text: 'It doesn\'t run code, it just guesses the results.' }
            ],
            explanation: 'In data analysis, ChatGPT writes and runs Python code in an isolated environment that has no access to websites on the internet. You don\'t need to know Python yourself.'
        },
        {
            id: 'q2',
            question: 'What is a Project in ChatGPT?',
            options: [
                { id: 'a', text: 'A workspace that keeps chats, files and standing instructions together.' },
                { id: 'b', text: 'A new language model that you train from scratch on your personal computer.' },
                { id: 'c', text: 'A browser extension for translating websites.' },
                { id: 'd', text: 'A paid subscription that speeds up answers.' }
            ],
            explanation: 'A project brings together chats, files and standing instructions, and every chat in the project builds on them. It\'s also available on the free plan, with a limit of 5 files per project.'
        },
        {
            id: 'q3',
            question: 'Which task is especially suited to ChatGPT\'s data analysis feature?',
            options: [
                { id: 'a', text: 'Analyzing trends in a sales file and producing a chart.' },
                { id: 'b', text: 'Sending emails on your behalf without approval.' },
                { id: 'c', text: 'Accessing the company database without any permission or connection.' },
                { id: 'd', text: 'Editing a full-length video.' }
            ],
            explanation: 'You upload or paste data, and the model analyzes, calculates and creates charts. You check the important numbers yourself.'
        },
        {
            id: 'q4',
            question: 'In the instructions for the contract-review project from the lesson, why does the model always end with the line "Send for legal review: yes/no" instead of approving a contract on its own?',
            options: [
                { id: 'a', text: 'Because ChatGPT can\'t read contracts.' },
                { id: 'b', text: 'Because the final decision stays with an authorized person, and the model only flags risks.' },
                { id: 'c', text: 'So that the answer is shorter.' },
                { id: 'd', text: 'Because it\'s a technical requirement of every project in ChatGPT.' }
            ],
            explanation: 'This is a deliberate constraint: the model helps with the initial review, but it doesn\'t decide in place of the authorized person.'
        }
    ],
    5: [
        {
            id: 'q1',
            question: 'What is the Claude feature called that opens a separate window next to the chat with complete, self-contained content, like a small tool you can try out?',
            options: [
                { id: 'a', text: 'Projects' },
                { id: 'b', text: 'Artifacts' },
                { id: 'c', text: 'Plugins' },
                { id: 'd', text: 'Canvas Mode' }
            ],
            explanation: 'An Artifact opens in a separate window next to the chat, and if it\'s a tool, you can try it out there. Artifacts are available on all plans, including the free one.'
        },
        {
            id: 'q2',
            question: 'What is the main advantage of Projects in Claude?',
            options: [
                { id: 'a', text: 'They run the code on your own private server.' },
                { id: 'b', text: 'An ongoing workspace with files and standing instructions, without uploading the materials again in every chat.' },
                { id: 'c', text: 'They let you chat with several models from different companies in the same window.' },
                { id: 'd', text: 'They automatically delete the chat history.' }
            ],
            explanation: 'A project keeps files and standing instructions, and every chat in it builds on them. On the free plan you can create up to 5 projects.'
        },
        {
            id: 'q3',
            question: 'Why is a large context window useful when analyzing documents?',
            options: [
                { id: 'a', text: 'It lets you enter a whole long document at once, for example to find contradictions between clauses that are far apart.' },
                { id: 'b', text: 'It guarantees that the model will never make a mistake.' },
                { id: 'c', text: 'It shortens the user\'s typing time.' },
                { id: 'd', text: 'It translates the document automatically.' }
            ],
            explanation: 'When the whole document is inside the context window, the model can compare different parts of it without splitting it. Still, you check every finding against the document.'
        },
        {
            id: 'q4',
            question: 'Which prompt is best for getting an interactive Artifact?',
            options: [
                { id: 'a', text: '"What is HTML?"' },
                { id: 'b', text: '"Build me an interactive monthly budget calculator in a single HTML file".' },
                { id: 'c', text: '"Summarize this article for me in three points".' },
                { id: 'd', text: '"Translate the sentence into French".' }
            ],
            explanation: 'A request to build a complete, self-contained tool is exactly what Claude usually opens as an Artifact. If the window doesn\'t open, you can ask "Create this as an Artifact".'
        }
    ]
};

module.exports = { modules, extras, quizzes };
