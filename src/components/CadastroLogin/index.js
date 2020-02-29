import React, {useState} from 'react';
import './styles.scss';

import {Form, Row, Col, Button} from 'react-bootstrap';
import Snackbar from '../Snackbars';

import {postLogin} from '../../services/auth';
import {checkMinCharacters, checkSenha} from '../../validated';

export default function CadastroLogin() {
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [usuario, setUsuario] = useState("");
  const [validatedUsuario, setValidatedUsuario] = useState(false);
  const [invalidatedUsuario, setInvalidatedUsuario] = useState(false);

  const [senha, setSenha] = useState("");
  const [validatedSenha, setValidatedSenha] = useState(false);
  const [invalidatedSenha, setInvalidatedSenha] = useState(false);

  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [validatedConfirmarSenha, setValidatedConfirmarSenha] = useState(false);
  const [invalidatedConfirmarSenha, setInvalidatedConfirmarSenha] = useState(false);

  const [senhaDiferente, setSenhaDiferente] = useState(false);

  const resetFields = () => {
    setUsuario("");
    setValidatedUsuario(false);
    setInvalidatedUsuario(false);
  
    setSenha("");
    setValidatedSenha(false);
    setInvalidatedSenha(false);

    setConfirmarSenha("");
    setValidatedConfirmarSenha(false);
    setInvalidatedConfirmarSenha(false);

    setSenhaDiferente(false);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    
    let flag = false;

    if(validatedUsuario === false){
      setInvalidatedUsuario(true);
      flag = true;
    }
    if(validatedSenha === false){
      setInvalidatedSenha(true);
      flag = true;
    }
    if(validatedConfirmarSenha === false){
      setInvalidatedConfirmarSenha(true);
      flag = true;
    }

    if(flag === false){
      try{
        const obj = {
          username : usuario,
          password : senha
        }

        await postLogin(obj);
        setOpenAlertSuccess(true);
        setOpenAlertError(false);
        resetFields();
      }
      catch{
        setOpenAlertSuccess(false);
        setOpenAlertError(true);
      }
    }
  }

  const onChangeUsuario = e => {
    checkMinCharacters(e.target.value, setUsuario, setValidatedUsuario, setInvalidatedUsuario, 8);
  }

  const onChangeSenha = e => {
    let res = checkMinCharacters(e.target.value, setSenha, setValidatedSenha, setInvalidatedSenha, 8);
    if(res === true){
      checkSenha(e.target.value, confirmarSenha, setSenhaDiferente);
    }
  }

  const onChangeConfirmarSenha = e => {
    let res = checkMinCharacters(e.target.value, setConfirmarSenha, setValidatedConfirmarSenha, setInvalidatedConfirmarSenha, 8);
    if(res === true){
      checkSenha(e.target.value, senha, setSenhaDiferente);
    }
  }
  
  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Login cadastrado" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao cadastrar" type="error"/>

    <label className="CadastroLogin__descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título</label>

    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formGroupUsuario">
        <Form.Label column sm={2} className="CadastroLogin__label">
          Nome de usuário*
        </Form.Label>
        <Col sm={8} className="CadastroLogin__inputText">
          <Form.Control 
            type="text"
            placeholder="Nome de usuário"
            onChange={e => onChangeUsuario(e)}
            value={usuario}
            isValid={validatedUsuario}
            isInvalid={invalidatedUsuario}
          />
          <Form.Control.Feedback type="invalid">
            Insira uma combinação de pelo menos 8 caracteres.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupSenha">
        <Form.Label column sm={2} className="CadastroLogin__label">
          Senha de usuário*
        </Form.Label>
        <Col sm={8} className="CadastroLogin__inputText">
          <Form.Control 
            type="password" 
            placeholder="Senha de usuário"
            onChange={e => onChangeSenha(e)}
            value={senha}
            isValid={validatedSenha}
            isInvalid={invalidatedSenha || senhaDiferente}
          />
          <Form.Control.Feedback type="invalid">
            {invalidatedSenha === true ? 'Insira uma combinação de pelo menos 8 caracteres.' : senhaDiferente ? 'As senhas são diferentes' :''}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupConfirmarSenha">
        <Form.Label column sm={2} className="CadastroLogin__label">
          Confirmar senha*
        </Form.Label>
        <Col sm={8} className="CadastroLogin__inputText">
          <Form.Control 
            type="password" 
            placeholder="Confirmar senha"
            onChange={e => onChangeConfirmarSenha(e)}
            value={confirmarSenha}
            isValid={validatedConfirmarSenha}
            isInvalid={invalidatedConfirmarSenha || senhaDiferente}
          />
          <Form.Control.Feedback type="invalid">
            {invalidatedConfirmarSenha === true ? 'Insira uma combinação de pelo menos 8 caracteres.' : senhaDiferente ? 'As senhas são diferentes' :''}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Button className="CadastroLogin__buttonSubmit" variant="success" type="submit">Cadastrar login</Button>
    </Form>
    </>
  );
}