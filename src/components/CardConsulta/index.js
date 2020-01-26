import React, {useState} from 'react';

import {Row, Col, Card, Button, Modal} from 'react-bootstrap'

import './styles.scss';

import TextEditor from "../EditorDeNoticia";

export default function ConsultarNoticias(props){
  const { title, subtitle, urlImg, creationDate, updateDate } = props

  function showModal(){
    setShow(true);
  }


  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)}


  return (
    <>
    <Card>
      <Card.Header as="h5">
        {title}
      </Card.Header>

      <Card.Body className="card-body">    
        
        <Card.Img           
          src={urlImg} 
        />
        <Col>
          <Row>
            <Card.Subtitle className="card-subtitle">
              {subtitle}
            </Card.Subtitle>
          </Row>
          <Row>      
              <Button as={Col} variant="link"> Visualizar </Button>
              <Button as={Col} variant="link" onClick={showModal}> Editar </Button>    
              <Button as={Col} variant="link"> Excluir </Button>        
          </Row>
        </Col>    

        <footer className="card-footer ">
          <p>Criado em {creationDate}</p>
          <p>Última atualização {updateDate}</p>
        </footer>
      </Card.Body>
    
    </Card>


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
          initialText=""        
        />
      </Modal.Body>
    </Modal>
    </>
  );
}