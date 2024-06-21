import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from '@/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './Pages/Dashboard';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import ForgotPassword from './Auth/Forgot';


const AuthRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/"  />;
};


const App: React.FC = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<AuthRoute element={<Dashboard />} isAuthenticated={user !== null} />} />
      </Routes>
    </Router>
  );
};

export default App;
