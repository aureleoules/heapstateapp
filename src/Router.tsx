import React, { useEffect } from 'react';

import { ConnectedRouter } from 'connected-react-router';

import history from './history';
import { Switch, Route } from 'react-router';

import './styles/index.scss';

import Home from './routes/public/Home';
import Login from './routes/public/Login';
import Register from './routes/public/Register';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Apps from './routes/authenticated/Apps';
import Deploy from './routes/authenticated/Deploy';
import Callback from './routes/authenticated/Callback';
import { RouterState } from 'react-router-redux';
import EditApp from './routes/authenticated/EditApp';
import AppLogs from './routes/authenticated/AppLogs';
import BuildSettings from './routes/authenticated/BuildSettings';
import Builds from './routes/authenticated/Builds';
import BuildDetails from './routes/authenticated/BuildDetails';
import Profile from './routes/authenticated/Profile';
import { userActions } from './actions';
import Container from './routes/authenticated/Container';


function Router(props: any) {
    
    interface RootState {
        users: object,
        router: RouterState
    }

    const dispatch = useDispatch();

    const users: any = useSelector((state: RootState) => state.users);
    const router: RouterState = useSelector((state: RootState) => state.router);

    useEffect(() => {
        if(users.loggedIn) {
            dispatch(userActions.fetchProfile());
        }
    }, []);

    return (
        <ConnectedRouter history={history}>
            <Switch>
                {!users.loggedIn && 
                    <React.Fragment>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </React.Fragment>
                }
                {users.loggedIn &&
                    <React.Fragment>
                        <Route exact path="/" component={Apps}/>
                        <Route exact path="/deploy" component={Deploy}/>
                        <Route exact path="/profile" component={Profile}/>

                        <Route exact path="/apps/:name" component={EditApp}/>
                        <Route exact path="/apps/:name/options" component={BuildSettings}/>
                        <Route exact path="/apps/:name/container" component={Container}/>

                        <Route exact path="/apps/:name/builds" component={Builds}/>
                        <Route exact path="/apps/:name/logs" component={AppLogs}/>
                        <Route exact path="/apps/:name/builds/:id" component={BuildDetails}/>

                        <Route exact path="/callback" component={Callback}/>
                    </React.Fragment>
                }
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;