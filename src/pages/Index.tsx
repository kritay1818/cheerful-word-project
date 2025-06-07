import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import ClayButton from '@/components/ClayButton';
import { Target, Users, TrendingUp, Zap, BarChart3, ChevronDown, Check, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
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

  const faqItems = [
    {
      question: "איך המערכת מוצאת לידים בפייסבוק?",
      answer: "המערכת שלנו משתמשת בבינה מלאכותית מתקדמת שסורקת פוסטים בקבוצות פייסבוק רלוונטיות ומזהה אנשים שמחפשים בדיוק את השירותים שאתם מציעים. האלגוריתם מנתח את התוכן של הפוסטים ומוצא התאמות מדויקות לעסק שלכם."
    },
    {
      question: "כמה זמן לוקח לקבל תוצאות?",
      answer: "אחרי ההרשמה וההגדרה הראשונית, תתחילו לקבל לידים תוך 24-48 שעות. המערכת עובדת ברציפות וממשיכה למצוא לידים חדשים על בסיס יומי."
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
            אתה מפספס לידים בפייסבוק,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              תן ל-AI למצוא אותם בשבילך
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            המערכת החכמה שמנתחת פוסטים בפייסבוק, מוצאת לקוחות פוטנציאליים שמתאימים בדיוק לעסק שלך, 
            ומספקת לך רשימה מסודרת של הזדמנויות עסקיות איכותיות
          </p>
          
          <div className="flex justify-center">
            <Link to="/register">
              <ClayButton variant="primary" size="lg" className="text-xl px-12 py-4">
                התחל למצוא לידים
              </ClayButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center text-slate-700 mb-16">
          למה לבחור ב-snipost?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <ClayCard key={index} variant="elevated" className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.4)]">
                <feature.icon className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </ClayCard>
          ))}
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

      {/* How it works */}
      <div className="mb-20">
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

      {/* Pricing Section - moved here */}
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
                <div className="text-5xl font-bold text-purple-600 mb-2">₪100</div>
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
      <ClayCard variant="elevated" className="text-center">
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
    </div>
  );
};

export default Index;
