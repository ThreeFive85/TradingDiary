import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  // root: {
    
  //     marginBottom: 30

  // },
    table: {
        minWidth: 700,
      },
      heading: {
        fontSize: theme.typography.pxToRem(35),
        fontWeight: theme.typography.fontWeightRegular,
      },
      choice: {
        margin: theme.spacing(0.5),
      }
  }));
  