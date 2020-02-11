import React from 'react';
import {Modal} from 'react-bootstrap';

import './styles.scss';
import EditorDeEventos from "../../EditorDeEventos";

export default function EditarEvento({name, description, date, local, show, setShow}){

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
          initialTitle={name}
          initialSubtitle={description}
          initialText=""        
        />
      </Modal.Body>
    </Modal>
    </>
  );
      
}




