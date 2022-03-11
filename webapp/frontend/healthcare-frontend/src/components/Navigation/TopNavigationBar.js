import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopNavigationBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSignin = () => {
    setOpen(false);
    localStorage.setItem("user", "temp");
    localStorage.setItem("role", "user");
    //navigate('/user-dashboard')
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    // TODO: backend API
    const url = 'http://localhost:3000'
    var email_s = data.get('email');
    var password_s = data.get('password');
    //post data to backend server and check
    //use FormData() = data
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body:data,
    }).then((response)=>{
      response.json(()=>{
        console.log('response-json')
      }).then((response)=>{
        //Success
        navigate('/user-dashboard')

      }).catch((error)=>{
        //Fail
        console.error('error', error)
      })
    })





    // const msg = {
    //   email: data.get('email'),
    //   password: data.get('password'),
    // }
    
    // //post it
    // fetch(url,{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify(msg),
    // }).then(responsee => responsee.json()).then(
    //   msg =>{
    //     console.log('Success: ',msg)
    //     navigate('/user-dashboard')

    //   }
    // ).catch(error=>{
    //   console.log('Error:' ,error)
    // })

    
  };

  let navigate = useNavigate();
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Button color="inherit" onClick={() => { navigate('/dashboard')}}>Digital Healthcare</Button>
          </Typography>
          <Button color="inherit" onClick={() => { navigate('/doctor-signup') }}>Become a partner</Button>
          <Button color="inherit" onClick={() => { setOpen(!open) }}>Login</Button>
        </Toolbar>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '1px solid #000',
              pt: 2,
              px: 4,
              pb: 3,
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                onClick={handleSignin}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Modal>
      </AppBar>
    </div>
  );
}