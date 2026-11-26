require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const { publicQuiz, gradeQuiz, PASSING_SCORE, hasEnglishQuiz } = require('./quiz');
const EN = require('./content.en');
const { MODULE_EXTRAS } = require('./moduleExtras');
const { createAccessPolicy } = require('./access');
const {
    SESSION_COOKIE, SESSION_DAYS, createGoogleVerifier,
    createSessionToken, readSessionToken, parseCookies, sessionCookie
} = require('./auth');
const { createSheetPurchaseStore, createSheetWaitlistStore, normalizeEmail } = require('./purchases');
const { parseGrowPayment, toNumber } = require('./grow');
const crypto = require('crypto');

// מודולי הקורס - תוכן לימודי מורחב, תרגילי התנסות ומבחנים
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
                  <p>כאשר אתם מבקשים מ-Claude לייצר קוד (HTML/JS, CSS, SVG, Python וכדומה), הוא לא רק מציג לכם קוביות טקסט, אלא פותח חלונית אינטראקטיבית ייעודית בצד המסך המציגה לכם <b>אפליקציה חיה שעובדת בזמן אמת</b>, משחקים, או עיצובים שניתן לבחון בלחיצת כפתור.</p>

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
    },
    {
        moduleNumber: 15,
        title: 'בדיקת עובדות והזיות (Hallucinations)',
        description: 'איך לזהות תשובה מומצאת, לבקש מקורות ולאמת אותם לפני שסומכים על AI.',
        // תזמון פרסום: עד התאריך הזה המודול מוצג כ"בקרוב" (בעלי הקורס רואים אותו מראש)
        availableFrom: '2026-10-18',
        content: `<h3>📘 שיעור 15: למה AI ממציא, ואיך לא ליפול בזה</h3>
                  <p><b>הזיה (Hallucination)</b> היא תשובה שנשמעת בטוחה ומקצועית - אבל שגויה או מומצאת לגמרי: עובדה שלא קיימת, מספר לא נכון, ציטוט שאף אחד לא אמר, או מקור שלא קיים בכלל. הבעיה איננה שהמודל "משקר" בכוונה, אלא שהוא מנוסח באותו ביטחון גם כשהוא צודק וגם כשהוא טועה.</p>

                  <h4>💡 למה זה קורה?</h4>
                  <p>כפי שלמדנו בשיעור 1, מודל שפה מחשב את ההמשך הסביר ביותר לטקסט - הוא לא בודק אותו מול מאגר עובדות. בשנת 2025 פרסמו חוקרים מ-OpenAI מאמר בשם <i>Why Language Models Hallucinate</i>, שבו הם טוענים שחלק גדול מהבעיה נובע מהאופן שבו מאמנים ובודקים מודלים: שיטות ההערכה המקובלות מתגמלות <b>ניחוש</b> יותר מאשר הודאה ב"אני לא יודע". בדומה לתלמיד במבחן אמריקאי שמעדיף לנחש מאשר להשאיר שאלה ריקה - גם המודל "לומד" שעדיף לנחש.</p>

                  <h4>🚨 איפה ההזיות מסוכנות במיוחד</h4>
                  <ul>
                      <li><b>מקורות וציטוטים:</b> שמות של מאמרים, פסקי דין, ספרים וקישורים שנראים אמינים לגמרי - ולא קיימים.</li>
                      <li><b>מספרים ותאריכים:</b> נתונים סטטיסטיים, מחירים, שנים ואחוזים.</li>
                      <li><b>מידע עדכני:</b> דברים שקרו אחרי שהמודל אומן, או מחירים ותנאים שמשתנים.</li>
                      <li><b>נושאים נישתיים:</b> ככל שיש פחות מידע על נושא, גדל הסיכוי שהמודל "ימלא חורים".</li>
                  </ul>

                  <h4>🛡️ חמשת כללי ההגנה</h4>
                  <ol>
                      <li><b>תנו למודל רשות להגיד "לא יודע":</b> כתבו במפורש "אם אינך בטוח, כתוב שאינך יודע - אל תנחש".</li>
                      <li><b>תנו לו את החומר בעצמכם (Grounding):</b> הדביקו את המסמך והנחו "ענה אך ורק על סמך הטקסט המצורף". זה הרבה יותר אמין מלשאול "מהזיכרון".</li>
                      <li><b>בקשו ציטוט מדויק:</b> "צטט את המשפט המדויק מהמסמך שעליו מבוססת התשובה" - ואז בדקו שהמשפט באמת נמצא שם.</li>
                      <li><b>אמתו כל מקור בעצמכם:</b> פתחו כל קישור, חפשו כל מאמר או פסק דין. מקור שלא מצאתם - לא קיים מבחינתכם.</li>
                      <li><b>ככל שהסיכון גבוה יותר - כך הבדיקה צריכה להיות קפדנית יותר:</b> רעיון לפוסט לא דורש אימות; ייעוץ משפטי, רפואי או פיננסי - תמיד דורש בדיקה מול מקור אמין או איש מקצוע.</li>
                  </ol>

                  <div style="background-color:#f0fdf4; border-right:4px solid #16a34a; padding:10px; margin-top:15px; border-radius:4px;">
                      <b>🏋️ תרגיל התנסות עצמי:</b> שאלו מודל שפה שאלה על נושא נישתי שאתם מכירים לעומק (למשל: פרט טכני מהתחום המקצועי שלכם), ובקשו ממנו לצרף 3 מקורות. בדקו כל מקור: האם הוא קיים? האם הוא באמת אומר את מה שהמודל טען?
                  </div>`
    },
    {
        moduleNumber: 16,
        title: "לקרוא תרשים עם Google AI Studio",
        description: "מספר, יחידה וראיה: איך בודקים תשובה של מודל שקרא תמונה.",
        content: `<h3>לקרוא תרשים עם Google AI Studio</h3>
<p>ראש הצוות שולח תרשים ומבקש כותרת לישיבה. המודל מציע: ״מערכת התורים החדשה קיצרה את ההמתנה בשליש״. איזה חלק מהמשפט הייתם מוכנים לפרסם?</p>
<h4>מה תלמדו</h4><ul><li>לחלץ מתרשים ערכים עם היחידות והתקופות שלהם.</li><li>לחשב שינוי ביחידות ובאחוזים ולבדוק את המכנה.</li><li>להפריד בין מה שנראה בתמונה לבין טענה שדורשת נתונים נוספים.</li></ul>
<p>פרומפט רב־אופני משלב הנחיה ותמונה. כדאי להתחיל בקריאה: מה כתוב בכותרת, מה היחידות ומה הערך בכל תקופה? רק אחר כך מבקשים חישוב או מסקנה. כך אפשר לזהות באיזה שלב נכנסה שגיאה. כשפרט חתוך, מבקשים לציין מה חסר.</p>
<h4>מהלך הסדנה · 45 דק׳</h4><ol><li><b>5 דק׳</b> · פתיחה • הציגו את הכותרת המוצעת. בקשו מכל משתתף לסמן אילו מילים דורשות הוכחה.</li><li><b>8 דק׳</b> · הדגמה • הקרינו את התרשים. בקשו מהכיתה לקרוא בקול ערכים ויחידות לפני כל פרשנות.</li><li><b>12 דק׳</b> · תרגול מודרך • בזוגות, השוו את תוצאות שני הפרומפטים. החליפו תפקידים בין מפעיל הכלי לבודק הנתונים.</li><li><b>15 דק׳</b> · עבודה עצמאית • חתכו את היחידה, בדקו שוב וכתבו כותרת משלכם. בחרו תשובה לתרחיש היעד ונמקו.</li><li><b>5 דק׳</b> · סגירה • פתרו את תרגיל הסניף האחר והגישו את התוצר לפי המחוון.</li></ol>
<p>כלי ותיעוד · <a class="text-blue-700 underline" href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">Google AI Studio</a> · <a class="text-blue-700 underline" href="https://ai.google.dev/gemini-api/docs/image-understanding" target="_blank" rel="noopener noreferrer">עבודה עם תמונות</a></p>`
    },
    {
        moduleNumber: 17,
        title: "ממחקרים להמלצה עם Elicit",
        description: "בונים שאלת מחקר, מחליטים מראש אילו ראיות מתאימות ובודקים כל שדה מול המקור.",
        content: `<h3>ממחקרים להמלצה עם Elicit</h3>
<p>מנהלת הדרכה שואלת אם כדאי להחליף קריאה חוזרת בבוחן שליפה קצר. אחד המחקרים מדווח ש־95% נהנו מהבוחן. האם זה עונה על השאלה שלה?</p>
<h4>מה תלמדו</h4><ul><li>לנסח אוכלוסייה, התערבות, השוואה, תוצאה וזמן מדידה.</li><li>להחיל אותו כלל הכללה על שלושה תקצירים.</li><li>לכתוב המלצה שמציינת את חוזק הראיה ואת מה שעוד חסר.</li></ul>
<p>הגדירו את ההחלטה לפני החיפוש. כאן מבקשים לדעת אם עובדים חדשים מבצעים משימה עצמאית טוב יותר כעבור ארבעה שבועות, אחרי בוחן שליפה לעומת קריאה חוזרת. דרגו כל תקציר כמתאים, לא מתאים או דורש טקסט מלא. בעמודת הראיה שמרו את המשפט שעליו נשענתם.</p>
<h4>מהלך הסדנה · 45 דק׳</h4><ol><li><b>5 דק׳</b> · פתיחה • הציגו את נתון שביעות הרצון ושאלו איזה מידע היה משנה החלטה על הכשרה.</li><li><b>8 דק׳</b> · הדגמה • נסחו יחד שאלת מחקר. סווגו בקול את קטע א׳ והצביעו על המשפט המצדיק הכללה.</li><li><b>12 דק׳</b> · תרגול מודרך • כל משתתף מסווג את ב׳ וג׳ לבדו. בזוגות, נסחו מסקנה מוסכמת והצביעו על מידע חסר.</li><li><b>15 דק׳</b> · עבודה עצמאית • בנו טבלת ראיות והמלצה. בדקו שורה מול מקור. בעלי גישה ל־Elicit יכולים להוסיף מאמר אמיתי.</li><li><b>5 דק׳</b> · סגירה • החליפו את שאלת ההחלטה ובדקו אילו מאמרים נעשים רלוונטיים.</li></ol>
<p>כלי ותיעוד · <a class="text-blue-700 underline" href="https://elicit.com/" target="_blank" rel="noopener noreferrer">Elicit</a> · <a class="text-blue-700 underline" href="https://support.elicit.com/en/articles/17220397-where-did-find-papers-extract-data-and-chat-with-papers-go" target="_blank" rel="noopener noreferrer">Research Agent</a></p>`
    }
];

