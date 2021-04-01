import React from 'react'
import { Container } from '@material-ui/core';

import HeaderBar from './components/HeaderBar/HeaderBar';
import Holding from './components/Holding/Holding';
import Record from './components/Record/Record';
import History from './components/History/History';
import Complete from './components/Complete/Complete';

const App = () => {
    return (
        <Container maxWidth="lg">
            <HeaderBar />
            <Holding />
            <Record />
            <History />
            <Complete />
        </Container>
    )
}

export default App
