import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthRole, userType } from '../types/usertype';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: AuthRole; // Use the AuthUser type here
  login: (loginData: any) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<AuthRole>>; // Type for setUser function
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthRole>(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const role = localStorage.getItem('role') || '';
      setUser({ role });
    }
  }, []);  
  
  const login = (role: string) => { 
    console.log("loginData =>",role) 
   
    // localStorage.setItem("username",loginData.data.email)
    // localStorage.setItem("token",loginData.token) 
    // localStorage.setItem("role",loginData.data.role) 
    setUser({ role });
    //navigate('/', { replace: true });  
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("username")
    localStorage.removeItem("token") 
    localStorage.removeItem("role") 
 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};