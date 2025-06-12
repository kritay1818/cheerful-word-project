
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClayCard from '@/components/ClayCard';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-4xl mx-auto p-6 pt-20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <FileText className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-700 mb-4">תקנון אתר Snipost</h1>
          <p className="text-lg text-slate-600">עדכון אחרון: {new Date().toLocaleDateString('he-IL')}</p>
        </div>

        <div className="space-y-8">
          <ClayCard variant="elevated" className="prose max-w-none">
            <div className="space-y-6 text-right" dir="rtl">
              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">הגדרות</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li><strong>"האתר":</strong> Snipost (snipost.com)</li>
                  <li><strong>"המשתמש":</strong> כל מבקר או משתמש בשירותי האתר</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">שירות האתר</h2>
                <p className="text-slate-600 leading-relaxed">
                  האתר משתמש בבינה מלאכותית לזיהוי לידים פוטנציאליים מפוסטי פייסבוק, ומציע למשתמשים ניתוח, סינון ורשימה של לקוחות פוטנציאליים יעילים.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">קבלה וחתימה</h2>
                <p className="text-slate-600 leading-relaxed">
                  בשימושך באתר אתה מסכים לתנאי התקנון ומתחייב לפעול בהתאם להם.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">שימוש מותר</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>רצוי להשתמש באתר לשימוש עצמי, חוקי, וללא פגיעה בזכויותיו של אף צד שלישי</li>
                  <li>אסור להשתמש בבוטים או טכניקות אוטומציה אסורות</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">פרטיות ונתונים</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>האתר עשוי לאסוף נתונים כגון: כתובת מייל, תכנים מפוסטים בפייסבוק ונתוני משתמש</li>
                  <li>עליך להסכים לשימוש בנתונים בהתאם למדיניות הפרטיות</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">קניין רוחני</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>כל זכויות היוצרים, סימני המסחר והתוכן השמור באתר מותרים לבעליה בלבד</li>
                  <li>אין לשכפל, להפיץ או ליצור תתי־מוצרים</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">אחריות מוגבלת</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>השירות ניתן "כפי שהוא" ללא אחריות למגבלותיו</li>
                  <li>האתר לא יישא באחריות לנזקים עקיפים, פגיעה בפרטיות, אובדן רווחים או הפסדים אחרים</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">שינויים בתנאי השימוש</h2>
                <p className="text-slate-600 leading-relaxed">
                  Snipost רשאית לעדכן את התקנון מעת לעת. השינוי ייכנס לתוקפו עם פרסומו באתר.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">סיום השימוש</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>האתר רשאי להפסיק את גישתך אם הפרת את התנאים</li>
                  <li>באפשרותך למחוק את חשבונך בכל עת</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">יישוב סכסוכים</h2>
                <p className="text-slate-600 leading-relaxed">
                  כל סכסוך ייושב על פי דין ישראלי, בפני בתי המשפט בתל‑אביב–יפו.
                </p>
              </section>
            </div>
          </ClayCard>

          <ClayCard variant="elevated" className="prose max-w-none">
            <div className="space-y-6 text-right" dir="rtl">
              <h1 className="text-3xl font-bold text-slate-700 mb-6 text-center">🛡️ מדיניות פרטיות – חלק 1: נתונים כלליים</h1>
              
              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">איזה מידע נאסף</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li><strong>מידע אישי:</strong> כתובת מייל, שם משתמש, פרטי תקשורת</li>
                  <li><strong>מידע מאגרי:</strong> תכנים מפוסטים בפייסבוק</li>
                  <li><strong>לוגים:</strong> כתובת IP, זמן התחברות, מערכת הפעלה ודפדפן</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">איך משתמשים במידע</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>לשיפור המערכת וריבוי הדיוק של זיהוי לידים</li>
                  <li>לתקשורת איתך (חדשות, עדכונים, תמיכה)</li>
                  <li>לצרכי אבטחת המערכת</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">שיתוף מידע</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>עם ספקי שירות צד ג׳ (דוגמת אחסון וניתוח נתונים)</li>
                  <li>על פי דרישה חוקית</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">שמירה ואבטחה</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>נתונים נשמרים לפרק זמן סביר</li>
                  <li>מאובטחים באמצעים טכנולוגיים וארגוניים</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">זכויות המשתמש</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>לגשת למידע שלך, לתקנו או למחוק אותו</li>
                  <li>לבקש הגבלה בשימוש או להתנגד לעיבוד</li>
                  <li>לבקש העברת מידע (data portability)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">קבצי Cookies</h2>
                <p className="text-slate-600 leading-relaxed">
                  האתר משתמש בעוגיות לשיפור חווית המשתמש ולניתוח שימוש. תוכל לבטל אותן דרך הגדרות הדפדפן שלך — אך יתכן שחלק מהשירותים יחלו לפעול באופן מוגבל.
                </p>
              </section>
            </div>
          </ClayCard>

          <ClayCard variant="elevated" className="prose max-w-none">
            <div className="space-y-6 text-right" dir="rtl">
              <h1 className="text-3xl font-bold text-slate-700 mb-6 text-center">🛡️ מדיניות פרטיות – חלק 2: סוגיות ספציפיות</h1>
              
              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">ילדים</h2>
                <p className="text-slate-600 leading-relaxed">
                  האתר אינו מיועד למשתמשים מתחת לגיל 16. אם מתגלה שימוש על ידי קטין, אנו נמחק את המידע מיידית.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">שינויים במדיניות</h2>
                <p className="text-slate-600 leading-relaxed">
                  האתר עשוי לעדכן את המדיניות, והעדכון ייכנס לתוקף כשתפורסם ותימסר דרך האתר.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">יצירת קשר בנושא פרטיות</h2>
                <p className="text-slate-600 leading-relaxed">
                  ניתן לפנות למייל:{' '}
                  <a href="mailto:privacy@snipost.com" className="text-purple-600 hover:text-purple-700 font-medium">
                    privacy@snipost.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-700 mb-4">💡 המלצות נוספות</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li><strong>Cookie Banner:</strong> הצג אפשרות לקבל או לדחות עוגיות</li>
                  <li>ניהול סכמה של cookies, כולל תיוג לפי "חובה" ו"רצוי"</li>
                  <li>לינק ברור במדיניות לעוגיות</li>
                  <li><strong>ניהול הרשאות לפרופיל משתמש:</strong> גישה, שינוי, מחיקה</li>
                </ul>
              </section>
            </div>
          </ClayCard>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
