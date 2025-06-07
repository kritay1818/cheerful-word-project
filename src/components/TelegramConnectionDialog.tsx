
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ClayButton from '@/components/ClayButton';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface TelegramConnectionDialogProps {
  userEmail?: string;
}

const TelegramConnectionDialog = ({ userEmail }: TelegramConnectionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
          <MessageCircle className="w-4 h-4 ml-2" />
          חיבור לטלגרם
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            קבל לידים בטלגרם
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            כדי לקבל את הלידים גם בטלגרם, שלח הודעה לבוט שלנו עם האימייל שלך
          </p>
          
          <div className="bg-slate-50 p-3 rounded-lg border">
            <p className="text-xs text-slate-600 mb-2">שלח הודעה עם האימייל שלך:</p>
            <code className="bg-white px-2 py-1 rounded text-sm font-mono border">
              {userEmail || 'האימייל שלך'}
            </code>
          </div>

          <a 
            href="https://t.me/lead_magnet_facebook_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <ClayButton variant="primary" className="w-full">
              <ExternalLink className="w-4 h-4 ml-2" />
              פתח בוט טלגרם
            </ClayButton>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramConnectionDialog;
