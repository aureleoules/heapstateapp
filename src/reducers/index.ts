import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';

export default combineReducers({
    router: connectRouter(history),
    authentication,
    registration
});