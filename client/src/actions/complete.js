import * as api from '../api';

export const getComplete = () => async (dispatch) => {
    try {
        const { data } = await api.fetchComplete();
        // console.log(data);
        dispatch({ type: 'FETCH_ALL_COM', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}