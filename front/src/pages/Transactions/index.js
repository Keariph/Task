import React from 'react';
import { api } from '../../utility/api'
import Typography from '@material-ui/core/Typography';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import Filters from './Filters';
import NewTransactionForm from './NewTransactionForm';
import useStyles from './styles';

function Transactions() {
  const classes = useStyles();
  const [from, setFrom] = React.useState(
    new Date(
      new Date().setHours(0, 0, 0, 0)
    )
  );
  const [until, setUntil] = React.useState(new Date());
  const [client, setClient] = React.useState('');
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const loadAllTransactions = () => {
    api.transactions.lookup()
      .then((data) => {
        setTransactions(data.transactions);
      })
      .catch((error) => {
        console.error(error);
        setTransactions([]);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const loadTransactions = () => {
    const query = {
      begin: from.toISOString(),
      end: until.toISOString(),
    };
    if (client) {
      query.name = client;
    }

    setLoading(true);
    api.transactions.lookup(query)
      .then((data) => {
        setTransactions(data.transactions);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  React.useEffect(() => {
    loadAllTransactions();
  }, []);

  const Title = () => (
    <Typography variant="h4" align="center">Транзакции</Typography>
  );

  return (
    <>
      <Title />
      <Filters
        from={from}
        until={until}
        client={client}
        onChangeFrom={setFrom}
        onChangeUntil={setUntil}
        onChangeClient={handleChangeClient}
        loading={loading}
        onSearch={loadTransactions}
      />
      {
        loading
        ? (
          <Loader />
        )
        : (
          <>
           <Table
              className={classes.tableMargin}
              data={transactions}
              columns={[
                {
                  id: 'id',
                  name: 'id',
                  align: 'right',
                },
                {
                  id: 'type',
                  name: 'Тип',
                  getValue: (type) => {
                    if (type === 'accrual') {
                      return 'начисление';
                    }
                    if (type === 'write_off') {
                      return 'списание';
                    }
                    return 'перевод';
                  }
                },
                {
                  id: 'date_create',
                  name: 'Дата создания',
                  getValue: (date) => {
                    return new Date(date).toLocaleString();
                  }
                },
                {
                  id: 'sender',
                  name: 'Отправитель',
                },
                {
                  id: 'receiver',
                  name: 'Получатель',
                },
                {
                  id: 'money',
                  name: 'Деньги',
                },
              ]}
              />
              <NewTransactionForm onCreate={loadAllTransactions} />
          </>
        )
      }
    </>
  );
}

export default Transactions;
