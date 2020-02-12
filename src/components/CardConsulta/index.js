import React from 'react';

import {Row, Col, Card, Button} from 'react-bootstrap'

import './styles.scss';


export default function CardConsulta(props){
  const { obj, title, description, urlImg, firstFooter, lastFooter } = props;
  const { deleteThisCard, setSelectedObj } = props;

  const { setShowModal } = props;

  function handleClick(){
    setSelectedObj(obj);
    setShowModal(true);
  }

  function handleDelete(){
    setSelectedObj(obj);
    deleteThisCard();
  }

  function formattedDescription(){
    if(description.length > 130){
      let d = description.substring(0, 130) + " [ ... ]";
      console.log("D: ", d);
      return d;
    }
    return description;    
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
              {formattedDescription()}
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