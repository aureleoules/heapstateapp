import axios from 'axios';
import App from '../types/app';
import BuildOptions from '../types/build_options';
import Build from '../types/build';
import ContainerStats from '../types/container_stats';
import ContainerOptions from '../types/container_options';

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
    }),

    fetchLogs: (name: string) => new Promise<string>((resolve, reject) => {
        axios.get(route + '/' + name + '/logs').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
    fetchContainerOptions: (name: string) => new Promise<ContainerOptions>((resolve, reject) => {
        axios.get(route + '/' + name + '/containeroptions').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
    startApp: (name: string) => new Promise<void>((resolve, reject) => {
        axios.post(route + '/' + name + '/start').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
    restartApp: (name: string) => new Promise<void>((resolve, reject) => {
        axios.post(route + '/' + name + '/restart').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),

    stopApp: (name: string) => new Promise<void>((resolve, reject) => {
        axios.post(route + '/' + name + '/stop').then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    }),
    saveContainerOptions: (name: string, options: ContainerOptions) => new Promise<void>((resolve, reject) => {
        axios.put(route + '/' + name + '/containeroptions', options).then(response => {
            resolve(response.data.payload);
        }).catch(err => {
            reject(err);
        });
    })
}