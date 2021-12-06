import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
// import Home from './components/Home/Home.js';

import {getCurrent} from '../../actions/current';

import useStyles from './styles';

const HeaderBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.buttons}>
          <Button variant="contained" color="secondary">
            main
          </Button>
          <Button variant="contained" color="secondary">
            history
          </Button>
          <Button variant="contained" color="secondary">
            rate
          </Button>
          </div>
        </Toolbar>
      </AppBar>
    )
}

export default HeaderBar
