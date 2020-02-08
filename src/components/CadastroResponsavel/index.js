import React,  { useState } from 'react';
import './styles.scss';

import Snackbar from '../Snackbars';
import {Form, Row, Col, Button} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import Endereco from '../Endereco/index';
import Contato from '../CampoContato/index'
import CampoImagem from '../CampoFotoPerfil';

import { checkText, checkData, checkCpf, checkTextField } from '../../validated';
import {converterData} from '../../assist';
import {postResponsavel} from '../../services';

export default function CadastroResponsavel(){
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [validatedNomeCompleto, setValidatedNomeCompleto] = useState(false);
  const [invalidatedNomeCompleto, setInvalidatedNomeCompleto] = useState(false);

  const [dataNascimento, setDataNascimento] = useState("");
  const [validatedDataNascimento, setValidatedDataNascimento] = useState(false);
  const [invalidatedDataNascimento, setInvalidatedDataNascimento] = useState(false);

  const [sexoPessoa, setSexoPessoa] = useState("M");

  const [cpf, setCpf] = useState("");
  const [validatedCpf, setValidatedCpf] = useState(false);
  const [invalidatedCpf, setInvalidatedCpf] = useState(false);

  const [imgBase64, setImgBase64] = useState("");
  const [invalidatedImgBase64, setInvalidatedImgBase64] = useState(false);

  const [comentario, setComentario] = useState("");
  const [validatedComentario, setValidatedComentario] = useState(false);

  const [logradouro, setLogradouro] = useState("");
  const [validatedLogradouro, setValidatedLogradouro] = useState(false);
  const [invalidatedLogradouro, setInvalidatedLogradouro] = useState(false);

  const [numero, setNumero] = useState("");
  const [validatedNumero, setValidatedNumero] = useState(false);
  const [invalidatedNumero, setInvalidatedNumero] = useState(false);

  const [cep, setCep] = useState("");
  const [validatedCep, setValidatedCep] = useState(false);
  const [invalidatedCep, setInvalidatedCep] = useState(false);

  const [bairro, setBairro] = useState("");
  const [validatedBairro, setValidatedBairro] = useState(false);
  const [invalidatedBairro, setInvalidatedBairro] = useState(false);

  const [cidade, setCidade] = useState("");
  const [validatedCidade, setValidatedCidade] = useState(false);
  const [invalidatedCidade, setInvalidatedCidade] = useState(false);

  const [telefones, setTelefones] = useState(['']);
  const [emails, setEmails] = useState(['']);

  const resetFields = () => {
    setNomeCompleto("");
    setValidatedNomeCompleto(false);
    setInvalidatedNomeCompleto(false);

    setDataNascimento("");
    setValidatedDataNascimento(false);
    setInvalidatedDataNascimento(false);

    setCpf(""); 
    setValidatedCpf(false);
    setInvalidatedCpf(false);

    setImgBase64("");
    setInvalidatedImgBase64(false);

    setComentario("");
    setValidatedComentario(false);

    setLogradouro("");
    setValidatedLogradouro(false);
    setInvalidatedLogradouro(false);

    setNumero("");
    setValidatedNumero(false);
    setInvalidatedNumero(false);

    setCep("");
    setValidatedCep(false);
    setInvalidatedCep(false);

    setBairro("");
    setValidatedBairro(false);
    setInvalidatedBairro(false);

    setCidade("");
    setValidatedCidade(false);
    setInvalidatedCidade(false);

    setTelefones(['']);
    setEmails(['']);
  }

  const handleSubmit = e => {
    //tirar futuramente
    console.log(imgBase64)
    let flag = false;

    if(validatedNomeCompleto === false){
      setInvalidatedNomeCompleto(true);
      flag = true;
    }
    if(validatedDataNascimento === false){
      setInvalidatedDataNascimento(true);
      flag = true;
    }
    if(validatedCpf === false){
      setInvalidatedCpf(true);
      flag = true;
    }
    if(imgBase64 === ""){
      setInvalidatedImgBase64(true);
      flag = true;
    }
    if(validatedLogradouro === false){
      setInvalidatedLogradouro(true);
      flag = true;
    }
    if(validatedBairro === false){
      setInvalidatedBairro(true);
      flag = true;
    }
    if(validatedCidade === false){
      setInvalidatedCidade(true);
      flag = true;
    }
    if(validatedNumero === false){
      setInvalidatedNumero(true);
      flag = true;
    }

    if(flag === false){
      let dtNascimento = converterData(dataNascimento);
      const cepFormatado = cep.replace('-', '');
 
      const emailsWithType = emails.map((value) => {
        return {
          tipo: "email",
          contato: value 
        }
      });      

      const phonesWithType = telefones.map((value) => {
        return {
          tipo: "telefone",
          contato: value 
        }
      });

      let contatos = emailsWithType.concat(phonesWithType);
      
      contatos = contatos.filter((obj) => {
        return obj.contato !== ""
      });

      const obj = {
        nome: nomeCompleto,
        dataNascimento: dtNascimento,
        sexo: sexoPessoa,
        cpf,
        comentario,
        foto: "",
        endereco: {
          logradouro,
          bairro,
          cidade,
          cep: cepFormatado,
          numero: numero
        },
        contatos
      }

      
      postResponsavel(obj)
      .then(res => {
        setOpenAlertSuccess(true);
        setOpenAlertError(false);
        resetFields();
      })
      .catch(res => {
        setOpenAlertSuccess(false);
        setOpenAlertError(true);
      });

    }
    e.preventDefault();
    e.stopPropagation();

  };

  const handleImg = (base64) => {
    setImgBase64(base64);
  }

  const onChangeNome = e => {
    checkText(e, setNomeCompleto, setValidatedNomeCompleto, setInvalidatedNomeCompleto);
  }

  const onChangeSexo = e => {
    setSexoPessoa(e.target.value);
  }

  const onChangeData = e => {
    checkData(e, dataNascimento, setDataNascimento, 
        setValidatedDataNascimento, setInvalidatedDataNascimento)
  }

  const onChangeTextField = (e, setText, setValidated, setInvalidated) => {
    checkTextField(e, setText, setValidated, setInvalidated);
  }

  const addNewPhone = () => {
    setTelefones([...telefones, ''])
  }

  const addNewEmail = () => {
    setEmails([...emails, ''])
  }

  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Responsável cadastrado" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao cadastrar" type="error"/>

    <label className="CadastroResponsavel__descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>

    <Form autoComplete="off" onSubmit={handleSubmit} noValidate>
      <CamposPessoa 
        nome={nomeCompleto} 
        onChangeNome={onChangeNome} 
        valNome={validatedNomeCompleto} 
        invNome={invalidatedNomeCompleto}
        data={dataNascimento} 
        onChangeData={onChangeData} 
        valData={validatedDataNascimento} 
        invData={invalidatedDataNascimento}
        sexo={sexoPessoa} 
        onChangeSexo={onChangeSexo}
      />

      <Form.Group as={Row} controlId="formGroupCpf">
        <Form.Label column sm={2} className="CadastroResponsavel__label">
          CPF *
        </Form.Label>
        <Col sm={8} className="CadastroResponsavel__inputText">
          <Form.Control 
            className="CadastroResponsavel__inputCpf"
            required
            type="text" 
            placeholder="Digite apenas números"
            onChange={e => checkCpf(e.target, setCpf, setValidatedCpf, setInvalidatedCpf)}
            isValid={validatedCpf}
            isInvalid={invalidatedCpf}
            value={cpf}
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório, digite um CPF válido/correto (Apenas números)
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupImagem">
        <Form.Label column sm={2} className="CadastroResponsavel__label">
          Foto de perfil *
        </Form.Label>
        <Col sm={8} className="CadastroResponsavel__inputText">
          <CampoImagem setImgCrop={handleImg}/>
          {invalidatedImgBase64 ? 
          <div className="CadastroResponsavel__error">Campo obrigatório, selecione uma foto de perfil</div>
          :
          ''}
        </Col>
      </Form.Group>
      
      <Endereco 
        onChangeTextField={onChangeTextField}
        logradouro={logradouro}
        setLogradouro={setLogradouro}
        validatedLogradouro={validatedLogradouro}
        setValidatedLogradouro={setValidatedLogradouro}
        invalidatedLogradouro={invalidatedLogradouro}
        setInvalidatedLogradouro={setInvalidatedLogradouro}

        bairro={bairro}
        setBairro={setBairro}
        validatedBairro={validatedBairro}
        setValidatedBairro={setValidatedBairro}
        invalidatedBairro={invalidatedBairro}
        setInvalidatedBairro={setInvalidatedBairro}

        cidade={cidade}
        setCidade={setCidade}
        validatedCidade={validatedCidade}
        setValidatedCidade={setValidatedCidade}
        invalidatedCidade={invalidatedCidade}
        setInvalidatedCidade={setInvalidatedCidade}

        numero={numero}
        setNumero={setNumero}
        validatedNumero={validatedNumero}
        setValidatedNumero={setValidatedNumero}
        invalidatedNumero={invalidatedNumero}
        setInvalidatedNumero={setInvalidatedNumero}

        cep={cep}
        setCep={setCep}
        validatedCep={validatedCep}
        setValidatedCep={setValidatedCep}
        invalidatedCep={invalidatedCep}
        setInvalidatedCep={setInvalidatedCep}
      />

      <Comentario 
        validatedComentario={validatedComentario} 
        setValidatedComentario={setValidatedComentario}  
        comentario={comentario} 
        setComentario={setComentario}
      />
      
      <Form.Group>
        { 
          telefones.map((_, index) => (
              <Contato key={index} id={index} contacts={telefones} setContacts={setTelefones} type="telefone"/>
            ))
        }
        <Button as={Row} variant="link" onClick={addNewPhone}>Novo telefone</Button>
      </Form.Group>

      <Form.Group>
        { 
          emails.map((_, index) => (
              <Contato key={index} id={index} contacts={emails} setContacts={setEmails} type="email"/>
            ))
        }
        <Button as={Row} variant="link" onClick={addNewEmail}>Novo e-mail</Button>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" >Cadastrar</Button>
        </Col>
      </Form.Group>
    </Form>
    </>
  );
}
