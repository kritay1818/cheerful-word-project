
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import LeadCard from '@/components/LeadCard';
import ClayButton from '@/components/ClayButton';
import TelegramConnectionDialog from '@/components/TelegramConnectionDialog';
import { BarChart3, TrendingUp, RefreshCw, MessageCircle, ExternalLink, Mail, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ClassifiedPost {
  id: string;
  original_post_id: number | null;
  heat_score: number | null;
  created_at: string | null;
  action_type: string | null;
  intent: string | null;
  city: string | null;
  area: string | null;
  summary: string | null;
  tags: string[] | null;
  original_text: string | null;
  post_url: string | null;
  group_url: string | null;
  poster_profile: string | null;
}

const Dashboard = () => {
  const { user, session, loading } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [leads, setLeads] = useState<ClassifiedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && session?.user) {
      fetchUserProfile();
    } else if (!loading && !session) {
      setIsLoading(false);
    }
  }, [loading, session]);

  const fetchUserProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "שגיאה בטעינת הפרופיל",
          description: "לא הצלחנו לטעון את הפרופיל שלך",
          variant: "destructive",
        });
        return;
      }

      setUserData(profile);
      if (profile?.preferred_cities && profile.preferred_cities.length > 0) {
        fetchClassifiedPosts(profile.preferred_cities);
      } else {
        setLeads([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setIsLoading(false);
    }
  };

  const fetchClassifiedPosts = async (preferredCities: string[]) => {
    try {
      const { data: posts, error } = await supabase
        .from('classified_posts')
        .select('*')
        .in('city', preferredCities)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching classified posts:', error);
        toast({
          title: "שגיאה בטעינת הפוסטים",
          description: "לא הצלחנו לטעון את הפוסטים הרלוונטיים",
          variant: "destructive",
        });
        setLeads([]);
        return;
      }

      setLeads(posts || []);
    } catch (error) {
      console.error('Error fetching classified posts:', error);
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  };

  const transformLeadForCard = (post: ClassifiedPost) => {
    return {
      id: post.id,
      title: post.summary || post.original_text?.substring(0, 100) + '...' || 'פוסט ללא כותרת',
      description: post.original_text || post.summary || 'אין תיאור זמין',
      location: post.city || post.area || 'לא צוין',
      date: formatDate(post.created_at || new Date().toISOString()),
      engagement: post.heat_score || Math.floor(Math.random() * 30) + 5,
      facebookUrl: post.post_url || post.group_url || '#',
      posterProfile: post.poster_profile,
      // Additional classified post data
      actionType: post.action_type,
      intent: post.intent,
      tags: post.tags?.join(', ') || '',
      area: post.area
    };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'לפני פחות משעה';
    if (diffInHours < 24) return `לפני ${diffInHours} שעות`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'לפני יום';
    if (diffInDays < 7) return `לפני ${diffInDays} ימים`;
    
    return date.toLocaleDateString('he-IL');
  };

  const handleRefresh = () => {
    if (userData?.preferred_cities) {
      setIsLoading(true);
      fetchClassifiedPosts(userData.preferred_cities);
    }
  };

  const handlePostClick = async () => {
    // Optional: Add analytics or tracking here
    console.log('Post clicked');
  };

  const stats = [
    {
      title: "פוסטים רלוונטיים",
      value: leads.length.toString(),
      icon: TrendingUp,
      color: "from-green-200 to-green-300 text-green-800"
    },
    {
      title: "ערים בסינון",
      value: userData?.preferred_cities?.length?.toString() || '0',
      icon: BarChart3,
      color: "from-yellow-200 to-yellow-300 text-yellow-800"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <Navigation />
        <div className="max-w-7xl mx-auto p-6 pt-20">
          <div className="text-center">
            <p className="text-lg text-slate-600">טוען לידים...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <ClayCard variant="elevated" className="text-center">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-700 mb-2">
                  שלום {userData?.name || 'משתמש'}! 👋
                </h1>
                <p className="text-lg text-slate-600">
                  הנה הפוסטים הרלוונטיים שמצאנו עבור {userData?.profession || 'העסק שלך'} 
                  {userData?.preferred_cities && userData.preferred_cities.length > 0 && 
                    ` באזורים: ${userData.preferred_cities.join(', ')}`
                  }
                </p>
              </div>
              <div className="mr-4">
                <TelegramConnectionDialog userEmail={userData?.email} />
              </div>
            </div>
          </ClayCard>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <ClayCard key={index} className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600">{stat.title}</p>
            </ClayCard>
          ))}
        </div>

        {/* Filter Request Card */}
        <ClayCard className="mb-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)]">
            <Settings className="w-6 h-6 text-orange-700" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-3">רוצה לשנות את הסינון?</h3>
          <p className="text-slate-600 mb-4">
            כאן תוכל לבקש שינויים בקריטריונים לחיפוש הלידים שלך
          </p>
          <Link to="/filter-request">
            <ClayButton variant="primary">
              בקש שינוי סינון
            </ClayButton>
          </Link>
        </ClayCard>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-700">פוסטים רלוונטיים</h2>
          <div className="flex space-x-4">
            <ClayButton variant="secondary" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className="w-4 h-4 ml-2" />
              רענן
            </ClayButton>
          </div>
        </div>

        {/* Posts Grid */}
        {leads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {leads.map((post) => {
              const leadProps = transformLeadForCard(post);
              return (
                <div key={post.id} className="space-y-4">
                  <LeadCard {...leadProps} onPostClick={handlePostClick} />
                  {/* Additional classified post info */}
                  <ClayCard className="p-4 text-sm">
                    <div className="grid grid-cols-2 gap-2 text-slate-600">
                      {post.action_type && <div><span className="font-medium">סוג פעולה:</span> {post.action_type}</div>}
                      {post.intent && <div><span className="font-medium">כוונה:</span> {post.intent}</div>}
                      {post.heat_score && <div><span className="font-medium">ציון חום:</span> {post.heat_score}</div>}
                      {post.area && <div><span className="font-medium">אזור:</span> {post.area}</div>}
                      {post.tags && post.tags.length > 0 && (
                        <div className="col-span-2">
                          <span className="font-medium">תגים:</span> {post.tags.join(', ')}
                        </div>
                      )}
                    </div>
                  </ClayCard>
                </div>
              );
            })}
          </div>
        ) : (
          <ClayCard className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">אין פוסטים רלוונטיים</h3>
            <p className="text-slate-600 mb-4">
              {userData?.preferred_cities && userData.preferred_cities.length > 0 
                ? `לא מצאנו פוסטים רלוונטיים בערים: ${userData.preferred_cities.join(', ')}`
                : 'אנא הגדר ערים מועדפות בפרופיל שלך כדי לראות פוסטים רלוונטיים'
              }
            </p>
            <ClayButton variant="primary" onClick={handleRefresh}>
              בדוק שוב
            </ClayButton>
          </ClayCard>
        )}

        {/* Load More */}
        {leads.length > 0 && (
          <div className="text-center mb-8">
            <ClayButton variant="primary" size="lg">
              טען עוד פוסטים
            </ClayButton>
          </div>
        )}

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
            shaysho111@gmail.com
          </a>
        </ClayCard>
      </div>
    </div>
  );
};

export default Dashboard;
