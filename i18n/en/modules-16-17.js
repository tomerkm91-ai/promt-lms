const modules = {
    16: {
        title: "Read a chart with Google AI Studio",
        description: "Extract values and units, check a calculation and decide which claims a chart supports.",
        content: `<h3>Read a chart with Google AI Studio</h3>
<p>A team lead needs a headline for a meeting. An AI suggests, “Our new booking system cut waiting time by a third.” Which part would you publish?</p>
<h4>Learning goals</h4><ul><li>Extract a value, period and unit from each bar.</li><li>Calculate absolute and relative changes using the correct baseline.</li><li>Distinguish a visible pattern from a claim that needs more evidence.</li></ul>
<p>A multimodal prompt pairs an instruction with an image. First ask the model to read the title, units, periods and plotted values. Then request a calculation and an interpretation. Checking these separately helps you locate errors. If a label is cropped, have the model identify the missing field.</p>
<h4>Workshop schedule · 45 min</h4><ol><li><b>5 min</b> · Opening • Mark the words in the suggested headline that need evidence.</li><li><b>8 min</b> · Demonstration • Read the chart values and units aloud before interpreting the bars.</li><li><b>12 min</b> · Guided practice • In pairs, compare the two prompts. Swap analyst and reviewer roles.</li><li><b>15 min</b> · Independent work • Crop the unit, test again and write a headline. Choose and defend a response to the target scenario.</li><li><b>5 min</b> · Exit task • Solve the second-branch example and submit your work against the rubric.</li></ol>
<p>Tool and documentation · <a class="text-blue-700 underline" href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">Google AI Studio</a> · <a class="text-blue-700 underline" href="https://ai.google.dev/gemini-api/docs/image-understanding" target="_blank" rel="noopener noreferrer">Image understanding</a></p>`
    },
    17: {
        title: "From papers to a recommendation with Elicit",
        description: "Define an evidence question, screen abstracts and check each extracted value against its source.",
        content: `<h3>From papers to a recommendation with Elicit</h3>
<p>A training manager is considering replacing rereading with a retrieval quiz. One study says 95% enjoyed the quiz. Does that answer the manager’s question?</p>
<h4>Learning goals</h4><ul><li>Specify the population, intervention, comparison, outcome and timing.</li><li>Apply the same eligibility rule to three abstracts.</li><li>Write a recommendation that states both the result and its limits.</li></ul>
<p>Define the decision before searching. Here the manager wants to know whether new employees perform a task independently four weeks after a retrieval quiz versus rereading. Mark each abstract as eligible, ineligible or requiring full text. Keep the sentence that supports each decision.</p>
<h4>Workshop schedule · 45 min</h4><ol><li><b>5 min</b> · Opening • Show the satisfaction figure. Ask what evidence would change a training decision.</li><li><b>8 min</b> · Demonstration • Define the question together. Screen A aloud and point to the inclusion evidence.</li><li><b>12 min</b> · Guided practice • Screen B and C independently, then compare decisions in pairs and flag missing information.</li><li><b>15 min</b> · Independent work • Build the table and write a recommendation. Check one row against its source. Optionally add a real paper in Elicit.</li><li><b>5 min</b> · Exit task • Change the decision question and reconsider eligibility.</li></ol>
<p>Tool and documentation · <a class="text-blue-700 underline" href="https://elicit.com/" target="_blank" rel="noopener noreferrer">Elicit</a> · <a class="text-blue-700 underline" href="https://support.elicit.com/en/articles/17220397-where-did-find-papers-extract-data-and-chat-with-papers-go" target="_blank" rel="noopener noreferrer">Research Agent</a></p>`
    }
};

