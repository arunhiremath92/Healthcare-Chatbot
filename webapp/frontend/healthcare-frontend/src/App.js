import * as React from 'react';
import Dashboard from './Dashboard';
import TopNavigationBar from './TopNavigationBar';
import { Routes, Route, } from "react-router-dom";
import MedicalPrescription from './MedicalPrescription';
import ProvidersView from './ProvidersView';

function App() {
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
      </Routes>
    </React.Fragment>
  );
}


export default App;
