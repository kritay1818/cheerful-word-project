import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ClayCard from '@/components/ClayCard';
import ClayInput from '@/components/ClayInput';
import ClayButton from '@/components/ClayButton';
import { toast } from '@/hooks/use-toast';
import { LogIn, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Attempting login with:', { 
      email: formData.email, 
      emailLength: formData.email.length,
      password: '***',
      passwordLength: formData.password.length 
    });
    
    try {
      // First, let's check what emails exist in the database
      const { data: allClients, error: allClientsError } = await supabase
        .from('Clients')
        .select('id, email, name, active');
      
      console.log('All clients in database:', allClients);
      
      // Now check for email match only
      const { data: emailMatches, error: emailError } = await supabase
        .from('Clients')
        .select('*')
        .eq('email', formData.email.trim());
      
      console.log('Email matches:', emailMatches);
      
      // Finally, check for both email and password
      const { data: clients, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('email', formData.email.trim())
        .eq('password', formData.password);

      console.log('Email + password matches:', { clients, error });

      if (error) {
        console.error('Database error:', error);
        throw new Error('שגיאה בחיבור למסד הנתונים');
      }

      if (!clients || clients.length === 0) {
        console.log('No matching client found');
        // Check if email exists but password is wrong
        if (emailMatches && emailMatches.length > 0) {
          console.log('Email exists but password mismatch');
          throw new Error('אימייל או סיסמה שגויים');
        } else {
          console.log('Email not found in database');
          throw new Error('אימייל או סיסמה שגויים');
        }
      }

      const client = clients[0];
      console.log('Found client:', { id: client.id, name: client.name, active: client.active });

      // Check if client is active - if not, redirect to trial expired page
      if (!client.active) {
        // Store client info even for inactive users so they can see their data
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('currentClient', JSON.stringify(client));
        
        console.log('Client is inactive, redirecting to trial expired page');
        
        toast({
          title: "תקופת הניסיון הסתיימה",
          description: "אנא בחר מנוי כדי להמשיך להשתמש בשירות",
          variant: "destructive",
        });
        
        // Navigate to trial expired page
        navigate('/trial-expired');
        return;
      }

      // Store client info in localStorage for session management
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentClient', JSON.stringify(client));
      
      console.log('Login successful, stored client data');
      
      toast({
        title: "התחברת בהצלחה!",
        description: `ברוך הבא ${client.name}`,
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "שגיאה בהתחברות",
        description: error instanceof Error ? error.message : "אימייל או סיסמה שגויים",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
            >
              {isLoading ? 'מתחבר...' : 'התחבר'}
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
