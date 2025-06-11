
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { toast } from '@/hooks/use-toast';
import { Clock, CreditCard, MessageSquare, Sparkles } from 'lucide-react';

const TrialExpired = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const handlePayment = () => {
    // Navigate to signup page where payment is handled
    navigate('/signup');
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא כתוב את המשוב שלך",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingFeedback(true);
    
    try {
      // Send feedback to the webhook
      const response = await fetch('https://n8n.srv778969.hstgr.cloud/webhook/ac7fc0cd-5975-402b-9c3c-0f6d38383ee4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'feedback',
          message: feedback,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "תודה על המשוב!",
          description: "המשוב שלך נשלח בהצלחה",
        });
        setFeedback('');
      } else {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      toast({
        title: "שגיאה בשליחה",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 pt-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-orange-300 to-red-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <Clock className="w-10 h-10 text-orange-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-700 mb-4">תקופת הניסיון הסתיימה</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            תקופת הניסיון החינמית שלך הסתיימה. כדי להמשיך ליהנות מהשירות שלנו, אנא בחר באחד מהמנויים שלנו
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Payment Section */}
          <ClayCard variant="elevated">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-purple-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">המשך עם מנוי חודשי</h2>
              <div className="mb-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">₪97</div>
                <div className="text-slate-600">לחודש</div>
              </div>
              <ul className="text-right space-y-3 mb-8 text-slate-600">
                <li className="flex items-center">
                  <span>✓</span>
                  <span className="mr-2">גישה בלתי מוגבלת לכל הלידים</span>
                </li>
                <li className="flex items-center">
                  <span>✓</span>
                  <span className="mr-2">סינון חכם לפי דרישות</span>
                </li>
                <li className="flex items-center">
                  <span>✓</span>
                  <span className="mr-2">התראות בזמן אמת</span>
                </li>
                <li className="flex items-center">
                  <span>✓</span>
                  <span className="mr-2">תמיכה מלאה</span>
                </li>
              </ul>
              <ClayButton 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={handlePayment}
              >
                מעבר לתשלום
              </ClayButton>
            </div>
          </ClayCard>

          {/* Development Updates Section */}
          <ClayCard variant="elevated">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-green-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-700 mb-4">אנחנו עובדים בשבילך</h2>
              <p className="text-slate-600 mb-6 text-right">
                אנחנו ממשיכים לפתח ולשפר את המערכת שלנו כדי להביא לך את החוויה הטובה ביותר. 
                בקרוב תוכל ליהנות מפיצ'רים חדשים ומשופרים שיעזרו לך למצוא לידים באיכות גבוהה יותר.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-slate-700 mb-2">פיצ'רים חדשים בפיתוח:</h3>
                <ul className="text-sm text-slate-600 space-y-1 text-right">
                  <li>• אלגוריתם חכם יותר לזיהוי לידים רלוונטיים</li>
                  <li>• ממשק משתמש משופר ויותר אינטואיטיבי</li>
                  <li>• דוחות מתקדמים וניתוח נתונים</li>
                  <li>• אינטגרציות עם כלים נוספים</li>
                </ul>
              </div>
            </div>
          </ClayCard>
        </div>

        {/* Feedback Section */}
        <ClayCard variant="default" className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">המשוב שלך חשוב לנו</h2>
            <p className="text-slate-600">
              ספר לנו מה דעתך על השירות ומה היית רוצה לראות בגרסאות הבאות
            </p>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <ClayInput
              label="המשוב שלך"
              placeholder="ספר לנו מה דעתך על השירות, מה אהבת, מה פחות, ומה היית רוצה לראות בעתיד..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              multiline
              rows={5}
              required
            />
            
            <ClayButton 
              type="submit" 
              variant="secondary" 
              size="lg" 
              className="w-full"
              disabled={isSubmittingFeedback}
            >
              {isSubmittingFeedback ? 'שולח...' : 'שלח משוב'}
            </ClayButton>
          </form>
        </ClayCard>
      </div>
    </div>
  );
};

export default TrialExpired;
