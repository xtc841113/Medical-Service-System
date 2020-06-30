import React,{Component} from 'react';
import axios from 'axios';
import Config from '../config.js';
import { Navbar, Nav, Form, Button, Card } from 'react-bootstrap';
import "./Login.css"
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            userId:'',
            isLoggin:false
        }
        this.usernameOnChange = this.usernameOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
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

handleSubmit() {
    let username = this.state.username;
    let password = this.state.password;
  
    if(username===''){
        alert("ID number is required!")
        return;
    }
        
    if(password===''){
        alert("Password is required!")
        return;
    }
    
    else{
        let self = this;
        axios.post(Config.host + Config.accountManagementService_api +'/users/login',{
            username : username,
            password : password
        }).then(function (response) {
            self.setToSessionStorage(response, username);
        }).catch(function (error){ 
            alert("ID number or password is incorrect.")
            // console.log(error);
        });
    }
}

setToSessionStorage = (response, username) => {
    if(response.data.outputMessage==='success'){
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('id', response.data.userId);
        sessionStorage.setItem('ID number', username);
        sessionStorage.setItem('name', response.data.name);
        sessionStorage.setItem('role', response.data.role);
        this.setState({
            isLoggin:true,
            userId:response.data.userId
        })
    }
    return response;
}


    handleKeyPress(e){
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleSubmit();
        }
    }

    render(){
        let register_url  = '/MSS/register';
        // let register_url  = '/register';
        if(this.state.isLoggin === true) {
            let data = {username:this.state.username, userId:this.state.userId};
            let path = {
                pathname: '/MSS/home',
                state: data
            }
            this.props.history.push(path);
            return <Redirect to={path}/>

        }

        document.body.style = 'background: #DDDDDD;';
        return(
            <div>
                <Navbar bg="primary" variant="dark" className="fixed-top">
                    <Navbar.Brand href="#home">Medical Service System</Navbar.Brand>
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    <Form inline>
                        {/* <a class="nav-link" href={login_url}><font color="white">Sign in</font>></a> */}
                        <a className="nav-link" href={register_url}><font color="white">Sign up</font></a>
                    </Form>
                </Navbar>
        <br/> <br/> <br/>
        <Card bg="light" className="login-card">
                 <Card.Body >
                    {/* <Form className="register-card" > */}
            <Form.Group controlId="formBasicEmail">
            <Form.Label>ID number</Form.Label>
            <Form.Control type="text" placeholder="Enter ID number" onInput={this.usernameOnChange} onKeyPress={this.handleKeyPress}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onInput={this.passwordOnChange} onKeyPress={this.handleKeyPress}/>
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
            </Button>
            {/* </Form> */}
                </Card.Body>
            </Card>
                
            </div>
            
    ); 
    }
    
}

export default Login;
