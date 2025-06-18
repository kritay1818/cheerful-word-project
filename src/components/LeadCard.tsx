
import React from 'react';
import ClayCard from './ClayCard';
import ClayButton from './ClayButton';
import { ExternalLink, MapPin, Calendar, Users, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeadCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  engagement: number;
  facebookUrl: string;
  posterProfile?: string | null;
  onPostClick?: () => void;
}

const LeadCard = ({ id, title, description, location, date, engagement, facebookUrl, posterProfile, onPostClick }: LeadCardProps) => {
  const handlePostClick = async () => {
    try {
      // Get current client from localStorage
      const clientData = localStorage.getItem('currentClient');
      if (clientData) {
        const client = JSON.parse(clientData);
        
        console.log('Attempting to update click status for client:', client.id, 'post:', id);
        
        // First, let's check if the record exists before trying to update
        const { data: existingRecord, error: selectError } = await supabase
          .from('Client_post_match')
          .select('*')
          .eq('client_id', client.id)
          .eq('post_id', id);

        console.log('Existing record check:', { existingRecord, selectError });

        if (selectError) {
          console.error('Error checking existing record:', selectError);
          return;
        }

        if (!existingRecord || existingRecord.length === 0) {
          console.error('No matching record found in Client_post_match table for client:', client.id, 'post:', id);
          
          // Let's also check what records exist for this client
          const { data: allClientRecords, error: allRecordsError } = await supabase
            .from('Client_post_match')
            .select('*')
            .eq('client_id', client.id);
          
          console.log('All records for client:', client.id, allClientRecords);
          return;
        }

        console.log('Found existing record, proceeding with update...');
        
        // Update the clicked column in Client_post_match table
        const { data, error } = await supabase
          .from('Client_post_match')
          .update({ clicked: true })
          .eq('client_id', client.id)
          .eq('post_id', id)
          .select();

        if (error) {
          console.error('Error updating click status:', error);
        } else {
          console.log('Click tracked successfully, updated data:', data);
          
          // Wait a moment for the database to commit the change
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Call the callback to refresh stats immediately
          if (onPostClick) {
            onPostClick();
          }
        }
      } else {
        console.error('No client data found in localStorage');
      }
    } catch (error) {
      console.error('Error tracking click:', error);
    }
    
    // Use window.location for better mobile compatibility
    try {
      window.location.href = facebookUrl;
    } catch (error) {
      // Fallback to window.open if location.href fails
      window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
          <ClayButton 
            variant="primary" 
            size="sm" 
            className="w-full flex items-center justify-center space-x-2"
            onClick={handlePostClick}
          >
            <ExternalLink className="w-4 h-4" />
            <span>צפה בפוסט</span>
          </ClayButton>
        </div>
      </div>
    </ClayCard>
  );
};

export default LeadCard;
