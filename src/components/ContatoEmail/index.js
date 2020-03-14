import React, {useState, useRef, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Form} from 'react-bootstrap';
import Snackbar  from "../Snackbars";
import ButtonSave from '../ButtonSave';

import {sendEmailService} from '../../services'
import {checkText, checkMinCharacters} from '../../validated'

export default function ContatoOng(){
  const [nome, setNome] = useState("");
  const [validatedNome, setValidatedNome] = useState(false);
  const [invalidatedNome, setInvalidatedNome] = useState(false);

  const [email, setEmail] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [invalidatedEmail, setInvalidatedEmail] = useState(false);

  const [texto, setTexto] = useState("");
  const [validatedTexto, setValidatedTexto] = useState(false);
  const [invalidatedTexto, setInvalidatedTexto] = useState(false);

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    return () => { mounted.current = false; }
  }, []);

  const resetFields = () => {
    setNome("");
    setValidatedNome(false);
    setInvalidatedNome(false);

    setEmail("");
    setValidatedEmail(false);
    setInvalidatedEmail(false);

    setTexto("");
    setValidatedTexto(false);
    setInvalidatedTexto(false);

    setIsLoading(false);
  }

  const sendEmail = async (event) => {
    console.log('oi')
    event.preventDefault();
    event.stopPropagation();

    if(isLoading === true){
      return;
    }
    setIsLoading(true);

    let flag = false;

    if(validatedNome === false){
      setInvalidatedNome(true);
      flag = true;
    }
    if(validatedEmail === false){
      setInvalidatedEmail(true);
      flag = true;
    }
    if(validatedTexto === false){
      setInvalidatedTexto(true);
      flag = true;
    }

    if(flag === false){
      var obj = {
        email,
        nome,
        texto
      }
      
      try{
        const response = await sendEmailService(obj);

        if(!mounted.current){
          return;
        }

        if(response.data && response.data.length > 0){
          setOpenAlertSuccess(false);
          setOpenAlertError(true);
        }
        else{
          setOpenAlertSuccess(true);
          setOpenAlertError(false);
          resetFields();
        }
      }catch(error){
        if(mounted.current){
          setOpenAlertSuccess(false);
          setOpenAlertError(true);
        }
      }
    }

    setIsLoading(false)
  }

  const onChangeEmail = (email) => {
    setEmail(email);
    // Verifica se é um email "valido"
    if(email.match(/.+@.+/gm)){
      // quando for um e-mail
      setValidatedEmail(true);
      setInvalidatedEmail(false);
    }
    else if(!email.length){
      // quando estiver vazio
      setValidatedEmail(false);
      setInvalidatedEmail(false);
    }
    else{
      // quando for um contato inválido
      setValidatedEmail(false);
      setInvalidatedEmail(true);
    }
  }

  const onChangeNome = (e) => {
    checkText(e.target, setNome, setValidatedNome, setInvalidatedNome);
  }
  
  const onChangeTexto = (t) => {
    checkMinCharacters(t, setTexto, setValidatedTexto, setInvalidatedTexto, 20);
  }

  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="E-mail enviado com sucesso" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao enviar" type="error"/>

    <label className="contatoEmail__descricao">Você pode enviar uma mensagem para a nossa ONG, ela será respondida por email</label>

    <Form autoComplete="off" onSubmit={sendEmail} noValidate>
      <Form.Group controlId="formGroupNome">
        <Form.Label >
          Nome*
        </Form.Label> 
        <Form.Control
          type="text"
          value={nome}
          onChange={(event) => onChangeNome(event)}
          placeholder= "Exemplo: Leonardo Souza"
          isValid={validatedNome}
          isInvalid={invalidatedNome}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório, preencha o seu nome.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGroupEmail">
        <Form.Label >
          Email*
        </Form.Label> 
        <Form.Control
          type="email"
          value={email} 
          onChange={(event) => onChangeEmail(event.target.value)}
          placeholder= "Exemplo: leosouza@gmail.com"
          isValid={validatedEmail}
          isInvalid={invalidatedEmail}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório, preencha um email válido.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGroupTexto">
      <Form.Label>
        Mensagem*
      </Form.Label>
        <Form.Control 
          rows="3" 
          value={texto} 
          onChange={(event) => onChangeTexto(event.target.value)}
          as="textarea" 
          placeholder="Escreva a sua mensagem para a ONG Edi Freitas"
          isValid={validatedTexto}
          isInvalid={invalidatedTexto}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório, preencha a mensagem. Mínimo 20 caracteres.
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonSave 
        isLoading={isLoading}
        className="contatoEmail__buttonSubmit"
      >Salvar
      </ButtonSave>
    </Form>

      
    </>
  );
}


