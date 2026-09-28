// 🔥 תוכן הלשוניות "תבניות ומקרי בוחן" ו"תרגול שטח מעשי" ותרחישי כתיבת פרומפט לכל מודול.
// נמצא בשרת (ולא בדף) כדי שתוכן של מודולים נעולים לא יישלח למי שאין לו גישה.

const MODULE_EXTRAS = {
    1: {
        cases: `
                    <h3>🔥 מקרי בוחן ותבניות שימוש: יסודות ה-AI</h3>
                    <h4>❌ פרומפט רע (אינטואיטיבי):</h4>
                    <div class="bg-red-50 p-3 border-r-4 border-red-500 rounded text-sm mb-4">"תכתוב לי מייל של התפטרות מהעבודה בשביל המנהל שלי"</div>
                    
                    <h4>✅ פרומפט מהונדס (Master Level):</h4>
                    <div class="bg-green-50 p-4 border-r-4 border-green-500 rounded text-sm mb-4">
                        <b>תפקיד:</b> פעל כיועץ קריירה מומחה ומנסח מכתבים רשמיים.<br>
                        <b>הקשר:</b> אני עוזב את תפקידי כמנהל פרויקטים בחברת הייטק לאחר 3 שנים לטובת אתגר חדש. היחסים עם המנהל מעולים ואני רוצה לשמור על קשר חיובי.<br>
                        <b>משימה:</b> נסח מכתב התפטרות רשמי, מכבד ומקצועי.<br>
                        <b>מגבלות:</b> טון מכבד אך קורקטי, אורך של עד 120 מילים, ללא דרמה.<br>
                        <b>פורמט:</b> מבנה של מכתב רשמי הכולל כותרת, גוף המכתב וסיומת.
                    </div>
                    <h4>📋 תבנית פרומפט מוכנה להעתקה:</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Act as a [ROLE].
I need to achieve [OBJECTIVE] because [CONTEXT].
Please make sure to follow these rules: [CONSTRAINTS].
Format the final output as a [FORMAT].</pre>`,
        practice: `
                    <h3>🏋️ תרגיל שטח מעשי: פיצוח עקרון ההקשר</h3>
                    <p><b>תרחיש השטח:</b> קיבלתם משימה מהמנכ"ל שלכם לכתוב פוסט לרשת לינקדאין שמסכם דוח רבעוני של החברה, אבל הוא נתן לכם רק משפט אחד: "הרווחנו השנה 2 מיליון שקל".</p>
                    <p><b>המשימה שלכם:</b> בנו פרומפט המבוסס על "עקרונות הזהב" של שיעור 1 (בהירות, הקשר, והפרדה). השתמשו בתגיות <code>&lt;data&gt;&lt;/data&gt;</code> כדי להזין את הנתון היבש, והנחו את המודל לייצר פוסט עסקי המכוון למשקיעים פוטנציאליים.</p>`,
        promptScenarios: []
    },
    2: {
        cases: `
                    <h3>🔥 מקרי בוחן ותבניות שימוש: אנטומיה של פרומפט</h3>
                    <p>כאן נבין כיצד שילוב של <b>Constraints (מגבלות)</b> מציל פרויקטים מהצפת מידע או הזיות.</p>
                    <h4>📋 תבנית פרומפט שלמה (טבלאות ואנליזה):</h4>
                    <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
[Role]: Data Analyst Specialist.
[Context]: Analyzing customer churn for a telecom app.
[Objective]: Summarize key reasons customers leave.
[Constraints]: Do not use bullet points. Use an HTML table only.
[Output Format]: Table with columns: Reason, Impact, Action Item.</pre>`,
        practice: `
                    <h3>🏋️ תרגיל שטח מעשי: בניית פרומפט מבוסס רכיבים</h3>
                    <p><b>המשימה:</b> עליכם לכתוב פרומפט מלא שיעזור למנהל שיווק לבנות תוכנית עבודה שבועית. עליכם להשתמש בצורה מפורשת ומסומנת בכל חמשת הרכיבים: Role, Context, Objective, Constraints, Output Format.</p>`,
        promptScenarios: []
    },
    3: {
        cases: `
                    <h3>🔥 מקרי בוחן ותבניות שימוש: טכניקות מקצועיות</h3>
                    <h4>💡 דוגמה חיונית ל-Few-shot Prompting:</h4>
                    <p>נניח שאנו רוצים שהמודל יסווג פניות תמיכה של לקוחות למחלקות קבועות מראש בצורה מדויקת:</p>
                    <pre class="bg-slate-100 text-slate-800 p-4 rounded-lg text-xs font-mono text-right">
פנייה: "החשבון שלי נחסם ואני לא מצליח להיכנס" -> מחלקה: אבטחה ותמיכה טכנית
פנייה: "רציתי לדעת כמה עולה המנוי השנתי שלכם" -> מחלקה: מכירות וגבייה
פנייה: "האם יש לכם הנחה לחיילים?" -> מחלקה: [כאן המודל ישלים אוטומטית]</pre>`,
        practice: `
                    <h3>🏋️ תרגיל שטח מעשי: שרשרת חשיבה (Chain of Thought)</h3>
                    <p>תנו למודל משימה חשבונאית מורכבת הכוללת חישוב מע"מ, הנחות מצטברות ומס חברות. הנחו אותו לפתור את זה בשתי שיטות: פעם אחת ישירות, ופעם שנייה תוך שימוש מפורש בטכניקת Chain of Thought, והשוו את הדיוק הפיננסי.</p>`,
        promptScenarios: [
          "בקשו ממודל לסווג פניות שירות לקוחות לקטגוריות קבועות מראש (שירות/מכירות/תלונה) באמצעות Few-shot Prompting.",
          "בקשו ממודל לפתור בעיה חשבונאית מורכבת (מע\"מ, הנחה מצטברת ומס חברות) באמצעות Chain of Thought.",
          "בקשו ממודל לשכתב פסקה שיווקית משפה יבשה לשפה משכנעת, בשני שלבים נפרדים (Chain Prompting)."
        ]
    },
    4: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: ChatGPT ככלי אנליטי</h3>
                                <h4>💡 בניית Custom GPT לניתוח חוזים משפטיים:</h4>
                                <p>חברה רוצה שכל עובד יוכל להעלות חוזה ולקבל בדיקה מהירה מול רשימת סעיפים אסורים, מבלי לחשוף את מדיניות החברה מחדש בכל שיחה.</p>
                                <h4>📋 תבנית הנחיית מערכת (System Instructions) ל-Custom GPT:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
You are a Contract Compliance Assistant for [Company Name].
Always check uploaded contracts against this list of forbidden clauses: [list].
If a forbidden clause is found, quote it and explain the risk in plain language.
Never approve a contract yourself - always end with "Escalate to Legal: Yes/No".</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: ניתוח נתונים אוטומטי</h3>
                                <p><b>המשימה:</b> העלו ל-ChatGPT קובץ Excel או CSV עם נתוני מכירות (אמיתי או מומצא), ובקשו ממנו לפעול כאנליסט נתונים בכיר: לזהות את שלושת המגמות המרכזיות, לחשב שיעור צמיחה חודשי, ולהפיק גרף המדגים את הממצא המשמעותי ביותר.</p>`,
        promptScenarios: [
          "בקשו מ-ChatGPT לנתח קובץ Excel של נתוני מכירות ולהפיק תובנות מרכזיות וגרף.",
          "בנו הנחיית מערכת (System Instructions) ל-Custom GPT שבודק חוזים מול רשימת סעיפים אסורים.",
          "בקשו מ-ChatGPT ליצור תמונה שיווקית למוצר חדש לפי בריף מדויק."
        ]
    },
    5: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: Claude לכתיבת קוד ולניתוח מסמכים</h3>
                                <h4>💡 ניתוח חוזה ארוך של 80 עמודים בבת אחת:</h4>
                                <p>הודות לחלון הקשר הענק, ניתן להדביק מסמך משפטי שלם ל-Claude ולבקש ממנו לאתר סתירות פנימיות בין סעיפים שונים, במקום לפצל אותו לחלקים.</p>
                                <h4>📋 תבנית פרומפט לבניית Artifact חי:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Act as a senior frontend developer.
Build a single-file HTML/JS/Tailwind widget that [describe feature].
Requirements: fully interactive, no external dependencies, mobile responsive.
Open it as an Artifact so I can test it live.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: בניית כלי אינטראקטיבי</h3>
                                <p><b>המשימה:</b> בקשו מ-Claude לבנות עבורכם מחשבון טיפים (Tip Calculator) אינטראקטיבי ב-HTML ו-Tailwind CSS. עקבו אחרי חלונית ה-Artifacts שנפתחת, ולאחר מכן בקשו שינוי עיצובי (למשל שינוי צבע) וראו כיצד הוא מעדכן את הקוד החי מיידית.</p>`,
        promptScenarios: [
          "בקשו מ-Claude לבנות אפליקציית מחשבון תקציב חודשי אינטראקטיבית ב-HTML ו-Tailwind.",
          "תארו מסמך משפטי ארוך ובקשו מ-Claude לאתר סתירות פנימיות בין סעיפים.",
          "בקשו מ-Claude לנתח קוד קיים ולאתר בו פרצת אבטחה אפשרית."
        ]
    },
    6: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: Gemini ו-Google Workspace</h3>
                                <h4>💡 סיכום שרשור מיילים ארוך לפני ישיבה:</h4>
                                <p>באמצעות <code>@Google Drive</code> ניתן לבקש מ-Gemini לסכם קובץ או שרשור ארוך לשלוש נקודות פעולה, בלי לפתוח אותו בעצמכם.</p>
                                <h4>📋 תבנית פרומפט עם תוסף Workspace:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
