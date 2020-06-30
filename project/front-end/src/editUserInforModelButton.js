import React, { useState } from 'react';
import MakePatientModal from './makePatientModal'
import { ButtonToolbar, Button } from 'react-bootstrap';

export default class EditUserInforModelButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: this.props.isFulfill
        }
    }

    setModalShow = () => {
        this.setState({ modalShow: !this.state.modalShow });
    }

    render() {
        console.log(this.props.jsonServer)
        return (
            <ButtonToolbar>
                <Button data-testid="toggle" variant="primary" onClick={this.setModalShow}>
                    Edit
            </Button>
                <MakePatientModal
                    {...this.props}
                    show={this.state.modalShow}
                    setModalShow={this.setModalShow}
                    updateName={this.props.updateName}
                    updateObservationInfo={this.props.updateObservationInfo}
                    updateAllergyInfo={this.props.updateAllergyInfo}
                    updateFamilyHistory={this.props.updateFamilyHistory}
                />
            </ButtonToolbar>
        );
    }
}