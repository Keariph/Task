import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Modal({
  /**
   * boolean - открыта/закрыта модалка
   */
  open,
  /**
   * строка - заголовок в хеадере
   */
  title,
  /**
   * ф-ия, которая вызовется на нажатие по крестику
   * пжлст, переводите open в false внутри этой ф-ии
   */
  onExitClick,
  /**
   * пихай шо хош
   */
  children,
}) {
  const classes = useStyles();

  return (
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onExitClick} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          {children}
        </div>
      </Dialog>
  );
}

export default Modal;
