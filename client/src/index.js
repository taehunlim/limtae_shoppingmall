import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import App from './App';
import Register from "./screens/Register";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import Activation from "./screens/Activation";

import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact render={props => <App {...props}/>} />
            <Route path='/login' exact render={props => <Login {...props}/>} />
            <Route path='/register' exact render={props => <Register {...props}/>} />
            <Route path='/users/activate/:token' exact render={props => <Activation {...props}/>} />
            <Route path='/forgotpassword' exact render={props => <ForgotPassword {...props}/>} />
            <Redirect to='/' />
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);
