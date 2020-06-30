import React from 'react';
import './Home.css';
import Header from './Header.js';
import Config from './config.js';
import axios from 'axios';
import medical_png from './medical.png'
import arrow_png from './arrow.png'
import getPatientIdById from './getPatientIdById';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.getPatientId = this.getPatientId.bind(this);
    if(sessionStorage.getItem("role") === "Patient") {
          this.getPatientId(sessionStorage.getItem('ID number'));
    }

  }



  getPatientId(id) {
    let self = this;
    getPatientIdById(id).then((data) => {console.log(data)
      if (data.isFulfill === 0) {
        alert("請先填寫個人資料!")
        let path = {
          pathname: '/MSS/medicalIdentificationPage'
        }
        self.props.history.push(path);
      }

    })

  }

  render() {
    document.body.style = 'background: #DDDDDD;';

    let medicalRecord = [];
    let medicalRecords = [];
    let medicineManagementPage = [];
    let doctorRegister = [];
    let medicalIdentificationPage = [];
    let prescription = [];

    if (sessionStorage.getItem("role") === "Patient") {
      medicalIdentificationPage.push(
        <a href="/MSS/medicalIdentificationPage">
            <div class="new_home_item">
              <div class="w3-card new_home_item_container">
                <img src={medical_png} alt={medical_png} width="120px" />
                <p>醫療證件</p>
                <img src={arrow_png} alt={arrow_png} width="80px" />
                <i class="fa fa-desktop w3-margin-bottom w3-text-theme" ></i>
              </div>
            </div>
          </a>
      );
      medicalRecords.push(
        <a href="/MSS/medicalRecords">
                    <div class="new_home_item" onClick="/MSS/medicalRecords" >
                      <div class="w3-card new_home_item_container" >
                        <i class="fa fa-diamond w3-margin-bottom w3-text-theme" ></i>
                        <img src={medical_png} alt={medical_png} width="120px" />
                        <p>就診紀錄</p>
                        <img src={arrow_png} alt={arrow_png} width="80px" />
                      </div>
                    </div>
                  </a>
      );
    } else if (sessionStorage.getItem("role") === "Doctor" ) {
      medicalRecord.push(
        <a href="/MSS/medicalRecordPage">
          <div class="new_home_item">
            <div class="w3-card new_home_item_container" >
              <i class="fa fa-diamond w3-margin-bottom w3-text-theme" ></i>
              <img src={medical_png} alt={medical_png} width="120px" />
              <p>電子病歷</p>
              <img src={arrow_png} alt={arrow_png} width="80px" />
            </div>
          </div>
        </a>
      );
      medicineManagementPage.push(
        <a href="/MSS/medicineManagementPage">
        <div class="new_home_item">
          <div class="w3-card new_home_item_container" >
            <i class="fa fa-diamond w3-margin-bottom w3-text-theme" ></i>
            <img src={medical_png} alt={medical_png} width="120px" />
            <p>藥物管理</p>
            <img src={arrow_png} alt={arrow_png} width="80px" />
          </div>
        </div>
        </a>
      );
      prescription.push(
        <a href="/MSS/medicine_search">
            <div class="new_home_item" onClick="/MSS/prescription">
              <div class="w3-card new_home_item_container" >
                <i class="fa fa-diamond w3-margin-bottom w3-text-theme" ></i>
                <img src={medical_png} alt={medical_png} width="120px" />

                <p>處方箋</p>
                <img src={arrow_png} alt={arrow_png} width="80px" />

              </div>
            </div>
          </a>
      );
    }else if(sessionStorage.getItem("role") === "Admin") {
      doctorRegister.push(
        <a href="/MSS/patientManagementPage">
            <div class="new_home_item" onClick="/MSS/patientManagementPage">
              <div class="w3-card new_home_item_container" >
                <i class="fa fa-diamond w3-margin-bottom w3-text-theme" ></i>
                <img src={medical_png} alt={medical_png} width="120px" />

                <p>帳號管理</p>
                <img src={arrow_png} alt={arrow_png} width="80px" />

              </div>
            </div>
          </a>
      );
      medicineManagementPage.push(
        <a href="/MSS/medicineManagementPage">
        <div class="new_home_item">
          <div class="w3-card new_home_item_container" >
            <i class="fa fa-diamond w3-margin-bottom w3-text-theme" ></i>
            <img src={medical_png} alt={medical_png} width="120px" />
            <p>藥物管理</p>
            <img src={arrow_png} alt={arrow_png} width="80px" />
          </div>
        </div>
        </a>
      );
    }

    return (

      <div>

        <Header />


        <div class="w3-row-padding w3-center w3-margin-top">

          <div class="new_home_item_first">
            <div class="new_home_item_container">
              <p>醫療服務系統</p>
              <i class="fa fa-desktop w3-margin-bottom w3-text-theme" ></i>
            </div>
          </div>
          {medicalIdentificationPage}
          <a href="/MSS/medicine_search">
                      <div class="new_home_item" onClick="/MSS/medicine_search">
                        <div class="w3-card new_home_item_container">
                          <i class="fa fa-css3 w3-margin-bottom w3-text-theme" ></i>
                          <img src={medical_png} alt={medical_png} width="120px" />
                          <p>藥物查詢</p>
                          <img src={arrow_png} alt={arrow_png} width="80px" />
                        </div>
                      </div>
                    </a>
          {medicineManagementPage}
          {medicalRecord}
          {medicalRecords}
          {doctorRegister}
          {prescription}
          
        </div>
      </div>

    )
  }
}

export default Home;
