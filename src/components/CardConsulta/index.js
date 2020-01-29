import React, {useState} from 'react';

import {Row, Col, Card, Button, Modal} from 'react-bootstrap'

import './styles.scss';


export default function ConsultarNoticias(props){
  const { title, subtitle, urlImg, creationDate, updateDate } = props;
  const { editor } = props;

  const [showModal, setShowModal] = useState(false);

  function handleClick(){
    setShowModal(true)
  }
  function renderModal(){
    if(showModal){
      return editor;
    }else{
      return;
    }  
  }

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
              <Button as={Col} variant="link" onClick={handleClick}> Editar </Button>
              <Button as={Col} variant="link"> Excluir </Button>        
          </Row>
        </Col>    

        <footer className="card-footer ">
          <p>Criado em {creationDate}</p>
          <p>Última atualização {updateDate}</p>
        </footer>
      </Card.Body>
    
    </Card>

    { 
      renderModal()
    }
    </>
  );
}