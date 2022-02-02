import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HeaderBar from './components/HeaderBar/HeaderBar';
import Home from './components/Home/Home';
import History from './components/History/History';
import Complete from './components/Complete/Complete';
import Points from './components/Points/Points';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
            <HeaderBar />
                <Routes>
                    <Route exact={true} path={"/"} element={<Home/>} />
                    <Route exact={true} path={"/diary"} element={<History/>} />
                    <Route exact={true} path={"/complete"} element={<Complete/>} />
                    <Route exact={true} path={"/points"} element={<Points/>} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