const extras = {
    16: {
        cases: `<h3>Median wait at the service desk · minutes</h3>
<figure class="bg-slate-50 p-4 my-4 rounded-lg"><figcaption class="font-semibold">Median wait at the service desk · minutes</figcaption><div class="mt-3"><span>January · 18</span><div aria-hidden="true" style="width:90%;height:18px;background:#176b84;border-radius:3px"></div></div><div class="mt-3"><span>February · 12</span><div aria-hidden="true" style="width:60%;height:18px;background:#176b84;border-radius:3px"></div></div></figure>

<details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show a worked answer</summary><p>These are monthly medians. The February median was six minutes lower. Relative to January, it fell by about a third. The chart contains no information about when the booking system launched or whether demand changed.</p></details>
<h4>Prompt to run</h4><blockquote class="p-4 bg-blue-50 rounded-lg">Read the attached chart. For each bar, give the period, value and unit. Calculate the change in the original unit and as a percentage and show the denominator. Write a headline of up to 12 words and one question the image leaves open. Identify any unreadable labels.</blockquote>`,
        practice: `<h3>Assignment</h3>
<p>Take a screenshot of the chart in Case Studies and attach it in Google AI Studio. First ask “Summarize this chart.” In a fresh chat use the focused prompt. Crop away the title and unit, then repeat in a new chat. Record whether the model identifies the missing information. You can also audit the sample response in this lesson without an account.</p>
<h4>The team target is a median wait of at most 10 minutes. Which line belongs in the report?</h4><p>Choose a response to see feedback</p>
<details name="practice-16" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">“We met the target because the wait fell.”</summary><p>The direction is correct. Compare the February value of 12 with the threshold of 10.</p></details>
<details name="practice-16" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">“The February median was 12 minutes, six below January and two above target.”</summary><p>Each part of this sentence can be checked. Investigate what changed before attributing the drop to the booking system.</p></details>
<details name="practice-16" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">“Every visitor saved six minutes thanks to the new system.”</summary><p>A median describes the middle of a distribution. The chart includes neither individual wait times nor a comparison that isolates the system’s effect.</p></details>
<h4>What to submit</h4><p>Submit a headline, two rows of extracted values, a reproducible calculation and one follow-up question. Mark one sentence you revised after inspecting the chart.</p>
<h4>Self-check · one point per criterion</h4><ul><li>Both periods, values and the unit are correct.</li><li>The calculation gives 6 minutes and uses 18 as the baseline.</li><li>The headline identifies the median and separates observation from possible cause.</li><li>The cropped-image response identifies the missing information.</li></ul>
<h4>Exit task</h4><p>At another branch the median fell from 12 to 9 minutes. Write a headline and calculate the relative change.</p>
<details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show a worked answer</summary><p>Check for a drop of three minutes, or 25% of the starting value.</p></details>`,
        promptScenarios: [
            "Request a value, period and unit for each bar in a chart.",
            "Ask a model to handle a chart whose unit label has been cropped.",
            "Write instructions to audit a headline that attributes a monthly change to a new system."
        ]
    },
    17: {
        cases: `<h3>Three fictional abstracts about employee training</h3>
<h4>Three fictional abstracts about employee training</h4><p><b>A</b> · Forty new employees were randomized equally to retrieval practice or rereading. Independent task performance was measured four weeks later. Fourteen of 20 in the retrieval group and 10 of 20 in the rereading group succeeded.</p>
<p><b>B</b> · Twenty new employees completed a survey immediately after a quiz. Nineteen enjoyed the activity. There was no comparison group and no performance measure.</p>
<p><b>C</b> · New employees were randomized to quizzes or rereading. Independent performance was assessed at follow-up. The abstract gives neither the duration of follow-up nor the number of successes.</p>
<p>The three excerpts in Case Studies are fictional teaching material. Screen them without a tool first. Then use the Elicit Research Agent to find real papers and extract the same fields. Open the original source and verify every figure you plan to cite.</p>
<details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show a worked answer</summary><p>Include A, exclude B for this question, and seek full text for C. In A, 70% succeeded versus 50%, a difference of 20 percentage points. The sample contained 40 people. This supports testing a local pilot while leaving its expected effect in a new workplace uncertain.</p></details>
<h4>Prompt to run</h4><blockquote class="p-4 bg-blue-50 rounded-lg">Find studies in new employees comparing retrieval quizzes with rereading. The outcome is independent task performance at four weeks. For each paper report population, intervention, comparator, outcome, timing, result and a supporting passage with its location. Write “not reported” for missing details. Distinguish an excluded study from one requiring full text.</blockquote>`,
        practice: `<h3>Assignment</h3>
<p>Work in pairs. Independently screen the three excerpts in Case Studies, then compare decisions. Record what was measured, when it was measured and the line that decided each case. If you have Elicit access, run the prompt on real literature and check one result against its original source. Record a search that finds no eligible study as such.</p>
<h4>Excerpt C leaves the follow-up time unspecified. What should you do next?</h4><p>Choose a response to see feedback</p>
<details name="practice-17" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Include it because the outcome sounds relevant.</summary><p>Apply the timing rule consistently. The phrase “at follow-up” does not establish four weeks.</p></details>
<details name="practice-17" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Exclude it because the result is not significant.</summary><p>The abstract reports no significance test. Eligibility depends on the criteria and available information.</p></details>
<details name="practice-17" class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Mark it for full-text review and look for timing in the methods.</summary><p>Timing could change the decision. Record the field as missing if the full paper also omits it.</p></details>
<h4>What to submit</h4><p>Submit a three-row screening table and a two-sentence recommendation. Include the difference between the groups, one limitation and a practical decision you could test in a pilot.</p>
<h4>Self-check · one point per criterion</h4><ul><li>The eligibility rule defines population, comparator, outcome and time in advance.</li><li>All three excerpts have a decision and a supporting sentence.</li><li>The result includes denominators and a difference in percentage points.</li><li>The recommendation gives one limitation and a testable next step.</li></ul>
<h4>Exit task</h4><p>Change the question to “How did employees experience training?” Which excerpt becomes useful, and what comparison is still missing?</p>
<details class="p-3 my-2 border rounded-lg"><summary class="cursor-pointer font-semibold">Show a worked answer</summary><p>Excerpt B measures satisfaction but has no rereading group.</p></details>`,
        promptScenarios: [
            "Write a search question on employee training with a defined outcome and follow-up time.",
            "Request an evidence table with supporting passages and a rule for missing fields.",
            "Write instructions for auditing a recommendation based on one small study."
        ]
    }
};

