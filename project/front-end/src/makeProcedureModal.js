import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import callPostProcedureAPI from './FHIRAPI/callPostProcedureAPI';

var moment = require('moment');
class MakeProcedureModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '',
            outcome: '',
        }
    }

    buildProceduredata = (display, outcome) => {
        let obj = {
            resource: {
                resourceType: 'Procedure',
                code: {
                    coding: [{
                        system: "http://snomed.info/sct",
                        code: "230056204",
                        display: display
                    }],
                    text: "230056004"
                },
                subject: { reference: "Patient/".concat(this.props.id) },
                performedDateTime: moment().format('YYYY-MM-DD'),
                outcome: { text: outcome },
                location: {
                    reference: "Location/9"
                }
            }
        };
        return obj;
    }

    handleSubmit = (event) => {
        if (this.state.display === '') {
            alert('病情判斷不能為空');
            return;
        } else if (this.state.outcome === '') {
            alert('後續處理不能為空');
            return;
        }

        let obj = this.buildProceduredata(this.state.display, this.state.outcome);
        this.props.data.push(obj);

        callPostProcedureAPI(obj);
        this.props.setModalShow(false);
    }

    handleChange = (event) => {
        const value = event.target.value;
        if (event.target.id === 'formCodeDisplay') {
            this.setState({
                display: value,
            });
        } else if (event.target.id === 'formOutcome') {
            this.setState({
                outcome: value,
            });
        }
    }

    render() {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}
                onHide={this.props.setModalShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        新增病歷
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCodeDisplay">
                            <Form.Label>病情判斷</Form.Label>
                            <Form.Control type="formCodeDisplay" placeholder="Enter procedure" onChange={this.handleChange} />
                            <Form.Text className="text-muted" >

                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formOutcome">
                            <Form.Label>後續處理</Form.Label>
                            <Form.Control type="formCodeOutcome" as="textarea" placeholder="Enter outcome" onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.setModalShow}>Close</Button>
                    <Button onClick={this.handleSubmit} >Create</Button>
                </Modal.Footer>
            </Modal >
        );
    }


}

export default MakeProcedureModal;