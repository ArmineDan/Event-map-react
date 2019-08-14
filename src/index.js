import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BeforeRegister from './Components/beforeRegister';
import Dashboard from './Components/dashboard';
import {Route, Switch, Redirect} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {browserHistory} from 'react-router';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from "redux-promise";
//import { routerMiddleware} from 'react-router-redux';
import {get_events} from './reducers/reducers';

const history = browserHistory;
//const middleware = routerMiddleware(history);
const store = createStore(
    combineReducers({
        events:get_events,
            }),
    composeWithDevTools(applyMiddleware(ReduxPromise))
  );
const routing = (
    <Provider store={store}>
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={BeforeRegister} />
            <Route path="/dashboard" component={Dashboard} />
            <Redirect to="/" component={BeforeRegister} />
        </Switch>
    </Router>
    </Provider>
);



ReactDOM.render(routing, document.getElementById('root'));

