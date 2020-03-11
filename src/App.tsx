import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import {store} from './store';
import history from './history';
import { Switch, Route } from 'react-router';

import './styles/index.scss';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/register" component={Register}/>
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;