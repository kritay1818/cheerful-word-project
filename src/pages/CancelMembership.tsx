
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { toast } from '@/hooks/use-toast';
import { X, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CancelMembership = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const getClientData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData.id) {
          setClientId(userData.id.toString());
        }
      } catch (error) {
        console.error('Error getting client data:', error);
      }
    };

    getClientData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא ספר לנו למה אתה רוצה לבטל",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('Feedback')
        .insert([
          {
            text: reason.trim(),
            Cancel: 'yes',
            Client_id: clientId
          }
        ]);

      if (error) {
        console.error('Error saving cancellation feedback:', error);
        throw error;
      }

      toast({
        title: "תודה על המשוב",
        description: "קיבלנו את הבקשה לביטול ונחזור אליך בהקדם",
      });
      
      // Redirect to dashboard after successful submission
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving cancellation feedback:', error);
      toast({
        title: "שגיאה בשמירה",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate('/filter-request');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-2xl mx-auto p-6 pt-20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-red-300 to-pink-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <X className="w-10 h-10 text-red-700" />
          </div>
          <h1 className="text-3xl font-bold text-slate-700 mb-4">ביטול מנוי</h1>
          <p className="text-lg text-slate-600">
            אנחנו מצטערים לשמוע שאתה רוצה לעזוב. נשמח לשמוע מה הסיבה כדי שנוכל להשתפר
          </p>
        </div>

        <ClayCard variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ClayInput
              label="למה אתה רוצה לבטל את המנוי?"
              placeholder="ספר לנו מה לא עבד בשבילך, מה היה חסר, או איך נוכל להשתפר..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              multiline
              rows={6}
              required
            />
            
            <div className="flex gap-4">
              <ClayButton 
                type="submit" 
                variant="primary" 
                className="flex-1 bg-gradient-to-br from-red-300 to-red-400 text-red-800 hover:from-red-400 hover:to-red-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'שולח בקשת ביטול...' : 'שלח בקשת ביטול'}
              </ClayButton>
              
              <ClayButton 
                type="button"
                variant="secondary" 
                onClick={handleGoBack}
                disabled={isSubmitting}
              >
                <ArrowRight className="w-4 h-4 ml-2" />
                חזור
              </ClayButton>
            </div>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
            <h3 className="font-semibold text-slate-700 mb-2">אולי נוכל לעזור?</h3>
            <p className="text-sm text-slate-600 mb-3">
              לפני שתבטל, אולי יש דרך לפתור את הבעיה? צור איתנו קשר:
            </p>
            <a 
              href="mailto:shaysho111@gmail.com" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              shaysho111@gmail.com
            </a>
          </div>
        </ClayCard>
      </div>
      
      <Footer />
    </div>
  );
};

export default CancelMembership;
