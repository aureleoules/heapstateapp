import {
    appConstants
} from '../constants/app.constants';
import App from '../types/app';

type Action = {
    type: string
    error: Error
    // Create
    creating: boolean
    created: boolean

    // Fetch
    apps: Array<App>
    requesting: boolean
}

const defaultState = {
    apps: []
}

export function apps(state = defaultState, action: Action) {
    switch (action.type) {
        
        case appConstants.CREATE_APP_START:
            return {...state, creating: true};
        case appConstants.CREATE_APP_SUCCESS:
            return {...state, creating: false, created: true};
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
                requesting: true
            };
        case appConstants.FETCH_APPS_SUCCESS:
            return {
                ...state,
                requesting: false,
                apps: action.apps
            };
        case appConstants.FETCH_APPS_FAILURE:
            return {
                ...state,
                requesting: false,
                fetch_apps_err: action.error
            };
        default:
            return state
    }
}
