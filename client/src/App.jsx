import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './screens/auth/login'
import Register from './screens/auth/register'
import Landing from './screens/landing'
// import Login from './screens/auth/login'
// import Register from './screens/auth/register'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
