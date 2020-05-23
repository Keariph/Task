import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import FaceIcon from '@material-ui/icons/Face';
import ReceiptIcon from '@material-ui/icons/Receipt'
import NavigationItem from '../NavigationItem';
import useStyles from './styles';
import routes from '../../utility/routes';

function NavigationBar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <NavigationItem
            icon={<FaceIcon />}
            text="Клиенты"
            path={routes.users.path}
          />
          <NavigationItem
            icon={<ReceiptIcon />}
            text="Транзакции"
            path={routes.transactions.path}
          />
        </List>
      </div>
    </Drawer>
  );
}

export default NavigationBar;
