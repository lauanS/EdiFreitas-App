import React from 'react';

import {Row, Col, Card} from 'react-bootstrap'

import './styles.scss';


export default function CardConsulta(props){
  const { title, description, urlImg, firstFooter, lastFooter } = props;

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

      <Card.Body className="cardConsulta-body">    
        
        <Card.Img           
          src={urlImg} 
          className="cardConsulta-img"
        />
        <Col>
          <Row>
            <Card.Subtitle className="cardConsulta-description">
              {formattedDescription()}
            </Card.Subtitle>
          </Row>
          <Row className="cardConsulta-row">      
              {props.children}              
          </Row>
        </Col>    

        <footer className="cardConsulta-footer">
          <p>{firstFooter}</p>
          <p>{lastFooter}</p>
        </footer>
      </Card.Body>

    
    </Card>
    </>
  );
}