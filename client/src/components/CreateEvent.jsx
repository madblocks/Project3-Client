import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'



const CreateEvent = (props) => {
    return(<div>
        <Modal show ={props.show}>
            <ModalHeader>
                Create Event
            </ModalHeader>
            <Modal.Body>
                <p>form here</p>
            </Modal.Body>
        </Modal>

    </div>)
}

export default CreateEvent;