import * as React from 'react';
import Dashboard from './Dashboard';
import TopNavigationBar from './TopNavigationBar';
import { Routes, Route, } from "react-router-dom";
import MedicalPrescription from './MedicalPrescription';
import ProvidersView from './ProvidersView';

import PatientSignup from './PatientSignup';
import ZohoSalesIQ from './ZohoSalesIQ';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DoctorSignup from './DoctorSignup';
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
      </Routes>
      <ZohoSalesIQ></ZohoSalesIQ>
    </React.Fragment>
  );
}


export default App;
