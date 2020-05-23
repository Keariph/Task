import React from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

function Filters({
  loading,
  from,
  until,
  client,
  onChangeFrom,
  onChangeUntil,
  onChangeClient,
  onSearch,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <KeyboardDateTimePicker
          fullWidth
          variant="inline"
          error={from >= until}
          maxDate={until || Date.now()}
          label="Начало периода"
          ampm={false}
          mask={'__.__.____ __:__'}
          format="dd.MM.yyyy HH:mm"
          inputVariant="standard"
          value={from}
          onChange={onChangeFrom}
          className={classes.input}
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <KeyboardDateTimePicker
          fullWidth
          variant="inline"
          error={from >= until}
          minDate={from || Date.now()}
          maxDate={Date.now()}
          label="Конец периода"
          ampm={false}
          mask={'__.__.____ __:__'}
          format="dd.MM.yyyy HH:mm"
          inputVariant="standard"
          value={until}
          onChange={onChangeUntil}
          className={classes.input}
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          id="client"
          label="Клиент"
          placeholder="имя"
          onChange={onChangeClient}
          value={client}
          className={classes.input}
        />
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={onSearch}
          endIcon={<SearchIcon />}
        >
          Найти
        </Button>
      </Grid>
    </Grid>
  );
}

export default Filters;
