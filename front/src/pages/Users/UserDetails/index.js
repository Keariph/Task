import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import Table from '../../../components/Table';
import { api } from '../../../utility/api';
import useStyles from './styles';

function UserDetails({
  user,
  onExitClick,
}) {
  const classes = useStyles();
  const [scores, setScores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [scoreCreating, setScoreCreating] = React.useState(false);

  const loadScores = () => {
    api.scores.get(user.id)
      .then((data) => {
        setScores(data.scores);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const createScore = () => {
    setScoreCreating(true);
    api.scores.create(user.id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setScoreCreating(false);
        if (user) {
          loadScores();
        }
      });
  };

  const handleClose = () => {
    setScores([]);
    setScoreCreating(false);
    onExitClick();
  };

  React.useEffect(() => {
    if (user) {
      loadScores();
    }
  }, [user]);
  
  return (
    <Modal
      title="Детализации пользователя"
      open={!!user}
      onExitClick={handleClose}
    >
      <Typography variant="h5" align="center">Информация о клиенте</Typography>
      <Typography>id: {user && user.id}</Typography>
      <Typography>Имя: {user && user.name}</Typography>
      <Typography>Возраст: {user && user.age}</Typography>
      <Typography variant="h5" align="center">Счета клиента</Typography>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <Table
              data={scores}
              columns={[
                {
                  id: 'id',
                  name: 'id счёта',
                  align: 'right',
                },
                {
                  id: 'user_id',
                  name: 'id пользователя',
                },
                {
                  id: 'sum',
                  name: 'Сумма',
                },
              ]}
            />
            <Grid
              container
              spacing={3}
              alignItems="center"
              className={classes.createScore}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<AddIcon />}
                  size="large"
                  onClick={createScore}
                  disabled={loading || scoreCreating}
                >
                  Создать счёт
                </Button>
              </Grid>
              {scoreCreating && (
                <Grid item>
                  <CircularProgress />
                </Grid>
              )}
            </Grid>
          </>
        )
      }
    </Modal>
  );
}

export default UserDetails;
