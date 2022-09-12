import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Components/homepage/Home';
import Navigationbar from './Components/Navbar-Footer/Navigationbar';
import Login from './Components/Login-Enroll/Login';
import Enrollnow from './Components/Login-Enroll/Enrollnow';
import Footer from './Components/Navbar-Footer/Footer';
import FOF from './Components/FourZeroFour/FOF';
import About from './Components/Aboutpage/About';
import Contact from './Components/Contactpage/Contact';
import Courses from './Components/Our-My-Courses/Courses';
import Auth from './Components/Login-Enroll/Auth';
import Layout from './Components/Layout'


import Userprofile from './Components/userprofile/Userprofile';
import Invoice from './Components/userprofile/Invoice';
import PrintInvoice from './Components/userprofile/PrintInvoice';
import Changeprofileimage from './Components/userprofile/Changeprofileimage';
import Changepassword from './Components/userprofile/Changepassword';
import Mycourses from './Components/Our-My-Courses/Mycourses';

import AffiliateDashboard from './Components/Affiliatepanel/AffiliateDashboard';
import Kyc from './Components/Affiliatepanel/KYC/Kyc'
import Affiliates from './Components/Affiliatepanel/Affiliates/Affiliates'
import Offer from './Components/Affiliatepanel/Offer/Offer';
import Smartcommunity from './Components/Affiliatepanel/SmartCommunity/SmartCommunity'
import Orientationstats from './Components/Affiliatepanel/Orientation Stats/Orientationstats'
import MarketingTools from './Components/Affiliatepanel/MarketingTools/MarketingTools';
import Training from './Components/Affiliatepanel/Training/Training';
import Webinar from './Components/Affiliatepanel/Webinar/Webinar';
import Leaderboard from './Components/Affiliatepanel/Leaderboard/Leaderboard';

import Fp from './Components/forgotpass/Fp';
import Fp2 from './Components/forgotpass/Fp2';
import Coursepage from './Components/Coursepage/Coursepage';
import ScrollToTop from './ScrollToTop';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Privacy_policy from './Components/Terms&Conditions/Privacy_policy';

function App() {


  return (
    <div>
      <>
        <Navigationbar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route element={<Auth />}>
              {/* authenticate users */}
              <Route path='/userprofile' element={<Userprofile />} />
            </Route>
            <Route path='home' element={<Home />} />
            <Route path='enrollnow' element={<Enrollnow />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='courses' element={<Courses />} />

            <Route path='/userinvoice' element={<Invoice />} />
            <Route path='/printinvoice/:invoice_id' element={<PrintInvoice />} />
            <Route path='/changeprofilepic' element={<Changeprofileimage />} />
            <Route path='/changepassword' element={<Changepassword />} />
            <Route path='/mycourses' element={<Mycourses />} />
            <Route path='/affiliate-dashboard' element={<AffiliateDashboard />} />
            <Route path='/affiliate-kyc' element={<Kyc />} />
            <Route path='/affiliate-affiliates' element={<Affiliates />} />
            <Route path='/affiliate-offer' element={<Offer />} />
            <Route path='/affiliate-orientation' element={<Orientationstats />} />
            <Route path='/affiliate-smartcommunity' element={<Smartcommunity />} />
            <Route path='/affiliate-marketing' element={<MarketingTools />} />
            <Route path='/affiliate-training' element={<Training />} />
            <Route path='/affiliate-webinar' element={<Webinar />} />
            <Route path='/affiliate-leaderboard' element={<Leaderboard />} />
            <Route path='/coursepage/:courseid' element={<Coursepage />} />

            <Route path='/forgotpassword' element={<Fp />} />
            <Route path='/newpassword' element={<Fp2 />} />
            <Route path='/privacy-policy' element={<Privacy_policy />} />
            <Route path='*' element={<FOF />} />
          </Route>
        </Routes>
        <Footer />

      </>
    </div>
  );
}

export default App;
