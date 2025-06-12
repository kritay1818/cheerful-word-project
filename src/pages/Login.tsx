
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { toast } from '@/hooks/use-toast';
import { LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simple login simulation - in real app, this would validate against database
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        localStorage.setItem('userSession', JSON.stringify({
          email: formData.email,
          loginTime: new Date().toISOString()
        }));
        
        toast({
          title: "התחברת בהצלחה!",
          description: "ברוך הבא למערכת",
        });

        navigate('/dashboard');
      } else {
        toast({
          title: "שגיאה בהתחברות",
          description: "מייל או סיסמה שגויים",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "שגיאה בהתחברות",
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <LogIn className="w-10 h-10 text-blue-700" />
          </div>
          <h1 className="text-3xl font-bold text-slate-700 mb-2">התחברות</h1>
          <p className="text-slate-600">התחבר לחשבון שלך במערכת LeadFinder</p>
        </div>

        <ClayCard variant="elevated" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="הסיסמה שלך"
            />

            <ClayButton 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full"
            >
              התחבר
            </ClayButton>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              עדיין אין לך חשבון?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium">
                הירשם כאן
              </Link>
            </p>
          </div>
        </ClayCard>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