// הגבלת קצב פשוטה בזיכרון (לכל כתובת IP)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function createRateLimiter(max) {
    const log = new Map();
    // ניקוי תקופתי כדי שהמפה לא תגדל ללא הגבלה
    setInterval(() => {
        const now = Date.now();
        for (const [ip, times] of log) {
            if (times.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) log.delete(ip);
        }
    }, RATE_LIMIT_WINDOW_MS).unref();

    return function isRateLimited(ip) {
        const now = Date.now();
        const recent = (log.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
        recent.push(now);
        log.set(ip, recent);
        return recent.length > max;
    };
}

// התאריך של היום בישראל בפורמט YYYY-MM-DD (כדי שמודול ייפתח בחצות לפי שעון ישראל)
function israelDate(date) {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(date);
}

// 🌍 שפת הממשק: הדפדפן שולח lang=en בכל בקשה כשנבחרה אנגלית. כל ערך אחר = עברית.
function reqLang(req) {
    const raw = (req.query && req.query.lang) || (req.body && req.body.lang);
    return raw === 'en' ? 'en' : 'he';
}

// הודעות שגיאה שמוצגות למשתמש, בשתי השפות
const MESSAGES = {
    comingSoon: { he: 'המודול הזה עוד לא פורסם. הוא ייפתח בקרוב.', en: 'This module has not been published yet. It will open soon.' },
    locked: { he: 'המודול הזה זמין לרוכשי הקורס המלא. התחברו עם Google ורכשו גישה כדי לפתוח אותו.', en: 'This module is part of the full course. Sign in with Google and get access to open it.' },
    unavailable: { he: 'לא זמין כרגע', en: 'Not available right now' },
    tooManyAttempts: { he: 'יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.', en: 'Too many attempts. Please try again in a few minutes.' },
    tooManySubmissions: { he: 'יותר מדי הגשות בזמן קצר. נסו שוב בעוד כמה דקות.', en: 'Too many submissions in a short time. Please try again in a few minutes.' },
    waitlistSignIn: { he: 'צריך להתחבר עם Google כדי להצטרף לרשימה.', en: 'Please sign in with Google to join the list.' },
    waitlistFailed: { he: 'לא הצלחנו לשמור את ההרשמה כרגע. נסו שוב בעוד רגע.', en: "We couldn't save your sign-up right now. Please try again in a moment." },
    loginUnavailable: { he: 'התחברות לא זמינה כרגע', en: 'Sign-in is not available right now' },
    loginFailed: { he: 'ההתחברות עם Google נכשלה. נסו שוב.', en: 'Signing in with Google failed. Please try again.' },
    redeemSignIn: { he: 'צריך להתחבר עם Google לפני הזנת הקוד.', en: 'Please sign in with Google before entering the code.' },
    badCode: { he: 'הקוד לא תקין. בדקו שהעתקתם אותו במלואו.', en: 'This code is not valid. Check that you copied all of it.' },
    codeUsed: { he: 'הקוד הזה כבר מומש בחשבון אחר.', en: 'This code has already been used on another account.' },
    codeSaveFailed: { he: 'לא הצלחנו לשמור את הקוד כרגע. נסו שוב בעוד רגע.', en: "We couldn't save the code right now. Please try again in a moment." },
    moduleNotFound: { he: 'מודול לא נמצא', en: 'Module not found' },
    nameRequired: { he: 'נא להזין שם מלא (עד 80 תווים)', en: 'Please enter your full name (up to 80 characters)' },
    unknownModule: { he: 'מודול לא מזוהה במערכת', en: 'Unknown module' },
    graded: { he: 'המבחן נבדק!', en: 'Your quiz has been graded!' },
    serverError: { he: 'שגיאה בשרת', en: 'Server error' }
};
function msg(req, key) {
    return MESSAGES[key][reqLang(req)];
}
const comingSoonError = req => ({ error: msg(req, 'comingSoon'), comingSoon: true });
const lockedError = req => ({ error: msg(req, 'locked'), locked: true });

