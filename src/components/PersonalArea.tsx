
import React from 'react';
import ClayCard from './ClayCard';
import { User, Settings } from 'lucide-react';

interface PersonalAreaProps {
  userData: {
    name?: string;
    email?: string;
    Profession?: string;
  } | null;
}

const PersonalArea = ({ userData }: PersonalAreaProps) => {
  if (!userData) return null;

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>
    </ClayCard>
  );
};

export default PersonalArea;
