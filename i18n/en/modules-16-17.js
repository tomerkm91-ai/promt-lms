// English translation of modules 16-17 (self-paced lessons). Quiz answer keys come from quiz.js only.

const modules = {
    16: {
        title: 'Reading a Chart with AI - and Checking It Gets It Right',
        description: 'Upload a chart image to Gemini, ChatGPT or Claude, extract the right numbers, and check that the conclusion is actually supported.',
        content: `<h3>📘 Lesson 16: Reading a Chart with AI - and Checking It Gets It Right</h3>
                  <p>Chatbots like Gemini, ChatGPT and Claude can now read images, not just text. You can upload a screenshot of a chart from a report, a table from a slide or a photo of a sign, and ask: "What does this show?". A model that accepts more than one kind of input (text, images and sometimes audio or video) is called a <b>multimodal model</b>.</p>
                  <p>This saves a lot of time, but there's a trap: the model may misread a number, guess a unit that isn't written anywhere, and above all write a conclusion the chart doesn't show at all. In this lesson you'll learn to work with a chart in three stages: first read, then calculate, and only at the end conclude. All the practice material, including the chart itself, is in the "Templates & case studies" and "Hands-on practice" tabs.</p>

                  <h4>🧰 Where do you upload a chart image?</h4>
                  <ul>
                      <li><b>Gemini</b> (gemini.google.com), <b>ChatGPT</b> (chatgpt.com) or <b>Claude</b> (claude.ai): the most common chatbots. All of them have a free plan, and you usually need to sign in to upload images. Next to the text box there's a button for adding a file or image (usually a <b>+</b> sign or a paperclip 📎). You can also drag the image into the window, or copy a screenshot and paste it into the text box. On a phone, pick the image from your gallery. Any one of them is enough for this lesson.</li>
                      <li><b>Google AI Studio</b> (aistudio.google.com): a Google website that "lets you quickly try out models and experiment with different prompts" before building an app with them. It opens a chat screen where you type in the box and click <b>Run</b>, and you can pick a model, write standing instructions (System Instructions) and get the matching code (Get code). According to Google it's free to use in the countries where it's available, but under Google's terms it's intended <b>for developers, for professional or business use</b>, and only for people aged 18 and over. In other words, it's an advanced tool, and you don't need it to read a chart. If you already use AI Studio, feel free to use it for the exercise; a regular chatbot is enough.</li>
                  </ul>

                  <h4>📊 Three terms to know before reading a chart</h4>
                  <ul>
                      <li><b>Unit of measurement:</b> what is being counted and in what unit: minutes, percent, thousands of dollars? The number 12 without a unit means nothing. The unit usually appears in the title or next to the axis.</li>
                      <li><b>Period:</b> which time each bar belongs to (a month, a quarter, a year). Without it you can't tell what's being compared with what.</li>
                      <li><b>Median:</b> the value exactly in the middle when you sort all the values from smallest to largest. Half of the cases are below it and half above. Example: if five customers waited 2, 3, 4, 5 and 60 minutes, the median is 4 minutes, but the average (mean) is 14.8 minutes, because one customer who waited an hour "pulls" it up. Remember: a median of 12 minutes does <b>not</b> mean every customer waited 12 minutes.</li>
                  </ul>

                  <h4>🧮 Absolute change and relative change</h4>
                  <ul>
                      <li><b>Absolute change</b> = the new value minus the old value, in the original unit. Example: waiting time fell from 40 to 30 minutes, a drop of 10 minutes.</li>
                      <li><b>Relative change (in percent)</b> = the absolute change divided by <b>the old value</b> (the starting point), times 100. In the example: 10 ÷ 40 = 0.25, a 25% drop.</li>
                      <li><b>The common mistake:</b> dividing by the new value (10 ÷ 30 = 33%), or writing the absolute change as if it were a percentage ("a 10% drop"). Always check the denominator, in other words what you divided by.</li>
                  </ul>

                  <h4>🔍 What the chart shows - and what it can't prove</h4>
                  <p>A chart shows <b>that a change happened</b>. It doesn't say <b>why</b>. If you introduced a new system in February and waiting time went down, you can write "it went down after we introduced the system", but not "it went down because of the system". There may be other explanations: fewer calls that month, more staff on shift, a holiday. To check whether the system helped, you need more information: exactly when it was switched on, how many calls there were each month, and a comparison with a similar period or branch where nothing changed.</p>
                  <p>One more thing: <b>improvement isn't necessarily meeting the target.</b> If the target is at most 10 minutes and the median dropped to 12, things improved, but the target hasn't been met yet.</p>

                  <h4>🪜 The three-stage method: read, calculate, conclude</h4>
                  <ol>
                      <li><b>Read:</b> ask the model to list, for each bar, the period, value and unit, before any interpretation. Then <b>you</b> compare what it wrote with the image. That's how you catch a reading mistake right away.</li>
                      <li><b>Calculate:</b> ask it to show the calculation, including the denominator, so you can check it yourself.</li>
                      <li><b>Conclude:</b> ask for a headline that describes only what you can see, plus one question the chart leaves open.</li>
                      <li><b>And if something is cropped or unreadable:</b> tell the model explicitly to say what's missing instead of guessing.</li>
                  </ol>
                  <p>Why split it into stages? Because if there's a mistake, you can see exactly where it came in: in the reading, the calculation or the conclusion.</p>

                  <h4>⚠️ Where models get images wrong - and how to be careful</h4>
                  <ul>
                      <li><b>Small or blurry text:</b> Google itself recommends using clear, non-blurry, correctly rotated images, and notes that higher resolution helps read fine text. Take a screenshot of the screen itself, not a phone photo of the screen.</li>
                      <li><b>Bars without numbers:</b> when the value isn't written on the bar, the model estimates it from the height and may be wrong. Ask it to say when a value is an estimate.</li>
                      <li><b>Guessing a unit or adding a cause:</b> this is exactly what the three-stage method is designed to catch.</li>
                      <li><b>Privacy:</b> don't upload images with personal or confidential details, such as customer names, phone numbers or internal company data, without permission. On some free plans your data may be used to improve the product.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> In the "Templates & case studies" tab there's a real service center chart waiting for you, with a download button. In the "Hands-on practice" tab you'll upload it to a chatbot and check, step by step, whether the model reads it correctly.
                  </div>`
    },
    17: {
        title: 'From Studies to a Recommendation: Checking Evidence with Elicit',
        description: 'What Elicit is, how to frame a question before you search, how to spot strong evidence, and how to check every number against its source.',
        content: `<h3>📘 Lesson 17: From Studies to a Recommendation - Checking Evidence with AI</h3>
                  <p>Say you need to make a decision at work, for example how to train new employees, and you want to know "what the research says". AI tools can find and summarize studies in minutes, but they won't decide for you what counts as good evidence. In this lesson you'll learn to frame a precise question, screen studies with rules you set in advance, read the numbers correctly, and check every figure against its source.</p>

                  <h4>🔎 What is Elicit?</h4>
                  <p><b>Elicit</b> (elicit.com) is an AI research assistant. According to its website, it searches more than 138 million academic papers, finds studies relevant to your question, summarizes them and can extract data from them into a table (for example: who took part, what was tested and what the result was), with a link to the source.</p>
                  <ul>
                      <li><b>Cost:</b> there's a free plan called Basic, which includes unlimited search and summaries and limited use of the Research Agent. The paid plans are for heavy use, such as large systematic reviews and teamwork. The free plan is enough for this lesson, and you can do all of the practice without it too.</li>
                      <li><b>How you use it today:</b> since 30 September 2026, the old separate tools (Find Papers, Extract Data, Chat with Papers) are part of the <b>Research Agent</b>: you write a question, ask the agent to find papers or build a table, and you can add columns to the table.</li>
                      <li><b>Language:</b> most academic papers are written in English, so phrase your search question in English. A ready-made template is waiting in the "Templates & case studies" tab.</li>
                  </ul>
                  <p><b>Why not just ask a regular chatbot "give me studies"?</b> As we saw in Lesson 15, a regular chatbot may invent papers that don't exist. Elicit searches a real database of papers. A regular chatbot is good for working on text <b>you</b> give it, for example sorting abstracts you've pasted in.</p>

                  <h4>❓ Start from the decision, not the search</h4>
                  <p>Before you search, frame a question with five parts. In research this is sometimes called <b>PICO</b>, after the initials:</p>
                  <ul>
                      <li><b>Population:</b> who is this about? For example: new employees.</li>
                      <li><b>Intervention:</b> what are you testing? For example: a <b>retrieval quiz</b>, meaning that instead of rereading the material, the employee answers short questions from memory.</li>
                      <li><b>Comparison:</b> compared with what? For example: rereading the material.</li>
                      <li><b>Outcome:</b> what is measured? For example: whether the employee performs the task on their own successfully. Note: "whether they enjoyed it" is a completely different outcome.</li>
                      <li><b>Timing:</b> when is it measured? For example: four weeks after training, because what matters is what sticks over time.</li>
                  </ul>
                  <p>The full question: "Do new employees perform a task on their own better four weeks after a retrieval quiz, compared with rereading?"</p>
                  <p><b>Why set this before reading any results?</b> Because otherwise it's easy to "pick" the studies whose results you like. A rule set in advance applies to every study in the same way.</p>

                  <h4>✅ Three boxes for every study</h4>
                  <ul>
                      <li><b>Eligible:</b> the study answers every part of the question.</li>
                      <li><b>Not eligible:</b> a key part is different, for example it measured enjoyment rather than performance.</li>
                      <li><b>Needs full text:</b> the abstract is missing a deciding detail (for example when it was measured), so you need to open the full paper and look.</li>
                  </ul>
                  <p>For every decision, keep <b>the sentence from the source</b> it relies on. That way anyone can check your work.</p>

                  <h4>⚖️ What makes evidence stronger?</h4>
                  <ul>
                      <li><b>A comparison group:</b> if every employee took the quiz and succeeded, you can't tell whether they would have succeeded without it. You need a group that didn't take the quiz.</li>
                      <li><b>Random assignment:</b> when people are randomly assigned to each group, the groups are similar to each other, so the difference between them most likely comes from the intervention rather than from differences between people.</li>
                      <li><b>Measure what matters for the decision:</b> 95% who enjoyed it is a nice figure, but it doesn't tell you whether employees can do the task.</li>
                      <li><b>Sample size:</b> a study of 40 people can point in a direction, but it can't give certainty. One small study usually justifies a small trial in your own organization (a pilot), not a sweeping change.</li>
                  </ul>

                  <h4>🧮 Percent and percentage points</h4>
                  <p>Say 60% succeeded in one group and 45% in the other. The difference is <b>15 percentage points</b>, which is the absolute difference. If you write "15% more", that can already mislead: relative to 45%, success is about a third higher (15 ÷ 45 ≈ 33%). So when you report, write both the raw numbers (for example "12 out of 20") and the difference in percentage points.</p>

                  <h4>🛡️ Check every figure against the source</h4>
                  <p>Even a tool that searches a real database can make mistakes when extracting a figure: mixing up groups, taking a number from a different table or summarizing inaccurately. Before you quote a number in a recommendation, open the source and find the sentence or table it appears in. Can't find it? Mark it "not verified" and don't quote it.</p>

                  <div style="background-color:#f0fdf4; border-left:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ Try it yourself:</b> In the "Templates & case studies" tab there are three short study abstracts and a ready-made prompt. In the "Hands-on practice" tab you'll sort them yourself, compare with a chatbot's answer, and if you like, search for real studies in Elicit.
                  </div>`
    }
};

