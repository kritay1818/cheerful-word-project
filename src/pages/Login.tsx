
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
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
      // For demo purposes, we'll simulate login
      // In a real app, this would connect to your authentication service
      
      // Check if user exists in localStorage (simple demo)
      const userData = localStorage.getItem('userData');
      const userCredentials = localStorage.getItem(`user_${formData.email}`);
      
      if (userCredentials) {
        const credentials = JSON.parse(userCredentials);
        if (credentials.password === formData.password) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', formData.email);
          
          toast({
            title: "התחברת בהצלחה!",
            description: "ברוך הבא למערכת LeadFinder",
          });
          
          // Check if user has completed registration
          if (userData) {
            navigate('/dashboard');
          } else {
            navigate('/register');
          }
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "שגיאה בהתחברות",
        description: "אימייל או סיסמה שגויים",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-md mx-auto p-6 pt-20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-300 to-blue-300 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.15)]">
            <LogIn className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-3xl font-bold text-slate-700 mb-2">התחברות</h1>
          <p className="text-slate-600">התחבר לחשבון שלך במערכת LeadFinder</p>
        </div>

        <ClayCard variant="elevated">
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
              אין לך חשבון?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium">
                הירשם כאן
              </Link>
            </p>
          </div>
        </ClayCard>
      </div>
    </div>
  );
};

export default Login;
