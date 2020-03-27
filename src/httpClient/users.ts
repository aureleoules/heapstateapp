import axios from 'axios';
import UserProfile from '../types/user.profile';

export default {
    authenticate: (email: string, password: string) => new Promise<string>((resolve, reject) => {
        axios.post('/authenticate', {email, password}).then(response => {
            resolve(response.data.token);
        }).catch(err => {
            reject(err);
        });
    }),
    register: (email: string, password: string) => new Promise<UserProfile>((resolve, reject) => {
        axios.post('/users/', {email, password}).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    fetchProfile: () => new Promise<UserProfile>((resolve, reject) => {
        axios.get('/users/profile').then(response => {
            console.log("got resposne")
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    })
}