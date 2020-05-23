import React from 'react';
import useStyles from './styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Form({
  /**
   * Заголовок формы, строка
   */
  title,
  /**
   * пихай шо хош, но желательно обёрнутое в <Grid item>...</Grid>
   */
  children,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="column"
          spacing={3}
          // вместо тэга 'div' используем 'fieldset'
          component="fieldset"
          className={classes.noFieldsetBorder}
        >
          <Grid item>
            <Typography variant="h4" component="legend">
              {title}
            </Typography>
          </Grid>
          {children}
        </Grid>
      </form>
    </Paper>
  );
}

export default Form;
