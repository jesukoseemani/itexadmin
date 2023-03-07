import axios from 'axios';

const aYAxios = axios.create({
	baseURL: process.env.REACT_APP_ROOT_URL_CUSTOM,
});

export default aYAxios;
