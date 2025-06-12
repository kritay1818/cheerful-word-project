
import React from 'react';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <FileText className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-700 mb-4">תנאי השימוש</h1>
          <p className="text-lg text-slate-600">עדכון אחרון: {new Date().toLocaleDateString('he-IL')}</p>
        </div>

        <ClayCard variant="elevated" className="prose max-w-none">
          <div className="space-y-6 text-right" dir="rtl">
            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">1. כללי</h2>
              <p className="text-slate-600 leading-relaxed">
                ברוכים הבאים לשירות LeadFinder. השימוש באתר ובשירותים שלנו כפוף לתנאי השימוש המפורטים להלן. 
                על ידי שימוש באתר או בשירותים שלנו, אתם מסכימים לתנאים אלה במלואם.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">2. השירות</h2>
              <p className="text-slate-600 leading-relaxed">
                LeadFinder הוא שירות לאיתור ולניהול לידים עסקיים. אנו מספקים כלים ופתרונות לעסקים 
                למציאת לקוחות פוטנציאליים ולניהול קשרי עסקיים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">3. רישום וחשבון משתמש</h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>על המשתמש לספק מידע נכון ומדויק בעת הרישום</li>
                <li>המשתמש אחראי לשמירת סודיות פרטי הגישה לחשבון</li>
                <li>אסור להעביר או לשתף את החשבון עם צדדים שלישיים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">4. מדיניות התשלום</h2>
              <p className="text-slate-600 leading-relaxed">
                השירות מוצע במודל מנוי חודשי. התשלום מתבצע מראש עבור כל חודש של שימוש. 
                ביטול המנוי יכול להתבצע בכל עת, אך לא יוחזר תשלום עבור התקופה ששולמה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">5. הגבלות שימוש</h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>אסור להשתמש בשירות למטרות לא חוקיות</li>
                <li>אסור לנסות לפגוע במערכות או בתפקוד השירות</li>
                <li>אסור להפיץ תוכן פוגעני או לא מתאים</li>
                <li>השימוש בשירות מוגבל לשימוש עסקי לגיטימי בלבד</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">6. הגנת הפרטיות</h2>
              <p className="text-slate-600 leading-relaxed">
                אנו מתחייבים להגן על פרטיות המשתמשים ולהשתמש במידע האישי אך ורק למטרת מתן השירות. 
                לפרטים נוספים ראו את מדיניות הפרטיות שלנו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">7. הגבלת אחריות</h2>
              <p className="text-slate-600 leading-relaxed">
                השירות מסופק "כמות שהוא" ואיננו מתחייבים לתוצאות ספציפיות. 
                אחריותנו מוגבלת למקסימום הסכום ששולם עבור השירות בחודש האחרון.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">8. שינויים בתנאים</h2>
              <p className="text-slate-600 leading-relaxed">
                אנו שומרים על הזכות לעדכן את תנאי השימוש מעת לעת. 
                שינויים יפורסמו באתר ויכנסו לתוקף 30 יום לאחר הפרסום.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">9. יצירת קשר</h2>
              <p className="text-slate-600 leading-relaxed">
                לשאלות או הבהרות בנוגע לתנאי השימוש, ניתן ליצור קשר עימנו בכתובת: 
                <a href="mailto:itaykritmaler@gmail.com" className="text-purple-600 hover:text-purple-700 font-medium mr-2">
                  itaykritmaler@gmail.com
                </a>
              </p>
            </section>
          </div>
        </ClayCard>
      </div>
    </div>
  );
};

export default TermsOfService;
