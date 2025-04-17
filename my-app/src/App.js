import React from 'react'
import AnotherPages from './components/Another/AnotherPages'
import NavbarBanner from './components/Navbar/NavbarBanner'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<NavbarBanner />} />
        <Route path="/add-station" element={<AnotherPages />} />
      </Routes>
    </Router>
    </>
  
  )
}

export default App
