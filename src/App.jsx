import { useState } from 'react'
import { Button } from "@/components/ui/button"
import './index.css'
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginPage />
    </>
  )
}

export default App
