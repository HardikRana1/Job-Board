import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutUs from './components/Aboutus';
import ContactUs from './components/Contactus';
import FAQs from './components/FAQs';
import Terms from './components/Terms';
import Report from './components/Reports.js';
import Privacy from './components/Privacy.js';


const App = () => {
  return (
    <Router>
    
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/report" element={<Report />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