@Google Drive summarize the file "[file name]".
List only the 3 open action items and who owns each one.
Format as a checklist.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: בניית מדריך לימוד ב-NotebookLM</h3>
                                <p><b>המשימה:</b> העלו ל-NotebookLM מאמר או פרק לימוד, בקשו ממנו לייצר "Study Guide" הכולל שאלות ותשובות, ולבסוף הפעילו את תכונת ה-Audio Overview כדי לשמוע כיצד שתי דמויות ה-AI מסכמות את החומר בקול.</p>`,
        promptScenarios: [
          "בקשו מ-Gemini לסכם שרשור מיילים ארוך מ-Gmail לשלוש נקודות פעולה.",
          "תארו מאמר שהעליתם ל-NotebookLM ובקשו מדריך לימוד הכולל שאלות ותשובות.",
          "בקשו מ-Gemini לנתח קובץ Google Sheets ולהפיק ממנו תובנות עסקיות."
        ]
    },
    7: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: DeepSeek ומודלי חשיבה</h3>
                                <h4>💡 דיבאגינג קוד שבור בעזרת Reasoning:</h4>
                                <p>כאשר מודל רגיל "מנחש" תיקון שגוי לבאג, מודל Reasoning עובר על כל שורת קוד בתהליך המחשבה הגלוי שלו לפני שהוא מציע פתרון - וכך מפחית משמעותית טעויות.</p>
                                <h4>📋 תבנית פרומפט לדיבאגינג עמוק:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Here is a function that throws an error: [paste code].
Think step by step through the execution before answering.
Identify the exact line causing the failure and explain why, then provide the fixed code.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: השוואת מודל רגיל מול מודל חשיבה</h3>
                                <p><b>המשימה:</b> קחו חידת לוגיקה מתמטית לא טריוויאלית, הריצו אותה מול מודל רגיל (Zero-shot) ומול DeepSeek-R1 במצב Reasoning. עקבו אחרי תהליך ה-"Thought" של R1 ובדקו האם השיטתיות שלו הובילה לתשובה מדויקת יותר.</p>`,
        promptScenarios: [
          "בקשו מ-DeepSeek-R1 לפתור חידת לוגיקה מורכבת במצב Reasoning.",
          "בקשו דיבאגינג עמוק לקוד שבור, עם הסבר שורה-שורה לפני מתן הפתרון.",
          "בנו פרומפט שמשווה בין תשובת מודל רגיל לתשובת מודל Reasoning על אותה בעיה מתמטית."
        ]
    },
    8: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: בחירת המודל הנכון למשימה</h3>
                                <h4>💡 תרחיש: פרויקט מעורב הדורש כמה סוגי עבודה</h4>
                                <p>צוות מוצר צריך לנתח קובץ Excel של נתוני משתמשים, לכתוב קוד לדשבורד, ולסכם ספר מדיניות שלם. כל שלב מנותב למודל המתאים לו ביותר, במקום להשתמש במודל אחד לכל המשימות.</p>
                                <h4>📋 תבנית לניתוב משימות בין מודלים:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Step 1 (ChatGPT): Analyze users.csv and extract 3 key trends.
