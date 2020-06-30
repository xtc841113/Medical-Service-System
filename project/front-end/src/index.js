import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route ,Switch} from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import prescription from './Prescription';
import medicine_search from './Medicine_search';
import Logout from './Logout/Logout';
import Error404 from './Error404/Error404';
import ModifyPersonalInformation from './ModifyPersonalInformation/ModifyPersonalInformation';
import medicalRecords from './MedicalRecords';
import Home from './Home';
import medicalRecordPage from './medicalRecordPage';
import medicalIdentificationPage from './medicalIdentificationPage';
import patientManagementPage from './PatientManagementPage';
import medicineManagementPage from './MedicineManagementPage';
import doctorRegister from './Register/Register_doctor';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";



ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <Route exact path="/MSS/login" component={Login}></Route>
                <Route exact path="/MSS/register" component={Register}></Route>
                <Route exact path="/MSS/logout" component={Logout}></Route>
                <Route exact path="/MSS/modifyPersonalInformation" component={ModifyPersonalInformation}></Route>
                <Route exact path="/MSS/home" component={Home}></Route>
                <Route exact path="/MSS/prescription" component={prescription}></Route>
                <Route exact path="/MSS/medicine_search" component={medicine_search}></Route>
                <Route exact path="/MSS/medicalRecords" component={medicalRecords}></Route>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/MSS/medicalRecordPage" component={medicalRecordPage} />
                <Route exact path="/MSS/medicalIdentificationPage" component={medicalIdentificationPage} />
                <Route exact path="/MSS/doctorRegister" component={doctorRegister} />
                <Route exact path="/MSS/patientManagementPage" component={patientManagementPage} />
                <Route exact path="/MSS/medicineManagementPage" component={medicineManagementPage} />
                
                <Route path="*" component={Error404}/>

            </Switch>
        </BrowserRouter>
    ),
    document.getElementById('root')
);
// serviceWorker.unregister();
