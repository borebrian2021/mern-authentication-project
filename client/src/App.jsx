import React, { Component, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './Components/NavBar'
import Login from './Pages/Login'
import Signup from './Pages/SignUp'
import ResetPass from './Pages/ResetPass'
import Dashboard from './Pages/Champions'
import Home from './Pages/home'
import './App.css'
import jwt from 'jwt-decode';
import { useNavigate } from "react-router-dom";


function App() {
  // const [dashboardAuth, setDashboardAuth] = useState(false)
  const [adminCheck, setAdminCheck] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false)
  const token = localStorage.getItem('token')
  const navigate =useNavigate();


  //UPDATE NAVBAR MENU BASED ON CURRENT USER LOGGED IN

  const updateLoginCheck=(value)=>{
    setLoginCheck(value)
  }

  const logOut=(value)=>{
    setLoginCheck(false);
    localStorage.removeItem('token'); 
    sessionStorage.removeItem('token'); 
    navigate('/') 
    
  }
 
 
  const updateStatus = (value) => {
    setAdminCheck = value;
  }

  return (
    <div className="bg-base-200 h-[100%]">
      <NavBar adminCheck={adminCheck} updateStatus={updateStatus} loginCheck={loginCheck} logOut={logOut} />
      <Routes>
        <Route path="/" element={<Login updateLoginCheck={updateLoginCheck}/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ResetPass" element={<ResetPass />} />
        <Route path="/Dashboard" element={<Dashboard updateLoginCheck={updateLoginCheck} /> } />
        <Route path="/Home" element={token? <Home updateLoginCheck={updateLoginCheck} />:<Login/>}/>
        {/* <Login/> */}
        {/* <Signup/> */}
        {/* <ResetPass/> */}
        {/* <Dashboard/> */}
      </Routes>

    </div>

  )
}

export default App
