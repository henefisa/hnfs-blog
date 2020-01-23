import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, NavLink } from "reactstrap";

const withModals = props => WrappedComponent => {
    class withModals extends Component {
        state = {
            modal: false
        };

        toggle = () =>{
            this.setState(prevState => ({modal: !prevState.modal}));
        };

        render() {
            const { modal } = this.state;
            return (
                <div>
                    <NavLink onClick={this.toggle} style={{cursor: "pointer"}}>{props.title}</NavLink>
                    <Modal isOpen={modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            {props.title}
                        </ModalHeader>
                        <ModalBody>
                            <WrappedComponent toggle={this.toggle}/>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
    return withModals;
};
export default withModals;
