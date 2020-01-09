import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import {Form, Row, Col} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import BuscaResponsavel from '../BuscaResponsavel';
import Card from '../CardResponsavel';
import { checkText, checkNumber, checkCamiseta, checkData } from '../../validated';
import {postCrianca} from '../../services';
import {desconverterData, converterData} from '../../assist';
import Snackbar from '../Snackbars';
import Button from '@material-ui/core/Button';

export default function EditarCrianca(props){
  const {submitEdit, setEdit, setSubmitEdit, dados} = props;

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState(dados.nome);
  const [validatedNomeCompleto, setValidatedNomeCompleto] = useState(false);
  const [invalidatedNomeCompleto, setInvalidatedNomeCompleto] = useState(false);

  const [dataNascimento, setDataNascimento] = useState(desconverterData(dados.dataNascimento));
  const [validatedDataNascimento, setValidatedDataNascimento] = useState(false);
  const [invalidatedDataNascimento, setInvalidatedDataNascimento] = useState(false);

  const [sexoPessoa, setSexoPessoa] = useState(dados.sexo);

  const [dadosResponsavel, setDadosResponsavel] = useState(dados.responsavel);

  let calcado = 0;
  if(dados.nCalcado !== null){
    calcado = dados.nCalcado;
  }

  const [numCalcado, setNumCalcado] = useState(calcado);
  const [validatedNumCalcado, setValidatedNumCalcado] = useState(false);
  const [invalidatedNumCalcado, setInvalidatedNumCalcado] = useState(false);

  const [tamCamiseta, setTamCamiseta] = useState(dados.tamRoupa);
  const [validatedTamCamiseta, setValidatedTamCamiseta] = useState(false);
  const [invalidatedTamCamiseta, setInvalidatedTamCamiseta] = useState(false);

  let comen = "";
  if(dados.comentario !== null){
    comen = dados.comentario;
  }

  const [comentario, setComentario] = useState(comen);
  const [validatedComentario, setValidatedComentario] = useState(false);

  const [openBusca, setOpenBusca] = useState(false);

  const handleBusca = e => {
    setOpenBusca(true);
    e.preventDefault();
    e.stopPropagation();
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
    if(invalidatedNumCalcado === true){
      flag = true;
    }
    if(invalidatedTamCamiseta === true){
      flag = true;
    }
   
    if(flag === false){
      let dtNascimento = converterData(dataNascimento);

      var text = '{' +
        '"nome": "' + nomeCompleto + '",' +
        '"dataNascimento": "' + dtNascimento + '",' +
        '"sexo": "' + sexoPessoa + '",' +
        '"idResponsavel": "' + dadosResponsavel.id + '",' +
        '"nCalcado": "' + numCalcado + '",' +
        '"tamRoupa": "' + tamCamiseta + '",' + 
        '"comentario" : "' + comentario + '",' +
        '"foto" : ""' +
      '}';

      var obj = JSON.parse(text);
      postCrianca(obj).then(res => {
        setOpenAlertSuccess(true);
        setOpenAlertError(false);
      })
      .catch(res => {
        console.log(res);
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
    {openBusca === true ? 
    <BuscaResponsavel setDadosResponsavel={setDadosResponsavel} setOpen={setOpenBusca}/>
    :
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Informações alteradas" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao salvar" type="error"/>

    <label className="EditarCrianca__descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>
    
    <Form onSubmit={handleSubmit} noValidate  >
      <CamposPessoa nome={nomeCompleto} onChangeNome={onChangeNome} valNome={validatedNomeCompleto} invNome={invalidatedNomeCompleto}
          data={dataNascimento} onChangeData={onChangeData} valData={validatedDataNascimento} invData={invalidatedDataNascimento}
          sexo={sexoPessoa} onChangeSexo={onChangeSexo}
      />

      <Form.Group as={Row} controlId="formGroupName" >
        <Form.Label column sm={2} className="EditarCrianca__label">
          Responsável *
        </Form.Label>
        <Col sm={8} className="EditarCrianca__inputText">
          <Card modal={false} dados={dadosResponsavel}/>
          <Button
            onClick={handleBusca} 
            className="EditarCrianca__button" 
            variant="contained" 
            color="primary"
          >Mudar de responsável
          </Button>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupCalcado">
        <Form.Label column sm={2} className="EditarCrianca__label">
          Número do calçado
        </Form.Label>
        <Col sm={8} className="EditarCrianca__inputText">
          <Form.Control 
            className="EditarCrianca__inputNumber"
            type="text"
            placeholder="Ex: 33"
            value={numCalcado}
            onChange={e => checkNumber(e.target, setNumCalcado, setValidatedNumCalcado, setInvalidatedNumCalcado)}
            isValid={validatedNumCalcado}
            isInvalid={invalidatedNumCalcado}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número maior que zero (Apenas números).
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupTamanho">
        <Form.Label column sm={2} className="EditarCrianca__label">
          Tamanho de camiseta
        </Form.Label>
        <Col sm={8} className="EditarCrianca__inputText">
          <Form.Control 
            className="EditarCrianca__inputNumber"
            type="text"
            placeholder="Ex: 10, 12, GG ..."
            value={tamCamiseta}
            onChange={e => checkCamiseta(e.target, setTamCamiseta, setValidatedTamCamiseta, setInvalidatedTamCamiseta)}
            isValid={validatedTamCamiseta}
            isInvalid={invalidatedTamCamiseta}
          />
          <Form.Control.Feedback type="invalid">
            Insira um número ou um tamanho (PP, P, M, G, GG, GGG).
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Comentario validatedComentario={validatedComentario} setValidatedComentario={setValidatedComentario} comentario={comentario} setComentario={setComentario}/>

    </Form>
    </>
    }
    </>
  );
}
