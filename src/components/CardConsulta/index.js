import React, {useState} from 'react';

import {Row, Col, Card, Button} from 'react-bootstrap'

import './styles.scss';


export default function CardConsulta(props){
  const { id, title, description, urlImg, firstFooter, lastFooter } = props;
  const { editor } = props;
  const { deleteCard } = props;
  const [showModal, setShowModal] = useState(false);

  function handleClick(){
    setShowModal(true)
  }

  function handleDeleteCard() {
    deleteCard(id);
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
            <Card.Subtitle className="card-description">
              {description}
            </Card.Subtitle>
          </Row>
          <Row>      
              <Button as={Col} variant="link"> Visualizar </Button>
              <Button as={Col} variant="link" onClick={handleClick}> Editar </Button>
              <Button as={Col} variant="link" onClick={handleDeleteCard}> Excluir </Button>        
          </Row>
        </Col>    

        <footer className="card-footer ">
          <p>{firstFooter}</p>
          <p>{lastFooter}</p>
        </footer>
      </Card.Body>
    
    </Card>

    { 
      renderModal()
    }
    </>
  );
}