import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './Components/NavBar'
import Login from './Pages/Login'
import Signup from './Pages/SignUp'
import ResetPass from './Pages/ResetPass'
import Dashboard from './Pages/Dashboard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    
<NavBar/>
{/* <Login/> */}
{/* <Signup/> */}
{/* <ResetPass/> */}
<Dashboard/>
</> 

)
}

export default App
