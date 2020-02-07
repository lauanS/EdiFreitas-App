import React from 'react';

import {Row, Col, Card, Button} from 'react-bootstrap'

import './styles.scss';


export default function CardConsulta(props){
  const { obj, title, description, urlImg, firstFooter, lastFooter } = props;
  const { deleteThisCard, setSelectedNews } = props;

  const { setShowModal } = props;

  function handleClick(){
    setSelectedNews(obj);
    setShowModal(true);
  }

  function handleDelete(){
    setSelectedNews(obj);
    deleteThisCard();
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
              <Button as={Col} variant="link" onClick={handleDelete}> Excluir </Button>        
          </Row>
        </Col>    

        <footer className="card-footer ">
          <p>{firstFooter}</p>
          <p>{lastFooter}</p>
        </footer>
      </Card.Body>

    
    </Card>
    </>
  );
}