import { useState } from 'react'
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

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="bg-base-200 h-[100%]">

    <Routes>
        <Route path="/" element={<Login />} />
{/* <Login/> */}
{/* <Signup/> */}
{/* <ResetPass/> */}
{/* <Dashboard/> */}
</Routes>

</div> 

)
}

export default App
