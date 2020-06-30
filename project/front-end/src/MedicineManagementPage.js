import React from 'react';
import {Button, FormControl, Table, Form, FormGroup,Col, Modal, Tab, Tabs} from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import axios from 'axios';
import Config from './config'
import Header from './Header.js';

import MedicineTable from './Table/MedicineTable.js'


class MedicineManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            medicine_list : [],
            result_content : [],
            search_input_field_text : '',

            add_medicine_content : {},

            doseFormOptions : ['capsule','tablets'],
            selectedDoseFormLabel:'',

            classificationOptions : ['學名藥','原廠藥'],
            selectedClassificationLabel:'',

            statusOptions : ['active','inactive'],
            selectedStatusLabel : ''
        }
        this.getMedicineList();
    }


    getMedicineList = () => {
        let self = this;
        axios.get(Config.fhir_api + '/MedicationKnowledge?_pretty=true',{ 
            cache: false
        }).then(function (response) {
            // console.log(response)
            self.setToMedicineList(response);
        })
        .catch(function (error) {
        //   console.log(error);
        });
    }

    setToMedicineList = (response) => {
        let medicine = [];
        response.data.entry.forEach(medicine_data =>{
            medicine.push(medicine_data.resource);
        });

        this.setState({
            medicine_list:medicine
        })
        this.forceUpdate();
        return medicine
    }

    showAddMedicineModal = () => {
        this.setState({
            show:true
        });
    }

    closeAddMedicine = () => {
        this.setState({
            show:false
        });
    }


    codeOnChange = (e) => {
        let code = {
            "code": e.target.value,
            "display": e.target.value
        }
        this.setState({
            add_medicine_content:{...this.state.add_medicine_content, code}
        })
    }
    
    synonymEnOnChange = (e) => {
        let synonym_en = e.target.value
        
        this.setState({
            add_medicine_content:{...this.state.add_medicine_content, synonym_en}
        })
    }

    synonymZhOnChange = (e) => {
        let synonym_zh = e.target.value
        
        this.setState({
            add_medicine_content:{...this.state.add_medicine_content, synonym_zh}
        })
    }

    ingredientOnChange = (e) => {
        let ingredient = e.target.value
        
        this.setState({
            add_medicine_content:{...this.state.add_medicine_content, ingredient}
        })
    }

    amountOnChange = (e) => {
        let amount = e.target.value
        
        this.setState({
            add_medicine_content:{...this.state.add_medicine_content, amount}
        })
    }

    costOnChange = (e) => {
        let cost = e.target.value
        
        this.setState({
            add_medicine_content:{...this.state.add_medicine_content, cost}
        })
    }

    manufacturerOnChange = (e) => {
        let manufacturer = e.target.value
        
        this.setState({
            add_medicine_content:{...this.state.add_medicine_content, manufacturer}
        })
    }
    
    onSelectDoseForm = (option) => {
        let doseForm = option.value
        this.setState({ 
            selectedDoseFormLabel: doseForm,
            add_medicine_content:{...this.state.add_medicine_content, doseForm}
        })
    }

    onSelectClassification = (option) => {
        let medicineClassification = option.value
        this.setState({ 
            selectedClassificationLabel: medicineClassification,
            add_medicine_content:{...this.state.add_medicine_content, medicineClassification}
        })
    }

    onSelectStatus = (option) => {
        let status = option.value
        this.setState({ 
            selectedStatusLabel: status,
            add_medicine_content:{...this.state.add_medicine_content, status}
        })
    }


    addMedicineClick = (event) => {

    
        if(this.state.selectedDoseFormLabel === '') {
            return;
        } 
        else if(this.state.selectedClassificationLabel === '' ){
            return;

        }else if( this.state.selectedStatusLabel === '') {
            return;
        }

       
        let data = this.medicineToJson();

        this.addMedicineAPI(data);
    }

    medicineToJson = () => {

        let resourceType = "MedicationKnowledge"
        let code = {
            "coding":[
                {
                    "code":this.state.add_medicine_content.code.code,
                    "display":this.state.add_medicine_content.code.display
                }
            ]
        }

        let synonym = [
            this.state.add_medicine_content.synonym_zh,
            this.state.add_medicine_content.synonym_en
        ]

        let ingredient = [
            {
                "itemCodeableConcept":{
                    "text":this.state.add_medicine_content.ingredient
                }
            }
        ]

        let amount = {
            "value" :this.state.add_medicine_content.amount,
            "unit" : "mg/ml"
        }

        let cost = [
            {
                "cost":{
                    "value":this.state.add_medicine_content.cost
                }
            }
        ]

        let manufacturer = {
            "reference" : "#" + this.state.add_medicine_content.manufacturer
        }

        let doseForm = {
            "text" :this.state.add_medicine_content.doseForm
        }

        let medicineClassification = [
            {
                "classification":[
                    {
                        "text":this.state.add_medicine_content.medicineClassification
                    }
                ]
            }
        ]

        let status = this.state.add_medicine_content.status


        

        return ({resourceType, code, synonym, ingredient, amount, cost, manufacturer, doseForm, medicineClassification, status})
    }

    addMedicineAPI = (payload) => {
        let self = this;
        axios.post(Config.fhir_api + '/MedicationKnowledge?_format=json&_pretty=true',payload)
        .then(function (response) {
            // console.log(response);

            self.getMedicineList()
            self.closeAddMedicine();
        })
        .catch(function (error) {
            // console.log(error);
        });
    }

    render() {



        return (
            <div>
                <Header/>
                <div style={{'padding-top':'20px',
                            'padding-left':'20px',
                            'padding-right':'20px'}}>
                <Button className="showModalButton" variant="primary" style={{'margin' : '10px'}} onClick={this.showAddMedicineModal}>Add New Medicine</Button>

                <Tabs defaultActiveKey="Medicine" id="uncontrolled-tab-example">
                    <Tab eventKey="Medicine" title="Medicine">
                      <MedicineTable medicine_list={this.state.medicine_list}/>    
                    </Tab>
                </Tabs>

                </div>
                <div>

                <Modal show={this.state.show} onHide={this.closeAddMedicine}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>  
                <Form.Row>
                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                    <Form.Label>藥品代碼</Form.Label>
                    <Form.Control className="codeInput" required type="text" placeholder="藥品代碼" onInput={this.codeOnChange}/>
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                    <Form.Label>藥品名稱(英文)</Form.Label>
                    <Form.Control className="synonymEnInput" required type="text" placeholder="藥品名稱(英文)" onInput={this.synonymEnOnChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                    <Form.Label>藥品名稱(中文)</Form.Label>
                    <Form.Control className="synonymZhInput" required type="text" placeholder="藥品名稱(中文)" onInput={this.synonymZhOnChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustomUsername2">
                    <Form.Label>成分</Form.Label>
                    <Form.Control className="ingredientInput" required type="text" placeholder="成分" onInput={this.ingredientOnChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="5" controlId="validationCustomUsername3">
                    <Form.Label>成分含量</Form.Label>
                    <Form.Control className="amountInput" required type="text" placeholder="成分含量" onInput={this.amountOnChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="5" controlId="validationCustomUsername4">
                    <Form.Label>價格</Form.Label>
                    <Form.Control className="costInput" required type="text" placeholder="價格" onInput={this.costOnChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="10" controlId="validationCustomUsername5">
                    <Form.Label>藥商</Form.Label>
                    <Form.Control className="manufacturerInput" required type="text" placeholder="藥商" onInput={this.manufacturerOnChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="5" controlId="validationCustomUsername6">
                        <Form.Label componentclass={Form.Label} sm={9}>
                            劑型:
                        </Form.Label>
                        <Col sm={110}>
                            <Dropdown className="doseFormOptions" options={this.state.doseFormOptions} onChange={this.onSelectDoseForm} value={this.state.selectedDoseFormLabel} placeholder='劑型' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} md="5" controlId="validationCustomUsername7">
                        <Form.Label componentclass={Form.Label} sm={9}>
                            藥品分類:
                        </Form.Label>
                        <Col sm={110}>
                            <Dropdown className="classificationOptions" options={this.state.classificationOptions} onChange={this.onSelectClassification} value={this.state.selectedClassificationLabel} placeholder='藥品分類' />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} md="5" controlId="validationCustomUsername8">
                        <Form.Label componentclass={Form.Label} sm={9}>
                            備註:
                        </Form.Label>
                        <Col sm={110}>
                            <Dropdown className="statusOptions" options={this.state.statusOptions} onChange={this.onSelectStatus} value={this.state.selectedStatusLabel} placeholder='備註' />
                        </Col>
                    </Form.Group>
                </Form.Row>
                
                    <Button className="closeModalButton" variant="secondary" onClick={this.closeAddMedicine}>   
                        Close
                    </Button>
                    <Button className="addMedicineButton" variant="primary" type="button" style={{'marginLeft':'10px'}} onClick={this.addMedicineClick}>
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

export default MedicineManagementPage;
