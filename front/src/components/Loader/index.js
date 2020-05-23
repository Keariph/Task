import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';

function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <CircularProgress />
    </div>
  );
}

export default Loader;
