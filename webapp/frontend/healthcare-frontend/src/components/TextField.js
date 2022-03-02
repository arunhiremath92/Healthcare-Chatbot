import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import LocalizationProvider from './LocalizationProvider'

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <br/>
      <div>
        <TextField
          required
          id="name"
          label="Enter Your Name:"
          variant="filled"
        />
        {/* <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        /> */}
        {/* <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        /> */}
        {/* <TextField
          id="filled-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        /> */}
        {/* <TextField
          id="filled-number"
          label="email"
          type="email"
          defaultValue="yourEmail@email.com"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        /> */}
        <TextField
          id="email"
          label="Enter Your Email:"
          type="email"
          variant="filled"
        />
        <TextField
          id="phone"
          label="Enter Your Phone Number:"
          type="number"
          variant="filled"
        />
        
        <br/>
        <br/>
        <br/>
          <div style={{textAlign:'center'}}>
                <TextField
                    style={{width:700}}
                id="filled-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
                variant="filled"
                />
         </div>   
      </div>
        <div style={{textAlign:'center'}}>
            <Button variant="contained"  >Submit</Button>
        </div>

    </Box>
  );
}
