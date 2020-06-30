import React from 'react';
import {Button, FormControl, Table, Form, FormGroup,Col, Modal, Tab, Tabs} from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import axios from 'axios';
import Config from './config'
import Header from './Header.js';

import AllUserTable from './Table/AllUserTable.js'


class PatientManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:'',

            username:'',
            password:'',
            email:'',
            name:'',
            roleOptions:['Patient','Doctor'],
            selectedValue:'',
            selectedLabel:'',

            all_patient_context:[],
            all_practitioner_context:[]
        }

        this.getAllPatient();
        this.getAllPractitioner();
    }

    showAddUserModal = () => {
        this.setState({
            show:true
        })
    }

    closeAddUserModal = () => {
        this.setState({
            username:'',
            name:'',
            email:'',
            password:'',

            show:false
        })
    }

    getAllPatient = () => {
      let self = this;
      axios.get(Config.jsonServer + '/patients')
        .then(function(response){
          self.setToAllPatient(response)
        }).catch(function(error){
          // console.log(error)
        });
    }

    setToAllPatient = (response) => {
      this.setState({
        all_patient_context:response.data
      });
      return response.data;
    }

    getAllPractitioner = () => {
      let self = this;
      axios.get(Config.jsonServer + '/doctors')
        .then(function(response){
            self.setToAllPractitioner(response);
        }).catch(function(error){
          // console.log(error)
        });
    }

    setToAllPractitioner = (response) => {
      this.setState({
        all_practitioner_context:response.data
      });
      return response.data
    }

    usernameOnChange = (e) => {
        this.setState({
            username:e.target.value
        })
    }

    passwordOnChange = (e) => {
        this.setState({
             password:e.target.value
        })
    }

    emailOnChange = (e) => {
        this.setState({
          email:e.target.value
        })
    }

    nameOnChange = (e) => {
        this.setState({
            name:e.target.value
        })
    }

    checkID = (id) => {
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

    addUserSubmit = () => {

      let username = this.state.username;
      let password = this.state.password;
      let email = this.state.email;
      let name = this.state.name;
      let systemRole = this.state.selectedValue;

      if(username===''){
        if(systemRole === 'Patient'){
          alert("ID number is required!")
          return;
        }else {
          alert("username is required!")
          return;
        }  
      }
                
      if(password===''){
        alert("Password is required!")
        return;
      }
          
      if(email===''){
          alert("E-mail is required!")
          return;
      }

      if(systemRole === 'Patient') {
        if(!this.checkID(username)) {
          alert("ID number is wrong!")
          return;
        }
      }else if(systemRole === ''){
        alert("Type is required!")
        return
      }
      
        let self = this;

        axios.post(Config.host + Config.accountManagementService_api +'/users/register',{
            username : username,
            password : password,
            email : email,
            name : name,
            systemRole :systemRole
        }).then(function (response) {
          self.registerUserBySelectedType(username, name);
        }).catch(function (error){
            // console.log(error);
        });
      }

      registerUserBySelectedType = (username, name) => {
        if(this.state.selectedValue === 'Patient'){
          this.registerPatient(username);
          return 'Patient'
        }else if(this.state.selectedValue === 'Doctor'){
          this.registerPractitioner(username, name);
          return 'Doctor'
        }
      }

      registerPatient = (username) => {
        let self = this;
        axios.post(Config.fhir_api +'/Patient',{
            "resourceType": "Patient",
            "identifier": [{
                "value": username
            }]
        }).then(function (response) {
            axios.post(Config.jsonServer + '/patients',{
              "fhirId": response.data.id,
              "identify": username,
              "name" : self.state.name,
              "email":self.state.email,
              "isFulfill":0
            }).then(function (response){
              self.getAllPatient();
              self.closeAddUserModal();
            }).catch(function (error){
                // console.log(error)
            });
           
        }).catch(function (error){
            // console.log(error);
        });
    }

    registerPractitioner(username, name) {
      let self = this;
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
              "fhirId": response.data.id,
              "name" : self.state.name,
              "email":self.state.email
          }).then(function (response){
            self.getAllPractitioner();
            self.closeAddUserModal();
          }).catch(function (error){
              // console.log(error)
          });
         
      }).catch(function (error){
          // console.log(error);
      });
  }


    onSelectType = (option) => {
      this.setState({ 
        selectedValue: option.value,
        selectedLabel: option.value
      })
    }
    
  

    render() {
      // document.body.style = 'background: #000000;';

        return (
            <div>
               <Header/>

                <div style={{'padding-top':'20px',
                            'padding-left':'20px',
                            'padding-right':'20px'}}>
                <Button className="showModalButton" variant="primary" style={{'margin' : '10px'}} onClick={this.showAddUserModal}>Add New User</Button>


                <Tabs defaultActiveKey="Patient" id="uncontrolled-tab-example">
                    <Tab eventKey="Patient" title="Patient">
                      <AllUserTable all_user_context={this.state.all_patient_context} role='Patient'/>    
                    </Tab>
                    <Tab eventKey="Doctor" title="Doctor">
                      <AllUserTable all_user_context={this.state.all_practitioner_context} role='Doctor'/>    
                    </Tab>
                </Tabs>

               
                </div>
                <div>

      <Modal show={this.state.show} onHide={this.closeAddUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
      <Form.Row>
        <Form.Group as={Col} md="10" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control className="usernameInput" required type="text" placeholder="Username" onInput={this.usernameOnChange} />
        </Form.Group>
        <Form.Group as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control className="passwordInput" required type="password" placeholder="Password" onInput={this.passwordOnChange} />
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <Form.Control className="emailInput" required type="email" placeholder="Email" onInput={this.emailOnChange} />
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustomUsername">
          <Form.Label>Name</Form.Label>
          <Form.Control className="nameInput" required type="text" placeholder="Name" onInput={this.nameOnChange} />
        </Form.Group>
        <Form.Group className="roleOptions" as={Col} md="5" controlId="validationCustomUsername122">
            <Form.Label componentclass={Form.Label} sm={9}>
                Type:
            </Form.Label>
            <Col sm={110}>
                <Dropdown options={this.state.roleOptions} onChange={this.onSelectType} value={this.state.selectedLabel} placeholder='Select a type' />
            </Col>
        </Form.Group>
      </Form.Row>
      

        <Button className="closeModalButton" variant="secondary" onClick={this.closeAddUserModal}>   
            Close
          </Button>
        <Button className="addUserSubmitButton" variant="primary" style={{'marginLeft':'10px'}} onClick={this.addUserSubmit}>
            Submit
        </Button>
    </Form>


        </Modal.Body>
      </Modal>

                    </div>
            </div>
        )
    }
}

export default PatientManagementPage;
