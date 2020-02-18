import React from 'react';
import {Modal} from 'react-bootstrap';

import './styles.scss';
import EditorDeEventos from "../../EditorDeEventos";

export default function EditarEvento({obj, show, setShow, updateList}){

  const handleClose = () => {setShow(false)}

  return (
    <>
   
    <Modal 
      show={show} 
      onHide={handleClose}
      className="modalCardListEvent"
      dialogClassName="modalCardListEvent-dialog"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditorDeEventos 
          obj={obj}
          isUpdate={true}  
          updateList={updateList}
        />
      </Modal.Body>
    </Modal>
    </>
  );
      
}




