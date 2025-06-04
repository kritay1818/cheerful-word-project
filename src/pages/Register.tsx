
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Building, Target } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    targetArea: '',
    currentLeads: '',
    targetLeads: '',
    businessDescription: '',
    specificRequests: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Check if user already completed registration
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate('/dashboard');
      return;
    }

    // Pre-fill user data from signup
    if (currentUser) {
      const userCredentials = localStorage.getItem(`user_${currentUser}`);
      if (userCredentials) {
        const credentials = JSON.parse(userCredentials);
        setFormData(prev => ({
          ...prev,
          name: credentials.name,
          email: credentials.email
        }));
      }
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send data to N8N webhook
      const response = await fetch('https://n8n.srv778969.hstgr.cloud/webhook-test/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "נרשמת בהצלחה!",
          description: "המערכת תתחיל לחפש לידים רלוונטיים עבורך",
        });

        // Store user data in localStorage - this marks registration as complete
        localStorage.setItem('userData', JSON.stringify(formData));
        
        // Navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "שגיאה ברישום",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 pt-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <UserPlus className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-700 mb-4">השלמת פרטי העסק</h1>
          <p className="text-lg text-slate-600">מלא את הפרטים שלך ואנחנו נתחיל למצוא לידים מתאימים עבור העסק שלך</p>
        </div>

        <ClayCard variant="elevated">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <div>
              <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-600" />
                <span>פרטי העסק</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ClayInput
                  label="סוג העסק"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  placeholder="למשל: עורך דין, רואה חשבון, קוסמטיקאית"
                />
                <ClayInput
                  label="אזור הפעילות"
                  name="targetArea"
                  value={formData.targetArea}
                  onChange={handleChange}
                  required
                  placeholder="באיזה אזור אתה מחפש לקוחות"
                />
              </div>
              
              <div className="mt-6">
                <ClayInput
                  label="תיאור העסק (אופציונלי)"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="ספר על העסק שלך, השירותים שאתה נותן, והיתרונות שלך"
                />
              </div>

              <div className="mt-6">
                <ClayInput
                  label="בקשות ספציפיות ללידים (אופציונלי)"
                  name="specificRequests"
                  value={formData.specificRequests}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="האם יש לך בקשות מיוחדות או קריטריונים ספציפיים ללידים?"
                />
              </div>
            </div>

            {/* Target Information */}
            <div>
              <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>יעדים ולקוחות</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ClayInput
                  label="כמה לידים אתה מקבל היום בחודש"
                  name="currentLeads"
                  type="number"
                  value={formData.currentLeads}
                  onChange={handleChange}
                  required
                  placeholder="מספר הלידים הנוכחי"
                />
                <ClayInput
                  label="כמה לידים אתה רוצה לקבל בחודש"
                  name="targetLeads"
                  type="number"
                  value={formData.targetLeads}
                  onChange={handleChange}
                  required
                  placeholder="יעד הלידים החודשי"
                />
              </div>
            </div>

            <div className="pt-6">
              <ClayButton 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full text-xl"
              >
                התחל למצוא לידים
              </ClayButton>
            </div>
          </form>
        </ClayCard>
      </div>
    </div>
  );
};

export default Register;