const extras = {
    16: {
        cases: `
                    <h3>🔥 Case Study: The Service Center Chart</h3>
                    <p><b>The story:</b> You work at a customer service center. At the start of February the center began using a new queue management system. At the end of February your team lead prepares the chart below and asks you: "Make me a headline for tomorrow's meeting." This is all the information you have: the chart, and the fact that the system was switched on in February.</p>

                    <figure class="my-4 border border-slate-200 rounded-lg overflow-hidden">
                        <img src="/assets/m16-chart-en.png" width="800" height="500" loading="lazy" class="w-full h-auto" alt="Bar chart: median waiting time at the service center, in minutes. January 18 minutes, February 12 minutes. Source: service center data, January–February.">
                        <figcaption class="p-3 bg-slate-50 text-sm flex flex-wrap items-center justify-between gap-2">
                            <span>Practice chart: median waiting time in January and February</span>
                            <a href="/assets/m16-chart-en.png" download="service-center-chart.png" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg">⬇️ Download the chart</a>
                        </figcaption>
                    </figure>
                    <p class="text-sm text-slate-600">On a phone: press and hold the image, then "Save image". On a computer: you can also right-click the image, choose "Copy image", and paste it straight into the chat.</p>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">[image attached] "Summarize the chart and write a headline. We introduced a new queue system in February."</div>
                    <p>A typical answer to a prompt like this (an illustrative example): <i>"The new queue system cut waiting time by a third!"</i></p>
                    <ul>
                        <li>✔️ <b>What's right:</b> going from 18 to 12 really is a drop of a third (6 ÷ 18).</li>
                        <li>❌ <b>"Cut" is a claim about cause.</b> The chart shows that waiting went down, not that the system is the reason. Maybe there were simply fewer calls in February.</li>
                        <li>❌ <b>"Waiting time", not "the median".</b> Not every customer waited less. The median describes the middle.</li>
                        <li>❌ <b>No values or units.</b> Someone reading the headline doesn't know from what and to what it fell.</li>
                    </ul>

                    <h4>✅ An engineered prompt:</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m16-good-prompt"><b>Role:</b> Act as a careful data analyst.<br>
<b>Context:</b> Attached is a chart of waiting times at a service center. I need a headline for a team meeting, and it must not contain any claim the data doesn't support.<br>
<b>Task:</b> Stage 1, read: for each bar, list the period, value and unit, exactly as they appear in the image. Stage 2, calculate: work out the change in the original unit and in percent, and show what you divided by. Stage 3, conclude: write a headline of up to 12 words, and one question the chart leaves open.<br>
<b>Constraints:</b> Don't guess. If a title, unit or value is missing or unreadable, say explicitly what's missing. Don't attribute a cause to the change.<br>
<b>Format:</b> A table for stage 1, one calculation line for stage 2, and two lines for stage 3.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m16-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">What does a good answer look like? (click to open)</summary>
                        <p class="mt-2"><b>Stage 1:</b> January: 18 minutes. February: 12 minutes. The measure: median waiting time.</p>
                        <p><b>Stage 2:</b> 12 minus 18 = a drop of 6 minutes. 6 ÷ 18 (the January value, the starting point) ≈ 33%, a drop of about a third.</p>
                        <p><b>Stage 3:</b> Headline: "Median waiting time fell from 18 to 12 minutes in February". Open question: "Is the drop related to the queue system, or to a change in the number of calls?"</p>
                        <p class="text-sm text-slate-600">Note: even a good answer needs checking. Compare the numbers the model wrote with the chart itself.</p>
                    </details>

                    <h4>📋 A ready-made prompt template for any chart:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm whitespace-pre-wrap" dir="ltr" id="m16-template">Read the attached chart in three stages.
1. Read: for each bar or point, list the period, value and unit as they appear in the image. If a value isn't written and you estimated it from the height, write "estimate".
2. Calculate: work out [the change you care about] in the original unit and in percent, and show what you divided by.
3. Conclude: write a headline of up to [number] words that describes only what the chart shows, and one question the chart leaves open.
If anything is missing or unreadable, say what's missing and don't guess. Don't attribute a cause to the change.</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m16-template">📋 Copy the template</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: Does the Model Read the Chart Correctly?</h3>
                    <p><b>What you need:</b> a chatbot that accepts images (Gemini, ChatGPT or Claude) and the chart from the "Templates & case studies" tab. The exercise takes about 15 minutes. No chatbot that accepts images? You can do steps 4-5 yourself and compare with the sample answer in the "Templates & case studies" tab.</p>
                    <ol>
                        <li><b>Step 1, download:</b> download the chart from the "Templates & case studies" tab (the "Download the chart" button).</li>
                        <li><b>Step 2, the bad prompt:</b> open a new chat, upload the image and type only: "Summarize the chart and write a headline. We introduced a new queue system in February." Note down: does the headline claim the system is the reason? Did the model say "median"?</li>
                        <li><b>Step 3, the engineered prompt:</b> open a <b>new chat</b> (so the model isn't influenced by its previous answer), upload the image again and paste the engineered prompt (there's a copy button in the "Templates & case studies" tab). Compare with the answer from step 2.</li>
                        <li><b>Step 4, a cropped chart:</b> download <a href="/assets/m16-chart-en-cropped.png" download="cropped-chart.png" class="text-blue-700 underline font-semibold">the cropped version of the chart</a>, which has no title and no unit. In a new chat, upload it with the same engineered prompt. Did the model say the unit is missing, or did it guess "minutes"?</li>
                        <li><b>Step 5, your own check:</b> compare every number the model wrote with the chart itself. The model is an assistant, but you're the one responsible for accuracy.</li>
                    </ol>

                    <h4>❓ Decision question: the team's target is a median wait of at most 10 minutes. Which line would you put in the report?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-16" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">"We met the target because waiting time went down"</summary><p class="mt-2">❌ Right direction, but check the threshold: 12 minutes is still above 10. Things improved; the target hasn't been met yet.</p></details>
                    <details name="practice-16" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">"In February the median was 12 minutes: 6 less than January, and still 2 minutes above target"</summary><p class="mt-2">✅ Correct. Each of the three parts of the sentence can be checked against the chart. You could add a recommendation to check what contributed to the change before attributing it to the system.</p></details>
                    <details name="practice-16" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">"Every caller saved six minutes thanks to the system"</summary><p class="mt-2">❌ Two mistakes: a median describes the middle, not every caller, and nothing in the chart shows that the system is the reason.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>You recorded both periods, both values and the unit correctly (January 18, February 12, minutes).</li>
                        <li>The change you calculated is 6 minutes, and the relative change was calculated from 18 (about 33%).</li>
                        <li>Your headline talks about the median and doesn't claim the system is the cause.</li>
                        <li>You checked what the model did with the cropped chart: said information was missing, or guessed.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>At another branch the median fell from 12 to 9 minutes. Write a headline and calculate the relative change.</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">A drop of 3 minutes. 3 ÷ 12 (the starting point) = 25%. Sample headline: "At branch B, median waiting time fell from 12 to 9 minutes (25%)".</p></details>`,
        promptScenarios: [
            'Write a prompt that asks the model to extract, for each bar in an attached bar chart, the period, value and unit, and show them in a table.',
            'Write a prompt that tells the model what to do when the title or unit in a chart image is cropped: say what is missing and do not guess.',
            'Write a prompt that asks the model to check a headline like "The new system cut waiting time by a third", separating what the chart shows from a claim about cause.'
        ]
    },
    17: {
        cases: `
                    <h3>🔥 Case Study: Is a Short Quiz Better Than Rereading?</h3>
                    <p><b>The story:</b> You're responsible for training new employees. Today every new employee reads the training booklet twice. The training manager asks: "Should we replace the second reading with a short quiz?". She heard about a study in which 95% of participants enjoyed a quiz. Does that answer her question?</p>
                    <p>Below are three short abstracts. <b>They were written especially for this exercise and are not real studies</b>, so you can practice without relying on any tool.</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 my-3 text-sm space-y-2" id="m17-abstracts"><p><b>Abstract A:</b> Forty new employees were randomly assigned to two equal groups. One group practiced with a retrieval quiz and the other reread the material. Four weeks later, researchers measured whether each employee performed the task on their own. 14 out of 20 succeeded in the quiz group, and 10 out of 20 in the rereading group.</p>
<p><b>Abstract B:</b> Twenty new employees filled out a questionnaire right after a quiz. 19 of them reported that they enjoyed the activity. There was no comparison group, and performance was not measured.</p>
<p><b>Abstract C:</b> New employees were randomly assigned to a quiz or to rereading. Task performance was measured "at follow-up". The abstract doesn't say how long after training performance was measured, or how many succeeded in each group.</p></div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m17-abstracts">📋 Copy all three abstracts</button>

                    <h4>❌ A bad (intuitive) prompt:</h4>
                    <div class="bg-red-50 p-3 border-l-4 border-red-500 rounded text-sm mb-2">"Is a quiz better than rereading? Give me studies that prove it."</div>
                    <ul>
                        <li>❌ <b>"That prove it"</b> asks in advance for evidence on one side only.</li>
                        <li>❌ <b>No definition</b> of who was studied, what was measured and when, so even a study about enjoyment (like abstract B) will look relevant.</li>
                        <li>❌ <b>A regular chatbot may invent papers</b> (Lesson 15).</li>
                    </ul>

                    <h4>✅ An engineered prompt for sorting the abstracts (works in any chatbot):</h4>
                    <div class="bg-green-50 p-4 border-l-4 border-green-500 rounded text-sm mb-2" id="m17-good-prompt"><b>Role:</b> Act as a researcher who checks evidence carefully.<br>
<b>Context:</b> I need to decide whether to replace rereading of the training material with a short retrieval quiz for new employees.<br>
<b>Task:</b> Sort each of the abstracts I'll paste below into one of three boxes: "eligible", "not eligible" or "needs full text". Eligible = new employees, a retrieval quiz compared with rereading, a measure of performing the task on their own, and measurement four weeks later.<br>
<b>Constraints:</b> Rely only on the text I paste. If a detail is missing, write "not reported" and don't fill it in from memory. Don't search for or add any other studies.<br>
<b>Format:</b> A table with the columns: abstract, what was measured, when, comparison group, decision, and the sentence from the text the decision relies on. Below the table: the difference between the groups in percentage points, if it can be calculated.</div>
                    <button type="button" class="copy-btn mb-4 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m17-good-prompt">📋 Copy the prompt</button>

                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show a sample solution (try it yourself first)</summary>
                        <p class="mt-2"><b>A is eligible:</b> random assignment, a comparison group, performance, four weeks. 14 out of 20 = 70% compared with 10 out of 20 = 50%, a difference of 20 percentage points.</p>
                        <p><b>B is not eligible:</b> it measured enjoyment right after the quiz, with no comparison group. It answers a different question ("How did employees experience the training?").</p>
                        <p><b>C needs full text:</b> it's probably eligible, but it's missing when performance was measured and how many succeeded. You need to open the full paper and look in the methods and results sections.</p>
                        <p><b>Recommendation:</b> "In one randomized study (40 employees), 70% succeeded after a quiz compared with 50% after rereading. It's a small sample, so we should try the quiz in a pilot here and measure performance after four weeks."</p>
                    </details>

                    <h4>📋 A ready-made search question for Elicit:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap" dir="ltr" id="m17-elicit-query">Do new employees perform a task independently better four weeks after training when they practice with a short retrieval quiz, compared with rereading the material?
For each paper, build a table with: population, intervention, comparison, outcome measure, timing of measurement, result (with numbers per group), and the exact supporting sentence. Mark any missing detail as "not reported".</pre>
                    <button type="button" class="copy-btn mt-2 bg-white border border-slate-300 hover:bg-slate-50 text-sm font-semibold px-3 py-1.5 rounded-lg" data-copy="m17-elicit-query">📋 Copy the search question</button>`,
        practice: `
                    <h3>🏋️ Hands-on Exercise: From Abstracts to a Recommendation</h3>
                    <p><b>What you need:</b> the three abstracts from the "Templates & case studies" tab, pen and paper (or a document), and any chatbot. Elicit is optional. The exercise takes about 20 minutes.</p>
                    <ol>
                        <li><b>Step 1, on your own, no AI:</b> read the three abstracts. For each one, write down: what was measured, when it was measured, whether there was a comparison group, and which box it belongs in (eligible / not eligible / needs full text). Copy the sentence that decided it.</li>
                        <li><b>Step 2, with a chatbot:</b> open a new chat, paste the engineered prompt and the three abstracts below it (both have a copy button in the "Templates & case studies" tab). Compare the model's table with yours. Where they differ, go back to the text: who's right?</li>
                        <li><b>Step 3, optional, real studies in Elicit:</b> go to elicit.com and sign up (there's a free plan). Open the Research Agent, paste the search question from the "Templates & case studies" tab and ask for a table. Pick one paper, open the source and check one number from the table yourself. No suitable paper found? That's a result too. Write it down.</li>
                        <li><b>Step 4, the recommendation:</b> write the manager a two-sentence recommendation that includes the difference between the groups in percentage points, one limitation, and a practical step that can be tested (for example, a pilot).</li>
                    </ol>

                    <h4>❓ Decision question: abstract C doesn't say when performance was measured. What's the next step?</h4>
                    <p class="text-sm text-slate-600">Click each answer to see feedback.</p>
                    <details name="practice-17" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Include it, because the result sounds relevant</summary><p class="mt-2">❌ The rule you set in advance requires measurement four weeks later. "At follow-up" could mean one day.</p></details>
                    <details name="practice-17" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Exclude it, because the result isn't significant</summary><p class="mt-2">❌ The abstract doesn't report results at all. The decision depends on fit with the question and on the information available, not on a guess.</p></details>
                    <details name="practice-17" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Mark it "needs full text" and look for the measurement timing in the full paper</summary><p class="mt-2">✅ Correct. It's a detail that could change the decision. If it doesn't appear in the full paper either, record it as missing.</p></details>

                    <h4>✔️ Self-check: one point per item</h4>
                    <ul>
                        <li>Your rule defines the population, comparison, measure and timing in advance.</li>
                        <li>All three abstracts were sorted, and every decision has a supporting sentence from the text.</li>
                        <li>The result was reported with the numbers (14 out of 20, 10 out of 20) and in percentage points (20).</li>
                        <li>The recommendation includes a limitation (small sample, one study) and a practical step that can be tested.</li>
                    </ul>

                    <h4>🎯 Exit ticket</h4>
                    <p>Suppose the manager asks a different question: "How did employees experience the training?". Which abstract becomes relevant now, and what is it still missing?</p>
                    <details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show solution</summary><p class="mt-2">Abstract B, because it measures enjoyment. But it has no comparison group: we can't say anything about how employees who reread the material experienced it.</p></details>`,
        promptScenarios: [
            'Write a prompt for Elicit or a chatbot that frames a search question about employee training, with a defined population, comparison, measure and timing.',
            'Write a prompt that asks for an evidence table from abstracts you paste in, with a supporting sentence for every decision and an instruction to write "not reported" when a detail is missing.',
            'Write a prompt that asks the model to check a recommendation based on one study with a small sample, and to point out its limitations.'
        ]
    }
};

