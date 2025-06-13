import React from 'react';
import { UserIcon, ShoppingBagIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'profile', name: 'Profilo', icon: UserIcon },
    { id: 'orders', name: 'Ordini', icon: ShoppingBagIcon },
    { id: 'settings', name: 'Impostazioni', icon: Cog6ToothIcon }
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-white text-xl font-bold">MyDashboard</span>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}>
                  <Icon
                    className="mr-3 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"/>
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;