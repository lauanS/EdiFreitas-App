//Refatorada por Leonardo Nozaki 
//Data: 27/02/2020
//Imports - OK
//ClassName - OK
//OnSubmit, handleSubmit, type="submit" - OK
//OverlayLoading - OK
//State submit - OK

import React, { useState } from "react";
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import OverlayLoading from '../OverlayLoading';

import ongLogo from '../../assets/ong_logo.jpg';
import {login, TOKEN_KEY, TOKENTIME_KEY} from '../../services/auth'

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [erroLogin, setErroLogin] = useState(false);
  const [invalitedSenha, setInvalitedSenha] = useState(false);
  const [invalitedUsuario, setInvalitedUsuario] = useState(false);

  const [submit, setSubmit] = useState(false);

  const changeSenha = e =>{
    if(e.target.value.length > 0){
      setInvalitedSenha(false);
    }
    else{
      setInvalitedSenha(true);
    }
    setSenha(e.target.value);
  }

  const changeUsuario = e =>{
    if(e.target.value.length > 0){
      setInvalitedUsuario(false);
    }
    else{
      setInvalitedUsuario(true);
    }
    setUsuario(e.target.value);
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    event.stopPropagation();

    if(submit === true){
      return;
    }
    
    if(usuario.length > 0 && senha.length > 0){
      setSubmit(true);
      const obj = {
        username: usuario,
        password: senha
      };

      try {
        let res = await login(obj)
        
        setSubmit(false);
        sessionStorage.setItem(TOKEN_KEY, res.data.token);
        sessionStorage.setItem(TOKENTIME_KEY, Date.now());
        window.location.reload();
      } catch(res){
        setErroLogin(true);
        setUsuario("");
        setSenha("");
        setSubmit(false);
      }
    }
    else{
      setSubmit(false);
      if(usuario.length === 0){
        setInvalitedUsuario(true);
      }
      if(senha.length === 0){
        setInvalitedSenha(true);
      }
    }
  };

  return (
    <>
    <OverlayLoading showOverlay={submit} msg="Verificando informações!"/>

    <Container className="login__container">
      <Row className="login__row">
        <Col className="login__col">
          <Form  noValidate onSubmit={handleSubmit}>
            <Container>
              <Row className="login__row">
                <img src={ongLogo} alt="Logo ONG Edi Freitas" width="100" height="100"/>
              </Row>
              <Row className="login__row">
                <span className="login__title">Login do Administrador</span>
              </Row>
              <Row className="login__row">
                <span className="login__subtitle">Parte reservada para o administrador do sistema.</span>
              </Row>
              {erroLogin &&
              <Row className="login__row">
                <span className="login__error">Usuário ou senha inválida!</span>
              </Row>}
            </Container>

            <br/>

            <Form.Group md="4" controlId="formGroupUsuario">
              <Form.Label>Usuário</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nome de usuário"
                value={usuario}
                onChange={changeUsuario}
                isValid={false}
                isInvalid={invalitedUsuario}
              />
            </Form.Group>

            <Form.Group md="4" controlId="formGroupSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Senha de usuário" 
                value={senha}
                onChange={changeSenha}
                isValid={false}
                isInvalid={invalitedSenha}
              />
            </Form.Group>

            <br/>
            
            <Button type="submit" className="login__button">Entrar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </>);
}
