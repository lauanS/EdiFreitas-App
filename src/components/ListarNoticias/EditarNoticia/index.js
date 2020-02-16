import React from 'react';
import {Modal} from 'react-bootstrap';

import './styles.scss';
import TextEditor from "../../EditorDeNoticia";

export default function EditarNoticia(props){
  const {id, title, subtitle, text, tags, show, setShow, updateList} = props;
  const { setOpenAlertError, setOpenAlertSuccess } = props;
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
        <TextEditor 
          initialTitle={title}
          initialSubtitle={subtitle}
          initialText={text}        
          initialTags={tags}
          isUpdate={true}
          updateList={updateList}
          id={id}
          setOpenAlertError={setOpenAlertError}
          setOpenAlertSuccess={setOpenAlertSuccess}
        />
      </Modal.Body>
    </Modal>
    </>
  );
      
}




