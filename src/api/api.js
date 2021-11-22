import axios from 'axios';
import apiConfig from './config';

export default {
  get(path, config) {
    return axios.get(`${apiConfig.apiHost}${path}`, config);
  },
};
