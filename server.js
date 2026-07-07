require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// מניעת חסימות דפדפן (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// 14 מודולים מלאים - תוכן לימודי מורחב, תרגילי התנסות ומבחנים
const modulesDatabase = [
    {
        moduleNumber: 1,
        title: 'יסודות הבינה המלאכותית',
        description: 'מהו מודל שפה, איך AI חושב ועקרונות הזהב.',
        content: `<h3>📘 שיעור 1: מבוא מעמיק לעולם ה-LLM ועקרונות יסוד</h3>
                  <p>מודל שפה גדול (Large Language Model) הוא רשת נוירונים מלאכותית שאומנה על כמויות מידע טקסטואליות עצומות. המודל אינו מבין משמעות כפי שבן אנוש מבין אותה, אלא מחשב בכל רגע נתון מהי המילה (או הטוקן) הבאה בעלת ההסתברות הגבוהה ביותר להופיע בהסתמך על ההקשר שסיפקתם לו.</p>
                  
                  <h4>💡 מנגנון הפעולה: טוקניזציה והקשר</h4>
                  <p>כאשר אתם מזינים טקסט, המודל מפרק אותו ליחידות קטנות הנקראות <b>טוקנים (Tokens)</b> (מילה, חלק ממילה או תו בודד). המודל משתמש במנגנון הנקרא Attention (קשב) כדי להבין אילו מילים במשפט הכי רלוונטיות זו לזו.</p>

                  <h4>🌟 שלושת עקרונות הזהב לפרומפטינג מקצועי:</h4>
                  <ul>
                      <li><b>1. בהירות וספציפיות:</b> הימנעו מניסוחים כלליים כמו "כתוב לי על שיווק". נסחו: "כתוב פוסט שיווקי באורך 100 מילים לפייסבוק שמטרתו למכור קורס דיגיטלי לקהל יעד של אימהות צעירות".</li>
                      <li><b>2. הקשר עשיר (Context):</b> ספקו למודל רקע. מי אתם? מה המטרה? מה הפלטפורמה? למשל: "אני יועץ עסקי, ואני מכין מצגת למנכ"לים...".</li>
                      <li><b>3. הפרדת נתונים (Delimiters):</b> השתמשו בסימונים מיוחדים כמו <code>"""</code>, <code>---</code> או תגיות XML כגון <code>&lt;text&gt;</code> כדי להפריד באופן ברור בין ההנחיות שלכם לבין הטקסט שהמודל צריך לעבד.</li>
                  </ul>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> כנסו ל-ChatGPT או Claude, וכתבו פרומפט המבקש סיכום של מאמר. השתמשו בתגיות <code>&lt;article&gt;[הדבק מאמר כאן]&lt;/article&gt;</code> והנחו את המודל להוציא רק 3 נקודות מפתח מרכזיות.
                  </div>`
    },
    {
        moduleNumber: 2,
        title: 'אנטומיה של פרומפט',
        description: 'Role, Context, Objective, Constraints ופורמט פלט.',
        content: `<h3>📘 שיעור 2: מבנה הפרומפט המושלם (הנדסה מבוססת רכיבים)</h3>
                  <p>כדי להבטיח פלט מדויק ועקבי בכל פעם, מהנדסי פרומפטים משתמשים במבנה קבוע הכולל 5 רכיבי ליבה:</p>
                  
                  <ol>
                      <li><b>Role (תפקיד / פרסונה):</b> מגדיר למודל מאיזו נקודת מבט מקצועית לפעול. <i>דוגמה: "פעל כמתכנת Full Stack בכיר בעל מומחיות באבטחת מידע".</i></li>
                      <li><b>Context (הקשר ורקע):</b> מספק את הסביבה והסיבה למשימה. <i>דוגמה: "אנחנו משיקים אפליקציה חדשה לניהול משימות פנימיות בחברה ויש לנו באג במערכת ההתחברות".</i></li>
                      <li><b>Objective (המשימה/הפעולה):</b> הגדרה מדויקת של מה שצריך לעשות. <i>דוגמה: "נתח את קוד ה-JavaScript הבא ומצא היכן נמצאת פרצת האבטחה".</i></li>
                      <li><b>Constraints (מגבלות וחוקים):</b> חוקי בל יעבור שמגדרים את התשובה. <i>דוגמה: "אל תציע ספריות חיצוניות חדשות, כתוב אך ורק בעברית, אל תכתוב הקדמות או סיומות".</i></li>
                      <li><b>Output Format (פורמט הפלט):</b> הצורה הויזואלית או המבנית של התשובה. <i>דוגמה: "הצג את התשובה בטבלה הכוללת 3 עמודות: השורה השבורה, תיאור הבאג, והקוד המתוקן".</i></li>
                  </ol>

                  <h4>📝 דוגמה לפרומפט מהונדס ומלא:</h4>
                  <pre style="background-color:#f3f4f6; padding:12px; border-radius:6px; font-family:monospace; direction:ltr; text-align:left; overflow-x:auto;">
[Role]: Act as an expert copywriter.
[Context]: We are launching a premium eco-friendly water bottle.
[Objective]: Write 3 catchy slogans for Instagram ads.
[Constraints]: Maximum 5 words per slogan. Do not use the word "Green".
[Output Format]: Numbered list.
                  </pre>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> קחו משימה מהעבודה או הלימודים שלכם ופרקו אותה לפרומפט בנוי לפי 5 הרכיבים הללו. הריצו אותו מול המודל וראו כמה הפלט איכותי יותר בהשוואה לשאלה קצרה.
                  </div>`
    },
    {
        moduleNumber: 3,
        title: 'טכניקות מקצועיות',
        description: 'Zero-shot, Few-shot, Chain Prompting ו-Meta Prompting.',
        content: `<h3>📘 שיעור 3: טכניקות מתקדמות - מעבר משאילתה להנדסת מערכת</h3>
                  <p>כאשר המשימות מורכבות או דורשות דיוק מתמטי ולוגי, אנו משתמשים בטכניקות הנדסה מתקדמות:</p>
                  
                  <h4>1. Zero-shot vs. Few-shot Prompting</h4>
                  <p><b>Zero-shot:</b> בקשת משימה ישירה (למשל: "תרגם את המשפט הזה לערבית").<br>
                  <b>Few-shot:</b> מתן דוגמאות בתוך הפרומפט כדי ללמד את המודל את התבנית הרצויה לפני שהוא ניגש לפתור את המשימה האמיתית.</p>
                  <i>מתי נשתמש?</i> כאשר אנחנו רוצים שהמודל יכתוב בטון ספציפי, יסווג מיילים לקטגוריות קבועות מראש או יוציא פלט במבנה קשוח.

                  <h4>2. Chain of Thought (CoT - שרשרת חשיבה)</h4>
                  <p>הטכניקה החשובה ביותר להפחתת הזיות (Hallucinations) ושיפור יכולות מתמטיות. על ידי הוספת ההנחיה <b>"חשב שלב אחר שלב" (Let's think step by step)</b>, אנו מכריחים את המודל לפרוס את הלוגיקה שלו בטקסט לפני שהוא קובע את התוצאה הסופית.</p>

                  <h4>3. Chain Prompting (שרשור פרומפטים)</h4>
                  <p>פירוק משימה ענקית למספר צ'אטים או שלבים מוגדרים. לדוגמה: שלב א' - בקשת ראשי פרקים למאמר. שלב ב' (באותו הצ'אט) - הרחבה של סעיף 1 בלבד. שלב ג' - כתיבת סיכום.</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> תנו למודל חידת היגיון קשה ללא הנחיות (Zero-shot) ובדקו אם צדק. לאחר מכן, פתחו צ'אט חדש ותנו לו את אותה החידה, אך הפעם הוסיפו בסוף: "תאר את תהליך החשיבה שלך ופתור שלב אחר שלב". השוו את התוצאות.
                  </div>`
    },
    {
        moduleNumber: 4,
        title: 'ChatGPT',
        description: 'עבודה עם קבצים, מחקר, תמונות, Projects ו-GPTs.',
        content: `<h3>📘 שיעור 4: ChatGPT - ניתוח נתונים, כלים מתקדמים ובוטים מותאמים</h3>
                  <p>ממשק ChatGPT Plus / Enterprise כולל יכולות המאפשרות לו לתפקד כאנליסט ועוזר אישי מקיף:</p>
                  
                  <h4>📊 ניתוח נתונים מתקדמים (Advanced Data Analysis)</h4>
                  <p>ניתן להעלות קבצי Excel, CSV, PDF או קודי מקור. מאחורי הקלעים, ChatGPT כותב ומריץ קוד בשפת Python בתוך סביבה מבודדת, מנתח את הקובץ, מבצע חישובים ומייצר גרפים להורדה. זה הופך אותו לכלי אולטימטיבי לניתוח דוחות כספיים או מגמות שיווקיות.</p>

                  <h4>🤖 Custom GPTs & Projects</h4>
                  <p><b>Custom GPTs:</b> מאפשרים לכם ליצור גרסה מותאמת אישית של ChatGPT שהוזנה מראש בהנחיות מערכת קבועות ובקובצי ידע של הארגון שלכם (למשל: בוט שבודק חוזים לפי חוקי החברה שלכם בלבד).</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> העלו קובץ אקסל פשוט או קובץ טקסט עם נתונים ל-ChatGPT, וכתבו לו: "פעל כאנליסט נתונים, בצע ניתוח מגמות של הקובץ המצורף והצג לי גרף ויזואלי של התוצאות".
                  </div>`
    },
    {
        moduleNumber: 5,
        title: 'Claude',
        description: 'Projects, Artifacts, מסמכים גדולים, קוד ו-MCP.',
        content: `<h3>📘 שיעור 5: Claude - מומחה הלוגיקה, הקוד והעבודה עם מסמכים ארוכים</h3>
                  <p>מודל Claude מבית Anthropic נחשב למוביל שוק בכל הקשור לכתיבת קוד תכנות, ניסוחים משפטיים ולוגיקה מורכבת בזכות ארכיטקטורה נקייה וחלון הקשר (Context Window) ענק.</p>
                  
                  <h4>🛠️ תכונת ה-Artifacts (ארטיפקטים)</h4>
                  <p>כאשר אתם מבקשים מ-Claude לייצר קוד (HTML/JS, CSS, SVG, Python וכדומה), הוא לא רק מציג לכם קוביות טקסט, אלא פותח חלונית אינטראקטיבית ייעודית בצד המסך המציגה לכם **אפליקציה חיה שעובדת בזמן אמת**, משחקים, או עיצובים שניתן לבחון בלחיצת כפתור.</p>

                  <h4>📂 Claude Projects</h4>
                  <p>סביבת עבודה לפרויקטים ארוכי טווח. ניתן להעלות לשם את כל קבצי האתר או התיעוד הטכנולוגי שלכם, להגדיר הנחיית יסוד לפרויקט, ולנהל שיחות ממוקדות שמתבססות על כל החומרים הללו מבלי להעלות אותם מחדש בכל הודעה.</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> כנסו ל-Claude, וכתבו לו בפרומפט: "בנה לי מחשבון אינטראקטיבי לעיצוב תקציב חודשי באמצעות HTML ו-Tailwind CSS". צפו כיצד כלי ה-Artifacts נפתח ומציג לכם את המחשבון עובד בצד.
                  </div>`
    },
    {
        moduleNumber: 6,
        title: 'Gemini',
        description: 'שילוב Google Workspace, Drive, Docs ו-NotebookLM.',
        content: `<h3>📘 שיעור 6: Gemini - האקוסיסטם של גוגל ומהפכת המחקר עם NotebookLM</h3>
                  <p>מודל Gemini של גוגל מתאפיין בחלון הקשר חסר תקדים (עד 2 מיליון טוקנים במודלים המתקדמים), המאפשר להזין לתוכו ספרי קריאה שלמים, סרטי וידאו באורך שעה או מאות קבצים במקביל.</p>
                  
                  <h4>🌐 תוספי Google Workspace</h4>
                  <p>באמצעות שימוש בסימן <code>@</code> (למשל <code>@Google Drive</code>), ניתן לבקש מ-Gemini לחפש, לסכם ולנתח קבצים ישירות מתוך חשבון הענן או המיילים שלכם בזמן אמת בצורה מאובטחת.</p>

                  <h4>📚 כלי המחקר הפנומנלי NotebookLM</h4>
                  <p>כלי מחקר ייעודי מבית גוגל המבוסס על Gemini. אתם מעלים אליו מקורות מידע (מסמכים, קישורי אתרים, קבצי אודיו) והכלי הופך למומחה פרטי לחומרים שלכם בלבד. הוא מייצר סיכומים, מדריכי לימוד, ומסוגל לייצר <b>פודקאסט קולי (Audio Overview)</b> אוטומטי שבו שתי דמויות AI מנהלות שיחה מרתקת ומנתחות את החומרים שלכם.</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> כנסו לאתר NotebookLM של גוגל, העלו מסמך לימודי או קישור למאמר, ובקשו ממנו לייצר עבורכם "Study Guide" (מדריך לימוד) הכולל שאלות ותשובות על החומר.
                  </div>`
    },
    {
        moduleNumber: 7,
        title: 'DeepSeek',
        description: 'יכולות, מגבלות, כתיבת קוד, לוגיקה והשוואה למודלים.',
        content: `<h3>📘 שיעור 7: מהפכת מודלי החשיבה (Reasoning) ו-DeepSeek</h3>
                  <p>DeepSeek שינה את כללי המשחק בעולם הבינה המלאכותית על ידי הוכחה שניתן להגיע לביצועי קצה בעלויות פיתוח נמוכות ובאמצעות ארכיטקטורות קוד פתוח מתקדמות (MoE - Mixture of Experts).</p>
                  
                  <h4>🧠 מודלי חשיבה (Reasoning Models - DeepSeek-R1)</h4>
                  <p>מודלים רגילים מנסים להוציא את המילה הבאה מיד. מודלי חשיבה, לעומת זאת, משתמשים בלולאת למידת חיזוק (Reinforcement Learning) ומריצים תהליך חשיבה פנימי ממושך לפני מתן התשובה.</p>
                  <p>בממשק תראו אזור ייעודי הנקרא "Thought" (חשיבה), שבו המודל מתווכח עם עצמו, מזהה שגיאות לוגיות, בודק דרכי פתרון חלופיות, ורק כשהוא בטוח - הוא מציג את הפלט הסופי. תהליך זה מקפיץ את הביצועים במתמטיקה, לוגיקה קשה וכתיבת קוד מורכב.</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> כנסו ל-DeepSeek, הפעילו את מצב "DeepSeek-R1" (Reasoning), ותנו לו משימת תכנות מורכבת או חידה לוגית קשה. עקבו אחר תהליך החשיבה שלו (Thought) כדי לראות איך הוא מפרק בעיות.
                  </div>`
    },
    {
        moduleNumber: 8,
        title: 'השוואת מודלים',
        description: 'איזה מודל מתאים לאיזו משימה ותרגול פרומפטים במקביל.',
        content: `<h3>📘 שיעור 8: מטריצת החלטה להתאמת המודל האופטימלי למשימה</h3>
                  <p>כמהנדסי פרומפטים מומחים, אסור לכם להסתמך על כלי אחד בלבד. עליכם לבחור את המודל בהתאם לסוג המשימה והחוזקות שלו:</p>
                  
                  <table border="1" style="width:100%; text-align:right; border-collapse:collapse; margin-top:15px; margin-bottom:15px; font-size:0.95em;">
                    <tr style="background-color:#1e40af; color:white;">
                      <th style="padding:10px; border:1px solid #cbd5e1;">שם המודל</th>
                      <th style="padding:10px; border:1px solid #cbd5e1;">חוזקות ליבה</th>
                      <th style="padding:10px; border:1px solid #cbd5e1;">מתי מומלץ להשתמש?</th>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>Claude (Anthropic)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">כתיבת קוד מאפס, הבנה לוגית גבוהה, כתיבה קריאטיבית איכותית מאוד.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">בניית אפליקציות, כתיבת מאמרים ארוכים, ניתוח מסמכים מורכבים.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>ChatGPT (OpenAI)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">ניתוח נתונים וקבצים (פייתון מובנה), חיבור לאוטומציות, ייצור תמונות (DALL-E).</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">ניתוח קבצי אקסל ודוחות, עבודה יומיומית מגוונת, פיתוח Custom GPTs.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>DeepSeek-R1</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">חשיבה עמוקה (Reasoning), פתרון בעיות לוגיות ומתמטיות, עלות יעילה במיוחד.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">דיבאגינג (תיקון קוד שבור), מתמטיקה, פיצוח ארכיטקטורות קוד.</td>
                    </tr>
                    <tr>
                      <td style="padding:10px; border:1px solid #cbd5e1;"><b>Gemini (Google)</b></td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">חלון הקשר ענקי (מיליוני טוקנים), סנכרון מושלם ל-Google Workspace.</td>
                      <td style="padding:10px; border:1px solid #cbd5e1;">סריקה וסיכום של ספרי ידע שלמים, עבודה מול קבצי Google Drive ומיילים.</td>
                    </tr>
                  </table>`
    },
    {
        moduleNumber: 9,
        title: 'AI בעולם האמיתי',
        description: 'מחקר, תכנות, ניתוח נתונים, אוטומציות ויצירת תוכן.',
        content: `<h3>📘 שיעור 9: יישומים מעשיים בעולם התעסוקה והעסקים</h3>
                  <p>הנדסת פרומפטים אינה רק תחביב - היא כלי להצלת שעות עבודה יומיומיות בארגונים וחברות:</p>
                  
                  <h4>🚀 דוגמאות ליישומים תעשייתיים:</h4>
                  <ul>
                      <li><b>שיווק ויצירת תוכן:</b> יצירת גאנט תוכן חודשי מקיף לרשתות החברתיות. על ידי הזנת פרסונת הלקוח ומגבלות קשוחות, המודל מייצר טבלה שלמה עם רעיונות, כותרות וטקסטים מוכנים לפרסום.</li>
                      <li><b>פיתוח תוכנה מואץ:</b> שימוש בבוטים מבוססי AI כגון GitHub Copilot או Cursor המאפשרים למתכנתים לכתוב קוד באמצעות פרומפטים בשפה טבעית ישירות בתוך סביבת הפיתוח שלהם, מה שמקצר את זמן הפיתוח בעשרות אחוזים.</li>
                      <li><b>שירות לקוחות אוטומטי:</b> הטמעת מודלים קטנים (SLMs) כצ'אטבוטים באתרי חברות, הניזונים מקובצי השאלות-תשובות (FAQ) של הארגון ומענים ללקוחות ברמת דיוק אנושית.</li>
                  </ul>`
    },
    {
        moduleNumber: 10,
        title: 'רמת Master וסוכנים',
        description: 'בניית מערכות AI, Multi-Agent Workflows והערכת איכות.',
        content: `<h3>📘 שיעור 10: ארכיטקטורת סוכנים (Agents) והעתיד של עולם ה-AI</h3>
                  <p>רמת המאסטר הגבוהה ביותר של הנדסת פרומפטים היא המעבר מניהול צ'אט בודד מול מודל, לבניית <b>מערכות סוכנים אוטונומיות (Multi-Agent Systems)</b>.</p>
                  
                  <h4>🤖 מהו סוכן (Agent)?</h4>
                  <p>סוכן הוא מודל שפה שניתן לו תפקיד, מגבלות וגישה לכלים חיצוניים (כמו חיפוש בגוגל, הרצת קוד או שליחת מייל). הוא פועל בלולאה עצמאית כדי להשיג מטרה מורכבת מבלי שהמשתמש יצטרך להנחות אותו בכל שלב.</p>

                  <h4>🔄 זרימת עבודה מבוססת סוכנים (Multi-Agent Workflow):</h4>
                  <p>במקום לבקש מהמודל "כתוב לי קוד לאתר", אנו בונים מערכת המורכבת משלושה סוכנים המדברים ביניהם:</p>
                  <ul>
                      <li><b>סוכן 1 (המתכנת):</b> מקבל את הבקשה וכותב את הקוד הגולמי.</li>
                      <li><b>סוכן 2 (בודק התוכנה - QA):</b> מקבל את הקוד מהמתכנת, מריץ בדיקות לוגיות ומחפש באגים או פרצות אבטחה.</li>
                      <li><b>סוכן 3 (הארכיטקט / מנהל המוצר):</b> בודק האם הקוד עונה על כל דרישות המשתמש המקוריות. אם נמצאו בעיות, הוא מחזיר את הקוד לסוכן המתכנת עם פידבק לתיקון. כל זה מתרחש אוטומטית לחלוטין.</li>
                  </ul>`
    },
    {
        moduleNumber: 11,
        title: 'API - ממשקי תכנות ואינטגרציה',
        description: 'מהו API, איך מודלי שפה נחשפים כ-API, מפתחות הרשאה, ודוגמה מהקורס עצמו.',
        content: `<h3>📘 שיעור 11: מהו API, ואיך "מדברים" עם מודל שפה בקוד</h3>
                  <p>עד עכשיו דיברנו על AI דרך ממשק צ'אט. אבל כדי לבנות אפליקציה משלכם (בדיוק כמו ה-LMS הזה), אתם צריכים לדעת איך תוכנה אחת "מדברת" עם תוכנה אחרת - וזה בדיוק תפקידו של <b>API (Application Programming Interface)</b>: ממשק מוסכם וקבוע שמאפשר לשני מערכות שונות לתקשר בצורה מובנית, בלי שאחת צריכה לדעת איך השנייה בנויה מבפנים.</p>

                  <h4>🔌 מהו REST API בקצרה</h4>
                  <p>רוב ממשקי ה-API של היום (כולל ממשקי מודלי השפה) עובדים על עקרון REST: שולחים בקשת HTTP לכתובת מסוימת (<b>Endpoint</b>), עם שיטה מסוימת (<code>GET</code> לקבלת מידע, <code>POST</code> לשליחת מידע), ומקבלים בחזרה תשובה בפורמט <b>JSON</b>. בדיוק ככה עובד השרת של ה-LMS הזה: הנתיב <code>/api/modules</code> הוא Endpoint מסוג GET שמחזיר את רשימת המודולים, והנתיב <code>/api/submissions</code> הוא Endpoint מסוג POST שמקבל תשובות מבחן ומחזיר ציון.</p>

                  <h4>🔑 מפתחות API (API Keys) ולמה הם סודיים</h4>
                  <p>כדי שספק ה-API ידע מי קורא לו (ויוכל לחייב אתכם או לחסום שימוש לרעה), כל בקשה נשלחת יחד עם <b>מפתח API</b> - מחרוזת סודית וייחודית לחשבון שלכם. מפתח API הוא בדיוק כמו סיסמה: <b>אסור לעולם</b> לשמור אותו בקוד שנדחף ל-GitHub (בדיוק כמו שראינו בקורס הזה עם קובץ ה-<code>.env</code> שהיה חשוף בטעות בהיסטוריית הריפו) - הוא צריך להישמר במשתני סביבה בלבד.</p>

                  <h4>🧠 איך זה עובד עבור מודלי AI ספציפית</h4>
                  <p>כשאתם קוראים ל-API של Claude, ChatGPT או Gemini, אתם שולחים בקשת POST עם הפרומפט, שם המודל הרצוי, ופרמטרים כמו <code>temperature</code> (רמת יצירתיות) ו-<code>max_tokens</code> (אורך תשובה מקסימלי). התשובה חוזרת כ-JSON עם הטקסט שהמודל הפיק.</p>
                  <pre style="background-color:#f3f4f6; padding:12px; border-radius:6px; font-family:monospace; direction:ltr; text-align:left; overflow-x:auto;">
POST https://api.example.com/v1/messages
Headers: { "x-api-key": "YOUR_SECRET_KEY", "content-type": "application/json" }
Body: { "model": "claude-x", "max_tokens": 300, "messages": [{"role":"user","content":"סכם לי את השיעור הזה"}] }</pre>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> פתחו את דף התיעוד (Documentation) הרשמי של API של אחד ממודלי ה-AI שלמדתם עליהם, ואתרו בו שלושה דברים: כתובת ה-Endpoint, השדה החובה שצריך לשלוח, וההסבר על מפתח ה-API.
                  </div>`
    },
    {
        moduleNumber: 12,
        title: 'MCP - Model Context Protocol',
        description: 'הפרוטוקול הפתוח שמחבר מודלי AI לכלים חיצוניים, מסדי נתונים ושירותים.',
        content: `<h3>📘 שיעור 12: MCP - איך הופכים צ'אטבוט לסוכן שמסוגל "לעשות" דברים</h3>
                  <p><b>MCP (Model Context Protocol)</b> הוא פרוטוקול פתוח שפיתחה Anthropic, שנועד לפתור בעיה מרכזית: איך נותנים למודל שפה גישה מסודרת לכלים חיצוניים, מסדי נתונים וקבצים - בלי לבנות אינטגרציה מותאמת אישית בין כל כלי לכל מודל.</p>

                  <h4>🔌 האנלוגיה: USB-C עבור AI</h4>
                  <p>לפני USB-C, לכל מכשיר היה מחבר חשמל משלו. MCP עושה בדיוק את זה עבור בינה מלאכותית: הוא מגדיר "שקע" סטנדרטי אחד - כל כלי שנבנה עם תמיכה ב-MCP (<b>שרת MCP</b>) יכול להתחבר לכל מודל שתומך ב-MCP (<b>קליינט MCP</b>, כמו Claude Desktop או Claude Code), ולהפך.</p>

                  <h4>⚙️ איך זה עובד בפועל</h4>
                  <p>כשמשתמש שולח בקשה שדורשת מידע או פעולה חיצונית ("תבדוק לי מה יש בגיליון ה-Google Sheets שלי"), המודל מזהה בעצמו שהוא צריך לקרוא לכלי המתאים דרך שרת ה-MCP הרלוונטי, מקבל את התוצאה בחזרה, וממשיך לענות למשתמש על סמך מידע אמיתי - במקום לנחש או להמציא תשובה.</p>

                  <h4>🚀 למה זה משנה</h4>
                  <p>זהו לא עוד "פיצ'ר בממשק" כמו Artifacts, אלא שינוי ארכיטקטוני: זה ההבדל בין צ'אטבוט שרק עונה טקסט, לבין <b>סוכן (Agent)</b> שיכול לפעול בעולם האמיתי. זה קשור ישירות למה שנלמד במודול הסוכנים (Multi-Agent Systems) - כלים מבוססי MCP הם הדרך שבה סוכנים בפועל "עושים דברים", ולא רק חושבים עליהם.</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> רשמו רשימה של 3 כלים או מערכות מהעבודה היומיומית שלכם (למשל: יומן, מייל, מערכת CRM) שהייתם רוצים שסוכן AI יוכל לגשת אליהם ישירות דרך MCP, ותארו איזו משימה קונקרטית זה היה חוסך לכם.
                  </div>`
    },
    {
        moduleNumber: 13,
        title: 'Skills - יכולות ארוזות ומודולריות',
        description: 'מהי Skill, איך היא שונה מפרומפט רגיל, ומתי בונים אחת.',
        content: `<h3>📘 שיעור 13: Skills - כשפרומפט הופך ליכולת קבועה וניתנת לשימוש חוזר</h3>
                  <p>פרומפט רגיל הוא הוראה חד-פעמית שאתם מקלידים בכל שיחה מחדש. <b>Skill</b> היא חבילה שמורה ומודולרית של הוראות (ולעיתים גם קבצים וסקריפטים נלווים), שהסוכן יכול "לטעון" ולהפעיל לפי שם או לפי הקשר - בלי שתצטרכו להסביר לו מחדש מה לעשות בכל פעם.</p>

                  <h4>🆚 פרומפט חד-פעמי מול Skill קבועה</h4>
                  <ul>
                      <li><b>פרומפט:</b> אתם מקלידים "בדוק לי את הקוד הזה לבאגים" בכל פעם מחדש, ומנסחים שוב ושוב את אותן ההוראות.</li>
                      <li><b>Skill:</b> קיימת יכולת שמורה בשם למשל <code>code-review</code>, שכבר יודעת בדיוק אילו בדיקות להריץ, באיזה פורמט להחזיר תוצאות, ומתי להפעיל את עצמה - אתם רק קוראים לה בשם.</li>
                  </ul>

                  <h4>🧩 מתי בונים Skill במקום לכתוב פרומפט</h4>
                  <p>כאשר משימה מסוימת חוזרת על עצמה שוב ושוב באותה צורה (למשל: כתיבת דוחות שבועיים, בדיקת חוזים מול רשימת סעיפים קבועה, עיצוב מצגות בפורמט ארגוני אחיד) - כדאי לארוז אותה כ-Skill: כך היא נשמרת, ניתנת לשיתוף עם אחרים בצוות, ולא צריך "להמציא את הגלגל" בכל שיחה.</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> חשבו על משימה חוזרת מהעבודה או הלימודים שלכם, ותארו איך הייתם בונים ממנה Skill: מה יהיה שם ה-Skill, מתי היא תופעל, ואילו הוראות מדויקות היא תכיל.
                  </div>`
    },
    {
        moduleNumber: 14,
        title: 'פלאגינים והרחבות (Plugins)',
        description: 'איך פלאגינים מרחיבים יכולות AI, ההבדל מ-MCP, ומתי להשתמש בכל אחד.',
        content: `<h3>📘 שיעור 14: פלאגינים והרחבות - מוסיפים יכולות בלי לבנות הכל מאפס</h3>
                  <p><b>פלאגין (Plugin)</b> הוא רכיב תוסף שמרחיב את היכולות של אפליקציה קיימת, בלי לשנות את הליבה שלה - בדיוק כמו תוסף לדפדפן. בעולם ה-AI, זה מופיע בכמה צורות: תוספי ChatGPT (היום Actions/Connectors), פלאגינים ל-Claude Code (הכוללים Skills, פקודות Slash וסוכני משנה), ותוספי IDE כמו Copilot או Cursor.</p>

                  <h4>🆚 פלאגין מול MCP - מה ההבדל?</h4>
                  <p>קל לבלבל בין השניים כי שניהם "מוסיפים יכולות" למודל, אבל ההבדל מהותי:</p>
                  <ul>
                      <li><b>MCP:</b> פרוטוקול פתוח וסטנדרטי, לא תלוי ספק - כל שרת MCP יכול לעבוד עם כל קליינט שתומך בפרוטוקול.</li>
                      <li><b>Plugin:</b> לרוב מנגנון קנייני של ספק ספציפי (למשל חנות התוספים של ChatGPT) - עובד רק בתוך המערכת שבנתה אותו, ולעיתים משתמש ב-MCP "מתחת למכסה המנוע".</li>
                  </ul>

                  <h4>🛠️ מתי להשתמש בכל אחד</h4>
                  <p>אם אתם משתמש קצה שרוצה יכולת מוכנה במהירות (למשל: חיפוש מלונות בתוך הצ'אט) - פלאגין קיים הוא הפתרון הפשוט. אם אתם בונים מערכת ארגונית שצריכה לחבר כמה מודלים לאותם כלים פנימיים לאורך זמן - MCP הוא הבחירה הנכונה כי הוא לא נועל אתכם לספק אחד.</p>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> גשו לחנות הפלאגינים/הרחבות של כלי ה-AI שאתם משתמשים בו, ומצאו פלאגין אחד רלוונטי לעבודה שלכם. תארו איזו בעיה קונקרטית הוא פותר, ואיך הייתם משתמשים בו במשימה אמיתית.
                  </div>`
    }
];

