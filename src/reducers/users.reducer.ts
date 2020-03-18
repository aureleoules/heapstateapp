import UserProfile from '../types/user.profile';
import { userConstants } from '../constants/user.constants';
import { parseJwt } from '../utils/jwt';

type Action = {
    type: string
    error: Error
    profile: UserProfile
    token: string
}

const isLoggedIn = !!localStorage.getItem("jwt");

const defaultState = {
    profile: null,

    loggedIn: isLoggedIn,
    fetching: false,
    fetch_profile_error: null,

    registering: false,
    registration_error: null,
}

export function users(state = defaultState, action: Action) {
    switch (action.type) {
        /* REGISTRATION */
        case userConstants.REGISTER_REQUEST:
            return { 
                ...state,
                registering: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                profile: action.profile
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registration_error: action.error
            };
            

        /* FETCH PROFILE */
        case userConstants.FETCH_PROFILE_START:
            return { 
                ...state,
                fetching: true
            };
        case userConstants.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.profile
            };
        case userConstants.FETCH_PROFILE_FAILURE:
            return {
                ...state,
                fetch_profile_error: action.error
            };

        /* AUTHENTICATE */
        case userConstants.AUTHENTICATE_REQUEST:
            return {
                ...state,
                authenticating: true,
                loggedIn: false
            };
        case userConstants.AUTHENTICATE_SUCCESS:
            const profile = parseJwt(action.token);
            return {
                loggedIn: true,
                authenticating: false,
                profile
            };
        case userConstants.AUTHENTICATE_FAILURE:
            return {
                ...state,
                authenticating: false,
                authentication_error: action.error,
                loggedIn: false
            };

        default:
            return state
    }
}