const quizzes = {
    16: [
        {
            id: 'q1',
            question: "A median falls from 30 to 24 minutes. What is the change relative to the first period?",
            options: [
                { id: 'a', text: "A 6% decrease." },
                { id: 'b', text: "A 20% decrease." },
                { id: 'c', text: "A 25% decrease." },
                { id: 'd', text: "A 24% decrease." }
            ],
            explanation: "The difference is 6 minutes. Dividing by the baseline of 30 gives 20%."
        },
        {
            id: 'q2',
            question: "You can read the numbers but the unit is cropped. What should the model do?",
            options: [
                { id: 'a', text: "Assume minutes." },
                { id: 'b', text: "Infer the unit from the slide theme." },
                { id: 'c', text: "Discard every value." },
                { id: 'd', text: "Return the visible numbers and flag the missing unit." }
            ],
            explanation: "Extract what is visible and request the complete image before interpreting the unit."
        },
        {
            id: 'q3',
            question: "What evidence would help assess whether a process change contributed to the drop?",
            options: [
                { id: 'a', text: "Launch dates, demand and comparison data from similar periods or branches." },
                { id: 'b', text: "A new chart palette." },
                { id: 'c', text: "A more confident headline." },
                { id: 'd', text: "Another screenshot of the same answer." }
            ],
            explanation: "Timing, workload and a comparison help investigate alternative explanations."
        },
        {
            id: 'q4',
            question: "The target is at most 8 minutes and the measured median is 9. What belongs in the report?",
            options: [
                { id: 'a', text: "We met the target by 9%." },
                { id: 'b', text: "Every visitor waited 9 minutes." },
                { id: 'c', text: "The median was one minute above target." },
                { id: 'd', text: "Total waiting time was 9 minutes." }
            ],
            explanation: "Compare the measured statistic with its threshold. It does not describe every individual."
        }
    ],
    17: [
        {
            id: 'q1',
            question: "Which screening rule matches the original decision?",
            options: [
                { id: 'a', text: "A title containing the word success." },
                { id: 'b', text: "An abstract reporting a positive result." },
                { id: 'c', text: "Independent performance by new employees at four weeks with a rereading comparison group." },
                { id: 'd', text: "A high citation count." }
            ],
            explanation: "Eligibility follows from the decision and should be defined before reading results."
        },
        {
            id: 'q2',
            question: "A study measured only satisfaction immediately after training. What should you record?",
            options: [
                { id: 'a', text: "Ineligible for the defined outcome and timing." },
                { id: 'b', text: "The intervention was ineffective." },
                { id: 'c', text: "Everyone completed the task successfully." },
                { id: 'd', text: "Include because it studied the course." }
            ],
            explanation: "It can inform a question about experience but supplies no delayed performance measure."
        },
        {
            id: 'q3',
            question: "Fourteen of 20 succeeded in one group and 10 of 20 in the other. What is the absolute difference in success rates?",
            options: [
                { id: 'a', text: "4 percentage points." },
                { id: 'b', text: "40 percentage points." },
                { id: 'c', text: "70 percentage points." },
                { id: 'd', text: "20 percentage points." }
            ],
            explanation: "70% minus 50% is 20 percentage points. Four is the difference in the number of successes."
        },
        {
            id: 'q4',
            question: "A tool supplies a number without a supporting passage. What should you do before submitting it?",
            options: [
                { id: 'a', text: "Copy it if it matches your expectation." },
                { id: 'b', text: "Check the original table or passage and mark it unverified if it cannot be located." },
                { id: 'c', text: "Ask for a more confident tone." },
                { id: 'd', text: "Treat it as the mean across all studies." }
            ],
            explanation: "To cite a number, identify the exact measure and group in the original material."
        }
    ]
};

module.exports = { modules, extras, quizzes };
