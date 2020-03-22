import {
    appConstants
} from '../constants/app.constants';
import App from '../types/app';
import BuildOptions from '../types/build_options';
import Build from '../types/build';
import ContainerStats from '../types/container_stats';
import ContainerOptions from '../types/container_options';

type Action = {
    type: string
    error: Error
    apps: Array <App>
    app: App
    build_options: BuildOptions
    builds: Array<Build>
    build: Build
    container_options: ContainerOptions

    stats: ContainerStats,
    logs: string
    max_ram: number
}

const defaultState = {
    apps: [],
    builds: [],
    app: null,
    saving: false,
    saved: false,
    stats: null,
    build: null,
    build_options: null,
    container_options: null,
    fetching: false,
    creating: false,
    created: false,
    fetch_apps_error: null,
    fetch_app_error: null,
    deploy_error: null,
    deploying: false,
    deployed: false,
    fetch_builds_error: null,
    fetch_build_error: null,
    fetch_stats_error: null,
    logs: "",
    fetch_logs_error: null,
    container_options_error: null,
    save_container_options_error: null,
    max_ram: 0
}

export function apps(state = defaultState, action: Action) {
    switch (action.type) {

        /* Create app */
        case appConstants.CREATE_APP_START:
            return {
                ...state, creating: true
            };
        case appConstants.CREATE_APP_SUCCESS:
            return {
                ...state, creating: false, created: true
            };
        case appConstants.CREATE_APP_FAILURE:
            return {
                ...state,
                creating: false,
                create_err: action.error
            };


            /* Fetch apps */
        case appConstants.FETCH_APPS_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_APPS_SUCCESS:
            return {
                ...state,
                fetching: false,
                apps: action.apps || []
            };
        case appConstants.FETCH_APPS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_apps_err: action.error
            };


            /* Fetch one app */
        case appConstants.FETCH_APP_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_APP_SUCCESS:
            return {
                ...state,
                fetching: false,
                app: action.app
            };
        case appConstants.FETCH_APP_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_app_error: action.error
            };

            /* Fetch builds options */
        case appConstants.FETCH_BUILD_OPTIONS_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_BUILD_OPTIONS_SUCCESS:
            return {
                ...state,
                fetching: false,
                build_options: action.build_options
            };
        case appConstants.FETCH_BUILD_OPTIONS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_build_options_error: action.error
            };

        /* Fetch builds */
        case appConstants.FETCH_BUILDS_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_BUILDS_SUCCESS:
            return {
                ...state,
                fetching: false,
                builds: action.builds || []
            };
        case appConstants.FETCH_BUILDS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_builds_error: action.error
            };



        /* Fetch builds */
        case appConstants.FETCH_BUILD_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_BUILD_SUCCESS:
            return {
                ...state,
                fetching: false,
                build: action.build
            };
        case appConstants.FETCH_BUILD_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_build_error: action.error
            };

        /* FORCE DEPLOY */
        case appConstants.DEPLOY_START:
            return {
                ...state,
                deploying: true
            };
        case appConstants.DEPLOY_SUCCESS:
            return {
                ...state,
                deploying: false,
                deployed: true
            };
        case appConstants.DEPLOY_FAILURE:
            return {
                ...state,
                deploying: false,
                deploy_error: action.error
            };

        /* FETCH STATS */
        case appConstants.FETCH_STATS_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_STATS_SUCCESS:
            return {
                ...state,
                fetching: false,
                stats: action.stats
            };
        case appConstants.FETCH_STATS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_stats_error: action.error
            };

        /* FETCH LOGS */
        case appConstants.FETCH_LOGS_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_LOGS_SUCCESS:
            return {
                ...state,
                fetching: false,
                logs: action.logs
            };
        case appConstants.FETCH_LOGS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_logs_error: action.error
            };

        /* FETCH CONTAINER OPTIONS */
        case appConstants.FETCH_CONTAINER_OPTIONS_START:
            return {
                ...state,
                fetching: true
            };
        case appConstants.FETCH_CONTAINER_OPTIONS_SUCCESS:
            return {
                ...state,
                fetching: false,
                container_options: action.container_options,
                max_ram: action.container_options.max_ram
            };
        case appConstants.FETCH_LOGS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_container_options_error: action.error
            };


        /* SET CONTAINER NAME */
        case appConstants.SET_CONTAINER_RAM:
            return {
                ...state,
                max_ram: action.max_ram
            }

        /* START APP */
        case appConstants.START_APP_START:
            return {
                ...state,
                starting: true,
            };
        case appConstants.START_APP_SUCCESS:
            return {
                ...state,
                starting: false,
                started: true,
            };
        case appConstants.START_APP_FAILURE:
            return {
                ...state,
                starting: false,
                start_error: action.error
            };

        /* RESTART APP */
        case appConstants.RESTART_APP_START:
            return {
                ...state,
                starting: true,
                started: false
            };
        case appConstants.RESTART_APP_SUCCESS:
            return {
                ...state,
                starting: false,
                started: true,
            };
        case appConstants.RESTART_APP_FAILURE:
            return {
                ...state,
                starting: false,
                start_error: action.error
            };

        /* STOP APP */
        case appConstants.RESTART_APP_START:
            return {
                ...state,
                stopping: true,
                stopped: false
            };
        case appConstants.RESTART_APP_SUCCESS:
            return {
                ...state,
                stopping: false,
                stopped: true,
            };
        case appConstants.RESTART_APP_FAILURE:
            return {
                ...state,
                stopping: false,
                start_error: action.error
            };


        /* SAVE CONTAINER OPTIONS */
        case appConstants.SAVE_CONTAINER_OPTIONS_START:
            return {
                ...state,
                saving: true
            };
        case appConstants.SAVE_CONTAINER_OPTIONS_SUCCESS:
            return {
                ...state,
                saving: false,
                saved: true
            };
        case appConstants.SAVE_CONTAINER_OPTIONS_FAILURE:
            return {
                ...state,
                saving: false,
                save_container_options_error: action.error
            };

        default:
            return state
    }
}