import * as api from '../api';

// Action Creators
export const getPoints = () => async (dispatch) => {
    try {
        const { data } = await api.getPoints();
        // console.log(data);
        dispatch({ type: 'FETCH_ALL_POI', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}