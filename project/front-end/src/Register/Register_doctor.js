import React,{Component} from 'react';
import axios from 'axios';
import Config from '../config.js';
import { Navbar, Nav, Form, Button, Card } from 'react-bootstrap';
import "./Register.css"
import Header from '../Header'

class Register_doctor extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            email:'',
            name:''
        }
        this.usernameOnChange = this.usernameOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
        this.nameOnChange = this.nameOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerPractitioner = this.registerPractitioner.bind(this);
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

nameOnChange(e){
    this.setState({
        name: e.target.value
    });
}

registerPractitioner(username, name) {
    axios.post(Config.fhir_api +'/Practitioner',{
        "resourceType": "Practitioner",
        "identifier": [{
            "value": username
        }],
        "name": [{
            "family": "",
            "given": [
                name
            ],
            "prefix": [
                "DR"
            ]
        }]
        
    }).then(function (response) {
        axios.post(Config.jsonServer + '/doctors',{
            "username": username,
            "fhirId": response.data.id
        }).then(function (response){

        }).catch(function (error){
            // console.log(error)
        });
       
    }).catch(function (error){
        // console.log(error);
    });
}

handleSubmit() {
    let username = this.state.username;
    let password = this.state.password;
    let email = this.state.email;
    let name = this.state.name;
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
        let self = this;

        axios.post(Config.host + Config.accountManagementService_api +'/users/register',{
            username : username,
            password : password,
            email : email,
            name : name,
            systemRole : 'Doctor'
        }).then(function (response) {
            self.registerPractitioner(username, name);
            alert(response.data.message)
            let path = {
                pathname: '/MSS/home'
              }
                self.props.history.push(path);
        }).catch(function (error){
            // console.log(error);
        });
    }
    
}

    render(){
        // let register_url  = 'http://' + Config.host + '/register';
        let login_url  = '/MSS/login';
        // let login_url  = Config.front_end;
        
        document.body.style = 'background: #DDDDDD;';
        return(
            <div>
        <Header />
                
                <div align="center"><font size="50">Doctor</font></div>


 <Card bg="light" className="register-card h-100">
                 <Card.Body >
                    {/* <Form className="register-card" > */}
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter ID number" onInput={this.usernameOnChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onInput={this.passwordOnChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onInput={this.emailOnChange}/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

        
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onInput={this.nameOnChange}/>
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

export default Register_doctor;
