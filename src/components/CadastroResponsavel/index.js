import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Snackbar from '../Snackbars';
import {Form, Row, Col, Button} from 'react-bootstrap';

import { checkText, checkData, checkCpf, checkTelefone, checkTextField } from '../../validated';

import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import Endereco from "../Endereco/index";
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

  const [telefone, setTelefone] = useState("");
  const [validatedTelefone, setValidatedTelefone] = useState(false);
  const [invalidatedTelefone, setInvalidatedTelefone] = useState(false);

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

  const [cidade, setCidade] = useState("Sorocaba");
  const [validatedCidade, setValidatedCidade] = useState(false);
  const [invalidatedCidade, setInvalidatedCidade] = useState(false);


  const resetFields = () => {
    setNomeCompleto("");
    setValidatedNomeCompleto(false);
    setInvalidatedNomeCompleto(false);

    setDataNascimento("");
    setValidatedDataNascimento(false);
    setInvalidatedDataNascimento(false);

    setSexoPessoa("M");

    setCpf(""); 
    setValidatedCpf(false);
    setInvalidatedCpf(false);

    setComentario("");
    setValidatedComentario(false);

    setLogradouro("");
    setValidatedLogradouro(false);
    setInvalidatedLogradouro(false);
  }

  const handleSubmit = e => {
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
    if(validatedLogradouro === false){
      setInvalidatedLogradouro(true);
      flag = true;
    }
   
    if(flag === false){
      let dtNascimento = converterData(dataNascimento);
      const cepFormatado = cep.replace('-', '');

      var text = '{' +
        '"nome": "' + nomeCompleto + '",' +
        '"dataNascimento": "' + dtNascimento + '",' +
        '"sexo": "' + sexoPessoa + '",' +
        '"cpf" : "' + cpf + '",' +
        '"comentario" : "' + comentario + '",' +
        '"foto" : "",' +
        '"endereco" : {' +
          '"logradouro" : "' + logradouro + '",' +
          '"bairro" : "' + bairro + '",' +
          '"cidade" : "' + cidade + '",' +
          '"cep" : "' + cepFormatado + '",' +
          '"numero" : '+ numero +
        '},' +
        '"contatos" : [' +
          '{' +
            '"tipo" : "email",'+
            '"contato" : "carlos.teste@gmail.com"'+
          '}' +	
        ']'+
      '}';
      
      var obj = JSON.parse(text);
      
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
      dtNascimento = telefone;

    }
    e.preventDefault();
    e.stopPropagation();

  };

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

  return (
    <>
      <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Responsável cadastrado" type="success"/>
      <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao cadastrar" type="error"/>

    <label className="CadastroResponsavel-Descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>

    <Form onSubmit={handleSubmit} noValidate>
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
        <Form.Label column sm={2} className="CadastroResponsavel-label">
          CPF *
        </Form.Label>
        <Col sm={8} className="CadastroResponsavel-inputText">
          <Form.Control 
            className="CadastroResponsavel-inputCpf"
            required
            type="text" 
            placeholder="Digite apenas números"
            onChange={e => checkCpf(e.target, setCpf, setValidatedCpf, setInvalidatedCpf)}
            isValid={validatedCpf}
            isInvalid={invalidatedCpf}
          />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório, digite um CPF válido/correto (Apenas números)
          </Form.Control.Feedback>
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

      <Comentario validatedComentario={validatedComentario} setValidatedComentario={setValidatedComentario}  comentario={comentario} setComentario={setComentario}/>
      
      <Form.Group as={Row} controlId="formGroupTelefone">
        <Form.Label column sm={2} className="CadastroResponsavel-label">
          Telefone celular
        </Form.Label>
        <Col sm={4} className="CadastroResponsavel-inputCpf">
          <Form.Control 
            required
            type="text" 
            placeholder="Ex: 1533224466"
            onChange={e => checkTelefone(e.target, setTelefone, setValidatedTelefone, setInvalidatedTelefone)}
            isValid={validatedTelefone}
            isInvalid={invalidatedTelefone}
          />
          <Form.Control.Feedback type="invalid">
            Digite um número de telefone celular (9 dígitos)
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Cadastrar</Button>
        </Col>
      </Form.Group>

      
    </Form>
    </>
  );
}
