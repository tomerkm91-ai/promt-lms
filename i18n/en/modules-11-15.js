// English translation of lessons 11–15 (faithful translation of the Hebrew in server.js / moduleExtras.js / quiz.js).
// Quiz answer keys come only from quiz.js.

const modules = {
    11: {
        title: 'API: How Programs "Talk" to a Language Model',
        description: 'What an API is, what a request to a language model is made of (endpoint, headers and body), how to protect an API key, and how to read a provider\'s official documentation page.',
        content: `<h3>📘 Lesson 11: What Is an API, and How Do You "Talk" to a Language Model from Code?</h3>
                  <p>So far we've worked with AI through a chat window. But when you want a program to use a language model on its own, for example a website that automatically sorts customer requests, it doesn't "type" into a chat. It sends a request through an <b>API (Application Programming Interface)</b>: an agreed, fixed interface that lets two programs communicate in a structured way, without one of them needing to know how the other is built inside.</p>
                  <p>In this lesson you won't write any code. The goal is to understand what such a request is made of, to keep an API key safe, and to know how to read a provider's official documentation page. You'll find the practice material in the "Templates & case studies" and "Hands-on practice" tabs.</p>

                  <h4>🔌 REST in brief: what a conversation between programs looks like</h4>
                  <ul>
                      <li><b>HTTP:</b> the language browsers, apps and servers use to pass requests and responses to each other over the internet.</li>
                      <li><b>REST:</b> a common style for building an API on top of HTTP: each kind of information has its own address, and you reach it with ordinary HTTP requests.</li>
                      <li><b>Endpoint:</b> a specific web address that the server listens on.</li>
                      <li><b>Method:</b> the type of request. <b>GET</b> asks to receive information, and <b>POST</b> sends information to the server.</li>
                      <li><b>JSON:</b> a tidy "name: value" text format that both people and programs can read. For example: <code dir="ltr">{"lesson": 11, "title": "API"}</code>.</li>
                  </ul>
                  <p><b>An example from this website:</b> when you open the list of lessons on this website, the browser sends a GET request to an address that returns the list of lessons (<code dir="ltr">/api/modules</code>). When you submit a quiz, a POST request is sent with your answers (<code dir="ltr">/api/submissions</code>), and the server returns a score.</p>

                  <h4>📨 What a request is made of</h4>
                  <ol>
                      <li><b>Address and method:</b> which endpoint you're calling, and whether it's GET or POST.</li>
                      <li><b>Headers:</b> the request's "envelope", with technical details such as the key and the content type.</li>
                      <li><b>Body:</b> the content itself. In a call to a language model: the model name, the prompt and the settings.</li>
                  </ol>
                  <p>The response usually comes back as JSON, with the text the model wrote inside it.</p>

                  <h4>🔑 API key: a password in every sense</h4>
                  <p>So that the provider knows who is calling it (and can bill the account or block misuse), every request is sent with an <b>API key</b>: a secret string linked to your account. Whoever holds the key can use your account, and sometimes run up charges on your account.</p>
                  <ul>
                      <li><b>Where to keep it:</b> outside the code, for example in environment variables or in a dedicated secrets-management tool. An <b>environment variable</b> is a value saved in the computer's or server's settings, not inside the code file.</li>
                      <li><b>The common mistake:</b> a very common mistake is saving the key in a configuration file (for example a file named <code dir="ltr">.env</code>) and then accidentally uploading the file to GitHub (github.com), a public website for sharing code. A project's collection of files on a site like this is called a <b>repository (repo)</b>. Even if you delete the file afterwards, it stays in the version history and can be found.</li>
                      <li><b>If a key is exposed:</b> revoke it immediately in your account with the provider and create a new key.</li>
                      <li><b>Never</b> paste a real key into a chat with AI, a forum, a message to a friend or a screenshot. The examples in this lesson only show a placeholder: <code dir="ltr">[YOUR_SECRET_KEY]</code>.</li>
                  </ul>

                  <h4>🧠 Calling an AI model: what it looks like</h4>
                  <p>When you call the API of Claude (Anthropic), OpenAI (the company behind ChatGPT) or Gemini (Google), you send a POST request with the model name, the prompt and the settings. Note: ChatGPT is the chat app. Using the API is a separate service, billed separately.</p>
                  <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr">POST https://api.example.com/v1/messages

Headers:
  "[header-name-from-the-docs]": "[YOUR_SECRET_KEY]"
  "content-type": "application/json"

Body:
{
  "model": "[model-name]",
  "max_tokens": 300,
  "messages": [{ "role": "user", "content": "Summarize this lesson for me" }]
}</pre>
                  <p><b>Note:</b> this is a general example meant to illustrate the structure, not a request you can copy as is. Each provider passes the key in a slightly different way: OpenAI expects the header <code dir="ltr">Authorization: Bearer &lt;your key&gt;</code>, Gemini expects the header <code dir="ltr">x-goog-api-key</code>, and Claude accepts the key in the <code dir="ltr">Authorization</code> header (or the legacy <code dir="ltr">x-api-key</code> header) and also requires an <code dir="ltr">anthropic-version</code> header. That's why you always copy the example from the provider's official documentation page.</p>
                  <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr">OpenAI:  Authorization: Bearer [YOUR_SECRET_KEY]
Gemini:  x-goog-api-key: [YOUR_SECRET_KEY]
Claude:  Authorization: Bearer [YOUR_SECRET_KEY]   (or the legacy x-api-key header)
         anthropic-version: [version from the docs]</pre>
                  <ul>
                      <li><b>max_tokens</b> (in Claude; at OpenAI the name is max_output_tokens): a cap on the number of tokens the model generates. A <b>token</b> is a small unit of text the model works with, roughly a word or part of a word. In models that think before they answer, the thinking also counts toward this cap.</li>
                      <li><b>What about temperature?</b> In the past, almost every call to a model also included a parameter called temperature (how "random" the answer is). Today it depends on the provider and the model: in the latest version of the Claude API this parameter no longer exists, and in some "thinking" models it's restricted. So check the documentation to see which parameters the model you chose accepts, and steer the character of the answer mainly through how you word the prompt.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> in the "Templates & case studies" tab you'll find a sample customer request and a ready-made prompt for automatic sorting, which you can also try in a regular chat. In the "Hands-on practice" tab you'll open a provider's official documentation page, find the address, the headers and how the key is passed, and compare with the sample answer.
                  </div>`
    },
    12: {
        title: 'MCP: The Protocol That Connects AI to Tools and Data',
        description: 'What MCP is and who runs it today, the roles of the host, the client and the server, how a tool call actually works, and how to connect a service in Claude carefully.',
        content: `<h3>📘 Lesson 12: MCP - How to Connect a Chatbot to Your Tools and Data</h3>
                  <p>A regular chatbot only knows what's written in the conversation and what it learned in training. It can't see your calendar, your team's spreadsheet or your documents folder. <b>MCP (Model Context Protocol)</b> is an organized way to give an AI app that kind of access. A <b>protocol</b> is an agreed set of rules that defines how two systems talk to each other.</p>
                  <p>MCP is an open protocol that Anthropic published in November 2024. In December 2025 it donated it to the Agentic AI Foundation, which operates under the Linux Foundation, so today it's run as an open-source project rather than as one company's product. It's currently supported by, among others, Claude, ChatGPT, Gemini, VS Code and Cursor (the last two are code editors).</p>

                  <h4>🔌 The analogy: USB-C for AI</h4>
                  <p>Before USB-C, every device had its own connector. Without a shared standard, every AI app needed a special connection to every service, and every service needed a special connection to every app. MCP defines one "socket": a service that has an MCP server can connect to any AI app that supports MCP, and vice versa.</p>

                  <h4>🧩 Who takes part in the connection</h4>
                  <ul>
                      <li><b>Host:</b> the AI app you're working in. MCP works in any AI app that supports it (for example Claude, ChatGPT, VS Code or Cursor). In professional terms the app is called the "host", and inside it runs an "MCP client" that manages the connection to each server.</li>
                      <li><b>MCP client:</b> a <b>client</b> is a program that contacts a server and asks it for a service. An MCP client is a component inside the app, and each server you connect has its own client.</li>
                      <li><b>MCP server:</b> a <b>server</b> is a program that provides a service to other programs. An MCP server exposes the capabilities of a particular service to the app, for example a calendar or a spreadsheet.</li>
                  </ul>
                  <p>An MCP server can expose three kinds of things: <b>tools</b>, meaning actions that can be run, such as "search emails"; <b>resources</b>, meaning information to read, such as files; and <b>prompts</b>, meaning ready-made templates.</p>
                  <p>Two names you'll come across: <b>Claude Desktop</b> is the Claude app installed on your computer. <b>Claude Code</b> is an Anthropic tool for programmers that works mainly from the command window (terminal). Both can act as hosts.</p>

                  <h4>⚙️ How it works in practice</h4>
                  <ol>
                      <li>You write: "What's in this week's sales sheet?" (assuming you've connected an MCP server to the sheet).</li>
                      <li>The model recognizes that it needs a tool and asks to run it.</li>
                      <li>The app makes the call through the MCP server and returns the result to the model.</li>
                      <li>The model goes on to answer based on up-to-date information.</li>
                  </ol>
                  <p>This greatly reduces the need to guess, but it's still worth checking the answer.</p>

                  <h4>🚀 Why it matters</h4>
                  <p>This is the difference between a chatbot that only writes text and an <b>agent</b> that can read real information and take actions in systems. In Lesson 10 we learned about agents. Tools connected through MCP are one of the main ways an agent actually "does things".</p>

                  <h4>🧪 Where to try it, and how to be careful</h4>
                  <ul>
                      <li><b>Claude</b> (claude.ai): in Claude you can turn on "Connectors" from the built-in directory. They're available to all users, including on the free plan, and on the free plan you can also add one custom connector to a remote MCP server. You'll usually find them in the settings (menu names get updated).</li>
                      <li><b>Permissions:</b> connect only services you trust, and give minimal permissions, for example read-only.</li>
                      <li><b>Privacy:</b> connecting your email, calendar or files gives the app access to personal and sometimes sensitive information. Read what the connection asks for before you approve it, and disconnect connections you no longer need.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> in the "Templates & case studies" tab you'll find sample sales data and a prompt that limits an agent to reading and drafts only. In the "Hands-on practice" tab you'll map 3 tools from your work, set a minimal permission for each one, and, if you like, try one connector in Claude.
                  </div>`
    },
    13: {
        title: 'Skills: Saved Instructions the Agent Loads When Needed',
        description: 'What a Skill is and what the Agent Skills standard is, what a SKILL.md file is made of, how a Skill differs from a regular prompt, when it\'s worth building one and where to try it in Claude.',
        content: `<h3>📘 Lesson 13: Skills - When a Prompt Becomes a Permanent Capability</h3>
                  <p>A regular prompt is an instruction you write again in every conversation. A <b>Skill</b> is a saved package of instructions, sometimes with accompanying files and scripts, that the agent loads and uses when it fits the task, without you having to explain again what to do. A <b>script</b> is a short code file that the agent can run.</p>

                  <h4>📂 Agent Skills: an open standard</h4>
                  <p>The term Skill is now the name of an open standard (Agent Skills): every Skill is a folder with an instructions file called <code dir="ltr">SKILL.md</code>, and you can add files and scripts alongside it. The standard was born at Anthropic, and in October 2026 it was donated to the Agentic AI Foundation under the Linux Foundation. According to Anthropic, more than 70 platforms support it, among them Claude, ChatGPT, Cursor and GitHub Copilot. In Claude you can use Skills on all plans, including the free one, provided you've turned on the code execution option in the settings.</p>

                  <h4>🆚 A one-off prompt vs. a permanent Skill</h4>
                  <ul>
                      <li><b>Prompt:</b> every Thursday you paste the week's notes and write again: "Summarize in 5 points, separate what was completed from what's stuck, don't make up details...". Each time a little different, and each time the result is a little different.</li>
                      <li><b>Skill:</b> there's a Skill called <code dir="ltr">weekly-report</code> that already knows all of this. You paste the notes and write "weekly report", and the agent recognizes from the Skill's description that it's time to use it.</li>
                  </ul>

                  <h4>🧾 What a SKILL.md file is made of</h4>
                  <p>At the top of the file there's <b>frontmatter</b>: a few lines between two lines of three hyphens (<code dir="ltr">---</code>), in <b>YAML</b> format, a simple "field: value" writing format. It has two required fields:</p>
                  <ul>
                      <li><b>name:</b> the Skill's name. Lowercase letters, digits and hyphens only, up to 64 characters. For example <code dir="ltr">contract-check</code>.</li>
                      <li><b>description:</b> what the Skill does and when to use it.</li>
                  </ul>
                  <p>There's no separate "Trigger" field: the description field is what the model reads to decide when to use the Skill. That's why it's important that it says explicitly <b>when</b>. After the frontmatter come the instructions themselves, and you can also write them in your own language.</p>
                  <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr">---
name: contract-check
description: Reviews contracts against a list of forbidden clauses. Use when the user uploads a contract or asks to review one.
---
Check the contract against this list of forbidden clauses: [list].
For each risky clause: quote it and explain it in plain language.</pre>

                  <h4>🧩 When it's worth building a Skill</h4>
                  <ul>
                      <li><b>A task that repeats in the same form:</b> a weekly report, checking contracts against a fixed list, formatting a document according to the organization's guidelines.</li>
                      <li><b>When you want consistent results across the team:</b> everyone works from the same instructions. On Claude's organizational plans (Team and Enterprise), admins can distribute Skills to the whole team.</li>
                      <li><b>When not to:</b> for a one-off question, a regular prompt is enough.</li>
                  </ul>

                  <h4>🧪 Where to try it, and what to watch out for</h4>
                  <p>In Claude (claude.ai, including on the free plan) you turn on code execution in the settings, and then you can turn on existing Skills or upload your own Skill as a ZIP file of the folder. Menu names get updated: Anthropic is currently merging Skills, connectors and plugins into a single page called Plugins.</p>
                  <p><b>Caution:</b> a Skill can include scripts that the agent runs. Only use Skills from a source you trust, read the SKILL.md file before you turn it on, and don't put passwords or confidential information in the file.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> in the "Templates & case studies" tab you'll find a sample contract excerpt, a Skill for checking contracts and a ready-made template for a SKILL.md file. In the "Hands-on practice" tab you'll write your own Skill for a weekly report and test it on sample notes, even without installing anything.
                  </div>`
    },
    14: {
        title: 'Plugins and Extensions: Adding Ready-Made Capabilities',
        description: 'What a plugin is in today\'s AI world (in ChatGPT, in Claude and in development environments), how it differs from MCP and from a Skill, when to use each one, and how to evaluate a plugin before installing it.',
        content: `<h3>📘 Lesson 14: Plugins and Extensions - Adding Capabilities Without Building from Scratch</h3>
                  <p>A <b>plugin</b> is an add-on component that extends the capabilities of an existing app without changing its core, similar to a browser extension. In the AI world, a plugin is usually a "package" that bundles several components, for example connections to services and Skills, and is installed in one go.</p>

                  <h4>🧭 Where you come across plugins today</h4>
                  <ul>
                      <li><b>ChatGPT</b> (chatgpt.com): ChatGPT now has a plugin directory (Plugins) that bundles "apps" that connect to external services and Skills (saved instructions). OpenAI announced that custom GPTs will stop working on December 11, 2026 and will be moved to plugins; custom actions don't move with them.</li>
                      <li><b>Claude and Claude Code:</b> Anthropic's tools have plugins for Claude and Claude Code that bundle Skills, subagents, MCP connections and more. A <b>subagent</b> is an additional AI agent that the main agent hands part of the work to. A plugin can also include a <b>slash command</b>: a command that starts with "/".</li>
                      <li><b>Development environments:</b> in the programming world there are extensions for development environments (IDEs), such as GitHub Copilot, an AI-based coding assistant. An <b>IDE</b> is software in which programmers write code. (Cursor, on the other hand, is a standalone code editor built on top of VS Code, not an extension.)</li>
                  </ul>
                  <p>Names in this field change quickly: ChatGPT already had "Plugins" in 2023, the original plugin store closed in spring 2024, they were replaced by GPTs, and now they're back in a new form.</p>

                  <h4>🆚 Plugin, MCP and Skill: what's the difference?</h4>
                  <ul>
                      <li><b>MCP (Lesson 12):</b> an open, vendor-independent protocol. An MCP server works with any app that supports the protocol.</li>
                      <li><b>Skill (Lesson 13):</b> a folder of instructions following an open standard, which the agent loads when it fits.</li>
                      <li><b>Plugin:</b> a "package" from a particular vendor that's installed inside that vendor's system. The package itself doesn't necessarily move between vendors, but it's often built from open components, such as MCP servers and Skills, that can also be used elsewhere.</li>
                  </ul>
                  <p>"Under the hood", many plugins use MCP: Claude Code plugins can include MCP servers, and the ChatGPT apps development kit (Apps SDK) is built on MCP. A <b>proprietary</b> mechanism is one that belongs to a single company and works only on its products.</p>

                  <h4>🛠️ When to use each one</h4>
                  <ul>
                      <li><b>You want a ready-made capability, fast:</b> an existing plugin. For example, searching for hotels inside the chat: booking sites such as Booking.com and Expedia were among the first apps launched inside ChatGPT.</li>
                      <li><b>An organization connecting several AI tools to the same internal systems over time:</b> MCP, because it doesn't lock you into one vendor.</li>
                      <li><b>You have instructions that keep repeating:</b> a Skill.</li>
                  </ul>

                  <h4>📍 Where to find them, and what to check before installing</h4>
                  <p>In ChatGPT: Plugins in the sidebar (or chatgpt.com/plugins). In Claude: the plugins/connectors page in the settings. ChatGPT and Claude have free plans, but some plugins are available only on certain plans or in certain countries.</p>
                  <ul>
                      <li><b>Who built it?</b> The company behind the service itself, or someone else?</li>
                      <li><b>What permissions does it ask for?</b> And are all of them necessary for what you need?</li>
                      <li><b>Where does the information go?</b> A plugin that connects to an external service passes information from the conversation to it, and sometimes the information is stored on servers in other countries. Don't share sensitive information through it without checking.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> in the "Templates & case studies" tab you'll compare a ready-made plugin with your own MCP server using a ready-made prompt. In the "Hands-on practice" tab you'll evaluate one plugin before installing it and answer three questions. No access to the directory? There's a sample plugin card there.
                  </div>`
    },
    15: {
        title: 'Fact-Checking and Hallucinations',
        description: 'Why language models make things up, where it\'s especially dangerous, the five protection rules, and how to ground an answer in a document and check every quote and source yourself.',
        content: `<h3>📘 Lesson 15: Why AI Makes Things Up, and How Not to Fall for It</h3>
                  <p>A <b>hallucination</b> is an answer that sounds confident and professional but is wrong or completely made up: a fact that doesn't exist, a wrong number, a quote nobody said, or a source that doesn't exist at all. The problem isn't that the model "lies" on purpose, but that it words things with the same confidence whether it's right or wrong.</p>

                  <h4>💡 Why does this happen?</h4>
                  <p>As we learned in Lesson 1, a language model calculates the most likely continuation of a text. It doesn't check it against a database of facts. In September 2025, researchers from OpenAI and their colleagues published a paper called <b>Why Language Models Hallucinate</b>, in which they argue that the common training and evaluation methods reward guessing more than admitting uncertainty. Like a student on a multiple-choice test who prefers to guess rather than leave a question blank, the model also "learns" that it's better to guess. According to the paper, part of the reason already lies in the model's initial training on large amounts of text.</p>

                  <h4>🚨 Where hallucinations are especially dangerous</h4>
                  <ul>
                      <li><b>Sources and quotes:</b> names of papers, court rulings, books and links that look completely reliable, and don't exist.</li>
                      <li><b>Numbers and dates:</b> statistics, prices, years and percentages.</li>
                      <li><b>Up-to-date information:</b> things that happened after the model was trained, or prices and terms that change.</li>
                      <li><b>Niche topics:</b> the less information there is about a topic, the greater the chance the model will "fill in the gaps".</li>
                  </ul>

                  <h4>🛡️ The five protection rules</h4>
                  <ol>
                      <li><b>Give the model permission to say "I don't know":</b> write explicitly "If you're not sure, say you don't know. Don't guess."</li>
                      <li><b>Give it the material yourself (grounding):</b> paste the document and instruct "Answer only based on the attached text." This is much more reliable than asking it "from memory".</li>
                      <li><b>Ask for an exact quote:</b> "Quote the exact sentence from the document that the answer is based on", and then check that the sentence really is there.</li>
                      <li><b>Verify every source yourself:</b> open every link, search for every paper or court ruling. A source you didn't find doesn't exist as far as you're concerned.</li>
                      <li><b>The higher the risk, the stricter the check:</b> an idea for a post doesn't need verification. Legal, medical or financial advice always needs checking against a reliable source or a professional.</li>
                  </ol>

                  <h4>⚖️ Two real cases</h4>
                  <ul>
                      <li><b>Mata v. Avianca (USA, 2023):</b> lawyers submitted a filing to a federal court in New York that relied on a series of court rulings, at least six of which simply didn't exist. They had been generated by ChatGPT. In June 2023 the lawyers and their firm were fined $5,000.</li>
                      <li><b>Moffatt v. Air Canada (Canada, 2024):</b> the chatbot on the airline's website gave a customer wrong information about a discount. The tribunal ruled that the company is responsible for what its chatbot said.</li>
                  </ul>
                  <p>The details and the lessons learned are waiting for you in the "Templates & case studies" tab.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> ask a language model a question about a niche topic you know in depth, and ask it to include 3 sources. Check every source: does it exist? Does it really say what the model claimed? In the "Hands-on practice" tab you'll find the full exercise, including a version you can do even without a chatbot.
                  </div>`
    }
};

