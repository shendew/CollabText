import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './screens/auth/login.jsx'
import Register from './screens/auth/register.jsx'
import Landing from './screens/landing.jsx'
import { useContext } from 'react'
import { AuthContext } from './context/authcontext.jsx'
import Dashboard from './screens/dashboard.jsx'
import AddDoc from './screens/AddDoc/AddDoc.jsx'
import Document from './screens/Document/Document.jsx'
// import Login from './screens/auth/login'
// import Register from './screens/auth/register'
function App() {
  const { user } = useContext(AuthContext);


  return (
    <BrowserRouter>
      {user ? <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/adddoc' element={<AddDoc />} />
        <Route path='/doc/:id' element={<Document />} />
      </Routes> : (
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
