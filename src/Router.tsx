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
import Navbar from './components/Navbar';
import Apps from './routes/authenticated/Apps';
import Deploy from './routes/authenticated/Deploy';
import Callback from './routes/authenticated/Callback';
import { RouterState } from 'react-router-redux';
import EditApp from './routes/authenticated/EditApp';
import Builds from './routes/authenticated/Builds';
import AppLogs from './routes/authenticated/AppLogs';

function Router(props: any) {
    
    interface RootState {
        authentication: object,
        router: RouterState
    }

    const authentication: AuthenticationState = useSelector((state: RootState) => state.authentication);
    const router: RouterState = useSelector((state: RootState) => state.router);

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
                        <Route exact path="/" component={Apps}/>
                        <Route exact path="/deploy" component={Deploy}/>
                        
                        <Route exact path="/apps/:name" component={EditApp}/>
                        <Route exact path="/apps/:name/builds" component={Builds}/>
                        <Route exact path="/apps/:name/logs" component={AppLogs}/>

                        <Route exact path="/callback" component={Callback}/>
                    </React.Fragment>
                }
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;