import axios from 'axios';
import qs from 'qs';


export const api = axios.create({
  baseURL: 'https://baconipsum.com/api/',
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  },
});


