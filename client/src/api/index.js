import axios from 'axios';

const url = 'http://localhost:4000/diary';
const url2 = 'http://localhost:4000/current';
const url3 = 'http://localhost:4000/complete';

export const fetchPosts = () => axios.get(url);
export const createDiary = (newPost) => axios.post(url, newPost);
export const fetchCurrents = () => axios.get(url2);
export const fetchComplete = () => axios.get(url3);