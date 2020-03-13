import Client from '../httpClient';
import history from '../history';
import { appConstants } from '../constants/app.constants';
import App from '../types/app';

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

export default {
    newApp,
    fetchApps
};