import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/header'
import HomePage from './modules/dashboard/HomePage.jsx'
import CreateTestPage from './modules/tests/CreateTestPage.jsx'
import TemplatesPage from './modules/tests/TemplatesPage.jsx'
import MyTestsPage from './modules/history/MyTestsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AboutPage from './pages/AboutPage.jsx'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTestPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/my-tests" element={<MyTestsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
