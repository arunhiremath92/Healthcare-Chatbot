import * as React from 'react';
import { Routes, Route, } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
// pages
import PatientSignup from './pages/Signup/PatientSignup';
import DoctorSignup from './pages/Signup/DoctorSignup';
import Dashboard from './pages/Dashboard/Dashboard';
import UserDashboard from './pages/Dashboard/UserDashboard';
import MedicalPrescription from './pages/MedicalPrescription/MedicalPrescription';
import ProvidersView from './pages/ProviderView/ProvidersView';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
// components
import TopNavigationBar from './components/Navigation/TopNavigationBar';
import StickyFooter from './components/Navigation/StickyFooter';
import ZohoSalesIQ from './components/Chatbot/ZohoSalesIQ';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 20
  },
  textbox: {
    margin: 10,
    marginTop: 40,
  }
});

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TopNavigationBar></TopNavigationBar>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prescription-refill" element={<MedicalPrescription />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/provider-search" element={<ProvidersView />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/signup" element={<PatientSignup />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/doctor-signup" element={<DoctorSignup />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/contact" element={<Contact />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/about" element={<About />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        
      </Routes>
      <ZohoSalesIQ></ZohoSalesIQ>
      <StickyFooter></StickyFooter>
    </React.Fragment>
  );
}


export default App;
