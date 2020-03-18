import axios from 'axios';
import App from '../types/app';
import BuildOptions from '../types/build_options';
import Build from '../types/build';
import ContainerStats from '../types/container_stats';

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
    }),

    fetchBuilds: (name: string) => new Promise<Array<Build>>((resolve, reject) => {
        axios.get(route + '/' + name + '/builds').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    fetchBuild: (name: string, id: string) => new Promise<Build>((resolve, reject) => {
        axios.get(route + '/' + name + '/builds/'+ id).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    fetchStats: (name: string) => new Promise<ContainerStats>((resolve, reject) => {
        axios.get(route + '/' + name + '/stats').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    })
}