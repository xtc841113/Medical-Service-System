import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import axios from 'axios';
import Header from './Header.js';
import Config from './config.js';


class MedicalRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: "",
            date: [],
            disease: [],
            hospital: []
        }
    
        this.getPatientIdById = this.getPatientIdById.bind(this);
        this.getProcedures = this.getProcedures.bind(this);
        this.getProcedure = this.getProcedure.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getPatientIdById(sessionStorage.getItem("ID number"));

      }

    getPatientIdById(id) {
    let self = this;
    axios.get(Config.jsonServer + '/patients?identify=' + id)
        .then(function (response) {
            self.getProcedures(response.data[0].fhirId);
        }).catch(function (error) {
            
            
            // console.log(error);
        });
    }

    getProcedures(patientId) {
        let self = this;
        axios.get(Config.fhir_api + "/Procedure?patient=" + patientId + "&_pretty=true")
            .then(function (response) {
                for(let i = 0; i < response.data.entry.length; i++) {
                    let procedureId = response.data.entry[i].resource.id;
                    self.getProcedure(procedureId);
                }
            }).catch(function (error) {
                
                
                // console.log(error);
            });
        }



        setToDateAndDisease = (response) => {
            let date = this.state.date;
            let disease = this.state.disease;
            date.push(response.data.performedDateTime);
            disease.push(response.data.outcome.text);  
            
            this.setState({
                date,
                disease
            })  
        }

      getProcedure(id) {
        let self = this;
        axios.get(Config.fhir_api + "/Procedure/" + id + "?_pretty=true")
            .then(function (response) {
                let locationId = response.data.location.reference.substr(9);
                self.getLocation(locationId);
                self.setToDateAndDisease(response);
            }).catch(function (error) {
                console.log(error);
            });
      }

      getLocation(id) {
        let self = this;
        axios.get(Config.fhir_api + "/Location/" + id + "?_pretty=true")
            .then(function (response) {
            //   console.log("hospital : " + response.data.name);  
              let hospital = self.state.hospital;
              hospital.push(response.data.name);

              self.setState({
                  hospital
              })
            }).catch(function (error) {
                console.log(error);
            });
      }
 
    render() {
        const badgeOfMedicalRecord = {
            "textAlign": "center"
        };

        let self = this;
        let disease = [];

        for(let i = 0; i < self.state.date.length; i++) {
            disease.push(
                <tr>
                    <th width = "20%">{self.state.date[i]}</th>
                    <th width = "20%">{self.state.hospital[i]}</th>
                    <th width = "60%">{self.state.disease[i]}</th>
                </tr>
            );
        }
 
        return (
            <div>
                <Header/>
                <div className="medicalRecord" style={badgeOfMedicalRecord}>
                    <h1>
                        <Badge pill variant="primary">
                            就診紀錄
                        </Badge>
                    </h1>
                </div>
                <div>
                    <Table variant="info">
                        <thead>
                            <tr>
                                <th width = "20%">就醫日期</th>
                                <th width = "20%">醫事機構</th>
                                <th width = "60%">疾病分類</th>
                            </tr>
                        </thead>
                    </Table>
                    <Table>
                        {disease}
                    </Table>                    
                </div>
            </div>
        )
    }
 
}
 
export default MedicalRecords;