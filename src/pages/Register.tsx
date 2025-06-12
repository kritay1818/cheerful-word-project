
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { toast } from '@/hooks/use-toast';
import { Building, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessType: '',
    targetAudience: '',
    goals: ''
  });

  useEffect(() => {
    // Check if user came from signup process
    const tempSignupData = localStorage.getItem('tempSignupData');
    if (!tempSignupData) {
      // Redirect to signup if no temp data
      navigate('/signup');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBusinessData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tempSignupData = localStorage.getItem('tempSignupData');
      if (!tempSignupData) {
        throw new Error('No signup data found');
      }

      const signupData = JSON.parse(tempSignupData);
      
      // Combine signup and business data
      const completeUserData = {
        ...signupData,
        ...businessData,
        registrationCompleted: true,
        registrationDate: new Date().toISOString()
      };

      // Store complete user data (in real app, this would save to database)
      localStorage.setItem('userData', JSON.stringify(completeUserData));
      localStorage.removeItem('tempSignupData'); // Clean up temp data
      
      // Create user session
      localStorage.setItem('userSession', JSON.stringify({
        email: signupData.email,
        name: signupData.name,
        businessName: businessData.businessName,
        loginTime: new Date().toISOString()
      }));

      toast({
        title: "רישום הושלם בהצלחה!",
        description: "ברוך הבא למערכת LeadFinder",
      });

      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "שגיאה בהשלמת הרישום",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-md mx-auto p-6 pt-20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-green-300 to-blue-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <Building className="w-10 h-10 text-green-700" />
          </div>
          <h1 className="text-3xl font-bold text-slate-700 mb-2">פרטי העסק</h1>
          <p className="text-slate-600">בואו נכיר את העסק שלך כדי להתאים את המערכת</p>
        </div>

        <ClayCard variant="elevated" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ClayInput
              label="שם העסק"
              name="businessName"
              value={businessData.businessName}
              onChange={handleChange}
              required
              placeholder="שם החברה או העסק שלך"
            />
            
            <ClayInput
              label="תחום העסק"
              name="businessType"
              value={businessData.businessType}
              onChange={handleChange}
              required
              placeholder="למשל: נדל״ן, שיווק דיגיטלי, עיצוב"
            />
            
            <ClayInput
              label="קהל היעד"
              name="targetAudience"
              value={businessData.targetAudience}
              onChange={handleChange}
              required
              placeholder="למשל: זוגות צעירים, בעלי עסקים, סטודנטים"
            />
            
            <div className="space-y-2">
              <label htmlFor="goals" className="block text-sm font-medium text-slate-700">
                מטרות העסק
              </label>
              <textarea
                id="goals"
                name="goals"
                value={businessData.goals}
                onChange={handleChange}
                required
                placeholder="מה המטרות העיקריות שלך במציאת לידים חדשים?"
                className="w-full min-h-[100px] px-4 py-3 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            <ClayButton 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full"
            >
              השלם רישום <ArrowRight className="w-5 h-5 mr-2" />
            </ClayButton>
          </form>
        </ClayCard>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
