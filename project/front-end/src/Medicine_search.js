import React from 'react';
import {Button, FormControl} from 'react-bootstrap';
import axios from 'axios';
import Config from './config'
import medicine_search_jpg from './medicine_search.jpg'
import './Medicine_search.css'
import Header from './Header.js';



class Medicine_search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            medicine_list : '',
            result_content : [],
            search_input_field_text : ''
        }
        this.getMedicineList();
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

    sectionClick = (index) =>{
        this.updateResultContentByIndex(index);
    }

    inputOnChange = (s) => {
        this.setState({
            search_input_field_text : s.target.value
        })
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

    render() {
        document.body.style = 'background: #DDDDDD;';

        let ContentImg = [];
        if(this.state.result_content != ''){
            ContentImg.push(
                <td >
                    <div className="w3-third-center" >
                        <div className="w3-card">
                            <div className="w3-container">
                                <h4>{this.state.result_content.code}</h4>
                            </div>
                            <img src={medicine_search_jpg} alt={medicine_search_jpg}  width="100%" height="100%"/>
                            <div className="w3-container">
                                <h4>{this.state.result_content.synonym_zh}</h4>
                            </div>
                        </div>
                    </div>
                </td> 
            )
        }

        let SearchResultTable = [];
        if(this.state.result_content != ''){
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


        let Item = [];
        let Section = [];
        let medicine_size = this.state.medicine_list.length;
            
        if(this.state.medicine_list){
            let j = 1;
            for(let i = 0 ; i <= medicine_size; i++){
                if(j === i / 5 || i === medicine_size){
                    j += 1;
                    Section.push(
                        <div className="w3-row-padding w3-margin-top w3-margin-bottom">
                            {Item}
                        </div>
                    )
                    Item = [];
                    Item.push(
                        <div className="w3-third">
                        <div className="w3-card" onClick={() => this.sectionClick(i)}>
                            <div className="w3-container">
                                    <h4>{this.state.medicine_list[i - 1].code.coding[0].display}</h4>
                            </div>
                            <img src={medicine_search_jpg} alt={medicine_search_jpg}  width="100%" height="100%"/>
                                <div className="w3-container">
                                    <h4>{this.state.medicine_list[i - 1].synonym[0]}</h4>
                                </div>
                        </div>
                    </div>
                    )
                }else {
                    Item.push(
                        <div className="w3-third">
                            <div className="w3-card" onClick={() => this.sectionClick(i)}>
                                <div className="w3-container">
                                        <h4>{this.state.medicine_list[i].code.coding[0].display}</h4>
                                </div>
                                <img src={medicine_search_jpg} alt={medicine_search_jpg}  width="100%" height="100%"/>
                                    <div className="w3-container">
                                        <h4>{this.state.medicine_list[i].synonym[0]}</h4>
                                    </div>
                            </div>
                        </div>
                    );
                }
            }
        }
    
        // document.body.style = 'background: #DDDDDD;';
        return (
            <div>
               <Header/>
                <div style={{
                    'paddingLeft':'25%',
                    'paddingRight':'25%',
                    'display': 'flex'
                }}>
                <FormControl className="searchField" componentclass="input" placeholder="輸入藥品名稱或代號..." onInput={this.inputOnChange} defaultValue={this.state.search_input_field_text} />

                <Button className="searchButton" style ={{'marginLeft':'5px','width' : '80px'}} onClick={this.searchBtnPress} > 搜尋 </Button >
                </div>  

                <div id="outer">
                        <div id="inner">
                            <table  id="content-table">
                                <tbody>
                                <tr>
                                    {ContentImg}
                                    <td >
                                        <table border="1px" id="content-table">
                                        {SearchResultTable}
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                   
                </div>

                <div className="second-title w3-margin">
                    所有藥物
                </div>

                {Section}
            </div>
        )
    }
}

export default Medicine_search;
