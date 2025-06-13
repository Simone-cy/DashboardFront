import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Header({ userName }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Ciao {userName || 'Utente'}!
            </h1>
          </div>
          <div className="flex items-center">
            {/* Icona notifiche */}
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative">
              <span className="sr-only">Visualizza notifiche</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              {/* Badge notifiche */}
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
            
            {/* Menu utente */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                  <span className="text-sm font-medium">{userName || 'Utente'}</span>
                </button>
              </div>
              
              {/* Dropdown menu */}
              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Il mio profilo
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Impostazioni
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;