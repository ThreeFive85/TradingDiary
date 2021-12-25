import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const HeaderBar = () => {
    const classes = useStyles();

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.buttons}>
          <Button component={Link} to="/current" variant="contained" color="secondary">
            main
          </Button>
          <Button component={Link} to="/diary" variant="contained" color="secondary">
            history
          </Button>
          <Button component={Link} to="/complete" variant="contained" color="secondary">
            rate
          </Button>
          </div>
        </Toolbar>
      </AppBar>
    )
}

export default HeaderBar
