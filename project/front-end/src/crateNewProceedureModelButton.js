import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MakeProcedureModal from './makeProcedureModal';

export default class CrateNewProceedureModelButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        }
    }

    setModalShow = () => {
        this.setState({ modalShow: !this.state.modalShow });
    }

    render() {
        return (
            <ButtonToolbar>
                <Button variant="primary" onClick={this.setModalShow}>
                    Create new procedure
        </Button>
                <MakeProcedureModal
                    show={this.state.modalShow}
                    setModalShow={this.setModalShow}
                    data={this.props.procedureData}
                    currentTime={this.props.currentTime}
                    id={this.props.id}
                />
            </ButtonToolbar>
        );
    }


}