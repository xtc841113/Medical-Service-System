import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props)
        sessionStorage.clear();
    }
    render() {
	let data={};
	let path={
	    pathname:'/MSS/login',
	    state : data
	}
	this.props.history.push(path);
        return (
            <Redirect to={path} />
        );
    }
}

export default Logout;
