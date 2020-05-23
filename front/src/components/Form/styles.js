import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    marginTop: theme.spacing(5),
    padding: theme.spacing(4),
    maxWidth: 600,
  },
  noFieldsetBorder: {
    border: 'none',
  },
}));

export default useStyles;
