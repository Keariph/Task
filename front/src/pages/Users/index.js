import React from 'react';
import { api } from '../../utility/api'
import Typography from '@material-ui/core/Typography';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import NewUserForm from './NewUserForm';
import UserDetails from './UserDetails';

function Users() {
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const loadUsers = () => {
    api.users.getAll()
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error(error);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const handleUserChoose = (item) => {
    setUser(item);
  }

  const handleModalExit = () => {
    setUser(null);
  }

  React.useEffect(loadUsers, []);

  const Title = () => (
    <Typography variant="h4" align="center">Клиенты банка</Typography>
  );

  if (loading) {
    return (
      <>
        <Title />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Title />
      <Table
        data={users}
        columns={[
          {
            id: 'id',
            name: 'id',
            align: 'right',
          },
          {
            id: 'name',
            name: 'Имя',
          },
          {
            id: 'age',
            name: 'Возраст',
          },
        ]}
        onRowClick={handleUserChoose}
      />
      <NewUserForm onCreate={loadUsers} />
      <UserDetails
        user={user}
        onExitClick={handleModalExit}
      />
    </>
  );
}

export default Users;
