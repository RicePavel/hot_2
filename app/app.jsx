
import thunkMiddleware from 'redux-thunk'

var React = require('react');
var ReactDOM = require('react-dom');
var redux = require("redux");
var Provider = require('react-redux').Provider;
var reducer = require('./reducer.jsx');
var AppView = require('./appview.jsx');
var Router = require("react-router-dom").BrowserRouter;
var Route = require("react-router-dom").Route;
var Switch = require("react-router-dom").Switch;
var GameElement = require("./components/GameElement.jsx");
var SettingsElement = require("./components/SettingsElement.jsx");

var store = redux.createStore(reducer, redux.applyMiddleware(thunkMiddleware));

/*
ReactDOM.render(
        <Provider store={store} ><AppView /></Provider>,
        document.getElementById('app')
);
*/

ReactDOM.render(
        <Provider store={store} >
            <Router>
                <Switch>
                    <Route exact path="/" component={GameElement} />
                    <Route path="/settings" component={SettingsElement} />
                    <Route children={()=><h3>Not Found</h3>} /> 
                </Switch>
            </Router>
        </Provider>,
        document.getElementById('app')
);
