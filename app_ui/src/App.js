<<<<<<< HEAD
import UserContext from './context/user';
import { useState, useContext, useEffect } from "react";
import FirebaseContext from "./context/firebase";

function App() {
  const { firebase } = useContext(FirebaseContext)

  console.log(firebase)
  return (
    // <UserContext.Provider value={user}  >
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
    // </UserContext.Provider>
=======
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
>>>>>>> f3c920ad9b9b57fa3ad7f2bae507b262fba49396
  );
}

export default App;
