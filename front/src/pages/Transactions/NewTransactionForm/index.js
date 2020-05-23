import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../../../components/Form';
import { api } from '../../../utility/api';

function NewTransactionForm({
  /**
   * ф-ия, которая будет вызвана после успешного создания новой транзакции
   */
  onCreate,
}) {
  const types = [
    {
      value: 'accrual',
      label: 'Начисление',
    },
    {
      value: 'write_off',
      label: 'Списание',
    },
    {
      value: 'transfer',
      label: 'Перевод',
    },
  ];
  const [loading, setLodaing] = React.useState(false);
  const [type, setType] = React.useState(types[0].value);
  const [senderScoreId, setSenderScoreId] = React.useState(0);
  const [recieverScoreId, setReceiverScoreId] = React.useState(0);
  const [money, setMoney] = React.useState(0);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }
  const handleChangeSenderScoreId = (event) => {
    setSenderScoreId(Number(event.target.value));
  }
  const handleChangeReceiverScoreId = (event) => {
    setReceiverScoreId(Number(event.target.value));
  }
  const handleChangeMoney = (event) => {
    setMoney(Number(event.target.value));
  }
  const handleCreate = () => {
    let query = {
      type,
      sender: senderScoreId,
      receiver: recieverScoreId,
      money,
    };
    if (type === 'accrual') {
      delete query.sender;
    }
    if (type === 'write_off') {
      delete query.receiver;
    }

    setLodaing(true);
    api.transactions.create(query)
      .then((response) => {
        setSenderScoreId(0);
        setReceiverScoreId(0);
        setMoney(0);
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

  React.useEffect(() => {
    if (type === 'accrual') {
      setSenderScoreId(0);
    }
    if (type === 'write_off') {
      setReceiverScoreId(0);
    }
  }, [type])

  return (
    <Form title="Новая транзакция">
      <Grid item>
        <TextField
          select
          id="type"
          label="Вид транзакции"
          value={type}
          onChange={handleTypeChange}
          fullWidth
          disabled={loading}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          id="sender_score"
          label="id счёта отправителя"
          type="number"
          inputProps={{
            min: 1,
          }}
          value={senderScoreId || ''}
          onChange={handleChangeSenderScoreId}
          fullWidth
          disabled={loading || type === 'accrual'}
        />
      </Grid>
      <Grid item>
        <TextField
          id="reciever_score"
          label="id счёта получателя"
          type="number"
          inputProps={{
            min: 1,
          }}
          value={recieverScoreId || ''}
          onChange={handleChangeReceiverScoreId}
          fullWidth
          disabled={loading || type === 'write_off'}
        />
      </Grid>
      <Grid item>
        <TextField
          id="money"
          label="Деньги"
          type="number"
          inputProps={{
            min: 1,
          }}
          value={money || ''}
          onChange={handleChangeMoney}
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

export default NewTransactionForm;
