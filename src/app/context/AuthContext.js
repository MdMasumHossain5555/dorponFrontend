"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useLogoutUserMutation } from '@/redux/services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({token, children }) => {
  const [user, setUser] = useState(token ? { loggedIn: true } : null);
  const [logoutMutation] = useLogoutUserMutation();

  const login = (userData) => {
    setUser({ loggedIn: true });
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
