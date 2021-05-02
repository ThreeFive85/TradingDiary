import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    table: {
        minWidth: 650,
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
  }));
  