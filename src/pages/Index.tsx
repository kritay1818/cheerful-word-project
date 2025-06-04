import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import ClayButton from '@/components/ClayButton';
import { Target, Users, TrendingUp, Zap, Facebook, BarChart3 } from 'lucide-react';

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
      title: "מעקב ואנליטיקה",
      description: "דאשבורד מפורט עם נתונים על ביצועים, שיעורי הצלחה, ומגמות בזמן אמת"
    },
    {
      icon: Zap,
      title: "אנשים שמעוניינים בדיוק בשירות שאתם מציעים",
      description: "המערכת אוספת בשבילך את כל מי שמדבר על השירות שלך, ככה שלא תפסיד אף לקוח ותוכל להגדיל את המותג של העסק שלך"
    }
  ];

  const stats = [
    { number: "10,000+", label: "לידים נמצאו" },
    { number: "500+", label: "עסקים מרוצים" },
    { number: "85%", label: "שיעור הצלחה" },
    { number: "24/7", label: "פעילות רציפה" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Use shared Navigation component */}
      <Navigation />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-300 via-blue-300 to-green-300 flex items-center justify-center shadow-[inset_0_4px_20px_rgba(255,255,255,0.3),0_12px_32px_rgba(0,0,0,0.15)]">
            <Facebook className="w-12 h-12 text-purple-700" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-700 mb-6 leading-tight">
            תפסיק לפספס לידים
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              בפייסבוק!
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <ClayCard key={index} className="text-center">
              <h3 className="text-3xl font-bold text-slate-700 mb-2">{stat.number}</h3>
              <p className="text-slate-600">{stat.label}</p>
            </ClayCard>
          ))}
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-slate-700 mb-16">
            למה לבחור ב-LeadFinder?
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

        {/* CTA */}
        <ClayCard variant="elevated" className="text-center">
          <h2 className="text-3xl font-bold text-slate-700 mb-4">
            מוכן להתחיל למצוא לידים?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            הצטרף לאלפי העסקים שכבר מגדילים את המכירות שלהם עם LeadFinder
          </p>
          <Link to="/register">
            <ClayButton variant="primary" size="lg" className="text-xl px-12 py-4">
              התחל בחינם היום
            </ClayButton>
          </Link>
        </ClayCard>
      </div>
    </div>
  );
};

export default Index;
