import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FullWidthTabs from './FullWidthTabs';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <FullWidthTabs></FullWidthTabs>
    </Paper>
  );
}
