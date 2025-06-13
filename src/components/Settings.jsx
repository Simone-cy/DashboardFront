import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function SettingsContent() {
  const { userData } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    marketing: true
  });
  const [saved, setSaved] = useState(false);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
    setSaved(false);
  };

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setPrivacy({
      ...privacy,
      [name]: checked
    });
    setSaved(false);
  };

  const handleSave = () => {
    // in un'app reale qui salveremmo le impostazioni su un server
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900">Impostazioni account</h3>
      
      <div className="mt-6 border-t border-gray-200">
        <div className="divide-y divide-gray-200">
          <div className="py-6">
            <h4 className="text-sm font-medium text-gray-900">Notifiche</h4>
            <p className="mt-1 text-sm text-gray-500">Gestisci come desideri ricevere gli aggiornamenti.</p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email-notifications"
                    name="email"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={notifications.email}
                    onChange={handleNotificationChange}/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email-notifications" className="font-medium text-gray-700">Notifiche via email</label>
                  <p className="text-gray-500">Ricevi aggiornamenti sui tuoi ordini via email.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="sms-notifications"
                    name="sms"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={notifications.sms}
                    onChange={handleNotificationChange}/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sms-notifications" className="font-medium text-gray-700">Notifiche SMS</label>
                  <p className="text-gray-500">Ricevi aggiornamenti sui tuoi ordini via SMS.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="push-notifications"
                    name="push"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={notifications.push}
                    onChange={handleNotificationChange}/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="push-notifications" className="font-medium text-gray-700">Notifiche push</label>
                  <p className="text-gray-500">Ricevi notifiche push sul tuo dispositivo.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-6">
            <h4 className="text-sm font-medium text-gray-900">Privacy</h4>
            <p className="mt-1 text-sm text-gray-500">Gestisci come utilizziamo i tuoi dati.</p>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="data-sharing"
                    name="dataSharing"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={privacy.dataSharing}
                    onChange={handlePrivacyChange}/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="data-sharing" className="font-medium text-gray-700">Condivisione dati</label>
                  <p className="text-gray-500">Consenti la condivisione dei dati anonimi per migliorare i nostri servizi.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketing"
                    name="marketing"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={privacy.marketing}
                    onChange={handlePrivacyChange}/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="marketing" className="font-medium text-gray-700">Comunicazioni marketing</label>
                  <p className="text-gray-500">Ricevi offerte speciali e aggiornamenti sui nostri prodotti.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        {saved && (
          <div className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600">
            Impostazioni salvate!
          </div>
        )}
        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Salva impostazioni
        </button>
      </div>
    </div>
  );
}

export default SettingsContent;