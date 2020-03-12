import {userConstants} from '../constants/user.constants';
import Client from '../httpClient';
import history from '../history';
import User from '../types/user';
import { setJwt } from '../utils/jwt';

function authenticate(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(request(email));

        Client.Users.authenticate(email, password)
            .then((token: string) => {
                setJwt(token);
                dispatch(success(token));
                history.push('/');
            })
            .catch((err: Error) => {
                dispatch(failure(err));
            });
    }

    function request(email: string) { return { type: userConstants.AUTHENTICATE_REQUEST, email } }
    function success(token: string) { return { type: userConstants.AUTHENTICATE_SUCCESS, token } }
    function failure(error: Error) { return { type: userConstants.AUTHENTICATE_FAILURE, error } }
}

function register(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(request(email));

        Client.Users.register(email, password)
            .then((user: User) => {
                dispatch(success(user));
                history.push('/');
            })
            .catch((err: Error) => {
                dispatch(failure(err));
            });
    }

    function request(email: string) { return { type: userConstants.REGISTER_REQUEST, email } }
    function success(user: User) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error: Error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

export default {
    authenticate,
    register,
};