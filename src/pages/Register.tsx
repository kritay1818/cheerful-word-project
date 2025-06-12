import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Building, Target, Mail } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessType: '',
    targetArea: '',
    currentLeads: '',
    targetLeads: '',
    businessDescription: '',
    specificRequests: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get temporary signup data
    const tempSignupData = localStorage.getItem('tempSignupData');
    
    if (!tempSignupData) {
      // If no signup data, redirect to signup
      navigate('/signup');
      return;
    }

    // Pre-fill user data from signup
    const signupData = JSON.parse(tempSignupData);
    setFormData(prev => ({
      ...prev,
      name: signupData.name,
      email: signupData.email,
      password: signupData.password
    }));
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);
    
    try {
      console.log('Sending complete registration data:', formData);
      
      // Send complete data to N8N webhook including name, email, password
      const response = await fetch('https://n8n.srv778969.hstgr.cloud/webhook/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration request sent successfully');
        
        toast({
          title: "נרשמת בהצלחה!",
          description: "הבקשה נשלחה למערכת. תוכל להתחבר לאחר אישור החשבון",
        });

        // Clean up temporary data
        localStorage.removeItem('tempSignupData');
        
        // Navigate to login page
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        throw new Error(`Registration failed with status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      
      toast({
        title: "שגיאה ברישום",
        description: "לא הצלחנו לשלוח את הנתונים. אנא נסה שוב",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-4xl mx-auto p-6 pt-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <UserPlus className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-700 mb-4">השלמת פרטי העסק</h1>
          <p className="text-lg text-slate-600">מלא את הפרטים שלך ואנחנו נתחיל למצוא לידים מתאימים עבור העסק שלך</p>
        </div>

        <ClayCard variant="elevated" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Information (readonly) */}
            <div>
              <h3 className="text-xl font-semibold text-slate-700 mb-6">פרטי המשתמש</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ClayInput
                  label="שם מלא"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled
                />
                <ClayInput
                  label="דוא״ל"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
            </div>

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
                disabled={isLoading}
                onClick={() => handleSubmit()}
              >
                {isLoading ? 'שולח...' : 'השלם רישום'}
              </ClayButton>
            </div>
          </form>
        </ClayCard>

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
            href="mailto:itaykritmaler@gmail.com" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <Mail className="w-4 h-4 ml-2" />
            itaykritmaler@gmail.com
          </a>
        </ClayCard>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
