import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/header';
import HomePage from './modules/dashboard/HomePage.jsx';
import CreateTestPage from './modules/tests/CreateTestPage.jsx';
import TemplatesPage from './modules/tests/TemplatesPage.jsx';
import MyTestsPage from './modules/history/MyTestsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Login from './modules/auth/Login.jsx';
import Register from './modules/auth/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import QuizPlayerPage from './pages/QuizPlayerPage.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateTestPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/my-tests" element={<MyTestsPage />} />
          <Route path="/quiz/:testId" element={<QuizPlayerPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