Step 2 (Claude): Build the dashboard UI code based on Step 1's findings.
Step 3 (Gemini): Summarize the 200-page policy document via Drive.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: מיפוי משימה למודל אופטימלי</h3>
                                <p><b>המשימה:</b> קחו פרויקט אמיתי מהעבודה שלכם ופרקו אותו לשלבים. עבור כל שלב, קבעו איזה מודל (Claude / ChatGPT / Gemini / DeepSeek) הכי מתאים לפי חוזקות הליבה שנלמדו, ונמקו את הבחירה.</p>`,
        promptScenarios: [
          "כתבו פרומפט המנתב משימה מורכבת (ניתוח נתונים, כתיבת קוד וסיכום מסמך) בין כמה מודלים שונים.",
          "בחרו את המודל הנכון למשימת כתיבת קוד מאפס ונמקו את הבחירה בפרומפט עצמו.",
          "בחרו את המודל הנכון למשימת סיכום ספר מדיניות ענק ונמקו את הבחירה בפרומפט עצמו."
        ]
    },
    9: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: AI בסביבת עבודה אמיתית</h3>
                                <h4>💡 בניית לוח תוכן חודשי לרשתות חברתיות:</h4>
                                <p>מנהלת שיווק מזינה פרסונת קהל יעד ומגבלות מותג קשוחות, והמודל מפיק טבלה מלאה של רעיונות, כותרות וטקסטים מוכנים לפרסום עבור כל שבועות החודש.</p>
                                <h4>📋 תבנית פרומפט לתוכנית תוכן:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
[Role]: Social media strategist for a [industry] brand.
[Context]: Target audience is [persona]. Brand tone is [tone].
[Objective]: Build a 4-week content calendar (Instagram + LinkedIn).
[Output Format]: Table with columns: Week, Platform, Headline, Post Copy.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: אוטומציה של משימה חוזרת</h3>
                                <p><b>המשימה:</b> זהו משימה חוזרת ומייגעת מהעבודה או הלימודים שלכם (למשל: מענה למיילים דומים, סיווג פניות, כתיבת סיכומי ישיבות). בנו פרומפט מהונדס שיהפוך את המשימה הזו לתהליך של דקה אחת במקום עשרים.</p>`,
        promptScenarios: [
          "בנו לוח תוכן חודשי לרשתות חברתיות, עם פרסונת קהל יעד ומגבלות מותג קשוחות.",
          "בנו פרומפט לאוטומציה של מענה למיילים חוזרים בשירות לקוחות.",
          "בנו פרומפט לניתוח נתוני מכירות רבעוניים והפקת דוח מנהלים מובנה."
        ]
    },
    10: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: מערכות Multi-Agent</h3>
                                <h4>💡 צוות AI לפיתוח פיצ'ר מקצה לקצה:</h4>
                                <p>במקום פרומפט בודד, שלושה סוכנים עובדים ברצף: סוכן אחד כותב קוד, סוכן שני בודק אבטחה ולוגיקה, וסוכן שלישי מוודא התאמה לדרישות המוצר - ומחזיר משוב לתיקון אם צריך.</p>
                                <h4>📋 תבנית להגדרת תפקידי סוכנים:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Agent 1 (Developer): Write the code for [feature].
