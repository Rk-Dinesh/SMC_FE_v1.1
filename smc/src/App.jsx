import React from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard';
import ReferralDashboard from './pages/Refer & Earn/ReferralDashboard';
import Notifications from './pages/Notifications/Notifications';
import EarningTable from './pages/Refer & Earn/EarningTable';
import Courses from './pages/courses/Courses';
import Certificate from './pages/certificate/Certificates';
import Terms_Conditions from './pages/terms & conditions/Terms_Conditions';
import EarningView from './pages/Refer & Earn/EarningView';
import MyLinks from './pages/Refer & Earn/MyLinks';
import BankDetails from './pages/Refer & Earn/BankDetails';
import PayOutDetails from './pages/Refer & Earn/PayOutDetails';
import ReferralTerms from './pages/Refer & Earn/ReferralTerms';
import ViewGroup from "./pages/study groups/ViewGroup";
import GenerateCourse from "./pages/courses/GenerateCourse";
import ListTopics from "./pages/courses/ListTopics";
import Content from "./pages/courses/Content";
import StudyGroups from "./pages/study groups/StudyGroups";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import PhoneOtp from "./pages/auth/PhoneOtp";
import EmailOtp from "./pages/auth/EmailOtp";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/content" element={<Content/>} />
          <Route path="" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/phone_otp" element={<PhoneOtp />} />
          <Route path="/email_otp" element={<EmailOtp />} />
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generate_courses" element={<GenerateCourse />} />
            <Route path="/topics" element={<ListTopics />} />
            <Route path="/study_group" element={<StudyGroups />} />
            <Route path="/view_group" element={<ViewGroup />} />
            <Route path="/refer_dashboard" element={<ReferralDashboard />} />
            <Route path="/view_earning" element={<EarningView />} />
            <Route path="/my_links" element={<MyLinks />} />
            <Route path="/bank_details" element={<BankDetails />} />
            <Route path="/payout_details" element={<PayOutDetails />} />
            <Route path="/referral_terms" element={<ReferralTerms />} />
            <Route path="/my_courses" element={<Courses />} />
            <Route path="/my_certificates" element={<Certificate />} />
            <Route path="/terms_conditions" element={<Terms_Conditions />} />
          <Route path="/my_earnings" element={<EarningTable/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
