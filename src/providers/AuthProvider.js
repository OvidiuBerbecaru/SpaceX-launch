import React, { createContext, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext({
  isLoggedIn: false,
  onSignIn: () => {},
  onSignOut: () => {}
});

const AuthProvider = (props) => {
  const [cookies, setCookies, removeCookies] = useCookies(['tokenCookie']);
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.tokenCookie !== undefined);

  const onLogin = (token) => {
    setCookies('tokenCookie', token);
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    removeCookies('tokenCookie');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogin, onLogout }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
