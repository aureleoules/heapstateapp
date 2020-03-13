import axios from 'axios';
import User from '../types/user';
import Deployment from '../types/deployment';

const route = "/deploys";

export default {
    create: (deployment: Deployment) => new Promise<any>((resolve, reject) => {
        axios.post(route + '/', deployment).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
}