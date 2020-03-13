import {
    oauthConstants
} from '../constants/oauth.constants';

type Action = {
    type: string
    token: string
}

export function oauth(state = {}, action: Action) {
    switch (action.type) {
        case oauthConstants.OAUTH_TOKEN_REQUEST:
            return { requesting: true };
        case oauthConstants.OAUTH_TOKEN_SUCCESS:
            return {
                requesting: false,
                token: action.token
            };
        case oauthConstants.OAUTH_TOKEN_FAILURE:
            return {};
        default:
            return state
    }
}
