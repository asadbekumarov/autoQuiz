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
import HomePage from './pages/HomePage'
import CreateTestPage from './pages/CreateTestPage'
import TemplatesPage from './pages/TemplatesPage'
import MyTestsPage from './pages/MyTestsPage'
import Header from './components/header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTestPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/my-tests" element={<MyTestsPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
