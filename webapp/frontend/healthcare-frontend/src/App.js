import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboard from './Dashboard';
import NavigationBar  from './NavigationBar';

function App() {
  return (
    <React.Fragment>
    <CssBaseline />
    <Container>
      <NavigationBar>

      </NavigationBar>
      <Dashboard>  
      </Dashboard>
    </Container>
  </React.Fragment> 
  );
}

export default App;