Agent 2 (QA): Review Agent 1's code for bugs and security issues. List them.
Agent 3 (Product Manager): Check if the fixed code meets the original requirements.
If not, send it back to Agent 1 with specific feedback.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: תכנון זרימת סוכנים</h3>
                                <p><b>המשימה:</b> תכננו זרימת עבודה של 3 סוכני AI למשימה מהעבודה שלכם. הגדירו לכל סוכן: תפקיד, קלט שהוא מקבל, ופלט שהוא מעביר הלאה. הריצו את הזרימה ידנית מול מודל אחד (פותחים שיחה חדשה לכל "סוכן") ובדקו אם התוצאה הסופית טובה יותר משאלה בודדת.</p>`,
        promptScenarios: [
          "תכננו זרימת עבודה של 3 סוכנים (מתכנת, QA ומנהל מוצר) לפיתוח פיצ'ר חדש.",
          "תכננו זרימת סוכנים לתהליך גיוס עובדים אוטומטי מקצה לקצה.",
          "תכננו זרימת סוכנים ליצירת קמפיין שיווקי מקצה לקצה."
        ]
    },
    11: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: API ואינטגרציה</h3>
                                <h4>💡 חיבור אפליקציה פנימית ל-API של מודל שפה:</h4>
                                <p>חברה רוצה שכל בקשת תמיכה שנכנסת למערכת ה-CRM תסווג אוטומטית על ידי מודל שפה, בלי מגע יד אדם - זה נעשה על ידי קריאת API אוטומטית מהשרת של החברה לספק המודל.</p>
                                <h4>📋 תבנית לבקשת API סטנדרטית:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
POST /v1/messages
Headers: { "x-api-key": "[SECRET_KEY]", "content-type": "application/json" }
Body: { "model": "[model-name]", "max_tokens": 200,
        "messages": [{"role": "user", "content": "[הטקסט שלכם]"}] }</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: קריאה ל-API בפועל</h3>
                                <p><b>המשימה:</b> פתחו את תיעוד ה-API (Documentation) של אחד ממודלי ה-AI שלמדתם עליהם, ונסו לזהות: מהי כתובת ה-Endpoint, אילו כותרות (Headers) חובה לשלוח, ואיך בדיוק המפתח הסודי (API Key) מועבר בבקשה.</p>`,
        promptScenarios: [
          "כתבו פרומפט שמנחה סוכן AI לקרוא ל-API חיצוני של מזג אוויר ולסכם את התחזית להיום.",
          "כתבו פרומפט שמסביר מה זה API Key ומתי אסור לחשוף אותו, כאילו אתם מסבירים למתכנת מתחיל.",
          "כתבו פרומפט שמבקש ממודל לבנות תיעוד (Documentation) קצר לנקודת קצה (Endpoint) של API קיים."
        ]
    },
    12: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: MCP</h3>
                                <h4>💡 סוכן AI שקורא בעצמו מגיליון נתונים חי:</h4>
                                <p>במקום להעתיק ולהדביק נתונים ידנית, מחברים את המודל לשרת MCP שחושף לו גישה ל-Google Sheets - והוא יכול לקרוא ולעדכן את הגיליון ישירות, בעצמו, לפי הצורך.</p>
                                <h4>📋 תבנית להגדרת הרשאות סוכן מול שרת MCP:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Available MCP tools: [Google Sheets: read-only, Gmail: read-only].
