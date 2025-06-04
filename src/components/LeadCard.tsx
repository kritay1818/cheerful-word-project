
import React from 'react';
import ClayCard from './ClayCard';
import ClayButton from './ClayButton';
import { ExternalLink, MapPin, Calendar, Users } from 'lucide-react';

interface LeadCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
  engagement: number;
  facebookUrl: string;
  relevanceScore: number;
}

const LeadCard = ({ title, description, location, date, engagement, facebookUrl, relevanceScore }: LeadCardProps) => {
  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'from-green-200 to-green-300 text-green-800';
    if (score >= 60) return 'from-yellow-200 to-yellow-300 text-yellow-800';
    return 'from-orange-200 to-orange-300 text-orange-800';
  };

  return (
    <ClayCard className="hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.8),inset_0_-2px_12px_rgba(0,0,0,0.05),0_16px_40px_rgba(0,0,0,0.25)] transform hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-slate-700 leading-tight">{title}</h3>
          <div className={`px-3 py-1 rounded-xl text-xs font-medium bg-gradient-to-r ${getRelevanceColor(relevanceScore)} shadow-[inset_0_1px_4px_rgba(255,255,255,0.5)]`}>
            {relevanceScore}% רלוונטי
          </div>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-slate-500">
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
