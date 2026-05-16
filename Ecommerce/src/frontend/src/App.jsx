import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/header';
import SignupPage from './pages/signup';
import Loginpage from './pages/login';
import HomePage from './pages/homepage';

const App = () => {
  return (
    <Router>
      {/* Header stays outside Routes so it shows on every page */}
      <Header />
      
      <main className="flex-1 overflow-y-auto bg-gray-50 flex items-center justify-center p-6">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;