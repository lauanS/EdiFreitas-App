import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Modal, Form, Row, Col} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import BuscaResponsavel from '../BuscaResponsavel';
import Card from '../CardResponsavel';
import Button from '@material-ui/core/Button';
import ModalHeader from './modalHeader';
import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';

import { checkText, checkNumber, checkCamiseta, checkData } from '../../validated';
import {putCrianca} from '../../services';
import {desconverterData, converterData} from '../../assist';

export default function EditarCrianca(props){
  const {erroUpdate, update, updateList, setEdit, dados, responsaveis} = props;

  const [nomeCompleto, setNomeCompleto] = useState(dados.nome);
  const [validatedNomeCompleto, setValidatedNomeCompleto] = useState(true);
  const [invalidatedNomeCompleto, setInvalidatedNomeCompleto] = useState(false);

  const [dataNascimento, setDataNascimento] = useState(desconverterData(dados.dataNascimento));
  const [validatedDataNascimento, setValidatedDataNascimento] = useState(true);
  const [invalidatedDataNascimento, setInvalidatedDataNascimento] = useState(false);

  const [sexoPessoa, setSexoPessoa] = useState(dados.sexo);

  const [dadosResponsavel, setDadosResponsavel] = useState(dados.responsavel);

  const [imgBase64, setImgBase64] = useState("");
  const [invalidatedImgBase64, setInvalidatedImgBase64] = useState(false);
  const [imgOriginal, setImgOriginal] = useState("");
  const [src, setSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  let calcado = "";
  let calcadoVali = false;
  if(dados.nCalcado !== null){
    calcado = dados.nCalcado;
    calcadoVali = true;
  }

  const [numCalcado, setNumCalcado] = useState(calcado);
  const [validatedNumCalcado, setValidatedNumCalcado] = useState(calcadoVali);
  const [invalidatedNumCalcado, setInvalidatedNumCalcado] = useState(false);

  let camisetaVali = false;
  if(dados.tamRoupa !== ""){
    camisetaVali = true;
  } 

  const [tamCamiseta, setTamCamiseta] = useState(dados.tamRoupa);
  const [validatedTamCamiseta, setValidatedTamCamiseta] = useState(camisetaVali);
  const [invalidatedTamCamiseta, setInvalidatedTamCamiseta] = useState(false);

  let comen = "";
  let comenVali = false;
  if(dados.comentario !== ""){
    comen = dados.comentario;
    comenVali = true;
  }

  const [comentario, setComentario] = useState(comen);
  const [validatedComentario, setValidatedComentario] = useState(comenVali);

  const [openModal, setOpenModal] = useState(true);
  const [openBusca, setOpenBusca] = useState(false);

  const handleSubmit = () => {
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

      const obj = {
        nome: nomeCompleto,
        dataNascimento: dtNascimento,
        sexo: sexoPessoa,
        idResponsavel: dadosResponsavel.id,
        nCalcado: numCalcado,
        tamRoupa: tamCamiseta, 
        comentario: comentario,
        foto: dados.foto
      };
      
      putCrianca(obj, dados.id).then(res => {
        setEdit(false);
        update();
        updateList();
      })
      .catch(res => {
        erroUpdate();
      });
    }
  }

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
  const handleBusca = e => {
    setOpenBusca(true);
    e.preventDefault();
    e.stopPropagation();
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
    {openBusca === true ? 
    <Modal
      className="modalEditarCriancaBusca"
      show={openBusca}
      onHide={() => setOpenBusca(true)}
      keyboard={false}
      dialogClassName="modalEditarCriancaBusca__dialog"
      aria-labelledby="example-custom-modal-styling-title"
      scrollable
      centered
    >
      <Modal.Header className="modalEditarCrianca__header">
        <ModalHeader setOpenBusca={setOpenBusca} busca={true} setEdit={setEdit} submit={handleSubmit}/>
      </Modal.Header>
      <Modal.Body>
        <BuscaResponsavel responsaveis={responsaveis} setDadosResponsavel={setDadosResponsavel} setOpen={setOpenBusca}/>
      </Modal.Body>
    </Modal>
    :
    <>
    {openCrop ? 
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
    :
    <Modal
      className="modalEditarCrianca"
      show={openModal}
      onHide={() => setOpenModal(true)}
      dialogClassName="modalEditarCrianca__dialog"
      aria-labelledby="example-custom-modal-styling-title"
      scrollable
      centered
    >
      <Modal.Header className="modalEditarCrianca__header">
        <ModalHeader busca={false} setEdit={setEdit} submit={handleSubmit}/>
      </Modal.Header>
      <Modal.Body>
        <label className="EditarCrianca__descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>
      
        <Form noValidate autoComplete="off">
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

          <Form.Group as={Row} controlId="formGroupImagem">
            <Form.Label column sm={2} className="EditarCrianca__label">
              Foto de perfil *
            </Form.Label>
            <Col sm={8} className="EditarCrianca__inputText">
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
              {imgBase64 && (<button className="EditarCrianca__buttonEdit" style={{marginLeft: '10px'}} onClick={handleOpen}>Editar foto</button>)}
            </div>
            {invalidatedImgBase64 ? 
            <div className="EditarCrianca__error">Campo obrigatório, selecione uma foto de perfil</div>
            :
            ''}
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
      </Modal.Body>
    </Modal>
    }
    </>
    }
    </>
  );
}
