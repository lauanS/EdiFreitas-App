import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import {Form, Row, Col, Button} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import ModalBusca from '../ModalBuscaResponsavel';
import Card from '../CardResponsavel';
import Snackbar from '../Snackbars';

import { checkText, checkNumber, checkCamiseta, checkData } from '../../validated';
import {postCrianca} from '../../services'
import {converterData} from '../../assist';

export default function CadastroCrianca(){
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [validatedNomeCompleto, setValidatedNomeCompleto] = useState(false);
  const [invalidatedNomeCompleto, setInvalidatedNomeCompleto] = useState(false);

  const [dataNascimento, setDataNascimento] = useState('');
  const [validatedDataNascimento, setValidatedDataNascimento] = useState(false);
  const [invalidatedDataNascimento, setInvalidatedDataNascimento] = useState(false);

  const [sexoPessoa, setSexoPessoa] = useState("M");

  const [dadosResponsavel, setDadosResponsavel] = useState({});
  const [invalidatedDadosResponsavel, setInvalidatedDadosResponsavel] = useState(false);

  const [numCalcado, setNumCalcado] = useState("");
  const [validatedNumCalcado, setValidatedNumCalcado] = useState(false);
  const [invalidatedNumCalcado, setInvalidatedNumCalcado] = useState(false);

  const [tamCamiseta, setTamCamiseta] = useState("");
  const [validatedTamCamiseta, setValidatedTamCamiseta] = useState(false);
  const [invalidatedTamCamiseta, setInvalidatedTamCamiseta] = useState(false);

  const [comentario, setComentario] = useState("");
  const [validatedComentario, setValidatedComentario] = useState(false);

  const resetFields = () => {
    setNomeCompleto("");
    setValidatedNomeCompleto(false);
    setInvalidatedNomeCompleto(false);

    setDataNascimento('');
    setValidatedDataNascimento(false);
    setInvalidatedDataNascimento(false);

    setDadosResponsavel({});
    setInvalidatedDadosResponsavel(false);

    setNumCalcado("");
    setValidatedNumCalcado(false);
    setInvalidatedNumCalcado(false);

    setTamCamiseta("");
    setValidatedTamCamiseta(false);
    setInvalidatedTamCamiseta(false);

    setComentario("");
    setValidatedComentario(false);
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
    if(dadosResponsavel.id === undefined){
      setInvalidatedDadosResponsavel(true);
      flag = true;
    }
    if(invalidatedNumCalcado === true){
      flag = true;
    }
    if(invalidatedTamCamiseta === true){
      flag = true;
    }
   
    if(flag === false){
      let dtNascimento = converterData(dataNascimento);

      const obj = {
        nome: nomeCompleto,
        dataNascimento: dtNascimento,
        sexo: sexoPessoa,
        idResponsavel: dadosResponsavel.id,
        nCalcado: numCalcado,
        tamRoupa: tamCamiseta,
        comentario: comentario,
        foto: "https://www.gazetadopovo.com.br/viver-bem/wp-content/uploads/2015/12/smith-prd-meth01-tom_rpc_intra3-600x457.jpg"
      };

      postCrianca(obj).then(res => {
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

  const onChangeNome = e => {
    checkText(e, setNomeCompleto, setValidatedNomeCompleto, setInvalidatedNomeCompleto);
  }

  const onChangeSexo = e => {
    setSexoPessoa(e.target.value);
  }

  const onChangeData = e => {
    checkData(e, dataNascimento, setDataNascimento, setValidatedDataNascimento, setInvalidatedDataNascimento)
  }

  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Criança cadastrada" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao cadastrar" type="error"/>

    <label className="CadastroCrianca__descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>
    
    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      <CamposPessoa nome={nomeCompleto} onChangeNome={onChangeNome} valNome={validatedNomeCompleto} invNome={invalidatedNomeCompleto}
          data={dataNascimento} onChangeData={onChangeData} valData={validatedDataNascimento} invData={invalidatedDataNascimento}
          sexo={sexoPessoa} onChangeSexo={onChangeSexo}
      />

      <Form.Group as={Row} controlId="formGroupName" >
        <Form.Label column sm={2} className="CadastroCrianca__label">
          Responsável *
        </Form.Label>
        <Col sm={8} className="CadastroCrianca__inputText">
          {dadosResponsavel.id === undefined ?
          <>
          <ModalBusca setDadosResponsavel={setDadosResponsavel} valor="Selecionar o responsável"/>
          {invalidatedDadosResponsavel ? 
          <div className="CadastroCrianca__error">Campo obrigatório, selecione o responsável desta criança</div>
          :
          ''}
          </>
            :
          <>
          <Card modal={false} dados={dadosResponsavel}/>
          <ModalBusca setDadosResponsavel={setDadosResponsavel} valor="Mudar de responsável"/>
          </>  
          }
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupCalcado">
        <Form.Label column sm={2} className="CadastroCrianca__label">
          Número do calçado
        </Form.Label>
        <Col sm={8} className="CadastroCrianca__inputText">
          <Form.Control 
            className="CadastroCrianca__inputNumber"
            type="text"
            placeholder="Ex: 33"
            onChange={e => checkNumber(e.target, setNumCalcado, setValidatedNumCalcado, setInvalidatedNumCalcado)}
            value={numCalcado}
            isValid={validatedNumCalcado}
            isInvalid={invalidatedNumCalcado}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número maior que zero (Apenas números).
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupTamanho">
        <Form.Label column sm={2} className="CadastroCrianca__label">
          Tamanho de camiseta
        </Form.Label>
        <Col sm={8} className="CadastroCrianca__inputText">
          <Form.Control 
            className="CadastroCrianca__inputNumber"
            type="text"
            placeholder="Ex: 10, 12, GG ..."
            onChange={e => checkCamiseta(e.target, setTamCamiseta, setValidatedTamCamiseta, setInvalidatedTamCamiseta)}
            isValid={validatedTamCamiseta}
            isInvalid={invalidatedTamCamiseta}
            value={tamCamiseta}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número ou um tamanho (PP, P, M, G, GG, GGG).
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Comentario validatedComentario={validatedComentario} setValidatedComentario={setValidatedComentario} comentario={comentario} setComentario={setComentario}/>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Cadastrar</Button>
        </Col>
      </Form.Group>
    </Form>
    </>
  );
}
