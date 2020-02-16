import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import {Form, Row, Col, Button} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import ModalBusca from '../ModalBuscaResponsavel';
import Card from '../CardResponsavel';
import Snackbar from '../Snackbars';
import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';

import { checkText, checkNumber, checkCamiseta, checkData } from '../../validated';
import {postCrianca, postImagem} from '../../services'
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

  const [imgBase64, setImgBase64] = useState("");
  const [invalidatedImgBase64, setInvalidatedImgBase64] = useState(false);
  const [imgOriginal, setImgOriginal] = useState("");
  const [src, setSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

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

    setImgBase64("");
    setInvalidatedImgBase64(false);
    setImgOriginal("");
    setSrc(null);
    setOpenCrop(false);

    setNumCalcado("");
    setValidatedNumCalcado(false);
    setInvalidatedNumCalcado(false);

    setTamCamiseta("");
    setValidatedTamCamiseta(false);
    setInvalidatedTamCamiseta(false);

    setComentario("");
    setValidatedComentario(false);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    
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
    if(imgBase64 === ""){
      setInvalidatedImgBase64(true);
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

      try{
        let d = new Date();

        const img = {
          iBase: imgBase64,
          filename: nomeCompleto + "" + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds()
        }

        const resImg = await postImagem(img);

        const obj = {
          nome: nomeCompleto,
          dataNascimento: dtNascimento,
          sexo: sexoPessoa,
          idResponsavel: dadosResponsavel.id,
          nCalcado: numCalcado,
          tamRoupa: tamCamiseta,
          comentario: comentario,
          foto: resImg.data.url
        };

        await postCrianca(obj);
        setOpenAlertSuccess(true);
        setOpenAlertError(false);
        resetFields();
      }
      catch(res){
        setOpenAlertSuccess(false);
        setOpenAlertError(true);
      }
    }
  };

  const onSelectImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setOpenCrop(true);
      e.target.value = '';
    }
  }

  const handleImg = (base64) => {
    setImgBase64(base64);
    setImgOriginal(src);
    setInvalidatedImgBase64(false);
  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpenCrop(true);
    setSrc(imgOriginal);
  }

  const handleClose = () => {
    setSrc(null);
    setOpenCrop(false);
  }

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
    
    <Form noValidate autoComplete="off">
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

      <Form.Group as={Row} controlId="formGroupImagem">
        <Form.Label column sm={2} className="CadastroCrianca__label">
          Foto de perfil *
        </Form.Label>
        <Col sm={8} className="CadastroCrianca__inputText">
          {imgBase64 && (
            <div style={{ marginBottom: '5px'}}>
              <img 
                alt="Crop" 
                style={{ width: '200px', height: '200px', borderRadius: '4px', border: '1px solid black', marginTop: '1px' }} 
                src={imgBase64} 
              />
            </div>
          )}
          <div style={{display: 'flex'}}>
            <CampoImagem
              onSelectFile={onSelectImg}
              text={imgBase64 ? "Selecionar outra foto" : "Selecionar a foto"}
              multiple={false}
            />
            {imgBase64 && (<button className="CadastroCrianca__buttonEdit" style={{marginLeft: '10px'}} onClick={handleOpen}>Editar foto</button>)}

          </div>
          
          <CropFotos
            cropping={{unit: 'px', aspect: 1, width: 200, height: 200, x: 0, y: 0}}
            open={openCrop}
            closed={handleClose}
            setNewImage={handleImg}
            src={src}
            minWidth={200}
            minHeight={200}
            maxWidth={500}
            maxHeight={500}
            maxWidthImg={500}
            textButton={"Concluir edição da foto de perfil"}
          />
          {invalidatedImgBase64 ? 
          <div className="CadastroCrianca__error">Campo obrigatório, selecione uma foto de perfil</div>
          :
          ''}
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

      <Button className="CadastroCrianca__buttonSubmit" variant="success" onClick={handleSubmit}>Cadastrar criança</Button>
    </Form>
    </>
  );
}
