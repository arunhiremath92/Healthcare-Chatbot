import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './Dashboard';
import TopNavigationBar from './TopNavigationBar';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import MedicalPrescription from './MedicalPrescription';
import ProvidersView from './ProvidersView';

function App() {
  return (

    <React.Fragment>
      <TopNavigationBar></TopNavigationBar>
      <Dashboard></Dashboard>
    

    </React.Fragment>
  );
}


export default App;
