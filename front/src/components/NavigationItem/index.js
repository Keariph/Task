import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import useStyles from './styles';

function NavigationItem({
  /**
   * Любая иконка из @material-ui/icons
   * пример: <NavigationItem icon={<Face />} ... />
   */
  icon,
  /**
   * текст, обычная строка
   * пример: <NavigationItem text="что-нибудь" ... />
   */
  text,
  /**
   * путь, куда будет редирект, если пользователь нажмёт на кнопку
   * пример <NavigationItem path="/users" ... />
   */
  path,
}) {
  const classes = useStyles();

  return (
    <ListItem
      button
      component={NavLink}
      to={path}
      activeClassName={classes.selected}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default NavigationItem;
