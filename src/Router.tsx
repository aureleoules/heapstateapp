import { ConnectedRouter } from 'connected-react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { RouterState } from 'react-router-redux';
import { userActions } from './actions';
import history from './history';
import AppLogs from './routes/authenticated/AppLogs';
import Apps from './routes/authenticated/Apps';
import BuildDetails from './routes/authenticated/BuildDetails';
import Builds from './routes/authenticated/Builds';
import BuildSettings from './routes/authenticated/BuildSettings';
import Callback from './routes/authenticated/Callback';
import Container from './routes/authenticated/Container';
import Deploy from './routes/authenticated/Deploy';
import EditApp from './routes/authenticated/EditApp';
import Profile from './routes/authenticated/Profile';
import Home from './routes/public/Home';
import Login from './routes/public/Login';
import Register from './routes/public/Register';
import './styles/index.scss';

function Router(props: any) {
    
    interface RootState {
        users: object,
        router: RouterState
    }

    const dispatch = useDispatch();

    const users: any = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if(users.loggedIn) {
            dispatch(userActions.fetchProfile());
        }
    }, [dispatch, users.loggedIn]);

    return (
        <ConnectedRouter history={history}>
            <Switch>
                {!users.loggedIn && 
                    <React.Fragment>
                        <Route exact path="/" render={() => <Redirect to="/login"/>}/>
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