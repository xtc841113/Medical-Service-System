import React from 'react';
import {Button, FormControl } from 'react-bootstrap';
import axios from 'axios';
import Config from './config'
import Header from './Header.js';


class Prescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            patient_identify_field_text : '',
            patient_data:'',
            practitioner_data:'',

            medicine_list : '',

            search_input_field_text : '',
            result_content: '',

            amount_input_field_text : '',
            prescription_list : ''
        
        }
        this.getMedicineList();
    }

    identifyInputOnChange = (e) => {
        this.setState({
            patient_identify_field_text : e.target.value
        });
    }

    checkID(id) {
        let tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"                     
        let A1 = new Array (1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3 );
        let A2 = new Array (0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5 );
        let Mx = new Array (9,8,7,6,5,4,3,2,1,1);
        
        if ( id.length !== 10 ) return false;
        let i = tab.indexOf( id.charAt(0) );
        if ( i === -1 ) return false;
        let sum = A1[i] + A2[i]*9;
        
        for (var j=1; j<10; j++ ) {
            let v = parseInt( id.charAt(j) );
            if ( isNaN(v) ) return false;
            sum = sum + v * Mx[j];
        }
        if ( sum % 10 !== 0 ) return false;
        return true; 
    }
    
    IdentifyBtnClick = () => {
        if(this.state.patient_identify_field_text === ''){
            alert("ID number is required!")
            return;
        }else if(!this.checkID(this.state.patient_identify_field_text)) {
            alert("ID number is wrong!")
            return;
        }

        this.getPatientIdById(this.state.patient_identify_field_text);
    }

    getPatientIdById = (id) => {
        let self = this;
        axios.get(Config.jsonServer + '/patients?identify=' + id, {
            cache: false
        }).then(function (response) { 
                self.getPatientDataById(response.data[0].fhirId);            
        }).catch(function (error) {
        alert('找不到該病患!');
        // console.log(error);
        });
    }

    getPatientDataById = (id) => {
        let self = this;
        axios.get(Config.fhir_api + '/Patient/' + id + '?_pretty=true')
            .then(function (response) {
                self.setToPatientData(response)
                self.getProcedures(id);
            }).catch(function (error) {
            // console.log(error);
        });
    }

    setToPatientData = (response) => {
        let patient_data = {
            'name' : response.data.name[0].family + response.data.name[0].given[0],
            'identify' : response.data.identifier[0].value,
            'birthdate' : response.data.birthDate
        }

        this.setState({
            patient_data
        });

        return patient_data;
    }

    getProcedures = (patientId) => {
        let self = this;
        axios.get(Config.fhir_api + "/Procedure?patient=" + patientId + "&_pretty=true")
            .then(function (response) {
                self.getProcedure(response.data.entry[response.data.entry.length - 1].resource.id);
            }).catch(function (error) {
                // console.log(error);
            });
    }

    getProcedure = (id) => {
        let self = this;
        axios.get(Config.fhir_api + "/Procedure/" + id + "?_pretty=true")
            .then(function (response) {
                self.setProcedureToPatientData(response);
                self.getPractitionerById(response.data.performer[0].actor.reference.substr(13));
            }).catch(function (error) {
                // console.log(error);
            });
    }

    setProcedureToPatientData = (response) => {
        let patient_data = {
            ...this.state.patient_data,
            'disease': response.data.reasonCode[0].coding[0].display
        }
        this.setState({
            patient_data
        })  

        return patient_data;
    }

    getPractitionerById = (id) => {
        let self = this;
        axios.get(Config.fhir_api + "/Practitioner/" + id + "?_pretty=true")
            .then(function (response) {
                this.setPractitionerData(response);
            }).catch(function (error) {
                // console.log(error);
        });
    }

    setToPractitionerData = (response) => {
        let practitioner_data = {
            'name': response.data.name[0].given[0] + response.data.name[0].family,
            'identifier': response.data.identifier[0].value.substr(0,6) + '****'
        }
        
        this.setState({
            practitioner_data
        })  

        return practitioner_data;
    }


    getMedicineList = () => {
        let self = this;
        axios.get(Config.fhir_api + '/MedicationKnowledge?_pretty=true')
        .then(function (response) {
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
        return medicine
    }
    

    searchInputOnChange = (e) => {
        this.setState({
            search_input_field_text : e.target.value
        });
    }

    searchBtnPress = () => {
        if(this.state.search_input_field_text === '') {
            alert('請輸入藥品名稱或代號!')
            return;
        }
        for(let index = 0; index< this.state.medicine_list.length ; index++){ 
            if( this.state.search_input_field_text === this.state.medicine_list[index].synonym[0] || this.state.search_input_field_text === this.state.medicine_list[index].code.coding[0].code){
                this.updateResultContentByIndex(index);
                return;
            }
        }
        alert('找不到' + this.state.search_input_field_text + '藥品!')
    }

    updateResultContentByIndex = (index) => {
        var data = {
            'classification' : this.state.medicine_list[index].medicineClassification[0].classification[0].text,
            'code' : this.state.medicine_list[index].code.coding[0].code,
            'amount' : this.state.medicine_list[index].amount.value + ' ' + this.state.medicine_list[index].amount.unit,
            'synonym_zh' : this.state.medicine_list[index].synonym[0],
            'synonym_en' : this.state.medicine_list[index].synonym[1],
            'cost' : this.state.medicine_list[index].cost[0].cost.value,
            'manufacturer' : this.state.medicine_list[index].manufacturer.reference,
            'doseForm' : this.state.medicine_list[index].doseForm.text,
            "status": this.state.medicine_list[index].status,
            "ingredient" : this.state.medicine_list[index].ingredient[0].itemCodeableConcept.text
        };
        
        this.setState({
            result_content : data
        });

        return data;
    }

    amountInputChange = (e) => {
        this.setState({amount_input_field_text : e.target.value});
    }
    
    addPrescriptionBtnPress = () => {
        if(this.state.result_content === ''){
            alert('請選擇藥品!')
            return;
        }

        if(this.state.amount_input_field_text === '') {
            alert('請輸入總量!')
            return;
        }

        let data = {
            code : this.state.result_content.code,
            name : this.state.result_content.synonym_zh,
            doseForm : this.state.result_content.doseForm,
            dosage :'用量',
            total_dosage : this.state.amount_input_field_text
        };

        let prescription_list = [...this.state.prescription_list,data];

        this.setState({
            prescription_list
        })

        return prescription_list;
    }

    removePrescriptionByIndex(index) {
        this.state.prescription_list.splice(index, 1);
        this.setState({
            removePrescriptionByIndex : this.state.prescription_list
        })
    }

    printScreen = () => {

        if(this.state.prescription_list == '') {
            alert('尚未開藥');
            return;
        }

        const exportImage = document.getElementsByClassName("exportImage")[0].cloneNode(true);
        
        var w = window.open();
        w.document.body.append(exportImage);
    }

    render() {
        document.body.style = 'background: #DDDDDD;';

        let MedicineListTable = [];
        
        let title_list = [
            '藥品代碼',
            '藥品名稱(英文)',
            '藥品名稱(中文)',
            '成分',
            '成分含量'
        ];

        let title = [];
        for(let i = 0;i<title_list.length ;i++){
            title.push(
                <td>{title_list[i]}</td>
            )
        }
        MedicineListTable.push(
            <tr>
                {title}
            </tr>
        )

        for(let index = 0; index < this.state.medicine_list.length; index++){
           
                let content_list = [
                    this.state.medicine_list[index].code.coding[0].code,
                    this.state.medicine_list[index].synonym[1],
                    this.state.medicine_list[index].synonym[0],
                    this.state.medicine_list[index].ingredient[0].itemCodeableConcept.text,
                    this.state.medicine_list[index].amount.value + ' ' + this.state.medicine_list[index].amount.unit
                ];

                let content = [];
                for(let i = 0;i<title_list.length ;i++){
                    content.push(
                        <td>{content_list[i]}</td>
                    )
                }
                MedicineListTable.push(
                    <tr>
                        {content}
                        <td><Button className="medicineSelectButton" onClick={() => this.updateResultContentByIndex(index)}>選擇</Button></td>
                    </tr>
                )
        }
        
        let SearchResultTable = [];
        if(this.state.result_content != '') {
            let title_list = ['藥品代碼',
                            '藥品名稱(英文)',
                            '藥品名稱(中文)',
                            '成分',
                            '成分含量',
                            '價格',
                            '藥商',
                            '劑型',
                            '藥品分類',
                            '備註'];
            let content_list = [this.state.result_content.code,
                                this.state.result_content.synonym_en,
                                this.state.result_content.synonym_zh,
                                this.state.result_content.ingredient,
                                this.state.result_content.amount,
                                this.state.result_content.cost,
                                this.state.result_content.manufacturer,
                                this.state.result_content.doseForm,
                                this.state.result_content.classification,
                                this.state.result_content.status];
            for(let i = 0;i<title_list.length ;i++){
                SearchResultTable.push(
                    <tr>
                        <td>{title_list[i]}</td>
                        <td>{content_list[i]}</td>
                    </tr>
                )
            }
        }

        let PrescriptionTable = [];
        PrescriptionTable.push(
            <tr>
                <td>代碼</td>
                <td>藥品名稱規格</td>
                <td>用量及用法</td>
                <td>總量</td>
            </tr>
        )
        
        if(this.state.prescription_list != '') {
            for(let i = 0; i < this.state.prescription_list.length; i++)
                PrescriptionTable.push(
                    <tr>
                        <td>{this.state.prescription_list[i].code}</td>
                        <td>{this.state.prescription_list[i].name}({this.state.prescription_list[i].doseForm})</td>
                        <td>{this.state.prescription_list[i].dosage}</td>
                        <td>{this.state.prescription_list[i].total_dosage}</td>
                        <td className="btnTd"><Button className="removeButton" variant="danger" onClick={() => this.removePrescriptionByIndex(i)}>x</Button></td>
                    </tr>
                )
        }

        let PatientData;
        if(this.state.patient_data != ''){
            var today = new Date();
            PatientData = [
                ' 姓名 : ' + this.state.patient_data.name,
                ' 身分證 : ' + this.state.patient_data.identify,
                ' 生日 : ' + this.state.patient_data.birthdate,
                <br/>,
                ' 科別 : ' + '****',
                ' 就診日 : ' + (today.getMonth() + 1) + '/' + today.getDate(),
                ' 傷病名稱 : ' + this.state.patient_data.disease,
                ' (給藥30天)'

            ];
        }

    const div_style = {'display':'flex','padding-left':'25%','padding-right':'25%', 'padding-top':'5px', 'padding-bottom':'5px'}
    const btn_style = {'width': '80px','margin-left': '5px'}

        return (
            <div>
                <Header/>
                <div style={div_style}>
                    <FormControl className="patientSearchField" componentclass="input" placeholder="請輸入病人身分證" onInput={this.identifyInputOnChange} defaultValue={this.state.patient_identify_field_text} />
                    <Button className="patientSearchButton" style={btn_style} onClick={this.IdentifyBtnClick}>查詢</Button>
                </div>
                <table align="center"  border="1px">
                    {MedicineListTable}
                </table>
               
                <div style={div_style}>
                    <FormControl className="searchField" componentclass="input" placeholder="輸入藥品名稱或代號..." onInput={this.searchInputOnChange} defaultValue={this.state.search_input_field_text} />
                    <Button className="searchButton" style={btn_style} onClick={this.searchBtnPress}> 搜尋 </Button>
                </div>

                <div>  
                <table align="center"  border="1px">
                    <tr>
                        {SearchResultTable}
                    </tr>
                    </table>
                </div>
                
                <div style={div_style}>
                    <FormControl className="amountField" componentclass="input" placeholder="請輸入劑量" onInput={this.amountInputChange} defaultValue={this.state.amount_input_field_text} />
                    <Button className="prescriptionAddedButton" style={btn_style} onClick={this.addPrescriptionBtnPress}> 新增 </Button>
                </div>
              
              <div className="exportImage">
                <div align="center">
                            {PatientData}
                    </div>
                    <div className="button-position" style={{ display: 'flex' }}>
                        <table align="center"  border="1px"><tbody>
                            <tr>
                                {PrescriptionTable}
                            </tr></tbody>
                        </table>
                    </div>
                    
                    <table align="center" width = "500px">
                        <tr> 
                                <td width ="30%" style={{'text-align': 'center'}}>醫師姓名:{this.state.practitioner_data.name} 代號:{this.state.practitioner_data.identifier}</td>
                        </tr>
                    </table>
                    <div align="center" style={{'paddingBottom':'20px'}}>
                    ＊請自行至健保特約藥局領藥＊
                    </div>
                </div>
                <br/>
                <div style={{'textAlign':'center'}}>
                    <Button onClick={this.printScreen}>輸出處方箋</Button>

                </div>
            </div>
        )
    }
}

export default Prescription;