const extras = {
    11: {
        cases: `
                    <h3>🔥 Case Study: Automatically Sorting Customer Requests Through an API</h3>
                    <p><b>The story:</b> a small company receives dozens of requests a day in its CRM system (a <b>CRM</b> is a system for managing customers and requests). It wants every new request to be sorted automatically by topic and urgency. The company's server will send each request through an API to a language model, and put the answer straight into the system. No person reads the answer beforehand, so the prompt has to be especially precise.</p>
                    <p>A sample request (written especially for this exercise):</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m11-ticket">Hello, two weeks ago I ordered a printer (order 4471) and I still haven't received it. I tried calling twice and nobody answered. I need it for work by Thursday, otherwise I'll ask for a refund.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m11-ticket">📋 Copy the request</button>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Classify this request."</div>
                    <ul>
                        <li>❌ <b>No list of categories:</b> one time it will return "shipping" and another time "delivery problem", and the program receiving the answer won't know what to do with it.</li>
                        <li>❌ <b>No fixed format:</b> the model may write a whole paragraph, and a program can't "read between the lines".</li>
                        <li>❌ <b>No definition of urgency:</b> what counts as "urgent"?</li>
                        <li>❌ <b>No instruction for an unclear case:</b> the model will guess.</li>
                    </ul>

                    <h4>✅ An engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m11-good-prompt"><b>Role:</b> Act as a request classifier at a customer service center.<br>
<b>Context:</b> Your answer is read by a program, not by a person, and goes straight into the request management system.<br>
<b>Task:</b> Classify the request at the end of this message into one topic from: shipping, payment, product fault, refund, other. Set the urgency: "high" if there's a close deadline or a threat to leave, and "normal" in any other case. Choose the topic of the current problem, not of what the customer might ask for later.<br>
<b>Constraints:</b> Use only the values in the list. If the topic is unclear, write "other". Don't add explanations or text outside the format.<br>
<b>Format:</b> JSON only, in exactly this structure: {"topic": "...", "urgency": "...", "reason": "one short sentence"}<br>
<b>The request:</b> [paste the request here]</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m11-good-prompt">📋 Copy the prompt</button>
                    <p class="text-sm text-slate-600"><b>How do you try it without code?</b> Paste the prompt and the request into a regular chat (ChatGPT, Gemini or Claude; all of them have a free plan). It isn't an API call, but this way you test the same prompt the server would send.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (click to open)</summary>
                        <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap mt-2" dir="ltr">{"topic": "shipping", "urgency": "high", "reason": "The order hasn't arrived and the customer needs it by Thursday"}</pre>
                        <p><b>Why "shipping" and not "refund"?</b> The customer is only threatening to ask for a refund. The current problem is that the order hasn't arrived, which is why we added a tie-breaking rule to the prompt. Without that rule, a model may choose one way one time and the other way the next.</p>
                        <p class="text-sm text-slate-600">Note: even when the format is right, it's worth checking a sample of the classifications by eye before you rely on the system.</p>
                    </details>

                    <h4>📋 Template: the structure of a request to a language model API (fill it in from the provider's documentation)</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr" id="m11-template">POST [Endpoint URL from the provider docs]

Headers:
  "[header name from the docs]": "[YOUR_SECRET_KEY]"
  "content-type": "application/json"
  [any other required header, e.g. a version header]

Body:
{
  "model": "[model name]",
  "max_tokens": 200,
  "messages": [{ "role": "user", "content": "[your prompt + the text]" }]
}</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m11-template">📋 Copy the template</button>
                    <p class="text-sm text-slate-600 mt-2">In real code, the value in place of [YOUR_SECRET_KEY] is loaded from an environment variable or a secrets-management tool, and isn't written inside the code.</p>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Reading API Documentation</h3>
                    <p><b>What you need:</b> a browser and about 20 minutes. The providers' documentation pages are open to everyone, and you don't need an account or a key to read them. Most documentation is written in English; if you prefer another language, you can use your browser's translation. No internet access right now? Work on the "sample documentation excerpt" inside the solution below.</p>
                    <ol>
                        <li><b>Step 1, choose a provider:</b> choose one: Claude (Anthropic), OpenAI or Gemini (Google).</li>
                        <li><b>Step 2, find the official page:</b> do a regular search for the provider's name together with the words API documentation. Make sure the address belongs to the provider's official website, not to a blog or another site. Look for a quick-start page (usually Quickstart; names change).</li>
                        <li><b>Step 3, fill in a table:</b> write down: (a) the endpoint address for generating a response, (b) the method (GET or POST), (c) the headers you must send, (d) exactly how the key is passed, (e) the fields sent in the request body, (f) the name of the parameter that limits the length of the response.</li>
                        <li><b>Step 4, compare with the general example:</b> go back to the example in the lesson tab. What's different at the provider you chose? (Hint: the name of the key's header.)</li>
                        <li><b>Step 5, check:</b> open the sample answer below and compare.</li>
                        <li><b>Step 6, optional, a real call:</b> want to try a real call without writing code? In Google AI Studio (aistudio.google.com) you can get a key for the Gemini API and experiment within a free tier (with usage limits; the site is intended for people aged 18 and over). With most other providers, using the API involves setting up a payment method. Keep the key you get to yourself: don't paste it into a chat, into code you share, or anywhere in this course.</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Sample answer: what you find in Claude's documentation (try it yourself first)</summary>
                        <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap mt-2" dir="ltr">POST https://api.anthropic.com/v1/messages

Headers:
  Authorization: Bearer [YOUR_SECRET_KEY]   (or the legacy x-api-key header)
  anthropic-version: [version from the docs]
  content-type: application/json

Body: model, messages, max_tokens</pre>
                        <p><b>What you should have discovered:</b> the method is POST. The key is passed in a header, and its name differs from provider to provider: at OpenAI it's <code dir="ltr">Authorization: Bearer</code>, at Gemini it's <code dir="ltr">x-goog-api-key</code>, and Claude also requires an <code dir="ltr">anthropic-version</code> header. The parameter that limits the length is called <code dir="ltr">max_tokens</code> in Claude, and <code dir="ltr">max_output_tokens</code> at OpenAI. Which fields are required? Check the documentation of the provider you chose.</p>
                    </details>

                    <h4>❓ Decision question: you accidentally uploaded a <span dir="ltr">.env</span> file with an API key to GitHub, and deleted it a minute later. What do you do now?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-11" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Nothing, because the file has already been deleted</summary><p class="mt-2">❌ The file stays in the version history and can be found. A minute is enough for someone to copy it.</p></details>
                    <details name="practice-11" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Revoke the key in your account with the provider, create a new key and keep it outside the code</summary><p class="mt-2">✅ Correct. An exposed key is a burned key. The new key is kept in an environment variable or a secrets-management tool, and the file doesn't get uploaded to GitHub again.</p></details>
                    <details name="practice-11" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Rename the file and upload it again</summary><p class="mt-2">❌ That just uploads the same key one more time. The problem is that the key itself was exposed, not the file's name.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You found the address and the method on the provider's official page, not on a blog.</li>
                        <li>You wrote down exactly how the key is passed at the provider you chose, including the header name.</li>
                        <li>You identified at least one difference between the provider you chose and the general example.</li>
                        <li>At no point did you paste a real key into a chat, into shared code or on this website.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Explain in one sentence: what goes into the headers and what goes into the body of a request to a language model?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">The headers hold the technical details: the key, the content type, and with Claude also the version. The body holds the content itself: the model name, the messages (the prompt) and the token cap.</p></details>`,
        promptScenarios: [
            'Write a prompt that instructs an AI agent to call an external weather API and summarize today\'s forecast. (A writing exercise only; in a regular chat the model doesn\'t call an API on its own unless tools have been connected to it.)',
            'Write a prompt that asks the model to explain what an API key is, where to keep it and what to do if it\'s exposed, as if it were explaining to a beginner programmer.',
            'Write a prompt that asks a model to write short documentation for an endpoint of an existing API: address, method, required headers, fields in the request body and a sample response.'
        ]
    },
    12: {
        cases: `
                    <h3>🔥 Case Study: A Weekly Sales Summary from a Spreadsheet, Without Sending by Mistake</h3>
                    <p><b>The story:</b> you handle sales at a small store. Every Sunday you copy numbers from a spreadsheet, calculate totals and write an email to the team. Let's say you've connected two MCP servers to your AI app: one for the sales sheet and one for email. Now the agent can read the data on its own. The question is what it's allowed to do with it.</p>
                    <p>The sample data (fictional, written for this exercise). This is what the tool returns from the sheet for week 47:</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m12-sales">Week 47, sheet "Sales 2026"<br>
Product | Units sold | Revenue ($)<br>
Printer | 12 | 10800<br>
Ink | 40 | 4000<br>
Paper | 85 | 2125</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m12-sales">📋 Copy the data</button>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Check the sales sheet and send the team a summary."</div>
                    <ul>
                        <li>❌ <b>"Send":</b> an action that can't be undone. If the model got a number wrong, the mistake is already with the whole team.</li>
                        <li>❌ <b>It doesn't say which sheet or which period.</b></li>
                        <li>❌ <b>No boundaries:</b> which tools may it run, and is it allowed to change the sheet?</li>
                        <li>❌ <b>No way to check:</b> we didn't ask to know what the agent read and from where.</li>
                    </ul>

                    <h4>✅ An engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m12-good-prompt"><b>Role:</b> Act as a careful sales assistant.<br>
<b>Context:</b> Two tools are connected to you: the "Sales 2026" sheet (read-only) and email (create drafts only).<br>
<b>Task:</b> Read the week 47 data from the sheet, calculate the total units and the total revenue, and write a short draft email to the team.<br>
<b>Constraints:</b> Don't send any email and don't change the sheet. Don't use a tool that isn't mentioned here. If a piece of data is missing or a tool isn't available, write what's missing and don't guess.<br>
<b>Format:</b> First line: which tools you used and which rows you read. Then a short table of the data with a total row, followed by a draft email of up to 5 lines.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m12-good-prompt">📋 Copy the prompt</button>
                    <p class="text-sm text-slate-600"><b>No connectors?</b> Paste the prompt into a regular chat, and below it: "This is the data the tool returned from the sheet:" followed by the sample data. This way you'll see how a model works with a tool result.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (click to open)</summary>
                        <p class="mt-2"><b>First line:</b> "I used the sheet tool (read-only), and read the 3 rows for week 47. I didn't use the email tool to send anything."</p>
                        <p><b>Summary:</b> a total of 137 units (12 + 40 + 85) and revenue of $16,925 ($10,800 + $4,000 + $2,125).</p>
                        <p><b>Draft:</b> "Hi everyone, in week 47 we sold 137 units, with revenue of $16,925. Printers brought in most of the revenue ($10,800). Full details are in the sheet."</p>
                        <p class="text-sm text-slate-600">Your part: check the totals against the sheet before you send the draft yourself.</p>
                    </details>

                    <h4>📋 A template for setting an agent's permissions for MCP tools:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr" id="m12-template">Available tools (MCP): [Sheet name: read-only], [Email: create drafts only].
Task: [what to do, including the period or scope].
Rules:
- Never use a tool that is not listed above.
- Never send, delete or edit anything. Drafts only.
- If a tool fails or data is missing, say what is missing. Do not guess.
- Start your answer by listing which tools you used and what you read.
Output: [the format you want].</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m12-template">📋 Copy the template</button>
                    <p class="text-sm text-slate-600 mt-2">You can also write the same template in your own language. The important rule: the permissions in the prompt are an extra layer of protection, but the main protection is not giving the connection a permission it doesn't need.</p>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Mapping Tools for an MCP Connection, and a Careful Try</h3>
                    <p><b>What you need:</b> pen and paper or a file, and about 20 minutes. For step 4, which is optional, you need a Claude account (claude.ai, there's a free plan). No account? Steps 1–3 and the sample solution are enough.</p>
                    <ol>
                        <li><b>Step 1, choose:</b> choose 3 tools or systems you work with, for example a calendar, email, a documents folder or a customer system.</li>
                        <li><b>Step 2, task:</b> for each tool, write one concrete task an agent would save you, and what information it needs for it.</li>
                        <li><b>Step 3, permission and risk:</b> for each tool, set a minimal permission (read-only / create drafts / full action), and write: what's the worst thing that could happen if the agent makes a mistake, and how will you check it?</li>
                        <li><b>Step 4, optional, try it in Claude:</b> open the connectors directory (usually in the settings, under Connectors; names get updated). Choose a service you trust, and read what permissions it asks for <b>before</b> you approve. Ask a read-only question, and check the answer against the source.</li>
                        <li><b>Step 5, wrap-up:</b> if you won't use the connection again, disconnect it.</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Sample solution for steps 1–3 (try it yourself first)</summary>
                        <ul class="mt-2">
                            <li><b>Calendar:</b> "Find a free slot for a 30-minute meeting this week". Permission: read-only. Worst case: it suggests a slot that's taken. Check: look at the calendar before sending an invitation.</li>
                            <li><b>Email:</b> "Summarize this week's emails from client X". Permission: read and create drafts. Worst case: a wrong email sent to the client, which is why there's no send permission.</li>
                            <li><b>Documents folder:</b> "Find the latest price quote we sent to client X". Permission: read-only, and if possible only for the relevant folder. Worst case: exposing a sensitive document unrelated to the task.</li>
                        </ul>
                    </details>

                    <h4>❓ Decision question: an email connector asks for permission to read and send emails on your behalf, and you only need a summary of emails. What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-12" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Approve everything, since we'll only ask it to summarize anyway</summary><p class="mt-2">❌ A permission that's been granted can also be used by mistake. What the agent isn't authorized to do, it also can't do by mistake.</p></details>
                    <details name="practice-12" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Check whether you can choose a narrower permission. If not, consider whether to connect at all</summary><p class="mt-2">✅ Correct. Minimal permission is the rule. If the connector doesn't allow read-only, you can also manually copy the relevant emails into the conversation.</p></details>
                    <details name="practice-12" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Write your email password in the chat, and ask the model to log in only to read</summary><p class="mt-2">❌ Never write a password in a chat. A proper connection goes through the service's own permissions screen.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>Each tool has a concrete task, not a general one ("help with email").</li>
                        <li>A minimal permission was set for each tool.</li>
                        <li>For each tool you wrote what happens if the agent makes a mistake, and how you'll check it.</li>
                        <li>If you connected something: you read the permissions before approving, and checked the answer against the source.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>When the agent "reads" from the sheet, who actually performs the read: the model, the app or the MCP server?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">The model only asks to run the tool. The app (the host) makes the call through its client to the MCP server, the server accesses the sheet and returns a result, and the app passes it on to the model.</p></details>`,
        promptScenarios: [
            'Write a prompt that defines for an AI agent which tools (MCP servers) it may use for a given task, with which permission (read-only or drafts), and what it must not do.',
            'Write a prompt that asks the model to explain to management, in business rather than technical language, why it\'s worth connecting the organization\'s chatbot to tools through MCP, and which risks need to be managed.',
            'Write a prompt for planning a new MCP server that will give the model access to an internal CRM system: which tools it will expose and with which permissions. (A planning exercise only - no need to write code.)'
        ]
    },
    13: {
        cases: `
                    <h3>🔥 Case Study: A Skill for Checking Contracts</h3>
                    <p><b>The story:</b> every week you check supplier contracts against the same list of clauses your organization doesn't agree to: automatic renewal with a long cancellation notice, an exit penalty, and the supplier waiving all liability. Instead of explaining the list again in every conversation, you build a Skill.</p>
                    <p>A sample contract excerpt (fictional, written for this exercise):</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m13-contract">Clause 4: The agreement will renew automatically for another year each year, unless the customer gives notice of cancellation 90 days in advance.<br>
Clause 7: The supplier is not liable for any damage caused to the customer, of any kind whatsoever.<br>
Clause 9: Payment will be made within 30 days of receiving the invoice.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m13-contract">📋 Copy the contract excerpt</button>

                    <h4>❌ A weak Skill:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2"><pre class="text-left font-mono whitespace-pre-wrap" dir="ltr" style="unicode-bidi:plaintext">---
name: Contract Checker!
description: Helps with contracts.
---
Check the contract.</pre></div>
                    <ul>
                        <li>❌ <b>name:</b> it has capital letters, a space and an exclamation mark, so it doesn't follow the rules (lowercase letters, digits and hyphens only).</li>
                        <li>❌ <b>description:</b> it doesn't say when to use the Skill, so the model won't know how to recognize the moment.</li>
                        <li>❌ <b>The instructions:</b> "Check" what? Against which list? And what should it return?</li>
                    </ul>

                    <h4>✅ An engineered Skill:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m13-good-skill"><pre class="text-left font-mono whitespace-pre-wrap" dir="ltr" style="unicode-bidi:plaintext">---
name: contract-check
description: Reviews supplier contracts against a fixed list of forbidden clauses. Use when the user uploads a contract or asks to review one.
---
Check the contract against the list of forbidden clauses:
1. Automatic renewal that requires more than 30 days' cancellation notice.
2. A penalty for leaving the agreement.
3. The supplier waiving all liability for damages.
For each problematic clause: quote it exactly, state which rule it breaks, and explain in plain language why it's a problem.
If no problematic clauses were found, say so explicitly.
Don't give a final legal opinion. End with the sentence: "It's recommended to review the findings with a legal professional."
Format: a table with the columns: Clause, Quote, Rule broken, Explanation.</pre></div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m13-good-skill">📋 Copy the Skill</button>
                    <p class="text-sm text-slate-600"><b>Want to test it without installing?</b> Paste the Skill into a regular chat, and below it: "Follow these instructions on the following contract:" followed by the contract excerpt.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (click to open)</summary>
                        <ul class="mt-2">
                            <li><b>Clause 4:</b> "...unless the customer gives notice of cancellation 90 days in advance". Breaks rule 1. Explanation: to avoid committing to another year, you have to remember to cancel three months in advance.</li>
                            <li><b>Clause 7:</b> "The supplier is not liable for any damage... of any kind whatsoever". Breaks rule 3. Explanation: even if the supplier causes damage through negligence, the customer won't be able to claim compensation.</li>
                            <li><b>Clause 9:</b> doesn't break any rule on the list.</li>
                            <li>And at the end: "It's recommended to review the findings with a legal professional."</li>
                        </ul>
                        <p class="text-sm text-slate-600">Note: check that every quote really appears in the contract, word for word (Lesson 15).</p>
                    </details>

                    <h4>📋 A ready-made template for a SKILL.md file:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr" style="unicode-bidi:plaintext" id="m13-template">---
name: [lowercase-name-with-hyphens]
description: [What the skill does]. Use when [when the model should use it].
---
[The instructions: what the input is, what to do step by step, and what must not be done]
Format: [what the result looks like]</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m13-template">📋 Copy the template</button>
                    <p class="text-sm text-slate-600 mt-2">Write the name in English, in lowercase letters with hyphens. You can write the instructions in your own language.</p>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Writing a Skill for a Weekly Report</h3>
                    <p><b>What you need:</b> a text editor (or pen and paper), and about 20 minutes. For testing: any chatbot (ChatGPT, Gemini or Claude; all of them have a free plan). For installing, which is optional: a Claude account with code execution turned on in the settings. No account at all? Write the file and check it against the self-check and the sample solution.</p>
                    <p>Sample weekly notes (fictional), for testing the Skill:</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m13-notes">- We finished the price quote for the client "Alpha" and sent it.<br>
- The training for new employees was postponed to next week, because the meeting room was taken.<br>
- We've been waiting two weeks for budget approval from the finance department.<br>
- We sent 3 out of 5 orders to suppliers.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m13-notes">📋 Copy the notes</button>
                    <ol>
                        <li><b>Step 1, task:</b> choose a recurring task from your work, or use a weekly report from the sample notes.</li>
                        <li><b>Step 2, name:</b> write a name in lowercase letters and hyphens only, up to 64 characters.</li>
                        <li><b>Step 3, description:</b> write one sentence about what the Skill does, and one sentence about <b>when</b> to use it.</li>
                        <li><b>Step 4, instructions:</b> what the input is, what to do step by step, what the output looks like, and what's not allowed (for example making up details).</li>
                        <li><b>Step 5, test without installing:</b> open a new conversation in the chatbot, paste the content of the file, and below it: "Follow these instructions on the following notes:" followed by the sample notes. Is the result in the format you asked for? If not, fix the instructions and try again.</li>
                        <li><b>Step 6, optional, install it in Claude:</b> create a folder with the Skill's name, put the SKILL.md file inside it, compress it into a ZIP file and upload it on the Skills page in the settings (menu names get updated; you may find it on the Plugins page).</li>
                    </ol>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">A sample SKILL.md and the expected result (try it yourself first)</summary>
                        <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap mt-2" dir="ltr" style="unicode-bidi:plaintext">---
name: weekly-report
description: Turns raw weekly team notes into a short status report. Use when the user pastes weekly notes or asks for a weekly report.
---
Take raw weekly notes and write a short status report from them.
1. Sort each note into one of three groups: Done, In progress, Stuck.
2. For each stuck item: write what it's stuck on and who needs to act.
3. Don't make up details that don't appear in the notes. If information is missing, write "not specified".
Format: three headings (Done / In progress / Stuck), up to 5 points in total, and a last line: "What needs a decision this week".</pre>
                        <p><b>Expected result on the sample notes:</b> Done: the price quote for the client "Alpha". In progress: orders to suppliers (3 out of 5). Stuck: the training (the meeting room was taken) and the budget approval (waiting for the finance department). Last line, for example: "We need to decide whether to escalate the budget approval".</p>
                    </details>

                    <h4>❓ Decision question: which description is best for a weekly report Skill?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-13" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold" dir="ltr">Weekly report skill.</summary><p class="mt-2">❌ This is really a name, not a description. It doesn't say what the Skill does, or when to use it.</p></details>
                    <details name="practice-13" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold" dir="ltr">Turns weekly notes into a short status report. Use when the user pastes weekly notes or asks for a weekly report.</summary><p class="mt-2">✅ Correct. The first part says what it does, and the second part tells the model when to choose it.</p></details>
                    <details name="practice-13" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold" dir="ltr">Trigger: every Thursday.</summary><p class="mt-2">❌ There's no "Trigger" field in the standard. The model decides when to use the Skill based on the description, and it also doesn't "know" what day it is unless it's been told.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>The name uses lowercase letters, digits and hyphens only, up to 64 characters.</li>
                        <li>The description says both what the Skill does and <b>when</b> to use it.</li>
                        <li>The instructions are concrete: they include input, steps, an output format and what's not allowed.</li>
                        <li>You tested the Skill on the sample notes, and the result came in the format you asked for.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Is <span dir="ltr">Weekly Report</span> a valid name? If not, fix it.</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">No. It has capital letters and a space. A valid name: <code dir="ltr">weekly-report</code>.</p></details>`,
        promptScenarios: [
            'Write a prompt that defines a new Skill for a recurring task from your work: a name (in lowercase letters and hyphens), a description that says what it does and when to use it, and detailed instructions with an output format.',
            'Write a prompt that compares using a one-off prompt with building a permanent Skill for the same task, and explains when each one is more suitable.',
            'Write a prompt that asks the model to review an existing SKILL.md file and suggest an improvement: is the name valid, does the description say when to use it, and are the instructions concrete?'
        ]
    },
    14: {
        cases: `
                    <h3>🔥 Case Study: A Ready-Made Plugin or Your Own MCP Server?</h3>
                    <p class="text-sm text-slate-600">(Requires programming knowledge - this is a comparison exercise, not a task to carry out.)</p>
                    <p><b>The story:</b> a small service company has 15 employees. They have an internal CRM system that a programmer built for them a few years ago. Some of the employees work with ChatGPT and some with Claude. They want to ask the assistant "What's the status of client X?" and get an answer from the system. You need to make a recommendation to the manager.</p>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"What's the best plugin for connecting our CRM to AI?"</div>
                    <ul>
                        <li>❌ <b>Missing crucial context:</b> the CRM is internal. It probably has no ready-made plugin at all.</li>
                        <li>❌ <b>Risk of hallucination:</b> the model may invent the name of a plugin that doesn't exist (Lesson 15).</li>
                        <li>❌ <b>No criteria:</b> fast? cheap? works in both tools? keeps the data safe?</li>
                        <li>❌ <b>It ignores the fact that there are two AI tools</b> in the organization.</li>
                    </ul>

                    <h4>✅ An engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m14-good-prompt"><b>Role:</b> Act as a technology consultant who explains things to people who aren't programmers.<br>
<b>Context:</b> A company of 15 employees with an internal CRM system built especially for it. Some of the employees use ChatGPT and some use Claude. They want to ask the assistant about the status of clients.<br>
<b>Task:</b> Compare two options: (a) an existing plugin from the ChatGPT or Claude plugin directory, (b) a small MCP server that a programmer will build for the CRM.<br>
<b>Constraints:</b> Don't recommend a product by name unless you're sure it exists, and mark "to verify" next to every detail that needs checking. Take into account that the CRM is internal.<br>
<b>Format:</b> A table with the rows: setup time, need for a programmer, works with more than one AI tool, control over permissions and data. Then a recommendation in two sentences.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m14-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (click to open)</summary>
                        <ul class="mt-2">
                            <li><b>Setup time:</b> a plugin is very fast, if one exists. An internal CRM probably has no ready-made plugin ("to verify"). An MCP server requires development time.</li>
                            <li><b>Need for a programmer:</b> plugin: no. MCP server: yes.</li>
                            <li><b>More than one AI tool:</b> a plugin belongs to one vendor. An MCP server works with any app that supports the protocol, including ChatGPT and Claude.</li>
                            <li><b>Control:</b> with a plugin, permissions are set by what the vendor allows. With your own server, you decide what's exposed, for example read-only.</li>
                        </ul>
                        <p><b>Recommendation:</b> "Since the CRM is internal and the employees use two tools, one MCP server that exposes read-only client status is the better choice. It's worth starting with a small pilot with a few employees."</p>
                    </details>

                    <h4>📋 A comparison template: an existing plugin vs. an MCP server</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr" id="m14-template">Need: [what we want the AI assistant to do, with which system].
Our AI tools: [e.g. ChatGPT, Claude].
Option A (Plugin): use an existing plugin from the vendor's directory.
  - Does one exist for our system? [check]
  - Permissions it asks for: [list]
  - Works in: [which AI tools only]
Option B (MCP server): build a small MCP server for our system.
  - Who will build and maintain it: [name/role]
  - What it exposes: [read-only / drafts / full actions]
  - Works in: any app that supports MCP
Compare: setup time, cost, works across tools, control over data.
Mark anything you are not sure about as "to verify". Do not invent product names.</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m14-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Evaluating a Plugin Before You Install It</h3>
                    <p><b>What you need:</b> an account on ChatGPT (chatgpt.com) or Claude (claude.ai), and about 15 minutes. Both have a free plan, but some plugins are available only on certain plans or in certain countries. No access to the directory? Work on the sample plugin card below.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm"><b>Sample plugin card (fictional, written for this exercise):</b> "Meeting Notes Helper"<br>
<b>Description:</b> "Summarizes your meetings and sends a summary to all participants."<br>
<b>Developer:</b> a small company you've never heard of, with no link to a privacy policy.<br>
<b>Permissions requested:</b> read all calendar events; read all emails; send emails on your behalf; access to all contacts.</div>
                    <ol>
                        <li><b>Step 1, open the directory:</b> in ChatGPT: Plugins in the sidebar (or chatgpt.com/plugins). In Claude: the plugins/connectors page in the settings. (Names get updated.)</li>
                        <li><b>Step 2, choose:</b> choose one plugin related to your work.</li>
                        <li><b>Step 3, read before installing:</b> read the description, who developed it, and the list of permissions, which is usually shown before you approve.</li>
                        <li><b>Step 4, three questions:</b> (a) what concrete problem does it solve for you? (b) what permissions does it ask for, and are all of them necessary for this problem? (c) would you trust it: who built it, and where does the information go?</li>
                        <li><b>Step 5, decision:</b> install / don't install / try it only with non-sensitive information. If you installed it, try it once and disconnect it if you don't need it.</li>
                    </ol>
                    <p class="text-sm text-slate-600"><b>Privacy:</b> a plugin connected to an external service receives information from the conversation, and sometimes from your accounts too. Don't try a new plugin on client documents or on sensitive personal information.</p>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Sample solution: the fictional plugin card (try it yourself first)</summary>
                        <p class="mt-2"><b>(a) The problem:</b> writing meeting summaries. A real problem.</p>
                        <p><b>(b) The permissions:</b> to summarize a meeting it needs, at most, the calendar event. Reading <b>all</b> emails, sending on your behalf and access to all contacts go far beyond what's needed.</p>
                        <p><b>(c) Trust:</b> an unknown developer, with no privacy policy. A warning sign.</p>
                        <p><b>Decision:</b> don't install. You can look for a plugin that asks for fewer permissions, or simply paste the meeting notes into a chat and ask for a summary.</p>
                    </details>

                    <h4>❓ Decision question: a document-summarizing plugin asks for access to all the files in your cloud drive. What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-14" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Install it, because it appears in the official directory</summary><p class="mt-2">❌ Appearing in the directory doesn't mean the permissions suit you. You're responsible for what you approve.</p></details>
                    <details name="practice-14" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Install it now, and delete it later if something looks suspicious</summary><p class="mt-2">❌ The moment you approve, the information can already be transferred. Check first, then approve.</p></details>
                    <details name="practice-14" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Check whether you can limit access to one folder. If not, look for an alternative or paste the document manually</summary><p class="mt-2">✅ Correct. Minimal permission, just like in Lesson 12. Often, pasting one document into a chat does the same job without giving access to the whole drive.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You wrote down what concrete problem the plugin solves for you.</li>
                        <li>You listed the permissions it asks for, and marked which of them aren't necessary.</li>
                        <li>You checked who built it and where the information goes.</li>
                        <li>You made a reasoned decision (install / don't / try with non-sensitive information).</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>A friend tells you: "Cursor is a VS Code plugin, like GitHub Copilot". What's right in that sentence and what isn't?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">GitHub Copilot really is an extension for development environments. Cursor, on the other hand, is a standalone code editor built on top of VS Code, not an extension.</p></details>`,
        promptScenarios: [
            'Write a prompt that asks the model to help you choose a plugin for an AI tool you work with, based on clear criteria (what problem it solves, what permissions it asks for, who built it), and with an instruction to mark every detail you need to check yourself in the directory.',
            'Write a prompt that explains the difference between a proprietary plugin (one that belongs to a single company and works only on its products) and a tool based on open MCP, with one example of each.',
            'Write a prompt that plans a new plugin (an idea only) that would solve an everyday problem for you at work: what it does, what it\'s made of (connections, Skills) and what minimal permissions it needs.'
        ]
    },
    15: {
        cases: `
                    <h3>🔥 Case Studies and Templates: When a Hallucination Costs Dearly</h3>
                    <h4>⚖️ Case 1: The lawyers and the court rulings that don't exist (Mata v. Avianca, 2023)</h4>
                    <p>In a lawsuit against the airline Avianca in a federal court in New York, the plaintiff's lawyers submitted a filing that relied on a series of court rulings, at least six of which simply didn't exist. They had been generated by ChatGPT, including made-up quotes. In June 2023 the judge fined the lawyers and the firm $5,000, partly because they continued to stand behind the made-up rulings even after the court had questioned them.</p>
                    <p><b>The lesson:</b> the model didn't "know" it was making things up. The person responsible is whoever submitted the document without checking.</p>

                    <h4>✈️ Case 2: The Air Canada chatbot (Moffatt v. Air Canada, 2024)</h4>
                    <p>A customer who asked the chatbot on Air Canada's website about a discount on a flight following the death of a family member got an answer that didn't match the company's actual policy. On February 14, 2024, the Civil Resolution Tribunal of British Columbia (Canada) ruled that the company is responsible for the information its chatbot gave, and ordered it to compensate the customer with a little over 650 Canadian dollars.</p>
                    <p><b>The lesson:</b> a business that puts AI in front of customers is responsible for what the AI says. This is exactly the place to set constraints, ground the answers in the policy document, and pass questions that have no answer on to a human agent.</p>

                    <h4>🧪 Try it yourself: a service chatbot that doesn't make things up</h4>
                    <p>A sample policy from a fictional airline (written for this exercise):</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm" id="m15-doc">Cancellation and refund policy – "Sun Flights" (fictional text)<br>
1. Cancellation up to 24 hours from the time of booking: full refund.<br>
2. Later cancellation: a refund of 50% of the price, minus a $100 handling fee.<br>
3. Tickets bought at a sale price are non-refundable.<br>
4. Refund requests are submitted only through the form on the website.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m15-doc">📋 Copy the policy</button>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Does 'Sun Flights' offer a discount for someone flying because of the death of a family member?"</div>
                    <ul>
                        <li>❌ <b>No document:</b> the model doesn't know the company (it's fictional), and may "fill in" a policy that sounds reasonable.</li>
                        <li>❌ <b>No permission to say "I don't know":</b> exactly the Air Canada situation.</li>
                        <li>❌ <b>No quote:</b> you can't check what the answer is based on.</li>
                    </ul>

                    <h4>✅ An engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m15-good-prompt"><b>Role:</b> Act as a careful airline customer service agent.<br>
<b>Context:</b> The company's cancellation policy appears between the &lt;document&gt; and &lt;/document&gt; tags.<br>
<b>Task:</b> Answer the customer's question that appears after the document.<br>
<b>Constraints:</b> Answer only based on the document. If the answer doesn't appear in it, write exactly: "The information doesn't appear in the policy; I'll pass the question on to a human agent." Don't guess and don't use general knowledge.<br>
<b>Format:</b> An answer of up to 3 sentences, and below it the exact quote from the document that it's based on.<br>
&lt;document&gt;<br>
[paste the policy here]<br>
&lt;/document&gt;<br>
Customer's question: [paste the question here]</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m15-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (click to open)</summary>
                        <p class="mt-2"><b>For the question about a discount because of a death:</b> "The information doesn't appear in the policy; I'll pass the question on to a human agent." There's no quote, because the document has no clause about it at all.</p>
                        <p><b>For the question "I cancelled three days after booking, how much will I get back?":</b> "You'll get a refund of 50% of the price, minus a $100 handling fee. If the ticket was bought at a sale price, no refund will be given." Quotes: clauses 2 and 3.</p>
                        <p class="text-sm text-slate-600">And still: check that every quote really appears in the document, word for word.</p>
                    </details>

                    <h4>📋 A general template that reduces hallucinations (works with any document):</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr" id="m15-template">Answer ONLY based on the document between the &lt;doc&gt; tags.
If the answer is not in the document, reply exactly: "Not found in the document".
For every claim, quote the exact sentence from the document that supports it.
Do not guess. Do not use outside knowledge.
&lt;doc&gt;
[paste the document here]
&lt;/doc&gt;
Question: [your question]</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m15-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Catching the Model Making Things Up</h3>
                    <p><b>What you need:</b> any chatbot (ChatGPT, Gemini or Claude; all of them have a free plan), a regular search engine, and about 25 minutes. No chatbot? Do step C only: all it needs is the policy from the "Templates & case studies" tab.</p>
                    <ol>
                        <li><b>Step A, ask for sources from memory:</b> choose a topic you know well. Ask the model for "a list of 5 papers or books on the topic, with the author's name and year". Check each item with a regular search, and mark it: exists and accurate / exists but the details are wrong / doesn't exist at all.</li>
                        <li><b>Step B, work with a document:</b> find a reliable article or page on the same topic yourself, paste it into the template from the "Templates & case studies" tab, and ask 3 factual questions about it. Check that every quote the model returned really appears in the text, and compare with step A.</li>
                        <li><b>Step C, check a model's answer (even without a chatbot):</b> below is a sample model answer to the question "What's the policy if I cancel three days after booking?". Compare each quote with the "Sun Flights" policy in the "Templates & case studies" tab, and mark which quotes are real.</li>
                        <li><b>Step D, summary:</b> write one sentence: what reduced mistakes the most, and what would you still have to check yourself?</li>
                    </ol>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm"><b>A sample model answer (for step C):</b><br>
(1) You'll get a refund of 50% of the price, minus a $100 handling fee. Quote: "Later cancellation: a refund of 50% of the price, minus a $100 handling fee."<br>
(2) You can also submit the request by phone. Quote: "Refund requests can be submitted by phone or through the website."<br>
(3) If the ticket was bought on sale, no refund will be given. Quote: "Tickets bought at a sale price are non-refundable."</div>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Solution for step C (try it yourself first)</summary><p class="mt-2">Quotes 1 and 3 appear in the policy word for word. Quote 2 is made up: the policy says "Refund requests are submitted only through the form on the website". That's exactly why you ask for a quote: it lets you catch a claim that sounds reasonable but has no basis.</p></details>

                    <h4>❓ Decision question: the model gave you a link to a paper that looks reliable, but the link doesn't open. What do you do?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-15" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Cite it, because the title and the author sound reliable</summary><p class="mt-2">❌ That's exactly how the lawyers in Mata v. Avianca failed. "Sounds reliable" isn't the same as "exists".</p></details>
                    <details name="practice-15" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Ask the model "Is this paper real?" and rely on the answer</summary><p class="mt-2">❌ A model that made up a source may also "confirm" it. The check has to happen outside the model.</p></details>
                    <details name="practice-15" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Search for the paper's title and author yourself. Didn't find it? As far as you're concerned, it doesn't exist</summary><p class="mt-2">✅ Correct. That's rule 4: a source you didn't find doesn't exist as far as you're concerned. And if you did find it, check that it really says what the model claimed.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You checked each of the 5 items in step A with a regular search, and classified it.</li>
                        <li>In step B you checked that every quote really appears in the text you pasted.</li>
                        <li>In step C you identified the made-up quote (number 2).</li>
                        <li>You wrote what reduced mistakes, and what still needs checking by you.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Which two of the five protection rules would have prevented the fine in Mata v. Avianca?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">Rule 4, "Verify every source yourself": searching for each ruling in a legal database would have revealed that they don't exist. And rule 5: a document submitted to a court is high risk, so it requires an especially careful check.</p></details>`,
        promptScenarios: [
            'Write a prompt that asks the model to summarize an attached document, with an explicit constraint to answer only based on the document and to quote the exact sentence for each claim.',
            'Write a prompt for a customer service chatbot that instructs it to say "I don\'t know" and pass the customer on to a human agent when the answer doesn\'t appear in the company\'s policy.',
            'Write a prompt that asks the model to review a text you wrote and mark every factual claim that needs to be verified against an external source.'
        ]
    }
};

