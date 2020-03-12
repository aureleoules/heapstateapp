import {
    userConstants
} from '../constants/user.constants';
import { parseJwt } from '../utils/jwt';
import User from '../types/user';
import AuthenticationState from '../types/authentication';

type Action = {
    type: string
    token: string
}

let initialState: AuthenticationState = {loggedIn: false, user: null};

const jwt = localStorage.getItem("jwt") || "";
if(jwt) {
    const user = parseJwt(jwt);
    initialState = user ? {loggedIn: true, user} : initialState;
}

export function authentication(state: AuthenticationState = initialState, action: Action) {
    switch (action.type) {
        case userConstants.AUTHENTICATE_REQUEST:
            return {
                loggingIn: true,
                user: null
            };
        case userConstants.AUTHENTICATE_SUCCESS:
            const user = parseJwt(action.token);
            return {
                loggedIn: true,
                user
            };
        case userConstants.AUTHENTICATE_FAILURE:
            return initialState;
        case userConstants.LOGOUT:
            return initialState;
        default:
            return state
    }
}
