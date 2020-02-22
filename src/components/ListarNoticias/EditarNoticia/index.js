import React from 'react';
import {Modal} from 'react-bootstrap';

import TextEditor from "../../EditorDeNoticia";

import './styles.scss';

export default function EditarNoticia(props){
  const {id, title, subtitle, text, tags, show, setShow, updateList} = props;
  const handleClose = () => {setShow(false)}

  return (
    <>
   
    <Modal 
      show={show} 
      onHide={handleClose}
      className="modalCardListNews"
      dialogClassName="modalCardListNews-dialog"
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
        />
      </Modal.Body>
    </Modal>
    </>
  );
      
}