Task: Summarize this week's sales numbers from the sheet and draft (do not send) a summary email.
Never use a tool that is not explicitly listed above.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: מיפוי כלים לחיבור MCP</h3>
                                <p><b>המשימה:</b> רשמו 3 כלים או מערכות מהעבודה היומיומית שלכם (יומן, מייל, CRM וכו') שהייתם רוצים שסוכן AI יוכל לגשת אליהם ישירות דרך MCP, ותארו איזו משימה קונקרטית זה היה חוסך לכם.</p>`,
        promptScenarios: [
          "כתבו פרומפט שמגדיר לסוכן AI אילו שרתי MCP (כלים) מותר לו להשתמש בהם למשימה נתונה, ואילו אסור.",
          "כתבו פרומפט שמבקש מהמודל להסביר להנהלה, בשפה עסקית ולא טכנית, למה כדאי לחבר את הצ'אטבוט הארגוני ל-MCP.",
          "כתבו פרומפט לתכנון שרת MCP חדש שיחשוף למודל גישה למערכת CRM פנימית."
        ]
    },
    13: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: Skills</h3>
                                <h4>💡 בניית Skill קבועה לבדיקת חוזים:</h4>
                                <p>במקום להסביר בכל שיחה מחדש אילו סעיפים אסורים בחוזה, בונים Skill קבועה בשם <code>contract-check</code> שכבר "יודעת" את כל הכללים - וקוראים לה בשם בכל פעם שצריך.</p>
                                <h4>📋 תבנית להגדרת Skill חדשה:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Skill name: contract-check