// מודול נחשב מתורגם רק כשיש לו באנגלית את כל החלקים: שיעור, לשוניות נוספות ומבחן
function isTranslated(moduleNumber) {
    return Boolean(EN.modules[moduleNumber] && EN.extras[moduleNumber] && hasEnglishQuiz(moduleNumber));
}

// בונה את השרת. options מאפשר לבדיקות להחליף את אימות Google ואת רשימת הרוכשים.
function createApp(options = {}) {
    const env = options.env || process.env;
    const app = express();
    // Render (וכל שירות אירוח מאחורי פרוקסי) - כדי ש-req.ip יחזיר את כתובת הגולש האמיתית
    app.set('trust proxy', 1);
    app.disable('x-powered-by');
    // הודעות תשלום מחברת הסליקה עשויות להיות גדולות יותר (פירוט מוצרים) ולהגיע גם כטופס
    const smallJson = express.json({ limit: '10kb' });
    app.use((req, res, next) => req.path.startsWith('/api/webhooks/') ? next() : smallJson(req, res, next));

    // כותרות אבטחה בסיסיות
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        next();
    });

    // CORS: האתר והשרת יושבים על אותו דומיין, ולכן כברירת מחדל אין צורך לפתוח גישה לאתרים אחרים.
    // אם יש צורך אמיתי (למשל אתר נחיתה בדומיין אחר) - מגדירים ALLOWED_ORIGIN בקובץ .env
    const ALLOWED_ORIGIN = env.ALLOWED_ORIGIN;
    if (ALLOWED_ORIGIN) {
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
            res.setHeader('Vary', 'Origin');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            if (req.method === 'OPTIONS') return res.sendStatus(204);
            next();
        });
    }

    // 🔗 קישור ל-SheetDB - נקרא אך ורק ממשתני סביבה (לעולם לא בקוד שנדחף ל-GitHub)
    const SHEETDB_URL = env.SHEETDB_URL;
    if (!SHEETDB_URL) {
        console.warn('⚠️ SHEETDB_URL לא הוגדר - ציונים ייבדקו אך לא יישמרו בגיליון.');
    }

    // 🔒 חומת תשלום + התחברות עם Google
    const access = createAccessPolicy(env);
    if (access.requested && !access.enabled) {
        console.error('❌ PAYWALL=on אבל חסרות הגדרות: ' + access.missing.join(', ') + ' - חומת התשלום כבויה וכל המודולים פתוחים.');
    } else if (!access.enabled) {
        console.warn('ℹ️ חומת התשלום כבויה (PAYWALL לא מוגדר ל-on) - כל המודולים פתוחים.');
    }
    const verifyGoogleToken = options.verifyGoogleToken
        || (env.GOOGLE_CLIENT_ID ? createGoogleVerifier(env.GOOGLE_CLIENT_ID) : null);
    const purchases = options.purchaseStore
        || (SHEETDB_URL ? createSheetPurchaseStore({ url: SHEETDB_URL }) : null);
    const waitlist = options.waitlistStore
        || (SHEETDB_URL ? createSheetWaitlistStore({ url: SHEETDB_URL }) : null);
    const SESSION_SECRET = env.SESSION_SECRET;
    // לבדיקות: אפשר "להזיז את השעון" כדי לבדוק תזמון פרסום
    const now = options.now || (() => new Date());

    // הגשות מבחן: מונע הצפה של הגיליון
    const isSubmissionRateLimited = createRateLimiter(30);
    // התחברות ומימוש קודים: מונע ניחוש קודים בכוח
    const isAuthRateLimited = createRateLimiter(20);
    const isRedeemRateLimited = createRateLimiter(10);

    function currentUser(req) {
        if (!SESSION_SECRET) return null;
        const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
        return readSessionToken(token, SESSION_SECRET);
    }

    async function hasFullAccess(email) {
        if (!access.enabled) return true;
        if (!email) return false;
        if (access.isOwner(email)) return true;
        try {
            return await purchases.hasAccess(email);
        } catch (e) {
            console.error('שגיאה בקריאת רשימת הרוכשים:', e.message);
            return false;
        }
    }

    // 📅 תזמון פרסום: מודול עם availableFrom נפתח לכולם רק מהתאריך הזה (שעון ישראל).
    // בעלי הקורס (OWNER_EMAILS) רואים אותו מראש כדי לבדוק אותו לפני כולם.
    function isReleased(mod) {
        return !mod.availableFrom || israelDate(now()) >= mod.availableFrom;
    }

    function canSee(mod, req) {
        return isReleased(mod) || access.isOwner(currentUser(req));
    }

    // נעול = בתשלום, והמשתמש לא מחובר או לא ברשימת הרוכשים
    async function isLocked(moduleNumber, req) {
        if (access.isFree(moduleNumber, israelDate(now()))) return false;
        return !(await hasFullAccess(currentUser(req)));
    }

    // מה שהדפדפן מקבל על מודול: מודול נעול נשלח בלי התוכן עצמו
    function publicModule(mod, unlocked, visible, lang = 'he') {
        // באנגלית: מודול מתורגם מוצג באנגלית; מודול שעוד לא תורגם מוצג במקור העברי (contentLang: 'he')
        const english = lang === 'en' && isTranslated(mod.moduleNumber);
        const en = english ? EN.modules[mod.moduleNumber] : null;
        const base = {
            moduleNumber: mod.moduleNumber,
            title: en ? en.title : mod.title,
            description: en ? en.description : mod.description,
            contentLang: english ? 'en' : 'he',
            free: access.isFree(mod.moduleNumber, israelDate(now()))
        };
        if (!isReleased(mod)) {
            base.comingSoon = true;
            base.availableFrom = mod.availableFrom;
            if (!visible) return { ...base, locked: true };
            base.preview = true; // בעל הקורס רואה את המודול לפני הפרסום
        }
        if (!base.free && !unlocked) return { ...base, locked: true };
        const extras = (english ? EN.extras[mod.moduleNumber] : MODULE_EXTRAS[mod.moduleNumber]) || {};
        return {
            ...base,
            locked: false,
            content: en ? en.content : mod.content,
            cases: extras.cases || '',
            practice: extras.practice || '',
            promptScenarios: extras.promptScenarios || []
        };
    }

    async function saveToSheet(row) {
        if (!SHEETDB_URL) return false;
        try {
            const response = await fetch(SHEETDB_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [row] })
            });
            if (!response.ok) {
                console.error('❌ שגיאה בשליחה לשיטס (קוד ' + response.status + '):', await response.text());
                return false;
            }
            return true;
        } catch (sheetError) {
            console.error('שגיאה בשליחה לשיטס:', sheetError);
            return false;
        }
    }

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // מדיניות פרטיות - נדרשת במסך ההסכמה של Google ובכל מקרה כשאוספים אימיילים
    const CONTACT_EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(env.CONTACT_EMAIL || '') ? env.CONTACT_EMAIL : null;
    const privacyPage = fs.readFileSync(path.join(__dirname, 'privacy.html'), 'utf8').replace('{{CONTACT}}', CONTACT_EMAIL
        ? `לכל שאלה או בקשה בנושא פרטיות: <a href="mailto:${CONTACT_EMAIL}" dir="ltr">${CONTACT_EMAIL}</a>`
        : 'לכל שאלה או בקשה בנושא פרטיות אפשר לפנות לבעל האתר דרך כתובת התמיכה שמופיעה במסך ההתחברות עם Google.');
    app.get('/privacy', (req, res) => {
        res.type('html').send(privacyPage);
    });

    // ☕ מספר טלפון לטיפ ליוצר: מוצג בהודעת התודה ללומדים חדשים. נקרא רק ממשתני הסביבה (לא נשמר בקוד ב-GitHub).
    // מקבלים רק ספרות, רווחים, מקפים ו-+ בהתחלה (9-15 ספרות) - כל ערך אחר מתעלמים ממנו.
    const TIP_PHONE = (() => {
        const phone = String(env.TIP_PHONE || '').trim();
        const digits = phone.replace(/\D/g, '').length;
        return /^\+?[\d\s-]+$/.test(phone) && digits >= 9 && digits <= 15 ? phone : null;
    })();

    app.get('/api/config', (req, res) => {
        const today = israelDate(now());
        res.json({
            paywallEnabled: access.enabled,
            freeModules: access.freeModulesOn(today),
            promoUntil: access.promoActiveOn(today) ? access.promoUntil : null,
            checkoutUrl: access.checkoutUrl,
            price: access.price,
            googleClientId: access.enabled ? env.GOOGLE_CLIENT_ID : null,
            tipPhone: TIP_PHONE,
            // האנגלית מוצעת לכולם (מתג שפה) רק כשכל המודולים תורגמו. עד אז אפשר לצפות בה דרך /?lang=en
            languages: modulesDatabase.every(m => isTranslated(m.moduleNumber)) ? ['he', 'en'] : ['he']
        });
    });

    app.get('/api/me', async (req, res) => {
        const email = currentUser(req);
        let onWaitlist = false;
        if (email && waitlist) {
            try { onWaitlist = await waitlist.has(email); } catch (e) { /* הרשימה לא זמינה - לא קריטי */ }
        }
        res.json({ email, hasFullAccess: await hasFullAccess(email), onWaitlist });
    });

    // 📝 הצטרפות לרשימת ההמתנה לקורס המלא (מבחן ביקוש לפני פתיחת מכירות)
    const isWaitlistRateLimited = createRateLimiter(10);
    app.post('/api/waitlist', async (req, res) => {
        if (!access.enabled || !waitlist) return res.status(404).json({ error: msg(req, 'unavailable') });
        if (isWaitlistRateLimited(req.ip)) {
            return res.status(429).json({ error: msg(req, 'tooManyAttempts') });
        }
        const email = currentUser(req);
        if (!email) return res.status(401).json({ error: msg(req, 'waitlistSignIn') });
        const passedRaw = Number(req.body && req.body.passed);
        const passed = Number.isInteger(passedRaw) && passedRaw >= 0 && passedRaw <= modulesDatabase.length ? passedRaw : 0;
        try {
            if (await waitlist.has(email)) return res.json({ ok: true, already: true });
            const phase = access.promoActiveOn(israelDate(now())) ? 'במבצע' : 'אחרי המבצע';
            await waitlist.add({ email, passed, phase });
            res.json({ ok: true });
        } catch (e) {
            console.error('שגיאה בהרשמה לרשימת ההמתנה:', e.message);
            res.status(503).json({ error: msg(req, 'waitlistFailed') });
        }
    });

    app.get('/api/modules', async (req, res) => {
        const email = currentUser(req);
        const unlocked = await hasFullAccess(email);
        const owner = access.isOwner(email);
        res.json(modulesDatabase.map(mod => publicModule(mod, unlocked, owner, reqLang(req))));
    });

    // התחברות: הדפדפן שולח את האסימון שקיבל מ-Google, והשרת מאמת אותו בעצמו
    app.post('/api/auth/google', async (req, res) => {
        if (!access.enabled || !verifyGoogleToken) {
            return res.status(404).json({ error: msg(req, 'loginUnavailable') });
        }
        if (isAuthRateLimited(req.ip)) {
            return res.status(429).json({ error: msg(req, 'tooManyAttempts') });
        }
        const credential = req.body && typeof req.body.credential === 'string' ? req.body.credential : '';
        const email = credential ? await verifyGoogleToken(credential) : null;
        if (!email) {
            return res.status(401).json({ error: msg(req, 'loginFailed') });
        }
        res.setHeader('Set-Cookie', sessionCookie(createSessionToken(email, SESSION_SECRET), {
            secure: req.secure,
            maxAgeSeconds: SESSION_DAYS * 24 * 60 * 60
        }));
        res.json({ email, hasFullAccess: await hasFullAccess(email) });
    });

    app.post('/api/auth/logout', (req, res) => {
        res.setHeader('Set-Cookie', sessionCookie('', { secure: req.secure, maxAgeSeconds: 0 }));
        res.json({ ok: true });
    });

    // מימוש קוד גישה: הקוד נקשר לחשבון Google הראשון שמשתמש בו, ולא יעבוד לאף חשבון אחר
    // 💳 הודעת תשלום מ-Grow: הקונה נוסף אוטומטית לרשימת הרוכשים.
    // הכתובת כוללת סוד (GROW_WEBHOOK_SECRET) שרק Grow מקבלת, כדי שאף אחד לא יוכל לזייף "שולם".
    const GROW_SECRET = env.GROW_WEBHOOK_SECRET && env.GROW_WEBHOOK_SECRET.length >= 16 ? env.GROW_WEBHOOK_SECRET : null;
    const GROW_KEY = env.GROW_WEBHOOK_KEY || null;
    const MIN_SUM = toNumber(env.COURSE_PRICE);
    const sameSecret = (a, b) => {
        const x = Buffer.from(String(a)), y = Buffer.from(String(b));
        return x.length === y.length && crypto.timingSafeEqual(x, y);
    };
    app.post('/api/webhooks/grow/:secret',
        express.json({ limit: '200kb' }),
        express.urlencoded({ extended: true, limit: '200kb' }),
        async (req, res) => {
            if (!GROW_SECRET || !sameSecret(req.params.secret, GROW_SECRET)) return res.sendStatus(404);
            if (!purchases) return res.status(503).json({ error: 'buyers store not configured' });
            const payment = parseGrowPayment(req.body);
            if (GROW_KEY && !(payment.webhookKey && sameSecret(payment.webhookKey, GROW_KEY))) {
                console.warn('⚠️ הודעת Grow עם webhookKey לא תואם - נדחתה');
                return res.sendStatus(403);
            }
            if (!payment.paid || payment.emails.length === 0) {
                console.warn('ℹ️ הודעת Grow בלי תשלום מאושר או בלי אימייל - לא נוספה גישה');
                return res.json({ ok: true, granted: false });
            }
            if (MIN_SUM !== null && payment.sum !== null && payment.sum < MIN_SUM) {
                console.warn(`⚠️ הודעת Grow עם סכום ${payment.sum} נמוך ממחיר הקורס - לא נוספה גישה`);
                return res.json({ ok: true, granted: false });
            }
            const code = payment.transactionId ? `GROW-${payment.transactionId}` : 'GROW';
            try {
                // אותה הודעה יכולה להגיע יותר מפעם אחת - לא מוסיפים כפילויות
                if (payment.transactionId && await purchases.findByCode(code)) {
                    return res.json({ ok: true, granted: true, duplicate: true });
                }
                for (const email of payment.emails.slice(0, 2)) {
                    if (!(await purchases.hasAccess(email))) await purchases.add({ email, code });
                }
                res.json({ ok: true, granted: true });
            } catch (e) {
                console.error('שגיאה בשמירת רוכש מ-Grow:', e.message);
                res.status(500).json({ error: 'store failed' });
            }
        });

    app.post('/api/access/redeem', async (req, res) => {
        if (!access.enabled) return res.status(404).json({ error: msg(req, 'unavailable') });
        if (isRedeemRateLimited(req.ip)) {
            return res.status(429).json({ error: msg(req, 'tooManyAttempts') });
        }
        const email = currentUser(req);
        if (!email) return res.status(401).json({ error: msg(req, 'redeemSignIn') });

        const code = req.body && typeof req.body.code === 'string' ? req.body.code.trim().toUpperCase() : '';
        if (!access.isValidCode(code)) {
            return res.status(400).json({ error: msg(req, 'badCode') });
        }
        try {
            const existing = await purchases.findByCode(code);
            if (existing && normalizeEmail(existing.email) !== email) {
                return res.status(409).json({ error: msg(req, 'codeUsed') });
            }
            if (!existing) await purchases.add({ email, code });
            res.json({ ok: true, email });
        } catch (e) {
            console.error('שגיאה במימוש קוד:', e.message);
            res.status(503).json({ error: msg(req, 'codeSaveFailed') });
        }
    });

    // שאלות המבחן של מודול - ללא התשובות הנכונות
    app.get('/api/modules/:num/quiz', async (req, res) => {
        const num = Number(req.params.num);
        const lang = reqLang(req) === 'en' && isTranslated(num) ? 'en' : 'he';
        const questions = publicQuiz(num, lang);
        const mod = modulesDatabase.find(m => m.moduleNumber === num);
        if (!questions || !mod) return res.status(404).json({ error: msg(req, 'moduleNotFound') });
        if (!canSee(mod, req)) return res.status(403).json(comingSoonError(req));
        if (await isLocked(num, req)) return res.status(403).json(lockedError(req));
        res.json({ passingScore: PASSING_SCORE, questions, lang });
    });

    app.post('/api/submissions', async (req, res) => {
        try {
            const { studentName, moduleNumber, answers = {} } = req.body || {};
            const name = typeof studentName === 'string' ? studentName.trim() : '';
            const num = Number(moduleNumber);

            if (!name || name.length > 80) {
                return res.status(400).json({ error: msg(req, 'nameRequired') });
            }
            const mod = modulesDatabase.find(m => m.moduleNumber === num);
            if (mod && !canSee(mod, req)) {
                return res.status(403).json(comingSoonError(req));
            }
            if (await isLocked(num, req)) {
                return res.status(403).json(lockedError(req));
            }
            if (isSubmissionRateLimited(req.ip)) {
                return res.status(429).json({ error: msg(req, 'tooManySubmissions') });
            }

            const lang = reqLang(req) === 'en' && isTranslated(num) ? 'en' : 'he';
            const graded = gradeQuiz(num, answers, lang);
            if (!graded) {
                return res.status(400).json({ error: msg(req, 'unknownModule') });
            }

            const feedbackString = graded.results
                .map((r, i) => `${r.isCorrect ? '✅' : '❌'} שאלה ${i + 1}`)
                .join(' | ');
            // בגיליון: הגשות בממשק האנגלי מסומנות ב-[EN] בתחילת עמודת המשוב (בלי להוסיף עמודה חדשה)
            const sheetFeedback = (reqLang(req) === 'en' ? '[EN] ' : '') + feedbackString;

            // אותם שמות עמודות כמו קודם, כדי לא לשבור את הגיליון הקיים
            const recorded = await saveToSheet({
                "id": Date.now().toString(),
                "שם": name,
                "מספר מודל": num,
                "שאלה": `${graded.correctCount}/${graded.total} נכונות`,
                "תשובה": JSON.stringify(answers).slice(0, 500),
                "feedback": sheetFeedback,
                "ציון": graded.score,
            });

            res.status(201).json({
                message: msg(req, 'graded'),
                score: graded.score,
                passed: graded.passed,
                passingScore: PASSING_SCORE,
                correctCount: graded.correctCount,
                total: graded.total,
                results: graded.results,
                recorded
            });
        } catch (error) {
            console.error("שגיאה כללית בשרת:", error);
            res.status(500).json({ error: msg(req, 'serverError') });
        }
    });

    return app;
}

module.exports = createApp;

// הרצה ישירה (npm start). בבדיקות האוטומטיות השרת נבנה בלי להאזין לפורט קבוע.
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    createApp().listen(PORT, () => console.log(`🚀 שרת דלוק ומלא בתוכן בפורט ${PORT}`));
}
