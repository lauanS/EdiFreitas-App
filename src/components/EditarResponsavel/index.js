import React,  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import {Modal, Form, Row, Col, Button} from 'react-bootstrap';

import { checkText, checkData, checkCpf, checkTextField } from '../../validated';

import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import Endereco from '../Endereco/index';
import Contato from '../CampoContato/index'

import {desconverterData, converterData} from '../../assist';
import {putResponsavel} from '../../services';

import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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

      putResponsavel(obj, dados.id)
      .then(res => {
        setEdit(false);
        update();
        updateList();
      })
      .catch(res => {
        erroUpdate();
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setEdit(false);
  }

  return (
    <>
    <Modal
      className="modalEditarResp"
      show={openModal}
      onHide={() => handleCloseModal()}
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
    </>
  );
}
