
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { UserPlus, LogIn } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast({
        title: "שגיאה",
        description: "יש לאשר את תנאי השימוש כדי להמשיך",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "שגיאה",
        description: "הסיסמאות אינן תואמות",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "שגיאה",
        description: "הסיסמה חייבת להכיל לפחות 6 תווים",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Store signup data temporarily for the registration process
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        emailUpdates: emailUpdates,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('tempSignupData', JSON.stringify(signupData));
      
      toast({
        title: "נרשמת בהצלחה!",
        description: "עכשיו נשלים את פרטי העסק שלך",
      });

      // Navigate to registration to complete business details
      setTimeout(() => {
        navigate('/register');
      }, 1000);
      
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "שגיאה ברישום",
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <UserPlus className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-3xl font-bold text-slate-700 mb-2">הרשמה</h1>
          <p className="text-slate-600">צור חשבון חדש במערכת LeadFinder</p>
        </div>

        <ClayCard variant="elevated" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ClayInput
              label="שם מלא"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="השם המלא שלך"
            />
            
            <ClayInput
              label="דוא״ל"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
            />
            
            <ClayInput
              label="סיסמה"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="לפחות 6 תווים"
            />
            
            <ClayInput
              label="אישור סיסמה"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="הזן שוב את הסיסמה"
            />

            <div className="flex items-start space-x-3 space-x-reverse">
              <Checkbox
                id="emailUpdates"
                checked={emailUpdates}
                onCheckedChange={(checked) => setEmailUpdates(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="emailUpdates" className="text-sm text-slate-600 leading-relaxed">
                אני מעוניין/ת לקבל עדכונים במייל על לידים חדשים ועדכונים במערכת
              </label>
            </div>

            <div className="flex items-start space-x-3 space-x-reverse">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                אני מסכים/ה ל
                <Link 
                  to="/terms-of-service" 
                  target="_blank"
                  className="text-purple-600 hover:text-purple-800 font-medium underline mx-1"
                >
                  תנאי השימוש
                </Link>
                של השירות
              </label>
            </div>

            <ClayButton 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full"
              disabled={!acceptedTerms}
            >
              הירשם
            </ClayButton>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              כבר יש לך חשבון?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                התחבר כאן
              </Link>
            </p>
          </div>
        </ClayCard>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
