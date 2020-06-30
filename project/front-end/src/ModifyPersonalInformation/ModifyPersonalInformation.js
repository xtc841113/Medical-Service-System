import React,{Component} from 'react';
import axios from 'axios';
import Config from '../config.js';
import { Navbar, Nav, Form, Button, Card } from 'react-bootstrap';

class ModifyPersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state={
            originalPassword:'',
            newPassword:'',
            email:'',
            name:'',
            token:sessionStorage.getItem("token")
        }
        this.newPasswordOnChange = this.newPasswordOnChange.bind(this);
        this.originalPasswordOnChange = this.originalPasswordOnChange.bind(this);
        this.emailOnChange = this.emailOnChange.bind(this);
        this.nameOnChange = this.nameOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserByUserId = this.getUserByUserId.bind(this);
        this.getUserByUserId();
 
    }

    newPasswordOnChange(e){
        this.setState({
            newPassword: e.target.value
        });
    }

    originalPasswordOnChange(e){
        this.setState({
            originalPassword: e.target.value
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

    handleSubmit() {
        let originalPassword = this.state.originalPassword;
        let newPassword = this.state.newPassword;
        let email = this.state.email;
        let name = this.state.name;

        if(originalPassword===''){
            alert("Old password is required!")
            return;
        }

        if(newPassword==='') {
            alert("New password is required!")
        }
            
        if(email===''){
            alert("E-mail is required!")
            return;
        }
            
        if(name===''){
            alert("name is required!")
            return;
        }
    
        else{
            axios.put(Config.host + Config.accountManagementService_api +'/users/personalInformation',{
                userId : sessionStorage.getItem("id"),
                email : email,
                originalPassword : originalPassword,
                newPassword : newPassword,
                name : name
            }).then(function (response) {
                if(response.data.outputMessage==='Modify Complete.'){
                    alert("Modify Complete.");
                    sessionStorage.removeItem("token")
                    window.location.href = '/MSS/login';
                }
            }).catch(function (error){
                alert("Wrong Password!")
                // console.log(error);
            });
        }
        
    }

    getUserByUserId() {
        let self = this;
        axios.post(Config.host + Config.accountManagementService_api +'/users',{
            userId : sessionStorage.getItem("id")
        }).then(function (response) {
            self.setState({
                email: response.data.userModel.email,
                name: response.data.userModel.name
            });
        }).catch(function (error){
            // console.log(error);
        });
        
    }


    render(){
        document.body.style = 'background: #DDDDDD;';

        return(
            <div>
                <Navbar bg="primary" variant="dark" className="fixed-top">
                    <Navbar.Brand href="/MSS/home">
                        Medical Service System
                    </Navbar.Brand>
                    
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    <Form inline>
                    </Form>
                </Navbar>
                <br/> <br/> <br/>
                        


                <Card bg="light" className="register-card h-100">
                    <Card.Body >
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Old password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Old Password" onInput={this.originalPasswordOnChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>New password</Form.Label>
                        <Form.Control type="password" placeholder="Enter New Password" onInput={this.newPasswordOnChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" defaultValue={this.state.email} onInput={this.emailOnChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                    
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.name} onInput={this.nameOnChange}/>
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

export default ModifyPersonalInformation;
