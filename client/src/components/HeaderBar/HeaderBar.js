import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useStyles from './styles';

const HeaderBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="secondary"
        centered
      >
        <Tab label="main" component={Link} to="/"/>
        <Tab label="history" component={Link} to="/diary"/>
        <Tab label="rate" component={Link} to="/complete"/>
        <Tab label="points" component={Link} to="/points"/>
      </Tabs>
    </Paper>
  )
}

export default HeaderBar
