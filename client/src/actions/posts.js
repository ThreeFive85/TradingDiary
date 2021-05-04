import * as api from '../api';

// Action Creators
export const getDiary = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        // console.log(data);
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createDiary = (post) => async (dispatch) => {
    // console.log("post : ", post)
    try {
        const {data} = await api.createDiary(post);
        // console.log("actions data : ", data)
        dispatch({ type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}