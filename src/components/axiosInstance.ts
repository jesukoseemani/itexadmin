import axios from 'axios';

const aYAxios = axios.create({
	baseURL: process.env.REACT_APP_ANOTHER_URL,
});

export default aYAxios;
