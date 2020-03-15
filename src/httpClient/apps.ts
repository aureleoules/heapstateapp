import axios from 'axios';
import App from '../types/app';
import BuildOptions from '../types/build_options';

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
    }),

    fetch: (name: string) => new Promise<App>((resolve, reject) => {
        axios.get(route + '/' + name).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    fetchBuildOptions: (name: string) => new Promise<BuildOptions>((resolve, reject) => {
        axios.get(route + '/' + name + '/buildoptions').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    forceDeploy: (name: string) => new Promise<any>((resolve, reject) => {
        axios.post(route + '/' + name + '/deploy').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    })
}