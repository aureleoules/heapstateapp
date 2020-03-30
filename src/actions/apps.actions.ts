import { appConstants } from '../constants/app.constants';
import Client from '../httpClient';
import App from '../types/app';
import Build from '../types/build';
import ContainerOptions from '../types/container_options';
import ContainerStats from '../types/container_stats';
import BuildOptions from '../types/build_options';

function newApp(app: App) {
    return (dispatch: any) => {
        dispatch(request(app));

        Client.Apps.create(app).then(container => {
            dispatch(success(container));
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request(app: App) { return { type: appConstants.CREATE_APP_START, app}}
    function success(container: any) { return { type: appConstants.CREATE_APP_SUCCESS, container} }
    function failure(error: Error) { return { type: appConstants.CREATE_APP_FAILURE, error } }
}

function fetchApps() {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetchApps().then(apps => {
            dispatch(success(apps));
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.FETCH_APPS_START}}
    function success(apps: Array<App>) { return { type: appConstants.FETCH_APPS_SUCCESS, apps} }
    function failure(error: Error) { return { type: appConstants.FETCH_APPS_FAILURE, error } }
}

function fetchApp(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetch(name).then(app => {
            dispatch(success(app));
        }).catch(err => {
            dispatch(failure(err));
        })
    }

    function request() { return { type: appConstants.FETCH_APP_START}}
    function success(app: App) { return { type: appConstants.FETCH_APP_SUCCESS, app} }
    function failure(error: Error) { return { type: appConstants.FETCH_APP_FAILURE, error } }
}

function fetchBuilds(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetchBuilds(name).then(builds => {
            dispatch(success(builds));
        }).catch(err => {
            dispatch(failure(err));
        })
    }

    function request() { return { type: appConstants.FETCH_BUILDS_START}}
    function success(builds: Array<Build>) { return { type: appConstants.FETCH_BUILDS_SUCCESS, builds} }
    function failure(error: Error) { return { type: appConstants.FETCH_BUILDS_FAILURE, error } }
}

function fetchBuild(name: string, id: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetchBuild(name, id).then(build => {
            dispatch(success(build));
        }).catch(err => {
            dispatch(failure(err));
        })
    }

    function request() { return { type: appConstants.FETCH_BUILD_START}}
    function success(build: Build) { return { type: appConstants.FETCH_BUILD_SUCCESS, build} }
    function failure(error: Error) { return { type: appConstants.FETCH_BUILD_FAILURE, error } }
}

function fetchBuildOptions(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetchBuildOptions(name).then(app => {
            dispatch(success(app));
        }).catch(err => {
            dispatch(failure(err));
        })
    }

    function request() { return { type: appConstants.FETCH_BUILD_OPTIONS_START}}
    function success(build_options: any) { return { type: appConstants.FETCH_BUILD_OPTIONS_SUCCESS, build_options} }
    function failure(error: Error) { return { type: appConstants.FETCH_BUILD_OPTIONS_FAILURE, error } }
}

function forceDeploy(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.forceDeploy(name).then(() => {
            dispatch(success());
        }).catch(err => {
            dispatch(failure(err));
        })
    }

    function request() { return { type: appConstants.DEPLOY_START}}
    function success() { return { type: appConstants.DEPLOY_SUCCESS} }
    function failure(error: Error) { return { type: appConstants.DEPLOY_FAILURE, error } }
}

function fetchStats(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetchStats(name).then((stats: ContainerStats) => {
            dispatch(success(stats));
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.FETCH_STATS_START}}
    function success(stats: ContainerStats) { return { type: appConstants.FETCH_STATS_SUCCESS, stats}}
    function failure(error: Error) { return { type: appConstants.FETCH_STATS_FAILURE, error } }
}

function fetchLogs(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetchLogs(name).then((logs: string) => {
            dispatch(success(logs));
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.FETCH_LOGS_START}}
    function success(logs: string) { return { type: appConstants.FETCH_LOGS_SUCCESS, logs}}
    function failure(error: Error) { return { type: appConstants.FETCH_LOGS_FAILURE, error } }
}

function fetchContainerOptions(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.fetchContainerOptions(name).then((containerOptions: ContainerOptions) => {
            dispatch(success(containerOptions));
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.FETCH_CONTAINER_OPTIONS_START}}
    function success(container_options: ContainerOptions) { return { type: appConstants.FETCH_CONTAINER_OPTIONS_SUCCESS, container_options}}
    function failure(error: Error) { return { type: appConstants.FETCH_CONTAINER_OPTIONS_FAILURE, error } }
}

function setContainerRAM(max_ram: number) {
    return {
        type: appConstants.SET_CONTAINER_RAM,
        max_ram
    }
}

function startApp(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.startApp(name).then(() => {
            dispatch(success());
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.START_APP_START}}
    function success() { return { type: appConstants.START_APP_SUCCESS}}
    function failure(error: Error) { return { type: appConstants.START_APP_FAILURE, error } }
}

function restartApp(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.restartApp(name).then(() => {
            dispatch(success());
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.RESTART_APP_START}}
    function success() { return { type: appConstants.RESTART_APP_SUCCESS}}
    function failure(error: Error) { return { type: appConstants.RESTART_APP_FAILURE, error } }
}

function stopApp(name: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.stopApp(name).then(() => {
            dispatch(success());
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.STOP_APP_START}}
    function success() { return { type: appConstants.STOP_APP_SUCCESS}}
    function failure(error: Error) { return { type: appConstants.STOP_APP_FAILURE, error } }
}

function saveContainerOptions(name: string, container_options: ContainerOptions) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.saveContainerOptions(name, container_options).then(() => {
            dispatch(success());
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.SAVE_CONTAINER_OPTIONS_START}}
    function success() { return { type: appConstants.SAVE_CONTAINER_OPTIONS_SUCCESS}}
    function failure(error: Error) { return { type: appConstants.SAVE_CONTAINER_OPTIONS_FAILURE, error } }
}


function setEnvVarKey(key: string, index: number) {
    return {
        type: appConstants.SET_ENV_VAR_KEY,
        key,
        index
    }
}

function setEnvVarValue(value: string, index: number) {
    return {
        type: appConstants.SET_ENV_VAR_VALUE,
        value,
        index
    }
}

function removeEnvVar(index: number) {
    return {
        type: appConstants.REMOVE_ENV_VAR,
        index
    }
}

function addEnvVar() {
    return {
        type: appConstants.ADD_ENV_VAR
    }
}


function saveBuildOptions(name: string, build_options: BuildOptions) {
    return (dispatch: any) => {
        dispatch(request());

        Client.Apps.saveBuildOptions(name, build_options).then(() => {
            dispatch(success());
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request() { return { type: appConstants.SAVE_BUILD_OPTIONS_START}}
    function success() { return { type: appConstants.SAVE_BUILD_OPTIONS_SUCCESS}}
    function failure(error: Error) { return { type: appConstants.SAVE_BUILD_OPTIONS_FAILURE, error } }
}

function setBranch(branch: string) {
    return {
        type: appConstants.SET_BRANCH,
        branch
    }
}

export default {
    newApp,
    fetchApps,
    fetchApp,
    fetchBuildOptions,
    forceDeploy,
    fetchBuilds,
    fetchBuild,
    fetchStats,
    fetchLogs,
    fetchContainerOptions,
    setContainerRAM,
    startApp,
    stopApp,
    restartApp,
    saveContainerOptions,

    setEnvVarKey,
    setEnvVarValue,
    removeEnvVar,
    addEnvVar,
    saveBuildOptions,
    setBranch
};

