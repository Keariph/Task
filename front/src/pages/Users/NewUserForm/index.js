import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../../../components/Form';
import { api } from '../../../utility/api';

function NewUserForm({
  /**
   * ф-ия, которая будет вызвана после успешного создания нового клиента
   */
  onCreate,
}) {
  const [loading, setLodaing] = React.useState(false);
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleAgeChange = (event) => {
    setAge(Number(event.target.value));
  }
  const handleCreate = () => {
    setLodaing(true);
    api.users.create({ name, age })
      .then((response) => {
        setName('');
        setAge(0);
        if (onCreate) {
          onCreate();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLodaing(false);
      })
  }

  return (
    <Form title="Новый клиент">
      <Grid item>
        <TextField
          id="name"
          label="Имя"
          value={name}
          onChange={handleNameChange}
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <TextField
          id="age"
          label="Возраст"
          type="number"
          inputProps={{
            min: 0,
          }}
          value={age || ''}
          onChange={handleAgeChange}
          fullWidth
          disabled={loading}
        />
      </Grid>
      <Grid
        item
        container
        spacing={3}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            endIcon={<CreateIcon />}
            size="large"
            onClick={handleCreate}
            disabled={loading}
          >
            Создать
          </Button>
        </Grid>
        {
          loading && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )
        }
      </Grid>
    </Form>
  );
}

export default NewUserForm;
