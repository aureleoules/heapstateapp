import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {oauth} from './oauth.reducer';
import {apps} from './apps.reducer';

export default combineReducers({
    router: connectRouter(history),
    authentication,
    registration,
    oauth,
    apps
});