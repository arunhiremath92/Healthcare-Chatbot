import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function AppointmentView(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div 
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
  >
  <div className={classes.root}>
    <Paper elevation={0} />
    <Paper />
    <Paper elevation={3} />
  </div>
  </div>

  );
}