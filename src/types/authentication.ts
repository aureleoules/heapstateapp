import User from './user';

type AuthenticationState = {
    loggedIn?: boolean
    user?: User
}

export default AuthenticationState;