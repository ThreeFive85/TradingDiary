import * as api from '../api';

export const getCurrent = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCurrents();
        console.log(data);
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}