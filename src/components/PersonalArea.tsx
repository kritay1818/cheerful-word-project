
import React from 'react';
import ClayCard from './ClayCard';
import ClayButton from './ClayButton';
import { User, Settings, Crown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PersonalAreaProps {
  userData: {
    name?: string;
    email?: string;
    Profession?: string;
    Paid?: boolean;
  } | null;
}

const PersonalArea = ({ userData }: PersonalAreaProps) => {
  const navigate = useNavigate();

  if (!userData) return null;

  const subscriptionType = userData.Paid ? 'בתשלום' : 'חינמי';
  const isPaidUser = userData.Paid;

  const handleCancelMembership = () => {
    navigate('/cancel-membership');
  };

  return (
    <ClayCard className="mb-8">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-300 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)] ml-4">
          <User className="w-6 h-6 text-purple-700" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-700">אזור אישי</h3>
          <p className="text-sm text-slate-600">פרטי החשבון שלך</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <p className="text-sm font-medium text-slate-600 mb-1">שם מלא</p>
          <p className="text-lg font-semibold text-slate-800">{userData.name || 'לא צוין'}</p>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <p className="text-sm font-medium text-slate-600 mb-1">דוא״ל</p>
          <p className="text-lg font-semibold text-slate-800">{userData.email || 'לא צוין'}</p>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <p className="text-sm font-medium text-slate-600 mb-1">מקצוע</p>
          <p className="text-lg font-semibold text-slate-800">{userData.Profession || 'לא צוין'}</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <p className="text-sm font-medium text-slate-600 mb-1">סוג מנוי</p>
          <div className="flex items-center gap-2">
            {isPaidUser && <Crown className="w-4 h-4 text-yellow-600" />}
            <p className={`text-lg font-semibold ${isPaidUser ? 'text-yellow-700' : 'text-slate-800'}`}>
              {subscriptionType}
            </p>
          </div>
        </div>
      </div>

      {!isPaidUser && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-orange-800 mb-1">שדרג למנוי בתשלום</h4>
              <p className="text-sm text-orange-700">קבל גישה למאגר לידים מורחב ותכונות נוספות</p>
            </div>
            <a 
              href="https://pay.grow.link/6f15a778cd2a672f4a8b385d6ddb5b7a-MjE0Nzg0OQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ClayButton variant="primary">
                שדרג עכשיו
              </ClayButton>
            </a>
          </div>
        </div>
      )}

      {isPaidUser && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-red-800 mb-1">בטל מנוי</h4>
              <p className="text-sm text-red-700">רוצה לבטל את המנוי שלך? נשמח לשמוע למה</p>
            </div>
            <ClayButton 
              variant="secondary" 
              onClick={handleCancelMembership}
              className="bg-gradient-to-br from-red-200 to-red-300 text-red-800 hover:from-red-300 hover:to-red-400"
            >
              <X className="w-4 h-4 ml-2" />
              בטל מנוי
            </ClayButton>
          </div>
        </div>
      )}
    </ClayCard>
  );
};

export default PersonalArea;
