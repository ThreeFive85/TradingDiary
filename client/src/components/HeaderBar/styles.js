import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 150px',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '650px',
        
      },
      buttons: {
        '& > *': {
          margin: theme.spacing(3),
        },
      },
  }));
  