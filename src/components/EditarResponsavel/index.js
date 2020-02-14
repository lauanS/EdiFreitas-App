import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import {Modal, Form, Row, Col, Button} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import Endereco from '../Endereco/index';
import Contato from '../CampoContato/index'
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';

import { checkText, checkData, checkCpf, checkTextField } from '../../validated';
import {desconverterData, converterData} from '../../assist';
import {putResponsavel, postImagem} from '../../services';

export default function CadastroResponsavel(props){
  const {erroUpdate, update, updateList, setEdit, dados} = props;

  const [nomeCompleto, setNomeCompleto] = useState(dados.nome);
  const [validatedNomeCompleto, setValidatedNomeCompleto] = useState(true);
  const [invalidatedNomeCompleto, setInvalidatedNomeCompleto] = useState(false);

  const [dataNascimento, setDataNascimento] = useState(desconverterData(dados.dataNascimento));
  const [validatedDataNascimento, setValidatedDataNascimento] = useState(true);
  const [invalidatedDataNascimento, setInvalidatedDataNascimento] = useState(false);

  const [sexoPessoa, setSexoPessoa] = useState(dados.sexo);

  const [cpf, setCpf] = useState(dados.cpf);
  const [validatedCpf, setValidatedCpf] = useState(true);
  const [invalidatedCpf, setInvalidatedCpf] = useState(false);

  const [imgBase64, setImgBase64] = useState("");
  const [invalidatedImgBase64, setInvalidatedImgBase64] = useState(false);
  const [imgOriginal, setImgOriginal] = useState("");
  const [src, setSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  let comen = "";
  let comenVali = false;
  if(dados.comentario !== ""){
    comen = dados.comentario;
    comenVali = true;
  }

  const [comentario, setComentario] = useState(comen);
  const [validatedComentario, setValidatedComentario] = useState(comenVali);

  const [logradouro, setLogradouro] = useState(dados.endereco.logradouro);
  const [validatedLogradouro, setValidatedLogradouro] = useState(true);
  const [invalidatedLogradouro, setInvalidatedLogradouro] = useState(false);

  const [numero, setNumero] = useState(dados.endereco.numero);
  const [validatedNumero, setValidatedNumero] = useState(true);
  const [invalidatedNumero, setInvalidatedNumero] = useState(false);

  let c = "";
  let cVali = false;
  if(dados.endereco.cep !== ""){
    c = dados.endereco.cep;
    cVali = true;
  }

  const [cep, setCep] = useState(c);
  const [validatedCep, setValidatedCep] = useState(cVali);
  const [invalidatedCep, setInvalidatedCep] = useState(false);

  const [bairro, setBairro] = useState(dados.endereco.bairro);
  const [validatedBairro, setValidatedBairro] = useState(true);
  const [invalidatedBairro, setInvalidatedBairro] = useState(false);

  const [cidade, setCidade] = useState(dados.endereco.cidade);
  const [validatedCidade, setValidatedCidade] = useState(true);
  const [invalidatedCidade, setInvalidatedCidade] = useState(false);

  let email = [''];
  let tele = [''];
  if(dados.contatos.length > 0){
    email = [];
    tele = [];
    let value;

    for(let i = 0; i < dados.contatos.length; i++){
      value = dados.contatos[i];
  
      if(value.tipo === "email"){
        email = [...email, value.contato];
      }
      else{
        tele = [...tele, value.contato];
      }
    }

    if(email.length === 0){
      email = [''];
    }
    if(tele.length === 0){
      tele = [''];
    }
  }

  const [telefones, setTelefones] = useState(tele);
  const [emails, setEmails] = useState(email);

  const [openModal, setOpenModal] = useState(true);

  const handleSubmit = async () => {
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
          cpf,
          comentario,
          foto: resImg.data.url,
          endereco: {
            logradouro,
            bairro,
            cidade,
            cep: cepFormatado,
            numero: numero
          },
          contatos
        }

        await putResponsavel(obj, dados.id)

        setEdit(false);
        update();
        updateList();
      }
      catch(res) {
        erroUpdate();
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
    checkData(e, dataNascimento, setDataNascimento, 
        setValidatedDataNascimento, setInvalidatedDataNascimento)
  }

  const onChangeTextField = (e, setText, setValidated, setInvalidated) => {
    checkTextField(e, setText, setValidated, setInvalidated);
  }

  const addNewPhone = () => {
    setTelefones([...telefones, '']);
  }

  const addNewEmail = () => {
    setEmails([...emails, '']);
  }

  return (
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
        textButton={"Concluir edição da foto de perfill"}
      />
    :
    <Modal
      className="modalEditarResp"
      show={openModal}
      onHide={() => setOpenModal(true)}
      dialogClassName="modalEditarResp__dialog"
      aria-labelledby="example-custom-modal-styling-title"
      scrollable
      centered
    >
      <Modal.Header className="modalEditarResp__header">
        <div className="modalEditarResp__headerDiv">
          <p className="modalEditarResp__link" onClick={e => setEdit(false)}><CloseIcon/> Cancelar</p>
          <p className="modalEditarResp__link" onClick={handleSubmit}><SaveAltIcon/> Salvar</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <label className="EditarResponsavel__descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>

        <Form noValidate autoComplete="off">
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
            <Form.Label column sm={2} className="EditarResponsavel__label">
              CPF *
            </Form.Label>
            <Col sm={8} className="EditarResponsavel__inputText">
              <Form.Control 
                className="EditarResponsavel__inputCpf"
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
            <Form.Label column sm={2} className="EditarResponsavel__label">
              Foto de perfil *
            </Form.Label>
            <Col sm={8} className="EditarResponsavel__inputText">
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
                {imgBase64 && (<button className="EditarResponsavel__buttonEdit" style={{marginLeft: '10px'}} onClick={handleOpen}>Editar foto</button>)}
              </div>
              {invalidatedImgBase64 ? 
              <div className="EditarResponsavel__error">Campo obrigatório, selecione uma foto de perfil</div>
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

          <Comentario validatedComentario={validatedComentario} setValidatedComentario={setValidatedComentario}  comentario={comentario} setComentario={setComentario}/>
          
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
        </Form>
      </Modal.Body>
    </Modal>
    }
    </>
  );
}