Trigger: when the user uploads a contract or asks to review one.
Instructions: check against this list of forbidden clauses: [list].
Output: quote the risky clause and explain it in plain language.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: תכנון Skill אישית</h3>
                                <p><b>המשימה:</b> חשבו על משימה חוזרת מהעבודה או הלימודים שלכם, ותארו איך הייתם בונים ממנה Skill: מה יהיה שם ה-Skill, מתי היא תופעל, ואילו הוראות מדויקות היא תכיל.</p>`,
        promptScenarios: [
          "כתבו פרומפט שמגדיר Skill חדשה: שם, מתי היא מופעלת, ואילו הוראות היא כוללת, עבור משימה חוזרת מהעבודה שלכם.",
          "כתבו פרומפט שמשווה בין שימוש בפרומפט חד פעמי לבין בניית Skill קבועה לאותה משימה, ומסביר מתי כל אחד מתאים יותר.",
          "כתבו פרומפט שמבקש מהמודל לבדוק Skill קיימת ולהציע לה שיפור."
        ]
    },
    14: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: פלאגינים והרחבות</h3>
                                <h4>💡 הרחבת יכולות בלי לבנות הכל מאפס:</h4>
                                <p>במקום לפתח בעצמכם יכולת חיפוש מלונות, מתקינים פלאגין קיים בכלי ה-AI שמספק את זה מוכן - בדיוק כמו שמתקינים תוסף לדפדפן.</p>
                                <h4>📋 תבנית להשוואת פתרון: פלאגין קיים מול MCP עצמאי:</h4>
                                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Need: connect our internal CRM to the chat assistant.
Option A (Plugin): use the vendor's existing marketplace plugin - fast, but locked to that vendor.
Option B (MCP server): build a small MCP server for our CRM - more work, but works with any MCP client.</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: סקירת פלאגין קיים</h3>
                                <p><b>המשימה:</b> גשו לחנות הפלאגינים/הרחבות של כלי ה-AI שאתם משתמשים בו, מצאו פלאגין אחד רלוונטי לעבודה שלכם, ותארו איזו בעיה קונקרטית הוא פותר.</p>`,
        promptScenarios: [
          "כתבו פרומפט שבודק אילו פלאגינים/הרחבות קיימים לכלי AI מסוים ומסכם את שלושת השימושיים ביותר לצרכים שלכם.",
          "כתבו פרומפט שמסביר את ההבדל בין Plugin קנייני (Proprietary) לבין כלי מבוסס MCP פתוח.",
          "כתבו פרומפט שמתכנן פלאגין חדש (רעיון בלבד) שהיה פותר לכם בעיה יומיומית בעבודה."
        ]
    },
    15: {
        cases: `<h3>🔥 מקרי בוחן ותבניות שימוש: כשהזיה עולה ביוקר</h3>
                <h4>⚖️ מקרה 1: עורכי הדין ופסקי הדין שלא קיימים (Mata v. Avianca, 2023)</h4>
                <p>בתביעה נגד חברת התעופה Avianca בבית משפט פדרלי בניו יורק, עורכי הדין של התובע הגישו מסמך שציטט שישה פסקי דין - ואף אחד מהם לא היה קיים. הם נוצרו על ידי ChatGPT, כולל מספרי תיקים וציטוטים מומצאים. ביוני 2023 השופט הטיל עליהם ועל המשרד קנס של 5,000 דולר, בין היתר משום שלא בדקו את המקורות גם אחרי שהתעוררו שאלות לגביהם.</p>
                <p><b>הלקח:</b> המודל לא "ידע" שהוא ממציא. מי שנושא באחריות הוא מי שהגיש את המסמך בלי לבדוק.</p>

                <h4>✈️ מקרה 2: הצ'אטבוט של Air Canada (Moffatt v. Air Canada, 2024)</h4>
                <p>לקוח ששאל את הצ'אטבוט באתר של Air Canada על הנחה לטיסה בעקבות פטירה של בן משפחה קיבל תשובה שלא תאמה את המדיניות האמיתית של החברה. בית דין בקנדה קבע בפברואר 2024 שהחברה אחראית למידע שהצ'אטבוט שלה נתן, וחייב אותה לפצות את הלקוח.</p>
                <p><b>הלקח:</b> עסק שמציב AI מול לקוחות אחראי למה שה-AI אומר. זה בדיוק המקום להגדיר מגבלות (Constraints) ולהעביר שאלות רגישות לנציג אנושי.</p>

                <h4>📋 תבנית פרומפט שמצמצמת הזיות:</h4>
                <pre class="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs font-mono direction-ltr text-left overflow-x-auto">
Answer ONLY based on the document between the &lt;doc&gt; tags.
If the answer is not in the document, reply exactly: "Not found in the document".
For every claim, quote the exact sentence from the document that supports it.
Do not guess. Do not use outside knowledge.

&lt;doc&gt;
[paste the document here]
&lt;/doc&gt;

Question: [your question]</pre>`,
        practice: `<h3>🏋️ תרגיל שטח מעשי: לתפוס את המודל ממציא</h3>
                <p><b>המשימה:</b> בחרו נושא שאתם מכירים היטב. בקשו מהמודל "רשימה של 5 מאמרים או ספרים על הנושא, עם שם מחבר ושנה". לאחר מכן בדקו כל פריט בחיפוש רגיל, וסמנו: קיים ומדויק / קיים אבל הפרטים שגויים / לא קיים בכלל.</p>
                <p><b>שלב ב':</b> הריצו שוב את אותה בקשה, הפעם עם התבנית מלשונית "מקרי בוחן" ועם מסמך אמיתי שהדבקתם בעצמכם. השוו כמה טעויות היו בכל גרסה.</p>`,
        promptScenarios: [
            'כתבו פרומפט שמבקש מהמודל לסכם מסמך מצורף, עם מגבלה מפורשת לענות רק על סמך המסמך ולצטט את המשפט המדויק לכל טענה.',
            'כתבו פרומפט לצ\'אטבוט שירות לקוחות שמנחה אותו לומר "איני יודע" ולהעביר לנציג אנושי כשהתשובה לא מופיעה במדיניות החברה.',
            'כתבו פרומפט שמבקש מהמודל לבדוק טקסט שכתבתם ולסמן כל טענה עובדתית שדורשת אימות מול מקור חיצוני.'
        ]
    }
};

module.exports = { MODULE_EXTRAS };