const quizzes = {
    "16": [
        {
            "id": "q1",
            "question": "A median falls from 30 to 24 minutes. What is the change relative to the first period?",
            "options": [
                {
                    "id": "a",
                    "text": "A 6% decrease."
                },
                {
                    "id": "b",
                    "text": "A 20% decrease."
                },
                {
                    "id": "c",
                    "text": "A 25% decrease."
                },
                {
                    "id": "d",
                    "text": "A 24% decrease."
                }
            ],
            "explanation": "The difference is 6 minutes. Dividing by the baseline of 30 gives 20%."
        },
        {
            "id": "q2",
            "question": "You can read the numbers but the unit is cropped. What should the model do?",
            "options": [
                {
                    "id": "a",
                    "text": "Assume minutes."
                },
                {
                    "id": "b",
                    "text": "Infer the unit from the slide theme."
                },
                {
                    "id": "c",
                    "text": "Discard every value."
                },
                {
                    "id": "d",
                    "text": "Return the visible numbers and flag the missing unit."
                }
            ],
            "explanation": "Extract what is visible and request the complete image before interpreting the unit."
        },
        {
            "id": "q3",
            "question": "What evidence would help assess whether a process change contributed to the drop?",
            "options": [
                {
                    "id": "a",
                    "text": "Launch dates, demand and comparison data from similar periods or branches."
                },
                {
                    "id": "b",
                    "text": "A new chart palette."
                },
                {
                    "id": "c",
                    "text": "A more confident headline."
                },
                {
                    "id": "d",
                    "text": "Another screenshot of the same answer."
                }
            ],
            "explanation": "Timing, workload and a comparison help investigate alternative explanations."
        },
        {
            "id": "q4",
            "question": "The target is at most 8 minutes and the measured median is 9. What belongs in the report?",
            "options": [
                {
                    "id": "a",
                    "text": "We met the target by 9%."
                },
                {
                    "id": "b",
                    "text": "Every visitor waited 9 minutes."
                },
                {
                    "id": "c",
                    "text": "The median was one minute above target."
                },
                {
                    "id": "d",
                    "text": "Total waiting time was 9 minutes."
                }
            ],
            "explanation": "Compare the measured statistic with its threshold. It does not describe every individual."
        }
    ],
    "17": [
        {
            "id": "q1",
            "question": "Which screening rule matches the original decision?",
            "options": [
                {
                    "id": "a",
                    "text": "A title containing the word success."
                },
                {
                    "id": "b",
                    "text": "An abstract reporting a positive result."
                },
                {
                    "id": "c",
                    "text": "Independent performance by new employees at four weeks with a rereading comparison group."
                },
                {
                    "id": "d",
                    "text": "A high citation count."
                }
            ],
            "explanation": "Eligibility follows from the decision and should be defined before reading results."
        },
        {
            "id": "q2",
            "question": "A study measured only satisfaction immediately after training. What should you record?",
            "options": [
                {
                    "id": "a",
                    "text": "Ineligible for the defined outcome and timing."
                },
                {
                    "id": "b",
                    "text": "The intervention was ineffective."
                },
                {
                    "id": "c",
                    "text": "Everyone completed the task successfully."
                },
                {
                    "id": "d",
                    "text": "Include because it studied the course."
                }
            ],
            "explanation": "It can inform a question about experience but supplies no delayed performance measure."
        },
        {
            "id": "q3",
            "question": "Fourteen of 20 succeeded in one group and 10 of 20 in the other. What is the absolute difference in success rates?",
            "options": [
                {
                    "id": "a",
                    "text": "4 percentage points."
                },
                {
                    "id": "b",
                    "text": "40 percentage points."
                },
                {
                    "id": "c",
                    "text": "70 percentage points."
                },
                {
                    "id": "d",
                    "text": "20 percentage points."
                }
            ],
            "explanation": "70% minus 50% is 20 percentage points. Four is the difference in the number of successes."
        },
        {
            "id": "q4",
            "question": "A tool supplies a number without a supporting passage. What should you do before submitting it?",
            "options": [
                {
                    "id": "a",
                    "text": "Copy it if it matches your expectation."
                },
                {
                    "id": "b",
                    "text": "Check the original table or passage and mark it unverified if it cannot be located."
                },
                {
                    "id": "c",
                    "text": "Ask for a more confident tone."
                },
                {
                    "id": "d",
                    "text": "Treat it as the mean across all studies."
                }
            ],
            "explanation": "To cite a number, identify the exact measure and group in the original material."
        }
    ]
};

module.exports = { modules, extras, quizzes };
