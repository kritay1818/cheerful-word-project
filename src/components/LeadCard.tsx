
import React from 'react';
import ClayCard from './ClayCard';
import ClayButton from './ClayButton';
import { ExternalLink, MapPin, Calendar, Users, User } from 'lucide-react';

interface LeadCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
  engagement: number;
  facebookUrl: string;
  posterProfile?: string | null;
}

const LeadCard = ({ title, description, location, date, engagement, facebookUrl, posterProfile }: LeadCardProps) => {
  return (
    <ClayCard className="hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.8),inset_0_-2px_12px_rgba(0,0,0,0.05),0_16px_40px_rgba(0,0,0,0.25)] transform hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-slate-700 leading-tight">{title}</h3>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{engagement} אינטראקציות</span>
          </div>
          {posterProfile && (
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <a 
                href={posterProfile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                פרופיל הכותב
              </a>
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
            <ClayButton 
              variant="primary" 
              size="sm" 
              className="w-full flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>צפה בפוסט</span>
            </ClayButton>
          </a>
        </div>
      </div>
    </ClayCard>
  );
};

export default LeadCard;
