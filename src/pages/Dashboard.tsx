
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
  clicked: boolean | null;
  created_at: string;
  Group_Posts: Post;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [successRate, setSuccessRate] = useState<string>('0%');
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

  const calculateSuccessRate = async (clientId: number, useCache: boolean = false) => {
    try {
      console.log('Calculating success rate for client:', clientId, 'useCache:', useCache);
      
      // Add a cache-busting parameter to force fresh data
      const query = supabase
        .from('Client_post_match')
        .select('clicked')
        .eq('client_id', clientId)
        .eq('is_relevant', true);

      // If not using cache, add a timestamp to force fresh data
      if (!useCache) {
        // Force a fresh query by adding a small delay
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const { data: allMatches, error } = await query;

      if (error) {
        console.error('Error fetching success rate data:', error);
        return '0%';
      }

      console.log('All relevant matches for success rate:', allMatches);

      if (allMatches && allMatches.length > 0) {
        const clickedCount = allMatches.filter(match => match.clicked === true).length;
        const totalCount = allMatches.length;
        const rate = Math.round((clickedCount / totalCount) * 100);
        console.log(`Success rate calculation: ${clickedCount}/${totalCount} = ${rate}%`);
        return `${rate}%`;
      }

      return '0%';
    } catch (error) {
      console.error('Error calculating success rate:', error);
      return '0%';
    }
  };

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

      // Calculate and set success rate
      const rate = await calculateSuccessRate(clientId, true);
      setSuccessRate(rate);
      console.log('Final success rate set:', rate);
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

  const handlePostClick = async () => {
    console.log('Post clicked, refreshing success rate...');
    // Refresh the success rate when a post is clicked
    if (userData?.id) {
      // Force fresh data by not using cache
      const rate = await calculateSuccessRate(userData.id, false);
      setSuccessRate(rate);
      console.log('Success rate updated to:', rate);
    }
  };

  const stats = [
    {
      title: "לידים חדשים השבוע",
      value: leads.length.toString(),
      icon: TrendingUp,
      color: "from-green-200 to-green-300 text-green-800"
    },
    {
      title: "שיעור הצלחה",
      value: successRate,
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
                  הנה הלידים החדשים שמצאנו עבור {userData?.Profession || 'העסק שלך'}
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
              <LeadCard key={lead.id} {...lead} onPostClick={handlePostClick} />
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
          <div className="text-center mb-8">
            <ClayButton variant="primary" size="lg">
              טען עוד לידים
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
