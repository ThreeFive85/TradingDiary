import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    table: {
        minWidth: 700,
      },
      heading: {
        fontSize: theme.typography.pxToRem(35),
        fontWeight: theme.typography.fontWeightRegular,
        marginBottom: 10
      },
      choice: {
        margin: theme.spacing(0.5),
      }
  }));
  