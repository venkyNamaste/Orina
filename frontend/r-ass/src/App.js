import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginSignupPage from "./pages/LoginSignupPage";
import Dashboard from "./pages/Dashboard";
import CandidateManagement from "./pages/CandidateManagement";
import TaskManagement from "./pages/TaskManagement";
import BreakTracker from "./pages/Breaktracker";
import Notepad from "./pages/Nodepad";
import JobAnalyser from "./pages/JdAnalyser";
import Layout from "./Layout/layout";
import './index.css';
import Settings from "./pages/Settings";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivacyPolicy from "./pages/Privacy-policy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";

const AppContent = () => {
  const location = useLocation();
  


  // Routes that should not use Layout
  const noLayoutRoutes = ["/", "/auth", "/forget-password", "/reset-password", "/privacy-policy", "/termsAndConditions", "/contact"];

  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<LoginSignupPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions/>} />
          <Route path="/contact" element={<ContactUs/>} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/candidate-management" element={<CandidateManagement />} />
            <Route path="/task-management" element={<TaskManagement />} />
            {/* <Route path="/break-tracker" element={<BreakTracker />} /> */}
            <Route path="/notebook" element={<Notepad />} />
            <Route path="/jobanalyser" element={<JobAnalyser />} />
            <Route path="/settings" element={<Settings />} />
           
          </Routes>
        </Layout>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
