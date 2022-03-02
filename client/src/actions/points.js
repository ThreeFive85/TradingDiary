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

export const updatePoints = (post) => async (dispatch) => {
    try {
        const {data} = await api.updatePoints(post);
        // console.log("data : ", data)
        
        dispatch({ type: 'UPDATE_POINT', payload: data });

    } catch (error) {
        console.log(error.message);
    }
}