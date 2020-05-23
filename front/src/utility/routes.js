import Users from '../pages/Users';
import Transactions from '../pages/Transactions';


const routes = {
  users: {
    path: '/users',
    Page: Users,
  },
  transactions: {
    path: '/transactions',
    Page: Transactions,
  },
};

export default routes;
