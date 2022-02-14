import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginBottom: 30,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    marginTop: 30
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
  }));
  