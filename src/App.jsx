// import React from 'react'
// import Header from './components/header'
// import Hero from './components/Hero'
// import WhyAutoQuiz from './components/WhyAutoQuiz'
// import Templates from './components/Templates'
// import Result from './components/Result'
// import Footer from './components/Footer'

// function App() {
//   return (
//     <div>
//       <Header />
//       <Hero />
//       <WhyAutoQuiz />
//       <Templates />
//       <Result />
//       <Footer />
//     </div>
//   )
// }

// export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom'

// import Hero from './components/Hero'
// import WhyAutoQuiz from './components/WhyAutoQuiz'
// import Templates from './components/Templates'
// import Result from './components/Result'
import Footer from './components/Footer'

// sahifa komponentlari
import HomePage from './modules/dashboard/HomePage.jsx'
import CreateTestPage from './modules/tests/CreateTestPage.jsx'
import TemplatesPage from './modules/tests/TemplatesPage.jsx'
import MyTestsPage from './modules/history/MyTestsPage.jsx'
import Header from './components/header'
import Login from './modules/auth/Login.jsx'
import Register from './modules/auth/Register.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
