import React from 'react';
import {Button, FormControl, Table, Form,InputGroup ,Col,Modal,Tab ,Tabs} from 'react-bootstrap';



class MedicineTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        let MedicineData = [];
        let index = 1;
        this.props.medicine_list.forEach(data => {
            MedicineData.push(
                <tr>
                    <td>{index++}</td>
                    <td>{data.code.coding[0].code}</td>
                    <td>{data.synonym[1]}</td>
                    <td>{data.synonym[0]}</td>
                    <td>{data.ingredient[0].itemCodeableConcept.text}</td>
                    <td>{data.amount.value + ' ' + data.amount.unit}</td>
                    <td>{data.cost[0].cost.value}</td>
                    <td>{data.manufacturer.reference}</td>
                    <td>{data.doseForm.text}</td>
                    <td>{data.medicineClassification[0].classification[0].text}</td>
                    <td>{data.status}</td>
                </tr>
            )
            
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
                            <th>藥品代碼</th>
                            <th>藥品名稱(英文)</th>
                            <th>藥品名稱(中文)</th>
                            <th>成分</th>
                            <th>成分含量</th>
                            <th>價格</th>
                            <th>藥商</th>
                            <th>劑型</th>
                            <th>藥品分類</th>
                            <th>備註</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MedicineData}
                        </tbody>                
                        </Table>                
                    </div>
            </div>
        )
    }
}

export default MedicineTable;
