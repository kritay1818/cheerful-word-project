import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import ClayButton from '@/components/ClayButton';
import { Target, Users, TrendingUp, Zap, BarChart3, ChevronDown, Check, Star, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const features = [
    {
      icon: Target,
      title: "מציאת לידים מדויקים",
      description: "המערכת שלנו מנתחת פוסטים בפייסבוק ומוצאת בדיוק את הלקוחות הפוטנציאליים שמתאימים לעסק שלך"
    },
    {
      icon: Users,
      title: "קהל יעד מותאם אישית",
      description: "אלגוריתם חכם שלומד את הצרכים של העסק שלך ומתאים את החיפושים למאפייני הלקוחות האידיאליים"
    },
    {
      icon: TrendingUp,
      title: "סוכן AI שמוצא לך את מה שמתאים לך",
      description: "בינה מלאכותית מתקדמת שסורקת ומנתחת אלפי פוסטים ומוצאת בדיוק את הלקוחות שמחפשים את השירותים שלך"
    },
    {
      icon: Zap,
      title: "אנשים שמעוניינים בדיוק בשירות שאתם מציעים",
      description: "המערכת אוספת בשבילך את כל מי שמדבר על השירות שלך, ככה שלא תפסיד אף לקוח ותוכל להגדיל את המותג של העסק שלך"
    }
  ];

  const chatExamples = [
    {
      image: "/lovable-uploads/639276d5-6e98-4ba6-8788-4c25ea8e3e80.png",
      profession: "משווק דיגיטלי",
      location: "ראשון לציון"
    },
    {
      image: "/lovable-uploads/5ee621d2-133d-4c51-89d3-cc597306e47c.png",
      profession: "מתווך",
      location: "תל אביב"
    }
  ];

  const steps = [
    {
      id: 1,
      title: "הרשמה ראשונית",
      icon: Users,
      color: "from-purple-200 to-blue-200",
      textColor: "text-purple-700",
      image: "/lovable-uploads/ec5af2eb-fd03-4214-aad5-2b56388748f4.png",
      description: "מלא את הפרטים הבסיסיים שלך - שם מלא, אימייל וסיסמה. זה השלב הראשון בדרך להצלחה שלך."
    },
    {
      id: 2,
      title: "הגדרת פרטי העסק",
      icon: Target,
      color: "from-blue-200 to-green-200",
      textColor: "text-blue-700",
      image: "/lovable-uploads/dfb1f958-be77-4418-a144-227b07460f07.png",
      description: "הגדר את תחום העיסוק, אזור הפעילות, ומילות המפתח שיעזרו לנו למצוא את הלידים המתאימים ביותר עבורך."
    },
    {
      id: 3,
      title: "כניסה לדאשבורד",
      icon: BarChart3,
      color: "from-green-200 to-teal-200",
      textColor: "text-green-700",
      image: "/lovable-uploads/73948188-63fa-4b02-913d-41f95a8692eb.png",
      description: "צפה בדאשבורד המתקדם שלך, עם כל הלידים שנמצאו עבורך. סנן, מיין וארגן את ההזדמנויות העסקיות שלך."
    },
    {
      id: 4,
      title: "מעקב אחרי התראות",
      icon: Zap,
      color: "from-teal-200 to-purple-200",
      textColor: "text-teal-700",
      image: "/lovable-uploads/163b05ae-7ae1-4919-a79d-e9a47f9c3a77.png",
      description: "התחבר לבוט הטלגרם שלנו וקבל התראות בזמן אמת על לידים חדשים. לא תפספס אף הזדמנות!"
    },
    {
      id: 5,
      title: "ודבר אחרון כדי שהAI יזהה אותך",
      icon: Mail,
      color: "from-purple-200 to-pink-200",
      textColor: "text-purple-700",
      image: "/lovable-uploads/aeef2611-ddd2-4560-a33b-73c74431f663.png",
      description: "שלח הודעה לבוט עם המייל שלך"
    }
  ];

  const faqItems = [
    {
      question: "איך המערכת מוצאת לידים בפייסבוק?",
      answer: "המערכת שלנו משתמשת בבינה מלאכותית מתקדמת שסורקת פוסטים בקבוצות פייסבוק רלוונטיות ומזהה אנשים שמחפשים בדיוק את השירותים שאתם מציעים. האלגוריתם מנתח את התוכן של הפוסטים ומוצא התאמות מדויקות לעסק שלכם."
    },
    {
      question: "כמה זמן לוקח לקבל תוצאות?",
      answer: "תוכלו לראות לידים באופן מיידי לאחר השלמת ההרשמה וההגדרה הראשונית. המערכת פועלת בצורה רציפה ומחפשת לידים חדשים על בסיס יום יומי, כך שתמיד תהיו מעודכנים עם ההזדמנויות העסקיות הטובות ביותר."
    },
    {
      question: "איך אני יודע שהלידים איכותיים?",
      answer: "המערכת מנתחת את הקשר של הפוסטים, מיקום הכותב, ונתונים נוספים כדי לוודא שהלידים רלוונטיים. בנוסף, אתם מקבלים קישור ישיר לפוסט המקורי כדי שתוכלו לראות בדיוק מה האדם חיפש."
    },
    {
      question: "האם זה חוקי לחפש לידים בפייסבוק?",
      answer: "כן, המערכת עובדת אך ורק עם תוכן ציבורי הזמין לכולם בקבוצות פייסבוק. אנחנו לא ניגשים למידע פרטי ופועלים בהתאם לכל החוקים והתקנות הרלוונטיים."
    },
    {
      question: "כמה זה עולה?",
      answer: "אנחנו מציעים מנוי ניסיון חינמי של 5 ימים, ולאחר מכן מנוי חודשי בעלות של 100 שקל לחודש. תוכלו לבטל בכל זמן."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Use shared Navigation component */}
      <Navigation />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <div className="mx-auto mb-8">
            <img src="/lovable-uploads/248b6086-71d7-4951-9099-120e5eb66c07.png" alt="snipost logo" className="w-64 h-64 mx-auto object-contain" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-700 mb-6 leading-tight">
            תפסיקו לפספס הזדמנויות עסקיות בפייסבוק,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              תנו ל-AI למצוא אותם בשבילך
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            המערכת החכמה שמנתחת פוסטים בפייסבוק, מוצאת לקוחות ופוסטים פוטנציאליים שמתאימים בדיוק לעסק שלך, 
            ומספקת לך רשימה מסודרת של הזדמנויות עסקיות איכותיות
          </p>
          
          <div className="flex justify-center">
            <Link to="/register">
              <ClayButton variant="primary" size="lg" className="text-xl px-12 py-4">
                התחל עכשיו בחינם
              </ClayButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Pain Points and Solution */}
      <div className="mb-20 relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/30 to-green-100/30 rounded-3xl -z-10"></div>
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <ClayCard variant="elevated" className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-purple-50 p-8 rounded-3xl shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.4)]">
                <Target className="w-10 h-10 text-white" />
              </div>
              <p className="text-xl text-slate-700 leading-relaxed font-medium">מכיר את התחושה שמישהו מחפש את השירות שלך בפייסבוק אבל הוא כבר הסתדר? או יותר גרוע, לא ידעת על זה בכלל?</p>
            </ClayCard>

            <ClayCard variant="elevated" className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-300 to-green-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.4)]">
                <Users className="w-10 h-10 text-white" />
              </div>
              <p className="text-xl text-slate-700 leading-relaxed font-medium">איך אתה מרגיש כשאתה רואה שיכולת באמת לתת ערך/להשפיע או פשוט לעשות עוד שת"פ שיוכל לקדם אותך?</p>
            </ClayCard>

            <ClayCard variant="elevated" className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50 p-8 rounded-3xl shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-300 to-teal-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.4)]">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <p className="text-xl text-slate-700 leading-relaxed font-medium">המתחרים שלך מתקדמים ותמיד צעד אחד לפנייך? היית רוצה פשוט לנצח את המתחרים שלך?</p>
            </ClayCard>

            <ClayCard variant="elevated" className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-teal-50 p-8 rounded-3xl shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.4)]">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <p className="text-xl text-slate-700 leading-relaxed font-medium">ידעת שכל יום יש אנשים שצריכים אותך ומחפשים את השירות שלך בפייסבוק?</p>
            </ClayCard>
          </div>

          <div className="text-center max-w-4xl mx-auto bg-gradient-to-br from-purple-600 to-blue-600 p-12 rounded-3xl shadow-xl text-white">
            <p className="text-3xl font-bold mb-6">אנחנו מבינים מה אתה מרגיש, תחושת הפספוס הזאת נוראית...</p>
            <p className="text-xl leading-relaxed">
              אנחנו ב-snipost מבינים בדיוק את התסכול הזה. לכן פיתחנו מערכת AI חכמה שתעזור לך למצוא את כל ההזדמנויות העסקיות בזמן אמת, 
              כדי שתוכל להגיע ראשון, לתת ערך אמיתי, ולהפוך כל הזדמנות להצלחה.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Examples */}
      <div className="grid md:grid-cols-2 gap-6 mb-20">
        {chatExamples.map((example, index) => (
          <ClayCard key={index} className="text-center overflow-hidden">
            <img 
              src={example.image} 
              alt={`דוגמה לשיחה עם ${example.profession}`}
              className="w-full h-32 object-cover object-top rounded-2xl mb-4"
            />
            <h3 className="text-lg font-semibold text-slate-700 mb-1">{example.profession}</h3>
            <p className="text-slate-600">{example.location}</p>
          </ClayCard>
        ))}
      </div>

      {/* User Guide Section */}
      <div className="mb-20 relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-green-100/50 rounded-3xl -z-10"></div>
        <h2 className="text-4xl font-bold text-center text-slate-700 mb-16">
          המסלול שלך להצלחה
        </h2>
        
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {steps.map((step, index) => (
            <div key={step.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <ClayCard variant="elevated" className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.4)]`}>
                    {React.createElement(step.icon, {
                      className: `w-8 h-8 ${step.textColor}`
                    })}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-700 mb-6 text-center">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </ClayCard>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'md:col-start-1' : ''}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl transform transition-all duration-300 group-hover:shadow-xl">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full transition-transform duration-300 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works section */}
      <div className="mb-20 relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-green-100/50 rounded-3xl -z-10"></div>
        <h2 className="text-4xl font-bold text-center text-slate-700 mb-16">
          איך זה עובד?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ClayCard className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center text-green-800 font-bold text-xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]">
              1
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">הרשמה ומילוי פרטים</h3>
            <p className="text-slate-600">מלא את הפרטים על העסק שלך, קהל היעד, והמיקום הגיאוגרפי</p>
          </ClayCard>
          
          <ClayCard className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-blue-800 font-bold text-xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]">
              2
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">סריקה אוטומטית</h3>
            <p className="text-slate-600">המערכת סורקת פוסטים בפייסבוק ומוצאת הזדמנויות רלוונטיות</p>
          </ClayCard>
          
          <ClayCard className="text-center">
            <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center text-purple-800 font-bold text-xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]">
              3
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">קבלת לידים</h3>
            <p className="text-slate-600">צפה בדאשבורד ותגובי על הפוסטים הרלוונטיים ביותר</p>
          </ClayCard>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center text-slate-700 mb-16">
          תמחור פשוט ושקוף
        </h2>
        
        <div className="max-w-md mx-auto">
          <ClayCard variant="elevated" className="text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            
            <div className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.4)]">
                <Star className="w-8 h-8 text-green-700" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-700 mb-4">מנוי חודשי</h3>
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">₪97</div>
                <div className="text-slate-600">לחודש</div>
              </div>
              
              <div className="bg-green-100 text-green-800 py-2 px-4 rounded-2xl mb-6 font-semibold">
                ניסיון חינמי לֵ5 ימים
              </div>
              
              <div className="space-y-3 mb-8 text-right">
                <div className="flex items-center justify-start">
                  <Check className="w-5 h-5 text-green-600 ml-3" />
                  <span className="text-slate-700">סריקה אוטומטית יומית</span>
                </div>
                <div className="flex items-center justify-start">
                  <Check className="w-5 h-5 text-green-600 ml-3" />
                  <span className="text-slate-700">לידים בזמן אמת</span>
                </div>
                <div className="flex items-center justify-start">
                  <Check className="w-5 h-5 text-green-600 ml-3" />
                  <span className="text-slate-700">דאשבורד מתקדם</span>
                </div>
                <div className="flex items-center justify-start">
                  <Check className="w-5 h-5 text-green-600 ml-3" />
                  <span className="text-slate-700">ביטול בכל עת</span>
                </div>
              </div>
              
              <Link to="/register">
                <ClayButton variant="primary" size="lg" className="w-full text-lg">
                  התחל ניסיון חינמי
                </ClayButton>
              </Link>
            </div>
          </ClayCard>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center text-slate-700 mb-16">
          שאלות נפוצות
        </h2>
        
        <ClayCard variant="elevated" className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200 last:border-b-0">
                <AccordionTrigger className="text-right text-lg font-semibold text-slate-700 hover:text-purple-600 py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-right text-slate-600 leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ClayCard>
      </div>

      {/* CTA */}
      <ClayCard variant="elevated" className="text-center mb-20">
        <h2 className="text-3xl font-bold text-slate-700 mb-4">
          מוכן להתחיל למצוא לידים?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          הצטרף לאלפי העסקים שכבר מגדילים את המכירות שלהם עם snipost
        </p>
        <Link to="/register">
          <ClayButton variant="primary" size="lg" className="text-xl px-12 py-4">
            התחל בחינם היום
          </ClayButton>
        </Link>
      </ClayCard>

      {/* Contact Section */}
      
<ClayCard className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]">
          <Mail className="w-6 h-6 text-blue-800" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-3">צור איתנו קשר</h3>
        <p className="text-slate-600 mb-4">
          יש לך בקשות או פידבק? נשמח לשמוע ממך
        </p>
        <a 
          href="mailto:shaysho111@gmail.com" 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          <Mail className="w-4 h-4 ml-2" />
          info@snipost.com
        </a>
      </ClayCard>
    </div>
  );
};

export default Index;
