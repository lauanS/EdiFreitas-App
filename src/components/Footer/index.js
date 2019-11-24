import React from 'react';
import { Row, Container } from 'react-bootstrap';
import './styles.css';
import Instagram from '@material-ui/icons/Instagram';
import Facebook from '@material-ui/icons/Facebook';

export default class Footer extends React.Component{
  render(){
    return (
      <footer class="text-muted shadow">
        <Container>
          <Row className="justify-content-md-center">
            <a href="http://facebook.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
              <Facebook className="icons" fontSize="50px" /> Facebook
            </a>
            <a href="http://instagram.com/ongedifreitas" target="_blank" rel="noopener noreferrer">
              <Instagram className="icons" /> Instagram
            </a>
          </Row>
          <br/>
          <Row className="center justify-content-md-center">
            <p>ONG Edi Freitas - Rua Três, 12, 18071-303. Sorocaba - São Paulo - Brasil.</p>
          </Row>
          <Row className="center justify-content-md-center">
            <p className="copyright pull-right">  &copy; {" Copyright "}{new Date().getFullYear()}{" EdiFreitas - All Rights Reserved"} </p>
          </Row>
        </Container>
      </footer>
    );
  }
}
