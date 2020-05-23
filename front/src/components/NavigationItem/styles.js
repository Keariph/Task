import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
}));

export default useStyles;