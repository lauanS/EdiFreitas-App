import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import './styles.css';
import ongLogo from '../../assets/ong_logo.jpg';
import {login} from '../../services/auth'


export default function Login() {

  const TOKEN_KEY = "@edifreitas-token";

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [erroLogin, setErroLogin] = useState(false);
  const [invalitedSenha, setInvalitedSenha] = useState(false);
  const [invalitedUsuario, setInvalitedUsuario] = useState(false);

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

  async function handleSubmit(event){
    event.preventDefault();
    event.stopPropagation();

    if(usuario.length > 0 && senha.length > 0){
      var text = '{' +
        '"username": "' + usuario + '",' +
        '"password": "' + senha + '"' +  
      '}';
      var obj = JSON.parse(text);

      await login(obj)
      .then(res => {
        sessionStorage.setItem(TOKEN_KEY, res.data.token);
        window.location.reload();
        console.log("Bem vindo");
      })
      .catch(res => {
        setErroLogin(true);
        setUsuario("");
        setSenha("");

      });
    }
    else{
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
    <Container className="formsContainer">
      <Row className="justify-center">
        <Col className="forms">
          <Form  noValidate onSubmit={handleSubmit}>
            <Container>
              <Row className="justify-center">
                <img src={ongLogo} alt="First slide" width="100" height="100"/>
              </Row>
              <Row className="justify-center">
                <span className="titulo justify-center">Login do Administrador</span>
              </Row>
              <Row className="justify-center">
                <span className="desc justify-center">Parte reservada para o administrador do sistema.</span>
              </Row>
              {erroLogin === true ?
              <Row className="justify-center">
                <span className="desc justify-center error">Usuário ou senha inválida!</span>
                <span className="desc justify-center error">Corrija e tente novamente</span>
              </Row>
              :
              ''
              }
            </Container>
            <br/>
            <Form.Group md="4" controlId="validationCustom01">
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

            <Form.Group md="4" controlId="validationCustom02">
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
            
            <Button type="submit" className="botao">Entrar</Button>
           

          </Form>
        </Col>
      </Row>
    </Container>
</>
  );
}
