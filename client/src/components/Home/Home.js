import React, { useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Record from '../Record/Record';
import Holding from '../Holding/Holding';

import {getCurrent} from '../../actions/current';
// import useStyles from '../../styles';

function Home() {
    // const [currentId, setCurrentId] = useState(null);
    // const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrent());
    }, [dispatch]);

    return (
        <Grow in>
            <Container>
                {/* <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}> */}
                    <Grid >
                        <Holding />
                    </Grid>
                    <Grid >
                        <Record />
                    </Grid>
                {/* </Grid> */}
            </Container>
        </Grow>
    )
}

export default Home