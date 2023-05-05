import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './Components/NavBar'
import Login from './Pages/Login'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
<NavBar/>
<Login/>
</> 

)
}

export default App
