import React from 'react';

import {Row, Col, Card} from 'react-bootstrap'

import './styles.scss';


export default function CardHome(props){
  const { title, description, urlImg, firstFooter, lastFooter } = props;

  function formattedDescription(){
    if(description.length > 130){
      let d = description.substring(0, 130) + " [ ... ]";
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

      <Card.Body className="CardHome-body">    
        
        <Card.Img           
          src={urlImg} 
          className="CardHome-img"
        />
        <Col>
          <Row>
            <Card.Subtitle className="CardHome-description">
              {formattedDescription()}
            </Card.Subtitle>
          </Row>
          <Row className="CardHome-row">      
              {props.children}              
          </Row>
        </Col>    

        <footer className="CardHome-footer">
          <p>{firstFooter}</p>
          <p>{lastFooter}</p>
        </footer>
      </Card.Body>

    
    </Card>
    </>
  );
}