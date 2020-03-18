import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import {users} from './users.reducer';
import {oauth} from './oauth.reducer';
import {apps} from './apps.reducer';

export default combineReducers({
    router: connectRouter(history),
    oauth,
    apps,
    users
});