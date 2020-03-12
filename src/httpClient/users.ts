import axios from 'axios';
import User from '../models/user';

export default {
    authenticate: (email: string, password: string) => new Promise<User>((resolve, reject) => {
        axios.post('/authenticate', {email, password}).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
    register: (email: string, password: string) => new Promise<User>((resolve, reject) => {
        axios.post('/users/', {email, password}).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    })
}