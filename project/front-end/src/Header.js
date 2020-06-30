import React from 'react';
import { Navbar, Nav, Form, Dropdown, NavDropdown} from 'react-bootstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        // document.body.style = 'background: #DDDDDD;';

        let name = sessionStorage.getItem('name');

        let medicalRecord = [];
        let medicalRecords = [];
        let medicineManagementPage = [];
        let doctorRegister = [];
        let medicalIdentificationPage = [];
        let prescription = [];

        if(sessionStorage.getItem("role") === "Patient") {
            medicalIdentificationPage.push(
                <Nav.Link href="/MSS/medicalIdentificationPage">醫療證件</Nav.Link>
            )
            medicalRecords.push(
                <Nav.Link href="/MSS/medicalRecords">就診紀錄</Nav.Link>
            );
            
        }else if(sessionStorage.getItem("role") === "Doctor") {
            medicalRecord.push(
                <Nav.Link href="/MSS/medicalRecordPage">電子病歷</Nav.Link>
            );
            medicineManagementPage.push(
                <Nav.Link href="/MSS/medicineManagementPage">藥物管理</Nav.Link>
            );
            prescription.push(
                <Nav.Link href="/MSS/prescription">處方箋</Nav.Link>
            );
        }

        if (sessionStorage.getItem("role") === "Admin") {
            doctorRegister.push(
                <Nav.Link href="/MSS/patientManagementPage">帳號管理</Nav.Link>
            )
            medicineManagementPage.push(
                <Nav.Link href="/MSS/medicineManagementPage">藥物管理</Nav.Link>
            );
        }

        return (

            <div>
                <Navbar bg="primary" variant="dark" className="fixed-top">
                    <Navbar.Brand href="/MSS/home">
                        Medical Service System
                    </Navbar.Brand>

                    <Nav className="mr-auto">
                        {medicalIdentificationPage}
                        <Nav.Link href="/MSS/medicine_search">藥物查詢</Nav.Link>
                        {medicineManagementPage}
                        {medicalRecord}
                        {medicalRecords}
                        {doctorRegister}
                        {prescription}
                        {/* <NavDropdown title="預約門診" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">預約門診</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">門診時間</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">等候時間</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                   
                    <Form inline>
                        <Dropdown >
                            <Dropdown.Toggle className="toggle-button" variant="secondary">
                                <font color="white">
                                    {name}
                                </font>&nbsp;
                    </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item eventKey="1" href="/MSS/modifyPersonalInformation">
                                    Modify personal information
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" href="/MSS/logout">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>
                </Navbar><br /><br /><br /><br />
          </div>
        )
    }
}

export default Header;
