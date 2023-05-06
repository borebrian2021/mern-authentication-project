import React, { Component, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './Components/NavBar'
import Login from './Pages/Login'
import Signup from './Pages/SignUp'
import ResetPass from './Pages/ResetPass'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/home'
import './App.css'
import jwt from 'jwt-decode';


function App() {
  const [count, setCount] = useState(0)
  const [adminCheck, setAdminCheck] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false)
  //UPDATE NAVBAR MENU BASED ON CURRENT USER LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem('token')
    // const history = useHistory()
    console.log(token)

    if (token) {
      const user = jwt(token)
      if (!user) {

        localStorage.removeItem('token')
        navigate('/')
      }
      else {
        // if (user.role == 2) {
         
        //   () => {
    
        //     setAdminCheck(true)
        //   }
        // }
        // else {
        //   () => {
        //     setAdminCheck(false)
        //   }
        // }
        setAdminCheck(true);
      }
    }

  }, [])


  const updateStatus = (value) => {
    setAdminCheck = value;
  }

  return (
    <div className="bg-base-200 h-[100%]">
      <NavBar adminCheck={adminCheck} updateStatus={updateStatus} loginCheck={loginCheck} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ResetPass" element={<ResetPass />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Home" element={<Home />} />
        {/* <Login/> */}
        {/* <Signup/> */}
        {/* <ResetPass/> */}
        {/* <Dashboard/> */}
      </Routes>

    </div>

  )
}

export default App
