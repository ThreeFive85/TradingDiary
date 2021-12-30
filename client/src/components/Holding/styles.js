import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    
      marginBottom: 30

  },
    table: {
        minWidth: 650,
      },
      heading: {
        fontSize: theme.typography.pxToRem(35),
        fontWeight: theme.typography.fontWeightRegular,
      },
  }));
  