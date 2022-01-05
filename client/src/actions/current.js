import * as api from '../api';

export const getCurrent = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCurrents();
        // console.log(data);
        dispatch({ type: 'FETCH_ALL_CUR', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCurrent = (name) => async (dispatch) => {
    try {
        const {data} = await api.updateCurrent(name);

        dispatch({ type: 'UPDATE_CUR', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}