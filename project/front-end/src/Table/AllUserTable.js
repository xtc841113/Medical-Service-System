import React from 'react';
import {Button, FormControl, Table, Form,InputGroup ,Col,Modal,Tab ,Tabs} from 'react-bootstrap';



class AllUserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:'',
            all_user_context:this.props.all_user_context
        }

        // this.getAllPatient();
    }


   

    render() {

        let UserData = [];
        let index = 1;
        this.props.all_user_context.forEach(data => {

            if(this.props.role === 'Patient') {
                UserData.push(
                    <tr>
                        <td>{index++}</td>
                        <td>{data.identify}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                    </tr>
                )
            }else if(this.props.role === 'Doctor'){
                UserData.push(
                    <tr>
                        <td>{index++}</td>
                        <td>{data.username}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                    </tr>
                )
            }

            
        })

        return (
            <div>
                <div style={{'padding-top':'20px',
                            'padding-left':'20px',
                            'padding-right':'20px'}}>
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>ID number</th>
                            <th>Name</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {UserData}
                        </tbody>                
                        </Table>                
                    </div>
            </div>
        )
    }
}

export default AllUserTable;
