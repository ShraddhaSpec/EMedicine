import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthRole, userType } from '../types/usertype';
import { Navigate, useNavigate } from 'react-router-dom';

// interface AuthContextType {
//   user: AuthRole; // Use the AuthUser type here
//   login: (loginData: any) => void;
//   logout: () => void;
//   setUser: React.Dispatch<React.SetStateAction<AuthRole>>; // Type for setUser function
// }

interface AuthContextType {
 user: { role: string } | null;
  login: (role: string) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<AuthRole>>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthRole>(null);



  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const role = localStorage.getItem('role');
    
  //   if (token && role) {
  //     setUser({ role });
  //   }
    
  //    // Set loading to false after checking localStorage
  // }, []); 
  
  const login = (role: string) => { 
    console.log("loginData =>",role)
    setUser({ role: role });  
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