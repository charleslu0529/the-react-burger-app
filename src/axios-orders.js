import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-c7a29.firebaseio.com/'
});

export default instance;