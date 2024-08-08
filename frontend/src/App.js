import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutUs from './components/Aboutus';
import ContactUs from './components/Contactus';
import FAQs from './components/FAQs';
import Terms from './components/Terms';
import Report from './components/Reports';
import Privacy from './components/Privacy';
import ProfilePage from './components/ProfilePage';
import ApplicationPage from './components/ApplicationPage';
import NavigationPage from './components/NavigationPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const userType = localStorage.getItem('userType'); // Retrieve userType from localStorage

  // Helper Component to Redirect Based on UserType
  const ProtectedRoute = ({ children, allowedUserTypes }) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    console.log(userType);
    if (!token) {
      return <Navigate to="/login" />;
    }

    if (allowedUserTypes && !allowedUserTypes.includes(userType)) {
      return <Navigate to="/" />;
    }

    return children;
  };

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

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/navigation"
            element={
              <ProtectedRoute allowedUserTypes={['jobSeeker']}>
                <NavigationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job/:jobId"
            element={
              <ProtectedRoute allowedUserTypes={['jobSeeker']}>
                <ApplicationPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect if trying to access unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
