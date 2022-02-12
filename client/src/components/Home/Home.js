import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Record from '../Record/Record';
import Holding from '../Holding/Holding';

import {getCurrent} from '../../actions/current';

function Home() {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrent());
    }, [dispatch]);

    return (
        <><div>
            <Holding setCurrentId={setCurrentId}/>
        </div>
        <div>
            <Record currentId={currentId} setCurrentId={setCurrentId}/>
        </div></>
    )
}

export default Home