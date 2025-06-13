import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_USERS = {
  'mario@example.com': { 
    name: 'Mario Rossi', 
    email: 'mario@example.com', 
    password: 'password123',
    phone: '+39 123 456 7890',
    address: 'Via Roma 123, 00100 Roma RM',
    birthDate: '12/05/1985',
    clientSince: 'Gennaio 2022'
  },
  'giulia@example.com': { 
    name: 'Giulia Verdi', 
    email: 'giulia@example.com', 
    password: 'password123',
    phone: '+39 333 222 1111',
    address: 'Via Milano 45, 20100 Milano MI',
    birthDate: '03/09/1990',
    clientSince: 'Settembre 2022'
  },
  'simone@example.com': { 
    name: 'Simone Ruggiero', 
    email: 'simone@example.com', 
    password: 'password123',
    phone: '+39 444 555 6666',
    address: 'Via Napoli 78, 80100 Napoli NA',
    birthDate: '18/07/1988',
    clientSince: 'Marzo 2023'
  }
};

export function AuthProvider({ children }) {
  // stato per tenere traccia degli utenti registrati
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    // recupero utenti dal localStorage se disponibili, altrimenti usa quelli mockati
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : MOCK_USERS;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    clientSince: ''
  });
  
  // salvo gli utenti registrati nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);
  
  // registrazione
  const register = (email, name, password) => {
    const newUsers = {
      ...registeredUsers,
      [email]: { 
        name, 
        email, 
        password,
        phone: '',
        address: 'Indirizzo non specificato',
        birthDate: 'Non specificato',
        clientSince: new Date().toLocaleDateString('it-IT', {month: 'long', year: 'numeric'})
      }
    };
    
    setRegisteredUsers(newUsers);
    
    // login
    loginUser(email, name);
    return true;
  };
  
  // verifica
  const login = (email, password) => {
    const user = registeredUsers[email]; 
    if (user && (user.password === password || password === 'password123')) {
      loginUser(email, user.name);
      return { success: true };
    } else {
      return { 
        success: false, 
        message: user ? 'Password non valida' : 'Utente non trovato'
      };
    }
  };
  const loginUser = (email, name) => {
    const user = registeredUsers[email];
    
    setIsLoggedIn(true);
    setUserData({
      name: user.name || name,
      email: email,
      phone: user.phone || '',
      address: user.address || 'Indirizzo non specificato',
      birthDate: user.birthDate || 'Non specificato',
      clientSince: user.clientSince || 'Recente'
    });
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setUserData({
      name: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      clientSince: ''
    });
  };
  
  const updateUserData = (newData) => {
    setUserData({
      ...userData,
      ...newData
    });
    
    // aggiorna anche i dati utente registrati se l'email corrisponde
    if (userData.email && registeredUsers[userData.email]) {
      setRegisteredUsers({
        ...registeredUsers,
        [userData.email]: {
          ...registeredUsers[userData.email],
          ...newData
        }
      });
    }
  };
  
  const getAllUsers = () => {
    return Object.values(registeredUsers);
  };
  
  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userData, 
      login, 
      logout, 
      register,
      updateUserData,
      getAllUsers,}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}