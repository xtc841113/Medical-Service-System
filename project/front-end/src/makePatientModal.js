import React, { useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import callPutObservationAPI from "./FHIRAPI/callPutObservationAPI";
import callPostObservationAPI from "./FHIRAPI/callPostObservationAPI";
import callPutPatientAPI from "./FHIRAPI/callPutPatientAPI";
import callPutAllergyAPI from "./FHIRAPI/callPutAllergyAPI";
import callPutFamilyHistoryAPI from "./FHIRAPI/callPutFamilyHistoryAPI";
import callPostAllergyAPI from "./FHIRAPI/callPostAllergyAPI";
import callPostFamilyHistoryAPI from "./FHIRAPI/callPostFamilyHistoryAPI";
import axios from "axios";
import Config from './config'
var moment = require('moment');

class MakePatientModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFamily: this.props.nameFamily,
            nameGiven: this.props.nameGiven,
            gender: this.props.gender,
            patientId: this.props.patientId,
            height: this.props.height,
            weight: this.props.weight,
            birthDate: this.props.birthDate,
            age: 0,
            bloodGroup: this.props.bloodGroup,
            familyHistory: this.props.familyHistory,
            allergy: this.props.allergy,
            city: '',
            addressText: this.props.addressText,
            telecom: this.props.telecom,
            contactsFamily: this.props.contactsFamily,
            contactsGiven: this.props.contactsGiven,
            contactsRelation: this.props.contactsRelation,
            contactsTel: this.props.contactsTel,
            note: '',
        }

    }

    componentDidMount() {
            this.setState({
                nameFamily: this.props.nameFamily,
                nameGiven: this.props.nameGiven,
                gender: this.props.gender,
                patientId: this.props.patientId,
                height: this.props.height,
                weight: this.props.weight,
                birthDate: this.props.birthDate,
                age: 0,
                bloodGroup: this.props.bloodGroup,
                familyHistory: this.props.familyHistory,
                allergy: this.props.allergy,
                city: '',
                addressText: this.props.addressText,
                telecom: this.props.telecom,
                contactsFamily: this.props.contactsFamily,
                contactsGiven: this.props.contactsGiven,
                contactsRelation: this.props.contactsRelation,
                contactsTel: this.props.contactsTel,
            });
    }

    handleSubmit = (event) => {

        let nameFamily = this.state.nameFamily == '' ? this.props.nameFamily : this.state.nameFamily;
        let nameGiven = this.state.nameGiven == '' ? this.props.nameGiven : this.state.nameGiven;
        let gender = this.state.gender == '' ? this.props.gender : this.state.gender;
        let birthDate = this.state.birthDate == '' ?  moment(this.props.birthDate).format('YYYY-MM-DD') : moment(this.state.birthDate).format('YYYY-MM-DD') 
        let telecomeValue = this.state.telecom == '' ? this.props.telecom : this.state.telecom;
        let addressText = this.state.addressText == '' ? this.props.addressText : this.state.addressText;
        let city = this.state.city == '' ? this.props.city : this.state.city;
        let contactsFamily = this.state.contactsFamily == '' ? this.props.contactsFamily : this.state.contactsFamily;
        let contactsGiven = this.state.contactsGiven == '' ? this.props.contactsGiven : this.state.contactsGiven;
        let contactsTel = this.state.contactsTel == '' ? this.props.contactsTel : this.state.contactsTel;
        let contactsRelation = this.state.contactsRelation == '' ? this.props.contactsRelation : this.state.contactsRelation;

        let address = [];
        let name = [];
        let telecom = [];
        let contact = [];
        telecom.push({
            "system": "phone",
            "value": telecomeValue,
            "use": "home",
        })
        address.push({
            "use": "home",
            "type": "both",
            "text": addressText,
            "city": city,
            "district": "",
            "postalCode": "1",
        })
        name.push({
            'family': nameFamily,
            'given': nameGiven
        })

        contact = [{
            'name': {
                'family': contactsFamily,
                'given':  contactsGiven
            },
            'telecom': [{ 'value': contactsTel }],
            'relationship': [{ 'coding': [{ 'code': contactsRelation }] }]
        }]

        let data = {
            "resourceType": "Patient",
            "id": this.props.id,
            "identifier": [{
                "value": this.state.patientId
            }],
            "photo": [{
                "url": "https://ppt.cc/fG5Gtx@.png"
            }],
            name,
            gender,
            birthDate,
            telecom,
            address,
            contact
        }

        let observationWeightResource = {
            "resourceType": "Observation",
            "id": this.props.observationWeightId,
            "code": {
                "coding": [{
                    "system": "http ://loinc.org",
                    "code": "Weight"
                }]
            },
            "subject": {
                "reference": "Patient/".concat(this.props.id)
            }, 'valueQuantity': {
                "value": this.state.weight,
                "unit": "kg"
            }
        }
        let observationHeightResource = {
            "resourceType": "Observation",
            "id": this.props.observationHeightId,
            "code": {
                "coding": [{
                    "system": "http ://loinc.org",
                    "code": "Height"
                }]
            },
            "subject": {
                "reference": "Patient/".concat(this.props.id)
            }, 'valueQuantity': {
                "value": this.state.height,
                "unit": "cm"
            }
        }
        let observationBloodGroupResource = {
            "resourceType": "Observation",
            "id": this.props.observationBloodGroupId,
            "code": {
                "coding": [{
                    "system": "http ://loinc.org",
                    "code": "BloodGroup"
                }]
            },
            "subject": {
                "reference": "Patient/".concat(this.props.id)
            }, "valueString": this.state.bloodGroup
        }

        let allergyResource = {
            "resourceType": "AllergyIntolerance",
            "id": this.props.allergyId,
            "type": "allergy",
            "category": [
                "medication"
            ],
            "code": {
                "coding": [{
                    "system": "http://snomed.info/sct",
                    "code": "7980",
                    "display": this.state.allergy
                }]
            },
            "patient": {
                "reference": "Patient/".concat(this.props.id)
            }
        }

        let familyHistoryResource = {
            "resourceType": "Condition",
            "id": this.props.familyHistoryId,
            "code": {
                "coding": [{
                    "system": "http://snomed.info/sct",
                    "code": "312824007",
                    "display": this.state.familyHistory
                }]
            },
            "subject": {
                "reference": "Patient/".concat(this.props.id)
            }
        }
        this.props.updateName(data);
        this.props.calculatedAge(birthDate);
        this.props.updateObservationInfo('Weight', observationWeightResource);
        this.props.updateObservationInfo('Height', observationHeightResource);
        this.props.updateObservationInfo('BloodGroup', observationBloodGroupResource);
        this.props.updateAllergyInfo(allergyResource);
        this.props.updateFamilyHistory(familyHistoryResource);
        if (this.props.isFulfill === 0) {
            this.props.updateName(data);
            this.props.calculatedAge(birthDate);
            this.props.updateObservationInfo('Weight', observationWeightResource);
            this.props.updateObservationInfo('Height', observationHeightResource);
            this.props.updateObservationInfo('BloodGroup', observationBloodGroupResource);
            this.props.updateAllergyInfo(allergyResource);
            this.props.updateFamilyHistory(familyHistoryResource);
            callPostObservationAPI(observationWeightResource);
            callPostObservationAPI(observationHeightResource);
            callPostObservationAPI(observationBloodGroupResource);
            callPutPatientAPI(data);
            callPostAllergyAPI(allergyResource);
            callPostFamilyHistoryAPI(familyHistoryResource);


            let payload = this.props.jsonServer;
            payload.isFulfill = 1;
            axios.put(Config.jsonServer + '/patients/' + this.props.jsonServer.id, {
                "fhirId": payload.fhirId,
                "identify": payload.identify,
                "name": payload.name,
                "email": payload.email,
                "isFulfill": 1,
                "id": payload.id
            }).then(function (response) {
            }).catch(function (error) {
                console.log(error);
            });

        } else if (this.props.isFulfill === 1) {
            callPutObservationAPI(observationWeightResource);
            callPutObservationAPI(observationHeightResource);
            callPutObservationAPI(observationBloodGroupResource);
            callPutPatientAPI(data);
            callPutAllergyAPI(allergyResource);
            callPutFamilyHistoryAPI(familyHistoryResource);
        }
        this.props.setModalShow(false);
        return;
    }
    handleCityChange = (event) => {
        this.setState({
            city: event.target.value
        })
    }
    handleNameFamilyChange = (event) => {
        const value = event.target.value;
        this.setState({
            nameFamily: value,
        });
    }
    handleBirthDayChange = (date) => {
        this.setState({
            birthDate: date
        });
    };
    handleNameGivenChange = (event) => {
        const value = event.target.value;
        this.setState({
            nameGiven: value,
        });
    }
    handleGenderChange = (event) => {
        const value = event.target.value;
        this.setState({
            gender: value,
        });
    }
    handlePatientIdChange = (event) => {
        this.setState({
            patientId: event.target.value,
        });
    }
    handleHeightChange = (event) => {
        const value = event.target.value;
        this.setState({
            height: value,
        });
    }
    handleWeightChange = (event) => {
        const value = event.target.value;
        this.setState({
            weight: value,
        });
    }
    handleBloodGroupChange = (event) => {
        const value = event.target.value;
        this.setState({
            bloodGroup: value,
        });
    }
    handleFamilyHistoryChange = (event) => {
        const value = event.target.value;
        this.setState({
            familyHistory: value,
        });
    }
    handleAllergyChange = (event) => {
        const value = event.target.value;
        this.setState({
            allergy: value,
        });
    }
    handleAddressTextChange = (event) => {
        const value = event.target.value;
        this.setState({
            addressText: value,
        });
    }
    handleTelecomChange = (event) => {
        const value = event.target.value;
        this.setState({
            telecom: value,
        });
    }
    handleContactsNameFamilyChange = (event) => {
        const value = event.target.value;
        this.setState({
            contactsFamily: value,
        });
    }
    handleContactsNameGivenChange = (event) => {
        const value = event.target.value;
        this.setState({
            contactsGiven: value,
        });
    }
    handleContactsRelationChange = (event) => {
        const value = event.target.value;
        this.setState({
            contactsRelation: value,
        });
    }

    handleContactsTelChange = (event) => {
        const value = event.target.value;
        this.setState({
            contactsTel: value,
        });
    }

    handleNoteChange = (event) => {
        const value = event.target.value;
        this.setState({
            note: value,
        });
    }

    render() {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}
                onHide={this.props.setModalShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        修改
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <Form.Row>
                                <Form.Label>姓名 :</Form.Label>
                                <Col>
                                    <Form.Control id="formNameFamily" placeholder="姓" defaultValue={this.props.nameFamily} onChange={this.handleNameFamilyChange} required type="text" />
                                </Col>
                                <Col>
                                    <Form.Control id="formNameGiven" placeholder="名" defaultValue={this.props.nameGiven} onChange={this.handleNameGivenChange} required type="text" />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="formGendar">
                            <Form.Label>性別 :</Form.Label>
                            <Form.Control id="formGender" placeholder="性別" defaultValue={this.props.gender} onChange={this.handleGenderChange} required type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>身分證字號 :</Form.Label>
                            <Form.Control id="formPatientId" placeholder="身分證字號" defaultValue={this.props.patientId} disabled="true" required type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>生日 :</Form.Label>
                            <DatePicker
                                id="birthPicker"
                                showPopperArrow={false}
                                placeholderText={this.props.birthDate}
                                selected={this.state.birthDate}
                                onChange={date => this.handleBirthDayChange(date)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>身高 :</Form.Label>
                            <Form.Control id="formHeight" type="formCodeDisplay" placeholder="身高" defaultValue={this.props.height} onChange={this.handleHeightChange} required type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>體重 :</Form.Label>
                            <Form.Control id="formWeight" placeholder="體重" defaultValue={this.props.weight} onChange={this.handleWeightChange} required type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>血型 :</Form.Label>
                            <Form.Control id="formBloodGroup" placeholder="血型" defaultValue={this.props.bloodGroup} onChange={this.handleBloodGroupChange} required type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>家族病史 :</Form.Label>
                            <Form.Control id="formFamilyHistory" placeholder="家族病史" defaultValue={this.props.familyHistory} onChange={this.handleFamilyHistoryChange} required type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>過敏藥物 :</Form.Label>
                            <Form.Control id="formAllergy" placeholder="過敏藥物" defaultValue={this.props.allergy} onChange={this.handleAllergyChange} required type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>地區 :</Form.Label>
                                    <Form.Control id="formCity" placeholder="地區" defaultValue={this.props.city} onChange={this.handleCityChange} required type="text" />
                                </Col>
                                <Col>
                                    <Form.Label>住址 :</Form.Label>
                                    <Form.Control id="formAddressText" placeholder="住址" defaultValue={this.props.addressText} onChange={this.handleAddressTextChange} required type="text" />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>電話 :</Form.Label>
                            <Form.Control id="formTelecom" placeholder="電話" defaultValue={this.props.telecom} onChange={this.handleTelecomChange} required type="text" />
                        </Form.Group>
                        <Form.Group controlId="formOutcome">
                            <Form.Label>監護人姓名</Form.Label>
                            <Form.Row>
                                <Col>
                                    <Form.Control id="formContactFamily" placeholder="姓" defaultValue={this.props.contactsFamily} onChange={this.handleContactsNameFamilyChange} required type="text" />
                                </Col>
                                <Col>
                                    <Form.Control id="formContactGiven" type="formCodeDisplay" placeholder="名" defaultValue={this.props.contactsGiven} onChange={this.handleContactsNameGivenChange} required type="text" />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>監護人關係</Form.Label>
                            <Form.Control id="formContactRelation" placeholder="監護人關係" defaultValue={this.props.contactsRelation} onChange={this.handleContactsRelationChange} required type="text" />
                        </Form.Group>
                        <Form.Group controlId="formOutcome">
                            <Form.Label>監護人手機</Form.Label>
                            <Form.Control id="formContactTelecom" placeholder="監護人手機" defaultValue={this.props.contactsTel} onChange={this.handleContactsTelChange} required type="text" />
                        </Form.Group>
                        <Form.Group controlId="formOutcome">
                            <Form.Label>備註</Form.Label>
                            <Form.Control id="formNote" as="textarea" placeholder="Enter outcome" onChange={this.handleNoteChange} required type="text" />
                        </Form.Group>
                        <Button onClick={this.props.setModalShow}>Close</Button>
                        <Button onClick={this.handleSubmit}>Create</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal >
        );
    };
}

export default MakePatientModal;