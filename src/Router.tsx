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
import Navbar from './components/Navbar';
import Apps from './routes/authenticated/Apps';

function Router() {

    interface RootState {
        authentication: object
    }

    const authentication: AuthenticationState = useSelector((state: RootState) => state.authentication);

    return (
        <ConnectedRouter history={history}>
            <Switch>
                {!authentication.loggedIn && 
                    <React.Fragment>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </React.Fragment>
                }
                {authentication.loggedIn &&
                    <React.Fragment>
                        <Navbar/>
                        <Route exact path="/" component={Apps}/>
                    </React.Fragment>
                }
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;