import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './assets/components/Home'
import Admin from './assets/components/Admin'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-bomb6291' element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
