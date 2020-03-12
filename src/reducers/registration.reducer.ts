import User from '../models/user';
import {
    userConstants
} from '../constants/user.constants';

type Action = {
    type: string
    user: User
}

export function registration(state = {}, action: Action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {
                user: action.user
            };
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}
