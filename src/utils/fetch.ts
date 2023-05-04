import axios from 'axios';
import qs from 'qs';


export const api = axios.create({
  baseURL: 'http://localhost:3000/memes',
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  },
});


