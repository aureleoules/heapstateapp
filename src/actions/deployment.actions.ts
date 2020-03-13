import Client from '../httpClient';
import history from '../history';
import { deploymentConstants } from '../constants/deployment.constants';
import Deployment from '../types/deployment';

function deploy(deployment: Deployment) {
    return (dispatch: any) => {
        dispatch(request(deployment));

        Client.Deployments.create(deployment).then(container => {
            dispatch(success(container));
        }).catch(err => {
            dispatch(failure(err));
        });
    }

    function request(deployment: Deployment) { return { type: deploymentConstants.DEPLOY_START, deployment}}
    function success(container: any) { return { type: deploymentConstants.DEPLOY_SUCCESS, container} }
    function failure(error: Error) { return { type: deploymentConstants.DEPLOY_FAILURE, error } }
}

export default {
    deploy,
};