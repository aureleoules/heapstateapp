import Client from '../httpClient';
import history from '../history';
import { oauthConstants } from '../constants/oauth.constants';

function authenticate_github(code: string) {
    return (dispatch: any) => {
        dispatch(request());

        Client.GitHub.exchange_token(code)
            .then((token: string) => {
                dispatch(success(token));

                const data: any = {detail: token}; 
                const event = new CustomEvent("access_token", data);

                window.opener.dispatchEvent(event);
                
                window.close();
            })
            .catch((err: Error) => {
                dispatch(failure(err));
            });
    }

    function request() { return { type: oauthConstants.OAUTH_TOKEN_REQUEST}}
    function success(token: string) { return { type: oauthConstants.OAUTH_TOKEN_SUCCESS, token } }
    function failure(error: Error) { return { type: oauthConstants.OAUTH_TOKEN_FAILURE, error } }
}

export default {
    authenticate_github,
};