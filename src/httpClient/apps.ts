import axios from 'axios';
import App from '../types/app';

const route = "/apps";

export default {
    create: (app: App) => new Promise<any>((resolve, reject) => {
        axios.post(route + '/', app).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    fetchApps: () => new Promise<Array<App>>((resolve, reject) => {
        axios.get(route + '/').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    })
}