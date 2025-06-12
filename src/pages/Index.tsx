
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClayCard from '@/components/ClayCard';
import ClayButton from '@/components/ClayButton';
import { Search, Users, Zap, ArrowRight, Star, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="flex-1 max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-700 mb-6">
            מצא לידים איכותיים
            <span className="block text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-blue-600">
              מפוסטי פייסבוק
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            מערכת חכמה שמזהה ומסננת לקוחות פוטנציאליים מפוסטים בפייסבוק באמצעות בינה מלאכותית מתקדמת
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ClayButton asChild variant="primary" size="lg">
              <Link to="/signup" className="flex items-center gap-2">
                התחל חינם <ArrowRight className="w-5 h-5" />
              </Link>
            </ClayButton>
            <ClayButton asChild variant="secondary" size="lg">
              <Link to="/login">
                התחבר לחשבון קיים
              </Link>
            </ClayButton>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ClayCard variant="elevated" className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-purple-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-4">זיהוי חכם</h3>
            <p className="text-slate-600 leading-relaxed">
              אלגוריתם AI מתקדם שמזהה אוטומטית לקוחות פוטנציאליים מתוך אלפי פוסטים בפייסבוק
            </p>
          </ClayCard>

          <ClayCard variant="elevated" className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
              <Users className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-4">סינון מדויק</h3>
            <p className="text-slate-600 leading-relaxed">
              מסנן מתקדם שמאפשר לך לקבל רק את הלידים הרלוונטיים ביותר לעסק שלך
            </p>
          </ClayCard>

          <ClayCard variant="elevated" className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
              <Zap className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-4">תוצאות מהירות</h3>
            <p className="text-slate-600 leading-relaxed">
              קבל רשימה מסודרת של לידים איכותיים תוך דקות ספורות
            </p>
          </ClayCard>
        </div>

        {/* Social Proof */}
        <ClayCard variant="elevated" className="text-center mb-16">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-4">מעל 1,000 עסקים מרוצים</h3>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            "המערכת חסכה לנו שעות של עבודה ידנית והביאה לנו לידים איכותיים שלא היינו מוצאים בעצמנו"
          </p>
          <p className="text-slate-500 mt-2">- יוסי כהן, מנהל שיווק</p>
        </ClayCard>

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-700 mb-12">איך זה עובד?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xl">1</div>
              <h4 className="font-bold text-slate-700 mb-2">הגדר קריטריונים</h4>
              <p className="text-slate-600">הגדר את סוג הלקוחות שאתה מחפש</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">2</div>
              <h4 className="font-bold text-slate-700 mb-2">סרוק פוסטים</h4>
              <p className="text-slate-600">המערכת סורקת אלפי פוסטים בפייסבוק</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">3</div>
              <h4 className="font-bold text-slate-700 mb-2">קבל תוצאות</h4>
              <p className="text-slate-600">רשימה מסודרת של לידים איכותיים</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <ClayCard variant="elevated" className="text-center bg-gradient-to-br from-purple-50 to-blue-50">
          <h2 className="text-3xl font-bold text-slate-700 mb-4">מוכן להתחיל?</h2>
          <p className="text-slate-600 text-lg mb-8">
            הצטרף אלינו עוד היום וקבל 7 ימי ניסיון חינם
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ClayButton asChild variant="primary" size="lg">
              <Link to="/signup" className="flex items-center gap-2">
                התחל חינם עכשיו <ArrowRight className="w-5 h-5" />
              </Link>
            </ClayButton>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>ללא כרטיס אשראי</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>ביטול בכל עת</span>
            </div>
          </div>
        </ClayCard>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
