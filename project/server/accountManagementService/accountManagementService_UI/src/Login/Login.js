import React,{Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import axios from 'axios';
import Config from '../config.js';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./Login.css"
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            isLoggin:false
        }
        this.usernameOnChange = this.usernameOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegisterOnClick = this.handleRegisterOnClick.bind(this);
    }

usernameOnChange(e){
    this.setState({
        username: e.target.value
    });
}

passwordOnChange(e){
    this.setState({
        password: e.target.value
    });
}

handleRegisterOnClick(){
    window.location.href = 'http://' + Config.url + ':3000/register';
}

handleSubmit() {
    let username = this.state.username;
    let password = this.state.password;
  
    if(username===''){
        alert("Username is required!")
        return;
    }
        
    if(password===''){
        alert("Password is required!")
        return;
    }
    
    else{
        let self = this;
        axios.post('http://' + Config.url + ':8080/accountManagementService/user/login',{
            username : username,
            password : password
        }).then(function (response) {
            if(response.data.outputMessage==='success'){
                sessionStorage.setItem('token', response.data.token);
                self.setState({
                    isLoggin:true
                })
            }
            else{
                alert("Username or password is incorrect.")
            }
            
        }).catch(function (error){
            console.log(error);
        });
    }
}

    render(){
        let register_url  = 'http://' + Config.url + ':3000/register';
        let login_url  = 'http://' + Config.url + ':3000/login';
        if(this.state.isLoggin === true) {
            let data = {username:this.state.username};
            let path = {
                pathname: '/home',
                state: data,
            }
            this.props.history.push(path);
            return <Redirect to={path}/>

        }
        return(
            <div className = "login-bg" >
                <nav class="navbar navbar-expand-lg navbar-dark info-color">
                <a class="navbar-brand" href="#">ezKanban</a>
                <form class="form-inline my-2 my-lg-0 ml-auto">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            {/* <li class="nav-item ">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li> */}
                            
                            <li class="nav-item active btn-outline-white btn-md my-2 my-sm-0 ml-3">
                                <a class="nav-link" href={login_url}>Sign in<span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item  btn-outline-white btn-md my-2 my-sm-0 ml-3">
                                <a class="nav-link" href={register_url}>Sign up</a>
                            </li>
                        </ul>
                        
                    </div>    
                        
                    
                    </form>
                </nav>
                
                <MDBContainer className="card-top">  
                    <MDBRow >
                        <MDBCol md="6" className="card-left">
                            <MDBCard>
                                <MDBCardBody>
                                        <p className="h3 text-center mb-4">Sign in</p>
                                        <div className="grey-text">
                                            <MDBInput onInput={this.usernameOnChange}
                                            label="Your username"
                                            icon="user"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            />
                                            <MDBInput onInput={this.passwordOnChange}
                                            label="Your password"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                            />
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn color="cyan" onClick={this.handleSubmit}>Login</MDBBtn>
                                        </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            
    ); 
    }
    
}

export default Register;