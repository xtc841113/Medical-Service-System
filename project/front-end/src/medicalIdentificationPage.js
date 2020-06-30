import React, { Component } from 'react';
import { Navbar, Nav, Form, Dropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CallPatientAPI from './FHIRAPI/callPatientAPI';
import EditUserInforModelButton from './editUserInforModelButton';
import CallAllergyIntoleranceAPI from './FHIRAPI/callAllergyIntoleranceAPI';
import CallObservationAPI from './FHIRAPI/callObservationAPI';
import CallConditionAPI from './FHIRAPI/callConditionAPI.js'
import getPatientIdById from './getPatientIdById';
import Header from './Header';
import avatar from './avatar.png';

class MedicalIdentificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',                 //FHIR自己產生的ID
            patientId: sessionStorage.getItem("ID number"),//身分證
            contacts: [],
            birthDate: '',
            age: 0,
            nameFamily: '',
            nameGiven: '',
            gender: '',
            telecom: [],
            imageUrl: '',
            address: {},
            city: '',
            addressText: '',
            allergy: [],
            allergyId: '',
            observation: [],
            contactsFamily: '',
            contactsGiven: '',
            contactsRelation: [],
            contactsTel: '',
            observationWeightId: '',
            observationHeightId: '',
            observationBloodGroupId: '',
            height: 0,
            weight: 0,
            bloodGroup: '',
            familyHistoryId: '',
            familyHistory: [],
            isFulfill: 0,
            jsonServer: []
        }
    }

    patientInfo = () => {
        getPatientIdById(this.state.patientId).then(jsonData => {
            CallPatientAPI(jsonData.fhirId).then(data => {
                this.setState({
                    isFulfill: data.isFulfill,
                    jsonServer: data
                })
                this.updateName(data);
                CallAllergyIntoleranceAPI(this.state.id).then(data => {
                    this.updateAllergyInfo(data.resource);
                });
                CallObservationAPI(this.state.id).then(data => {
                    let entryArray = this.prepare(data);
                    entryArray.forEach((item) => {
                        this.updateObservationInfo(item.resource.code.coding[0].code, item.resource)
                    });
                });
                CallConditionAPI(this.state.id).then(data => {
                    let entryArray = this.prepare(data);
                    entryArray.forEach((item) => {
                        this.updateFamilyHistory(item.resource);
                    })
                });
            });
        })

    }

    getPatientIdentifiers = () => {
        getPatientIdById(this.state.patientId).then(jsonData => {
            this.setState({
                id: jsonData.fhirId,
                jsonServer: jsonData
            });
        });
    }

    updateName = (data) => {
        let codeArray = [];
        let contactsFamily = "";
        let contactsGiven = "";
        let contactsTel = "";
        data.contact.forEach((item) => {
            contactsFamily = item.name.family;
            contactsGiven = item.name.given;
            let relationshipArray = this.prepare(item.relationship);
            let telecomArray = this.prepare(item.telecom);
            codeArray.push(relationshipArray[0].coding[0].code);
            contactsTel = telecomArray[0].value;
        });
        this.setState({
            id: data.id,
            nameFamily: data.name[0].family,
            nameGiven: data.name[0].given,
            patientId: data.identifier[0].value,
            birthDate: data.birthDate,
            gender: data.gender,
            telecom: data.telecom[0].value,
            address: data.address[0],
            city: data.address[0].city,
            addressText: data.address[0].text,
            contactsFamily: contactsFamily,
            contactsGiven: contactsGiven,
            contactsRelation: codeArray,
            contactsTel: contactsTel,
        });
        let birthDate = this.state.birthDate;
        this.calculatedAge(birthDate);
    }

    updateAllergyInfo = (data) => {
        let codingArray = this.prepare(data.code.coding);
        let tempArray = [];
        codingArray.forEach((item) => {
            tempArray.push(item.display)
        })
        this.setState({
            allergyId: data.id,
            allergy: tempArray,
        })
    }

    updateFamilyHistory = (data) => {
        let itemDisplayArray = [];
        data.code.coding.forEach((item) => {
            itemDisplayArray.push(item.display)
        })
        this.setState({
            familyHistoryId: data.id,
            familyHistory: itemDisplayArray
        })
    }

    updateObservationInfo = (type, observationResource) => {
        if (type === 'Weight') {
            this.setWeight(observationResource);
        } else if (type === 'Height') {
            this.setHeight(observationResource);
        } else if (type === 'BloodGroup') {
            this.setBloodGroup(observationResource);
        }
    }

    setWeight(observationResource) {
        this.setState({
            observationWeightId: observationResource.id,
            weight: observationResource.valueQuantity.value
        })
    }

    setHeight(observationResource) {
        this.setState({
            observationHeightId: observationResource.id,
            height: observationResource.valueQuantity.value
        })
    }

    setBloodGroup(observationResource) {
        this.setState({
            observationBloodGroupId: observationResource.id,
            bloodGroup: observationResource.valueString
        })
    }

    calculatedAge = (birthDate) => {
        let moment = require('moment');
        this.setState({
            age: moment().diff(birthDate, 'years')
        })
    }

    componentWillMount() {
        getPatientIdById(sessionStorage.getItem("ID number")).then(data => {
            if (data.isFulfill === 1) {
                this.patientInfo();
            } else if (data.isFulfill === 0) {
                this.getPatientIdentifiers();
            }
        })
    }

    prepare(inputArray) {
        let array = [];
        inputArray.forEach(value => {
            array.push(value);
        })
        return array;
    }

    render() {
        return (
            <div>
                <Container>
                    <Header />
                    <div className="button-position" style={{ display: 'flex' }}>
                        <EditUserInforModelButton className="editModelButton"
                            {...this.state}
                            updateName={this.updateName}
                            calculatedAge={this.calculatedAge}
                            updateObservationInfo={this.updateObservationInfo}
                            updateAllergyInfo={this.updateAllergyInfo}
                            updateFamilyHistory={this.updateFamilyHistory} />
                        <table align="center" border="1px"><tbody>
                            <tr>
                                <td>
                                    <img src={avatar} alt="new" width="500px" height="500px" />
                                </td>
                                <tr>
                                    <td>姓名 : </td>
                                    <td>{this.state.nameFamily} {this.state.nameGiven}</td>
                                </tr>
                                <tr>
                                    <td>性別 : </td>
                                    <td>{this.state.gender}</td>
                                </tr>
                                <tr>
                                    <td>身分證字號 : </td>
                                    <td>{this.state.patientId}</td>
                                </tr>
                                <tr>
                                    <td>出生年月日 : </td>
                                    <td>{this.state.birthDate}</td>
                                </tr>
                                <tr>
                                    <td>年齡 : </td>
                                    <td>{this.state.age}</td>
                                </tr>
                                <tr>
                                    <td>身高 : </td>
                                    <td>{this.state.height} cm</td>
                                </tr>
                                <tr>
                                    <td>體重 : </td>
                                    <td>{this.state.weight} kg</td>
                                </tr>
                                <tr>
                                    <td>血型 : </td>
                                    <td>{this.state.bloodGroup}</td>
                                </tr>
                                <tr>
                                    <td>家族病史 : </td>
                                    <td>{this.state.familyHistory}</td>
                                </tr>
                                <tr>
                                    <td>過敏藥物 : </td>
                                    <td>{this.state.allergy}</td>
                                </tr>
                                <tr>
                                    <td>住址 : </td>
                                    <td>{this.state.city} {this.state.addressText}</td>
                                </tr>
                                <tr>
                                    <td>電話 : </td>
                                    <td>{this.state.telecom}</td>
                                </tr>
                                <tr>
                                    <td>監護人姓名 : </td>
                                    <td>{this.state.contactsFamily + this.state.contactsGiven}
                                    </td>
                                </tr>
                                <tr>
                                    <td>監護人關係 : </td>
                                    <td>{
                                        this.state.contactsRelation}</td>
                                </tr>
                                <tr>
                                    <td>監護人手機 : </td>
                                    <td>{this.state.contactsTel}</td>
                                </tr>
                                <tr>
                                    <td>備註 : </td>
                                    <td>無</td>
                                </tr>
                            </tr></tbody>
                        </table>
                    </div>
                </Container>
            </div>

        );
    }

}

export default MedicalIdentificationPage;