// 🔗 קישור ל-SheetDB (נקרא מקובץ .env, עם גיבוי)
const SHEETDB_URL = process.env.SHEETDB_URL || "https://sheetdb.io/api/v1/z43gbaiw4u75l";

// 📝 תשובות נכונות לכל מודול (בשימוש בנתיב /api/submissions)
const MODULE_ANSWERS = {
    1: { q1: 'a', q2: 'b' },
    2: { q1: 'constraints' },
    3: { q1: 'few_shot' },
    4: { q1: 'python' },
    5: { q1: 'artifacts' },
    6: { q1: 'notebooklm' },
    7: { q1: 'reasoning' },
    8: { q1: 'claude' },
    9: { q1: 'efficiency' },
    10: { q1: 'agents' },
    11: { q1: 'api' },
    12: { q1: 'mcp' },
    13: { q1: 'skills' },
    14: { q1: 'plugins' }
};

app.get('/', (req, res) => {
    const path = require('path');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/modules', (req, res) => {
    res.json(modulesDatabase);
});

app.post('/api/submissions', async (req, res) => {
    try {
        const { studentName, moduleNumber, answers = {} } = req.body;
        if (!studentName || moduleNumber === undefined) {
            return res.status(400).json({ error: 'נא לספק שם סטודנט ומספר מודול' });
        }
        let score = 0;
        let feedbackPoints = [];
        const num = Number(moduleNumber);

        const correctAnswers = MODULE_ANSWERS[num];
        if (correctAnswers) {
            const questionKeys = Object.keys(correctAnswers);
            const pointsPerQuestion = 100 / questionKeys.length;
            questionKeys.forEach(key => {
                if (answers[key] && answers[key] === correctAnswers[key]) {
                    score += pointsPerQuestion;
                    feedbackPoints.push(`✅ שאלה ${key.slice(1)} נכונה!`);
                } else {
                    feedbackPoints.push(`❌ שאלה ${key.slice(1)} שגויה. התשובה הנכונה היא: ${correctAnswers[key]}`);
                }
            });
        } else {
            feedbackPoints.push("⚠️ מודול לא מזוהה במערכת.");
        }

        const feedbackString = feedbackPoints.join(" | ");
        const formattedDate = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });

        // שליחה ל-SheetDB
        try {
            const response = await fetch(SHEETDB_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: [{
                        "id": Date.now().toString(),
                        "שם": studentName,
                        "מספר מודל": num,
                        "שאלה": "זה יישמר ריק כרגע",   // אם אין לך מידע על השאלה
                        "תשובה": JSON.stringify(answers), // שומר את כל התשובות
                        "feedback": feedbackString,
                        "ציון": score,
                    }]
                })
            });
            if (response.ok) {
                console.log("📊 נשלח בהצלחה לשיטס!");
            } else {
                console.error("❌ שגיאה בשליחה לשיטס (קוד " + response.status + "):", await response.text());
            }
        } catch (sheetError) {
            console.error("שגיאה בשליחה לשיטס:", sheetError);
        }

        res.status(201).json({
            message: 'המבחן נבדק!',
            score: score,
            feedback: feedbackPoints.join("\n")
        });
    } catch (error) {
        console.error("שגיאה כללית בשרת:", error);
        res.status(500).json({ error: 'שגיאה בשרת' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 שרת דלוק ומלא בתוכן בפורט ${PORT}`));
