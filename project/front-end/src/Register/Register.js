import React,{Component} from 'react';
import axios from 'axios';
import Config from '../config.js';
import { Navbar, Nav, Form, Button, Card } from 'react-bootstrap';
import "./Register.css"

class Register extends Component {
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
        this.checkID = this.checkID.bind(this);
        this.registerPatient = this.registerPatient.bind(this);
        
    }

usernameOnChange(e){
    this.setState({
        username: e.target.value
    });
}

checkID(id) {
    let tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"                     
    let A1 = new Array (1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3 );
    let A2 = new Array (0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5 );
    let Mx = new Array (9,8,7,6,5,4,3,2,1,1);
    
    if ( id.length != 10 ) return false;
    let i = tab.indexOf( id.charAt(0) );
    if ( i == -1 ) return false;
    let sum = A1[i] + A2[i]*9;
    
    for (var j=1; j<10; j++ ) {
        let v = parseInt( id.charAt(j) );
        if ( isNaN(v) ) return false;
        sum = sum + v * Mx[j];
    }
    if ( sum % 10 != 0 ) return false;
    return true; 
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

registerPatient(username) {
    let self = this;
    axios.post(Config.fhir_api +'/Patient',{
        "resourceType": "Patient",
    
        "identifier": [{
            "value": username
        }]
        
    }).then(function (response) {
        // console.log(response.data)
        axios.post(Config.jsonServer + '/patients',{
            "fhirId": response.data.id,
            "identify": username,
            "name" : self.state.name,
            "email":self.state.email,
            "isFulfill":0
        }).then(function (response){
            alert('Thank you! Your registration was successful!');
            window.location.href = '/MSS/Login';

        }).catch(function (error){
            // console.log(error)
        });
       
    }).catch(function (error){
        // console.log(error);
    });
    return true;
}

handleSubmit() {
    let username = this.state.username;
    let password = this.state.password;
    let email = this.state.email;
    let name = this.state.name;
    if(username===''){
        alert("ID number is required!")
        return;
    }else if(!this.checkID(username)) {
        alert("ID number is wrong!")
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
            systemRole : 'Patient'
        }).then(function (response) {
            self.registerPatient(username);
            
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
        <Navbar bg="primary" variant="dark" className="fixed-top">
            <Navbar.Brand href="/MSS/login">Medical Service System</Navbar.Brand>
            
            <Nav className="mr-auto">
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Form inline>
                <a class="nav-link" href={login_url}><font color="white">Sign in</font></a>
                {/* <a class="nav-link" href={register_url}>Sign up</a> */}
            </Form>
        </Navbar>
        <br/> <br/> <br/>
                


 <Card bg="light" className="register-card h-100">
                 <Card.Body >
                    {/* <Form className="register-card" > */}
            <Form.Group controlId="formBasicEmail">
            <Form.Label>ID number</Form.Label>
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

export default Register;
