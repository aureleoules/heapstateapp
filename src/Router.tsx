import React from 'react';

import { ConnectedRouter } from 'connected-react-router';

import history from './history';
import { Switch, Route } from 'react-router';

import './styles/index.scss';

import Home from './routes/public/Home';
import Login from './routes/public/Login';
import Register from './routes/public/Register';
import { useSelector } from 'react-redux';
import AuthenticationState from './types/authentication';
import Dashboard from './routes/authenticated/Dashboard';

function Router() {

    interface RootState {
        authentication: object
    }

    const authentication: AuthenticationState = useSelector((state: RootState) => state.authentication);

    return (
        <ConnectedRouter history={history}>
            <Switch>
                {!authentication.loggedIn && 
                    <Route exact path="/" component={Home}/>
                }
                {authentication.loggedIn &&
                    <Route exact path="/" component={Dashboard}/>
                }
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;