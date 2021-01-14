import React, { useEffect } from 'react';
import Main from './components/Main/Main'
import { CircularProgress } from '@material-ui/core'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './providers/AuthProvider';
import { environment } from './environments/environment';
import './App.scss';

const App = () => {
  const { onLogin, isLoggedIn } = useAuth();
  
  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(environment.MOCK_JWT), 2500);  
    });

    promise.then(res => {
      onLogin(res)
    })
  }, [isLoggedIn])

  return (
    <div className="app">
      <ToastContainer />
      {
        isLoggedIn 
          ? <Main />
          : <div className="login-screen">
              <p>Waiting to Login...</p>
              <CircularProgress />
            </div>
      }
    </div>
  );
}

export default App;
