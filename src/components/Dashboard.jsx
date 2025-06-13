import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import ProfileContent from './Profile';
import OrdersContent from './Order';
import SettingsContent from './Settings';

function Dashboard() {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent userData={userData}/>;
      case 'orders':
        return <OrdersContent/>;
      case 'settings':
        return <SettingsContent/>;
      default:
        return <OrdersContent/>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab}/>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header userName={userData.name}/>
        
        <main className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="px-4 mx-auto sm:px-6 md:px-8">
              <div className="py-4">
                {renderContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;