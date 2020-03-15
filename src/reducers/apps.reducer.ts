import {
    appConstants
} from '../constants/app.constants';
import App from '../types/app';
import BuildOptions from '../types/build_options';
import Build from '../types/build';

type Action = {
    type: string
    error: Error
    apps: Array <App>
        app: App
    build_options: BuildOptions
    builds: Array<Build>
}

const defaultState = {
    apps: [],
    builds: [],
    app: null,
    build_options: null,
    fetching: false,
    creating: false,
    created: false,
    fetch_apps_error: null,
    fetch_app_error: null,
    deploy_error: null,
    deploying: false,
    deployed: false,
    fetch_builds_error: null
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
                builds: action.builds
            };
        case appConstants.FETCH_BUILDS_FAILURE:
            return {
                ...state,
                fetching: false,
                fetch_builds_error: action.error
            };

            /* Force deploy */
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

        default:
            return state
    }
}