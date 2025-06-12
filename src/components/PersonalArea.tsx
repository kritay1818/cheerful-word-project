
import React from 'react';
import ClayCard from './ClayCard';
import ClayButton from './ClayButton';
import { User, X } from 'lucide-react';

interface PersonalAreaProps {
  userSession: {
    name?: string;
    email?: string;
    businessName?: string;
  } | null;
  onClose: () => void;
}

const PersonalArea = ({ userSession, onClose }: PersonalAreaProps) => {
  if (!userSession) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ClayCard className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-300 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)] ml-4">
              <User className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-700">אזור אישי</h3>
              <p className="text-sm text-slate-600">פרטי החשבון שלך</p>
            </div>
          </div>
          <ClayButton variant="secondary" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </ClayButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
            <p className="text-sm font-medium text-slate-600 mb-1">שם מלא</p>
            <p className="text-lg font-semibold text-slate-800">{userSession.name || 'לא צוין'}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
            <p className="text-sm font-medium text-slate-600 mb-1">דוא״ל</p>
            <p className="text-lg font-semibold text-slate-800">{userSession.email || 'לא צוין'}</p>
          </div>
          
          {userSession.businessName && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 md:col-span-2">
              <p className="text-sm font-medium text-slate-600 mb-1">שם העסק</p>
              <p className="text-lg font-semibold text-slate-800">{userSession.businessName}</p>
            </div>
          )}
        </div>
      </ClayCard>
    </div>
  );
};

export default PersonalArea;
