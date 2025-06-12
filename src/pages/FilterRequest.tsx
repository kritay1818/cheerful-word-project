
import React from 'react';
import Navigation from '@/components/Navigation';
import PersonalArea from '@/components/PersonalArea';
import FilterRequestForm from '@/components/FilterRequestForm';
import { useEffect, useState } from 'react';

const FilterRequest = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showPersonalArea, setShowPersonalArea] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('currentClient');
    if (data) {
      const client = JSON.parse(data);
      setUserData(client);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Navigation 
        userSession={userData} 
        onPersonalAreaClick={() => setShowPersonalArea(true)} 
      />
      
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-700 mb-2 text-center">
            בקשה לשינוי סינון
          </h1>
          <p className="text-lg text-slate-600 text-center">
            כאן תוכל לבקש שינויים בקריטריונים לחיפוש הלידים שלך
          </p>
        </div>

        {/* Personal Area */}
        {showPersonalArea && (
          <PersonalArea 
            userSession={userData} 
            onClose={() => setShowPersonalArea(false)} 
          />
        )}

        {/* Filter Request Form */}
        <FilterRequestForm clientId={userData?.id} />
      </div>
    </div>
  );
};

export default FilterRequest;
