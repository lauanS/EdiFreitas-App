import React from 'react';
import {Modal} from 'react-bootstrap';

import './styles.scss';
import EditorDeEventos from "../../EditorDeEventos";

export default function EditarEvento({obj, show, setShow}){

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
        <Modal.Title>Editor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditorDeEventos 
          obj={obj}
          isUpdate={true}  
        />
      </Modal.Body>
    </Modal>
    </>
  );
      
}




