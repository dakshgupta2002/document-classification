import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import useAuthListener from './hooks/use-auth-listener';

import UserContext from './context/user';
import { useState, useContext, useEffect } from "react";
import FirebaseContext from "./context/firebase";
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {

  const { firebase } = useContext(FirebaseContext)

  const user = useAuthListener();

  return (
    <UserContext.Provider value={user}  >
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
