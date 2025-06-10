import React, { useState } from 'react';
import ClayCard from './ClayCard';
import ClayInput from './ClayInput';
import ClayButton from './ClayButton';
import { Settings, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FilterRequestFormProps {
  clientId?: number;
}

const FilterRequestForm = ({ clientId }: FilterRequestFormProps) => {
  const [filterRequest, setFilterRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!filterRequest.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא כתוב את בקשת השינוי",
        variant: "destructive",
      });
      return;
    }

    if (!clientId) {
      toast({
        title: "שגיאה",
        description: "לא נמצא מזהה לקוח",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const requestData = {
        client_id: clientId,
        filter_request: filterRequest.trim(),
        timestamp: new Date().toISOString(),
        email: 'itaykritmaler@gmail.com'
      };

      console.log('Sending filter change request:', requestData);

      const response = await fetch('https://n8n.srv778969.hstgr.cloud/webhook/ac7fc0cd-5975-402b-9c3c-0f6d38383ee4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast({
          title: "בקשה נשלחה בהצלחה!",
          description: "בקשת שינוי הסינון נשלחה",
        });
        setFilterRequest('');
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending filter request:', error);
      toast({
        title: "שגיאה בשליחה",
        description: "לא הצלחנו לשלוח את הבקשה. אנא נסה שוב",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ClayCard className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)] ml-4">
          <Settings className="w-6 h-6 text-orange-700" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-700">בקשה לשינוי סינון</h3>
          <p className="text-sm text-slate-600">רוצה לשנות את הקריטריונים לחיפוש לידים?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ClayInput
          label="תאר את השינוי הרצוי בסינון הפוסטים"
          name="filterRequest"
          value={filterRequest}
          onChange={(e) => setFilterRequest(e.target.value)}
          multiline
          rows={4}
          placeholder="למשל: אני רוצה לקבל רק פוסטים מאזור תל אביב, או פוסטים בנושא של דירות להשכרה..."
          required
        />
        
        <div className="flex justify-end">
          <ClayButton 
            type="submit" 
            variant="primary" 
            disabled={isLoading}
            className="flex items-center"
          >
            <Send className="w-4 h-4 ml-2" />
            {isLoading ? 'שולח...' : 'שלח בקשה'}
          </ClayButton>
        </div>
      </form>
    </ClayCard>
  );
};

export default FilterRequestForm;
