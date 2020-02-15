import React from 'react';
import {Modal} from 'react-bootstrap';

import ListarEventos from "../../ListarEventos";

import './styles.scss';

export default function SeletorDeEventos(props){
  const {obj, show, setShow} = props;
  const handleClose = () => {setShow(false)}

  return (
    <>
    <Modal 
      show={show} 
      onHide={handleClose}
      className="modalCard"
      dialogClassName="modalCard__dialog"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Selecione o evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListarEventos 
          selectEvent={true}  
          action={props.children}
        />
      </Modal.Body>
    </Modal>
    </>
  );
      
}




