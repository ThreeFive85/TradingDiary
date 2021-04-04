import axios from 'axios';

const url = 'http://localhost:4000/diary';

export const fetchPosts = () => axios.get(url);
export const createDiary = (newPost) => axios.post(url, newPost);