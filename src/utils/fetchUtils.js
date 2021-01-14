import axios from 'axios';
import { environment } from '../../src/environments/environment';

export const fetchLaunches = ({ page, query }) => {
  return axios.post(`${environment.apiPath}/launches/query`, { options: { limit: 20, page, populate: 'payloads' }, query })
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    });
}