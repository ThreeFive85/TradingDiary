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

export const createCurrent = (post) => async (dispatch) => {
    // console.log("post : ", post)
    try {
        const {data} = await api.createCurrent(post);
        // console.log("actions data : ", data)
        dispatch({ type: 'CREATE_CUR', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateCurrent = (post) => async (dispatch) => {
    try {
        const {data} = await api.updateCurrent(post);
        // console.log("data : ", data)
        if(data.message){
            dispatch({ type: 'DELETE', payload: post.종목명 });
        } else {
            dispatch({ type: 'UPDATE_CUR', payload: data });
        }

    } catch (error) {
        console.log(error.message);
    }
}