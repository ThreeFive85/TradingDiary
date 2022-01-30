import axios from 'axios';

const url = 'http://localhost:4000/diary';
const url2 = 'http://localhost:4000/current';
const url3 = 'http://localhost:4000/complete';
const url4 = 'http://localhost:4000/points'

export const fetchPosts = () => axios.get(url);
export const createDiary = (newPost) => axios.post(url, newPost);
export const fetchCurrents = () => axios.get(url2);
export const fetchComplete = () => axios.get(url3);
export const getStock = (name) => axios.patch(`http://localhost:4000/diary/${name}`, name);
export const updateCurrent = (name) => axios.get(`http://localhost:4000/current/${name}`, name);
export const getPoints = () => axios.get(url4);