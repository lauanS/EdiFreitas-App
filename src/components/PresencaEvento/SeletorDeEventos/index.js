import React from 'react';
import {Modal} from 'react-bootstrap';

import ListarEventos from "../../ListarEventos";

import './styles.scss';

export default function SeletorDeEventos(props){
  const {show, setShow, action} = props;
  const handleClose = () => {setShow(false)}

  return (
    <>
    <Modal 
      show={show} 
      onHide={handleClose}
      className="modalCardSelectEvent"
      dialogClassName="modalCardSelectEvent-dialog"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Selecione o evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListarEventos 
          selectEvent={true}  
          action={action}
        />
      </Modal.Body>
    </Modal>
    </>
  );
      
}




