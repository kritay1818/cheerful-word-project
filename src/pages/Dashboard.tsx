
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import LeadCard from '@/components/LeadCard';
import ClayButton from '@/components/ClayButton';
import { BarChart3, TrendingUp, Users, Target, Filter, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [leads, setLeads] = useState([
    {
      id: 1,
      title: "מחפש עורך דין למשפט משפחה בתל אביב",
      description: "שלום, אני צריך עורך דין מנוסה בתחום משפט המשפחה. מעוניין בייצוג בתיק גירושין מורכב. אשמח לקבל המלצות על עורכי דין איכותיים באזור תל אביב.",
      location: "תל אביב",
      date: "לפני 2 שעות",
      engagement: 15,
      facebookUrl: "https://facebook.com/groups/legal-advice-tlv/posts/123",
      relevanceScore: 95
    },
    {
      id: 2,
      title: "עזרה בחישוב מס הכנסה לעצמאי",
      description: "היי חברים, אני עצמאי ומתקשה להבין איך לחשב נכון את מס הכנסה לשנה הבאה. מישהו יכול להמליץ על רואה חשבון טוב שמתמחה בעצמאים?",
      location: "רמת גן",
      date: "לפני 4 שעות",
      engagement: 8,
      facebookUrl: "https://facebook.com/groups/freelancers-israel/posts/456",
      relevanceScore: 87
    },
    {
      id: 3,
      title: "מחפשת קוסמטיקאית לטיפוח פנים",
      description: "בנות, אני מחפשת קוסמטיקאית מקצועית לטיפוח פנים. רוצה מישהי שמתמחה בטיפולי אנטי אייג'ינג ויודעת לעבוד עם עור רגיש. באזור פתח תקווה או השכונות.",
      location: "פתח תקווה",
      date: "לפני 6 שעות",
      engagement: 23,
      facebookUrl: "https://facebook.com/groups/beauty-petach-tikva/posts/789",
      relevanceScore: 78
    },
    {
      id: 4,
      title: "ייעוץ עסקי לסטארטאפ טכנולוגי",
      description: "אנחנו סטארטאפ טכנולוגי בשלבים מוקדמים ומחפשים יועץ עסקי עם ניסיון בתחום הטכנולוגיה. מישהו יכול להמליץ על יועץ איכותי שמבין בפיתוח מוצר ובגיוס השקעות?",
      location: "הרצליה",
      date: "לפני 8 שעות",
      engagement: 12,
      facebookUrl: "https://facebook.com/groups/startup-israel/posts/101",
      relevanceScore: 65
    }
  ]);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const stats = [
    {
      title: "לידים חדשים השבוע",
      value: "24",
      change: "+18%",
      icon: TrendingUp,
      color: "from-green-200 to-green-300 text-green-800"
    },
    {
      title: "ציון רלוונטיות ממוצע",
      value: "81%",
      change: "+5%",
      icon: Target,
      color: "from-blue-200 to-blue-300 text-blue-800"
    },
    {
      title: "אינטראקציות ממוצעות",
      value: "14.5",
      change: "+12%",
      icon: Users,
      color: "from-purple-200 to-purple-300 text-purple-800"
    },
    {
      title: "שיעור הצלחה",
      value: "73%",
      change: "+8%",
      icon: BarChart3,
      color: "from-yellow-200 to-yellow-300 text-yellow-800"
    }
  ];

  const handleRefresh = () => {
    // Simulate refreshing leads
    console.log('Refreshing leads...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <ClayCard variant="elevated" className="text-center">
            <h1 className="text-3xl font-bold text-slate-700 mb-2">
              שלום {userData?.name || 'משתמש'}! 👋
            </h1>
            <p className="text-lg text-slate-600">
              הנה הלידים החדשים שמצאנו עבור {userData?.businessName || 'העסק שלך'}
            </p>
          </ClayCard>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <ClayCard key={index} className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
              <p className="text-xs text-green-600 font-medium">{stat.change} מהשבוע שעבר</p>
            </ClayCard>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-700">לידים חדשים</h2>
          <div className="flex space-x-4">
            <ClayButton variant="secondary" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 ml-2" />
              רענן
            </ClayButton>
            <ClayButton variant="accent" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              סנן
            </ClayButton>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {leads.map((lead) => (
            <LeadCard key={lead.id} {...lead} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <ClayButton variant="primary" size="lg">
            טען עוד לידים
          </ClayButton>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
