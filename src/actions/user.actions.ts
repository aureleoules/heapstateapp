import {userConstants} from '../constants/user.constants';
import Client from '../httpClient';
import history from '../history';
import { setJwt } from '../utils/jwt';
import UserProfile from '../types/user.profile';

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
            .then((profile: UserProfile) => {
                dispatch(success(profile));
                history.push('/');
            })
            .catch((err: Error) => {
                dispatch(failure(err));
            });
    }

    function request(email: string) { return { type: userConstants.REGISTER_REQUEST, email } }
    function success(profile: UserProfile) { return { type: userConstants.REGISTER_SUCCESS, profile } }
    function failure(error: Error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function fetchProfile() {
    return (dispatch: any) => {
        dispatch(request());

        Client.Users.fetchProfile()
            .then((profile: UserProfile) => {
                dispatch(success(profile));
            }).catch((err: Error) => {
                dispatch(failure(err));
            });

        function request() { return { type: userConstants.FETCH_PROFILE_START } }
        function success(profile: UserProfile) { return { type: userConstants.FETCH_PROFILE_SUCCESS, profile } }
        function failure(error: Error) { return { type: userConstants.FETCH_PROFILE_FAILURE, error } }
    }
}

export default {
    authenticate,
    register,
    fetchProfile
};