import React from 'react';
import './styles.css';
import {Navbar, Nav} from 'react-bootstrap';
import Navlink from '../Navlink/index';


export default class MyNavbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isActive: Array(6).fill(false),
    };
    this.state.isActive[this.props.initActive] = true;
  }

  render(){
    return (
      <Navbar className="shadow" collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
        <Navbar.Brand href="#" className="brand" >Edi Freitas</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Navlink isActive={this.state.isActive[0]} value={'Início'} link='/'></Navlink>
            <Navlink isActive={this.state.isActive[1]} value={'Eventos'} link='/eventos'></Navlink>
            <Navlink isActive={this.state.isActive[2]} value={'Notícias'} link='/noticias'></Navlink>
            <Navlink isActive={this.state.isActive[3]} value={'Galeria'} link='/galeria'></Navlink>
            <Navlink isActive={this.state.isActive[4]} value={'Sobre a ONG'} link='/sobre'></Navlink>
            <Navlink isActive={this.state.isActive[5]} value={'Contato'} link='/contato'></Navlink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
