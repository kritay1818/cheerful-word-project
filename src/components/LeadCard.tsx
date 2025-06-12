
import React from 'react';
import ClayCard from './ClayCard';
import ClayButton from './ClayButton';
import { Phone, Mail, MapPin, Calendar, Star, Trash2 } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  content: string;
  source: string;
  score: number;
  phone: string;
  email: string;
  location: string;
  timestamp: string;
  status: 'new' | 'contacted';
}

interface LeadCardProps {
  lead: Lead;
  onContact: () => void;
  onDelete: () => void;
}

const LeadCard = ({ lead, onContact, onDelete }: LeadCardProps) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ClayCard className="hover:shadow-[inset_0_2px_12px_rgba(255,255,255,0.8),inset_0_-2px_12px_rgba(0,0,0,0.05),0_16px_40px_rgba(0,0,0,0.25)] transform hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-700 mb-1">{lead.name}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{lead.source}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span className={`font-medium ${getScoreColor(lead.score)}`}>
                  {lead.score}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
              lead.status === 'new' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {lead.status === 'new' ? 'חדש' : 'נוצר קשר'}
            </span>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg">
          {lead.content}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-4 h-4" />
            <span>{lead.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4" />
            <span>{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>{lead.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(lead.timestamp)}</span>
          </div>
        </div>
        
        <div className="flex gap-3 pt-2">
          <ClayButton 
            variant="primary" 
            size="sm" 
            className="flex-1"
            onClick={onContact}
            disabled={lead.status === 'contacted'}
          >
            {lead.status === 'contacted' ? 'נוצר קשר' : 'צור קשר'}
          </ClayButton>
          <ClayButton 
            variant="secondary" 
            size="sm" 
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </ClayButton>
        </div>
      </div>
    </ClayCard>
  );
};

export default LeadCard;
