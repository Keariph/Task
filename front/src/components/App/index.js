import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Toolbar from '@material-ui/core/Toolbar';
import Header from '../Header';
import NavigationBar from '../NavigationBar';

import routesObject from '../../utility/routes';

import useStyles from './styles.js';

function App() {
  const classes = useStyles();
  const routes = Object.values(routesObject);
  const homeRoute = routes[0].path;

  return (
    <div className={classes.root}>
      <Header />
      <NavigationBar />
      <main className={classes.content}>
        {/* Пустой тулбар под заголовком, чтобы контент не перекрывался */}
        <Toolbar />
        <Switch>
          {
            routes.map(({ path, Page }) => (
              <Route
                key={path}
                path={path}
                render={() => (Page ? <Page /> : null)}
              />
            ))
          }
          <Redirect to={homeRoute} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
