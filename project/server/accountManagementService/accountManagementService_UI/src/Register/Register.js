import React,{Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact'
import axios from 'axios';
import Config from '../config.js';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./Register.css"
class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            email:'',
            nickname:''
        }
        this.usernameOnChange = this.usernameOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
        this.nicknameOnChange = this.nicknameOnChange.bind(this);
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

emailOnChange(e){
    this.setState({
        email: e.target.value
    });
}

nicknameOnChange(e){
    this.setState({
        nickname: e.target.value
    });
}

handleRegisterOnClick(){
    window.location.href = 'http://' + Config.url + ':3000/register';
}

handleSubmit() {
    let username = this.state.username;
    let password = this.state.password;
    let email = this.state.email;
    let nickname = this.state.nickname;
    if(username===''){
        alert("Username is required!")
        return;
    }
        
    if(email===''){
        alert("E-mail is required!")
        return;
    }
        
    if(password===''){
        alert("Password is required!")
        return;
    }
    
    else{
        axios.post('http://' + Config.url + ':8080/accountManagementService/user/register',{
            username : username,
            password : password,
            email : email,
            nickname : nickname,
            systemRole : 'User_Role'
        }).then(function (response) {
            alert(response.data.outputMessage)
            if(response.data.outputMessage==='Thank you! Your registration was successful!'){
                window.location.reload();
                window.location.href = 'http://' + Config.url + ':3000/login';
            }
        }).catch(function (error){
            console.log(error);
        });
    }
    
}

    render(){
        let register_url  = 'http://' + Config.url + ':3000/register';
        let login_url  = 'http://' + Config.url + ':3000/login';
        
        return(
            <div className = "register-bg" >
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
                            
                            <li class="nav-item btn-outline-white btn-md my-2 my-sm-0 ml-3">
                                <a class="nav-link" href={login_url}>Sign in</a>
                            </li>
                            <li class="nav-item active btn-outline-white btn-md my-2 my-sm-0 ml-3">
                                <a class="nav-link" href={register_url}>Sign up<span class="sr-only">(current)</span></a>
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
                                        <p className="h3 text-center mb-4">Sign up</p>
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
                                            <MDBInput onInput={this.emailOnChange}
                                            label="Your email"
                                            icon="envelope"
                                            group
                                            type="email"
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
                                            <MDBInput onInput={this.nicknameOnChange}
                                            label="Your nickname"
                                            icon="address-card"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn color="cyan" onClick={this.handleSubmit}>Register</MDBBtn>
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