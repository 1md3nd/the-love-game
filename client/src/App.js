import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/login';
import Signup from './auth/signup';
import Dashboard from './components/dashboard';
import Notes from './components/notes/notes';

const PrivateRoute = ({ children}) => {
  // Check if the user is authenticated (token exists in local storage)
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path='/notes' element={<Notes/>} ></Route>
      </Routes>
    </Router>
  );
};

export default App;
