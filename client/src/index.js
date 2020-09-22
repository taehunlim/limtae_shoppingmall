import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, loginUser} from './actions/authActions';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from './App';
import Register from "./screens/Register";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import Activation from "./screens/Activation";
import Private from "./screens/Private";
import Admin from "./screens/Admin";
import ResetPassword from "./screens/ResetPassword";
import store from './store';
import {Provider} from 'react-redux';

import 'react-toastify/dist/ReactToastify.css'

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000 ;
    if(decoded.exp < currentTime) {
        store.dispatch(loginUser());
        window.location.href = '/login';
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact render={props => <App {...props}/>} />
                <Route path='/login' exact render={props => <Login {...props}/>} />
                <Route path='/register' exact render={props => <Register {...props}/>} />
                <Route path='/users/activate/:token' exact render={props => <Activation {...props}/>} />
                <Route path='/forgotpassword' exact render={props => <ForgotPassword {...props}/>} />
                <Route path='/private' exact render={props => <Private {...props}/>} />
                <Route path='/admin' exact render={props => <Admin {...props}/>} />
                <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />

                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
