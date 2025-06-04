
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import LeadCard from '@/components/LeadCard';
import ClayButton from '@/components/ClayButton';
import { BarChart3, TrendingUp, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: number;
  text: string | null;
  url: string | null;
  group_url: string | null;
  poster_profile: string | null;
  category: string | null;
  created_at: string | null;
  scanned_at: string;
}

interface ClientPostMatch {
  id: number;
  client_id: number | null;
  post_id: number | null;
  is_relevant: boolean | null;
  created_at: string;
  Group_Posts: Post;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('currentClient');
    if (data) {
      const client = JSON.parse(data);
      setUserData(client);
      fetchUserLeads(client.id);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserLeads = async (clientId: number) => {
    try {
      console.log('Fetching leads for client ID:', clientId);
      
      const { data: matches, error } = await supabase
        .from('Client_post_match')
        .select(`
          *,
          Group_Posts (
            id,
            text,
            url,
            group_url,
            poster_profile,
            category,
            created_at,
            scanned_at
          )
        `)
        .eq('client_id', clientId)
        .eq('is_relevant', true)
        .order('created_at', { ascending: false });

      console.log('Client post matches:', { matches, error });

      if (error) {
        console.error('Error fetching leads:', error);
        toast({
          title: "שגיאה בטעינת הלידים",
          description: "לא הצלחנו לטעון את הלידים שלך",
          variant: "destructive",
        });
        return;
      }

      if (matches && matches.length > 0) {
        // Transform the data to match LeadCard props
        const transformedLeads = matches.map((match: ClientPostMatch) => {
          const post = match.Group_Posts;
          return {
            id: post.id,
            title: post.text?.substring(0, 100) + '...' || 'פוסט ללא כותרת',
            description: post.text || 'אין תיאור זמין',
            location: post.category || 'לא צוין',
            date: formatDate(post.scanned_at), // Always use scanned_at
            engagement: Math.floor(Math.random() * 30) + 5, // Mock engagement for now
            facebookUrl: post.url || post.group_url || '#',
            posterProfile: post.poster_profile
          };
        });
        
        setLeads(transformedLeads);
        console.log('Transformed leads:', transformedLeads);
      } else {
        console.log('No relevant posts found for this client');
        setLeads([]);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בטעינת הנתונים",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    if (userData?.id) {
      setIsLoading(true);
      fetchUserLeads(userData.id);
    }
  };

  const stats = [
    {
      title: "לידים חדשים השבוע",
      value: leads.length.toString(),
      change: "+18%",
      icon: TrendingUp,
      color: "from-green-200 to-green-300 text-green-800"
    },
    {
      title: "שיעור הצלחה",
      value: "73%",
      change: "+8%",
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
            <h1 className="text-3xl font-bold text-slate-700 mb-2">
              שלום {userData?.name || 'משתמש'}! 👋
            </h1>
            <p className="text-lg text-slate-600">
              הנה הלידים החדשים שמצאנו עבור {userData?.Profession || 'העסק שלך'}
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
            <ClayButton variant="secondary" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className="w-4 h-4 ml-2" />
              רענן
            </ClayButton>
          </div>
        </div>

        {/* Leads Grid */}
        {leads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {leads.map((lead) => (
              <LeadCard key={lead.id} {...lead} />
            ))}
          </div>
        ) : (
          <ClayCard className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">אין לידים חדשים</h3>
            <p className="text-slate-600 mb-4">לא מצאנו לידים רלוונטיים עבורך בזמן האחרון</p>
            <ClayButton variant="primary" onClick={handleRefresh}>
              בדוק שוב
            </ClayButton>
          </ClayCard>
        )}

        {/* Load More */}
        {leads.length > 0 && (
          <div className="text-center">
            <ClayButton variant="primary" size="lg">
              טען עוד לידים
            </ClayButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
