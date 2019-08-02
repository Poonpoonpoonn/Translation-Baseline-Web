import axios from 'axios';
import { prod } from '../Constants';

axios.interceptors.request.use(
    config => {
        config.url = prod + config.url;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
