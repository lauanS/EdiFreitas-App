import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index';
import ContatoEmail from '../../../components/ContatoEmail/index'
import ContatoOng from '../../../components/ContatoOng/index'
import './styles.scss';
import {Col} from 'react-bootstrap';

export default function Contato(){

  return (
    <div className="faleConosco">
      <MyNavbar initActive={5}/>
      <main className="faleConosco__main">
        <Col xs={12} sm={12} md={4} className="faleConosco__colInfo">
          <ContatoOng/>
        </Col>
        <Col xs={12} sm={12} md={8} className="faleConosco__colEmail">
          <ContatoEmail/>
        </Col>
      </main>
      <Footer />
    </div>
  );

}
