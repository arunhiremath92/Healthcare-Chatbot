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
    tab:{
        flexGrow: 1,
    }
}));

export default function MedicineView(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div 
      className={classes.tab}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
    <div className={classes.root}>
      <Paper elevation={0} />
      <Paper elevation={4} />
    </div>
    </div>
  );
}