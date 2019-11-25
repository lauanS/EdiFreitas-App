import React from 'react';
import { Row, Container } from 'react-bootstrap';
import './styles.scss';
import Instagram from '@material-ui/icons/Instagram';
import Facebook from '@material-ui/icons/Facebook';

export default class Footer extends React.Component{
  render(){
    return (
      <footer className="foot">
        <Container>
          <Row className="justify-content-md-center">
            <a className="foot__link" href="http://facebook.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
              <Facebook className="foot__icons" fontSize="50px" /> Facebook
            </a>
            <a className="foot__link" href="http://instagram.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
              <Instagram className="foot__icons" /> Instagram
            </a>
          </Row>
          <br/>
          <Row className="foot__center justify-content-md-center">
            <p>ONG Edi Freitas - Rua Três, 12, 18071-303. Sorocaba - São Paulo - Brasil.</p>
          </Row>
          <Row className="foot__center justify-content-md-center">
            <p className="copyright pull-right">  &copy; {" Copyright "}{new Date().getFullYear()}{" EdiFreitas - All Rights Reserved"} </p>
          </Row>
        </Container>
      </footer>
    );
  }
}
