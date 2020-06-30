import React, { Component } from 'react';
import { Navbar, Nav, Form, Dropdown, Container, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import CrateNewProceedureModelButton from './crateNewProceedureModelButton';
import CallPatientAPI from './FHIRAPI/callPatientAPI';
import CallAllergyIntoleranceAPI from './FHIRAPI/callAllergyIntoleranceAPI';
import CallProcedureAPI from './FHIRAPI/callProcedureAPI';
import getPatientIdById from './getPatientIdById';
import Header from './Header';
import axios from 'axios';
import Config from './config';
import avatar from './avatar.png';

class MedicalRecordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            patientId: '',
            contacts: {},
            birthDate: [],
            name: {},
            gender: "",
            telecom: [],
            imageUrl: "",
            address: {},
            coding: [],
            procedure: [],
            currentProcedId: 0,
            currentTime: null,

        }

    }

    prepare(inputArray) {
        let array = [];
        inputArray.forEach(value => {
            array.push(value);
        })
        return array;
    }

    inputOnChange = (e) => {
        this.setState({
            patientId: e.target.value
        });
    }

    searchPatients = () => {

        if (this.state.patientId === '') {
            alert('請輸入身分證');
            return;
        }

        let self = this;
        getPatientIdById(self.state.patientId).then(response => {
            self.patientInfo(response.fhirId);
        }).catch(function (error) {
            console.log(error)
        });
    }

    patientInfo(fhirId) {
        CallPatientAPI(fhirId).then(data => {
            let telecomArray = this.prepare(data.telecom);
            this.setState({
                id: data.id,
                birthDate: data.birthDate,
                name: data.name[0],
                gender: data.gender,
                address: data.address[0],
                imageUrl: data.photo[0].url,
                telecom: telecomArray,
            });
            CallAllergyIntoleranceAPI(fhirId).then(data => {
                console.log('aaaa', data);
                let codingArray = this.prepare(data.resource.code.coding);
                this.setState({
                    coding: codingArray
                });
            });
            CallProcedureAPI(fhirId).then(data => {
                if (data === undefined) { return }
                let entryArray = this.prepare(data);
                this.setState({
                    procedure: entryArray,
                    currentProcedId: entryArray[0].resource.id,
                });
            });
        })
    }

    componentWillMount() {
        setInterval(function () {
            this.setState({
                currentTime: new Date().toLocaleString()
            });
        }.bind(this), 1000);
    }

    buildMedicalRecordTable() {
        return (
            <div>

                <table align="center" border="1">
                    <tbody>
                        <tr >
                            <h1 align='center'>電子病歷</h1>
                            <tr>
                                <td width="300px">
                                    病歷號碼 :
                            </td>
                                <td>
                                    {this.state.currentProcedId}
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    姓名：
                        </td>
                                <td width="80%">
                                    {this.state.name.family} {this.state.name.given}
                                </td>
                            </tr>
                            <tr>
                                <td width="300px">
                                    生日：
                            </td>
                                <td>
                                    {this.state.birthDate}
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    性別：
                            </td>
                                <td>
                                    {this.state.gender}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    身分證字號 :
                        </td>
                                <td>
                                    {this.state.patientId}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    住址 :
                        </td>
                                <td>
                                    {this.state.address.city} {this.state.address.text}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    電話 :
                        </td>
                                <td>
                                    {this.state.telecom.map((item) => {
                                        if (item.value !== undefined)
                                            return (<div>{item.value}<br /></div>);
                                        else return null;
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    藥物過敏史：
                        </td>
                                {this.state.coding.map((item) => {
                                    return (<tr>{item.display} </tr>);
                                })}
                            </tr>
                            <tr>
                                <td>
                                    過去病史:
                        </td>
                                <td>
                                    <tabble>
                                        <tr>
                                            <tr>
                                                <td >時間</td>
                                                <td >名稱</td>
                                                <td >後續處理</td>
                                            </tr>
                                            {this.state.procedure.map((item) => {

                                                let childMap = this.prepare(item.resource.code.coding);
                                                let display = {};

                                                childMap.forEach((data) => {
                                                    display = data.display;
                                                })
                                                return (

                                                    <tr>
                                                        <td >{item.resource.performedDateTime}</td>
                                                        <td >{display}</td>
                                                        <td >{item.resource.outcome.text}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tr>
                                    </tabble>
                                </td>
                            </tr>
                            <tr>
                                <td width='600px' height='300px'>
                                    病人圖像
                            </td>
                                <td>
                                    <div>
                                        <img
                                            src={avatar}
                                            alt="new"
                                        />
                                    </div>
                                    <div>

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    主治醫師：{sessionStorage.getItem("name")} 醫師
                        </td>
                                <td>
                                    {this.state.currentTime}
                                </td>
                            </tr>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }

    render() {
        document.body.style = 'background: #DDDDDD;';
        return (
            <div >
                <Container>
                    <Header />
                    <div style={{
                        'paddingLeft': '25%',
                        'paddingRight': '25%',
                        'display': 'flex'
                    }}>
                        <FormControl componentclass="input" placeholder="輸入病人身分證字號..." onInput={this.inputOnChange} />

                        <Button style={{ 'marginLeft': '5px', 'width': '80px' }} onClick={this.searchPatients} > 搜尋 </Button >
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="function-manager" style={{ display: 'flex', }}>
                            <CrateNewProceedureModelButton procedureData={this.state.procedure} id={this.state.id} />
                        </div>
                        <br />
                        <div className="button-position" style={{ display: 'flex' }}>
                            {this.buildMedicalRecordTable()}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default MedicalRecordPage;