const quizzes = {
    11: [
        {
            id: 'q1',
            question: 'What is an API?',
            options: [
                { id: 'a', text: 'An agreed, fixed interface that lets two programs communicate in a structured way.' },
                { id: 'b', text: 'A type of language model.' },
                { id: 'c', text: 'A programming language for building websites.' },
                { id: 'd', text: 'ChatGPT\'s chat screen.' }
            ],
            explanation: 'An API lets programs talk to each other without knowing how the other one is built inside.'
        },
        {
            id: 'q2',
            question: 'Where is the right place to keep an API key?',
            options: [
                { id: 'a', text: 'Directly in the code, so it\'s easy to find.' },
                { id: 'b', text: 'In a file that\'s uploaded to GitHub together with the code.' },
                { id: 'c', text: 'Outside the code, for example in environment variables or in a dedicated secrets-management tool.' },
                { id: 'd', text: 'In the website\'s header.' }
            ],
            explanation: 'An API key is like a password: you keep it outside the code, for example in environment variables or in a secrets-management tool. If it\'s exposed, you revoke it and create a new one.'
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
            explanation: 'POST is used to send information: the model name, the prompt and the settings are sent in the request body.'
        },
        {
            id: 'q4',
            question: 'What does the max_tokens parameter control in a call to a model?',
            options: [
                { id: 'a', text: 'How creative the answer is.' },
                { id: 'b', text: 'The maximum length of the answer.' },
                { id: 'c', text: 'The number of authorized users.' },
                { id: 'd', text: 'The language of the answer.' }
            ],
            explanation: 'max_tokens limits the maximum number of tokens the model generates. In models that think before they answer, the thinking also counts toward this cap.'
        }
    ],
    12: [
        {
            id: 'q1',
            question: 'What is MCP (Model Context Protocol)?',
            options: [
                { id: 'a', text: 'An open protocol for connecting AI apps to external tools, files and databases in a standard way.' },
                { id: 'b', text: 'A new language model from Anthropic.' },
                { id: 'c', text: 'An extension for the Chrome browser.' },
                { id: 'd', text: 'A method for compressing files.' }
            ],
            explanation: 'MCP defines one standard "socket" instead of a separate connection for every tool and every app. Anthropic published it in 2024, and today it\'s run as an open-source project.'
        },
        {
            id: 'q2',
            question: 'What is the component called that gives an AI app access to a particular service (for example reading from a spreadsheet)?',
            options: [
                { id: 'a', text: 'MCP client' },
                { id: 'b', text: 'MCP server' },
                { id: 'c', text: 'Artifact' },
                { id: 'd', text: 'Custom GPT' }
            ],
            explanation: 'An MCP server exposes a service\'s capabilities. The app (the host) runs an MCP client inside it that connects to the server.'
        },
        {
            id: 'q3',
            question: 'Which analogy was used in the lesson to explain MCP?',
            options: [
                { id: 'a', text: 'USB-C: one standard socket that fits many devices.' },
                { id: 'b', text: 'A car engine.' },
                { id: 'c', text: 'A public library.' },
                { id: 'd', text: 'A remote control.' }
            ],
            explanation: 'Like USB-C: a service with an MCP server can connect to any app that supports the protocol.'
        },
        {
            id: 'q4',
            question: 'Why does connecting through MCP change what a chatbot can do?',
            options: [
                { id: 'a', text: 'Because it changes the colors of the interface.' },
                { id: 'b', text: 'Because it turns a chatbot that only writes text into an agent that can read information and act in real systems.' },
                { id: 'c', text: 'Because it replaces the need for prompts.' },
                { id: 'd', text: 'Because it only works on new computers.' }
            ],
            explanation: 'Through tools connected via MCP, the agent gets up-to-date information and performs actions, so it needs to guess much less. It\'s still worth checking the answer.'
        }
    ],
    13: [
        {
            id: 'q1',
            question: 'How is a Skill different from a one-off prompt?',
            options: [
                { id: 'a', text: 'It\'s a saved package of instructions (a folder with a SKILL.md file) that the agent loads and uses when it fits the task.' },
                { id: 'b', text: 'It\'s simply a longer prompt.' },
                { id: 'c', text: 'It only works in English.' },
                { id: 'd', text: 'There\'s no difference at all.' }
            ],
            explanation: 'A Skill is saved and used again and again, without you having to word the instructions from scratch. The model decides when to use it based on the description field.'
        },
        {
            id: 'q2',
            question: 'When is it worth building a Skill instead of writing a prompt?',
            options: [
                { id: 'a', text: 'When a task repeats again and again in the same form.' },
                { id: 'b', text: 'For a one-off question that won\'t come up again.' },
                { id: 'c', text: 'Only when writing code.' },
                { id: 'd', text: 'Never, a prompt is always better.' }
            ],
            explanation: 'For example a weekly report or checking contracts against a fixed list. For a one-off question, a regular prompt is enough.'
        },
        {
            id: 'q3',
            question: 'What can a Skill include besides the instructions file?',
            options: [
                { id: 'a', text: 'Accompanying files and scripts.' },
                { id: 'b', text: 'Only images.' },
                { id: 'c', text: 'Only passwords.' },
                { id: 'd', text: 'Nothing except text.' }
            ],
            explanation: 'Under the Agent Skills standard, every Skill is a folder with a SKILL.md file, and you can add files and scripts alongside it.'
        },
        {
            id: 'q4',
            question: 'What\'s another advantage of packaging a task as a Skill, beyond saving time?',
            options: [
                { id: 'a', text: 'You can share it with others on the team and get consistent results.' },
                { id: 'b', text: 'It makes the model free.' },
                { id: 'c', text: 'It removes the need to check the results.' },
                { id: 'd', text: 'It enlarges the context window.' }
            ],
            explanation: 'A shared Skill creates a consistent working standard across the team. On Claude\'s Team and Enterprise plans, admins can distribute Skills to the whole team.'
        }
    ],
    14: [
        {
            id: 'q1',
            question: 'What is the main difference between a plugin and MCP?',
            options: [
                { id: 'a', text: 'A plugin is usually a package from a particular vendor that\'s installed inside that vendor\'s system, while MCP is an open, vendor-independent protocol.' },
                { id: 'b', text: 'MCP only works in ChatGPT.' },
                { id: 'c', text: 'A plugin is always free and MCP is always paid.' },
                { id: 'd', text: 'There\'s no difference between them at all.' }
            ],
            explanation: 'MCP is open and standard. A plugin is a package from a particular vendor, which doesn\'t necessarily move between vendors, but is often built from open components such as MCP servers and Skills.'
        },
        {
            id: 'q2',
            question: 'An organization wants to connect several different AI tools to the same internal systems over time. According to the lesson, what\'s the right choice?',
            options: [
                { id: 'a', text: 'A plugin from one vendor.' },
                { id: 'b', text: 'MCP, because it doesn\'t lock the organization into one vendor.' },
                { id: 'c', text: 'Manually copying data into each chat.' },
                { id: 'd', text: 'Giving up on the connection.' }
            ],
            explanation: 'An open protocol lets you replace or add AI tools without rebuilding everything.'
        },
        {
            id: 'q3',
            question: 'What is a plugin?',
            options: [
                { id: 'a', text: 'An add-on component that extends an existing app without changing its core.' },
                { id: 'b', text: 'A standalone language model.' },
                { id: 'c', text: 'A computer virus.' },
                { id: 'd', text: 'A free version of a piece of software.' }
            ],
            explanation: 'Like a browser extension: it adds a capability without touching the core. In the AI world it usually bundles connections to services and Skills.'
        },
        {
            id: 'q4',
            question: 'A user wants a ready-made capability quickly (for example searching for hotels inside the chat). What\'s the simplest solution?',
            options: [
                { id: 'a', text: 'Build an MCP server from scratch.' },
                { id: 'b', text: 'Use an existing plugin, after checking what permissions it asks for.' },
                { id: 'c', text: 'Train a new language model.' },
                { id: 'd', text: 'Write their own API.' }
            ],
            explanation: 'For a user who wants a ready-made capability, an existing plugin is the fast route. Just check first who built it and what permissions it asks for.'
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
                { id: 'd', text: 'An answer that\'s too long.' }
            ],
            explanation: 'The danger is that the made-up answer is worded with the same confidence as a correct answer.'
        },
        {
            id: 'q2',
            question: 'According to the paper by OpenAI researchers mentioned in the lesson, what is one of the main reasons for hallucinations?',
            options: [
                { id: 'a', text: 'The models are programmed to lie on purpose.' },
                { id: 'b', text: 'Training and evaluation methods reward guessing more than admitting uncertainty.' },
                { id: 'c', text: 'The models don\'t have enough computer memory.' },
                { id: 'd', text: 'Users write prompts in English.' }
            ],
            explanation: 'Like a student who prefers to guess on a multiple-choice test rather than leave a question blank.'
        },
        {
            id: 'q3',
            question: 'What is the most reliable way to get an answer about a particular document?',
            options: [
                { id: 'a', text: 'Ask the model about the document from memory, without attaching it.' },
                { id: 'b', text: 'Paste the document and instruct "Answer only based on the attached text, and quote the exact sentence".' },
                { id: 'c', text: 'Ask the model to answer faster.' },
                { id: 'd', text: 'Ask the same question three times and pick the longest answer.' }
            ],
            explanation: 'Grounding the answer in the document and quoting it exactly let you check every claim. You still check that the quote really appears in the document.'
        },
        {
            id: 'q4',
            question: 'What was the main lesson from the Mata v. Avianca case?',
            options: [
                { id: 'a', text: 'You must never use AI in legal work under any circumstances.' },
                { id: 'b', text: 'The responsibility for checking sources lies with whoever submits the document, not with the model.' },
                { id: 'c', text: 'ChatGPT always cites real court rulings.' },
                { id: 'd', text: 'Courts don\'t accept documents written on a computer.' }
            ],
            explanation: 'The lawyers were fined because they relied on made-up court rulings without verifying them, and continued to stand behind them even after the court had questioned them.'
        }
    ]
};

module.exports = { modules, extras, quizzes };
