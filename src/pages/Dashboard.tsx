
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PersonalArea from '@/components/PersonalArea';
import ClayCard from '@/components/ClayCard';
import ClayButton from '@/components/ClayButton';
import LeadCard from '@/components/LeadCard';
import { toast } from '@/hooks/use-toast';
import { Plus, Search, Filter, BarChart3, Users, TrendingUp, Award } from 'lucide-react';

// Sample leads data
const sampleLeads = [
  {
    id: '1',
    name: 'מיכל כהן',
    content: 'מחפשת סוכן נדל״ן אמין באזור תל אביב למכירת דירה',
    source: 'קבוצת נדל״ן תל אביב',
    score: 95,
    phone: '050-1234567',
    email: 'michal.cohen@gmail.com',
    location: 'תל אביב',
    timestamp: '2024-01-15T10:30:00',
    status: 'new' as const
  },
  {
    id: '2',
    name: 'דוד לוי',
    content: 'צריך עזרה עם שיווק דיגיטלי לעסק חדש שפתחתי',
    source: 'קבוצת יזמים',
    score: 88,
    phone: '052-9876543',
    email: 'david.levy@business.co.il',
    location: 'ירושלים',
    timestamp: '2024-01-15T09:15:00',
    status: 'contacted' as const
  },
  {
    id: '3',
    name: 'שרה אברהם',
    content: 'מעוניינת בקורס עיצוב גרפי מקצועי',
    source: 'קבוצת לימודים',
    score: 82,
    phone: '053-5551234',
    email: 'sara.avraham@email.com',
    location: 'חיפה',
    timestamp: '2024-01-15T08:45:00',
    status: 'new' as const
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState<any>(null);
  const [leads, setLeads] = useState(sampleLeads);
  const [showPersonalArea, setShowPersonalArea] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      navigate('/login');
      return;
    }
    setUserSession(JSON.parse(session));
  }, [navigate]);

  const handleContactLead = (leadId: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: 'contacted' as const }
          : lead
      )
    );
    toast({
      title: "הליד עודכן",
      description: "סטטוס הליד שונה ל'נוצר קשר'",
    });
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
    toast({
      title: "הליד נמחק",
      description: "הליד הוסר מהרשימה בהצלחה",
    });
  };

  if (!userSession) {
    return null; // Loading state
  }

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(lead => lead.status === 'new').length,
    contacted: leads.filter(lead => lead.status === 'contacted').length,
    averageScore: Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex flex-col">
      <Navigation 
        userSession={userSession}
        onPersonalAreaClick={() => setShowPersonalArea(true)}
      />

      {showPersonalArea && (
        <PersonalArea 
          userSession={userSession}
          onClose={() => setShowPersonalArea(false)}
        />
      )}
      
      <div className="flex-1 max-w-7xl mx-auto p-6 pt-20">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-700 mb-2">
            שלום {userSession.name || userSession.email}! 👋
          </h1>
          <p className="text-slate-600">
            {userSession.businessName ? `${userSession.businessName} - ` : ''}
            הנה הסיכום שלך להיום
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ClayCard variant="elevated" className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
            <p className="text-sm text-slate-600 mb-1">סה״כ לידים</p>
            <p className="text-2xl font-bold text-slate-700">{stats.totalLeads}</p>
          </ClayCard>

          <ClayCard variant="elevated" className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
            <p className="text-sm text-slate-600 mb-1">לידים חדשים</p>
            <p className="text-2xl font-bold text-slate-700">{stats.newLeads}</p>
          </ClayCard>

          <ClayCard variant="elevated" className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-700" />
            </div>
            <p className="text-sm text-slate-600 mb-1">נוצר קשר</p>
            <p className="text-2xl font-bold text-slate-700">{stats.contacted}</p>
          </ClayCard>

          <ClayCard variant="elevated" className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-700" />
            </div>
            <p className="text-sm text-slate-600 mb-1">ציון ממוצע</p>
            <p className="text-2xl font-bold text-slate-700">{stats.averageScore}</p>
          </ClayCard>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <ClayButton asChild variant="primary" size="lg">
            <Link to="/filter-request" className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              בקשת חיפוש חדשה
            </Link>
          </ClayButton>
          <ClayButton variant="secondary" size="lg" className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            סנן לידים
          </ClayButton>
          <ClayButton variant="secondary" size="lg" className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            חפש ליד
          </ClayButton>
        </div>

        {/* Leads Section */}
        <ClayCard variant="elevated">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-700">הלידים שלך</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>מעודכן לאחרונה: היום {new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          
          {leads.length > 0 ? (
            <div className="space-y-4">
              {leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onContact={() => handleContactLead(lead.id)}
                  onDelete={() => handleDeleteLead(lead.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-600 mb-2">אין לידים עדיין</h3>
              <p className="text-slate-500 mb-6">התחל בבקשת חיפוש ראשונה למציאת לקוחות פוטנציאליים</p>
              <ClayButton asChild variant="primary">
                <Link to="/filter-request">
                  צור בקשת חיפוש
                </Link>
              </ClayButton>
            </div>
          )}
        </ClayCard>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
