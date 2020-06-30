import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import Logout from './Logout/Logout';
import {BrowserRouter, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Register />, document.getElementById('root'));
ReactDOM.render(
    (
        <BrowserRouter>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/logout" component={Logout}></Route>
        </BrowserRouter>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

