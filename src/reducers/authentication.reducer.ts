import User from '../models/user';
import {
    userConstants
} from '../constants/user.constants';

type Action = {
    type: string
    user: User
}

export function authentication(state = {}, action: Action) {
    switch (action.type) {
        case userConstants.AUTHENTICATE_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.AUTHENTICATE_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.AUTHENTICATE_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}
