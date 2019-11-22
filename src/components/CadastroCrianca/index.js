import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Sidebar from '../../components/Sidebar/index';
import {Container, Row, Col} from 'react-bootstrap';

export default class Administrar extends React.Component{
    render(){
        return (
          <Container fluid>
            <Sidebar/>
            <p>aaaaa</p>
          </Container>
         
        );
      }

}
