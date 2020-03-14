import React,  { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

import Snackbar from '../Snackbars';
import {Form, Row, Col, Button} from 'react-bootstrap';
import CamposPessoa from '../CamposPessoa/index';
import Comentario from '../CampoComentario/index';
import Endereco from '../Endereco/index';
import Contato from '../CampoContato/index'
import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';
import ButtonSave from '../ButtonSave';

import { checkText, checkData, checkCpf, checkTextField } from '../../validated';
import {converterData} from '../../assist';
import {postResponsavel, postImagem} from '../../services';

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
  const [imgOriginal, setImgOriginal] = useState("");
  const [src, setSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

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

  const [submit, setSubmit] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    return () => {mounted.current = false}
  }, []);

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
    setImgOriginal("");
    setSrc(null);
    setOpenCrop(false);
    
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

    setSubmit(false);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    
    if(submit === true){
      return;
    }
    setSubmit(true);

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

        await postResponsavel(obj);

        if(mounted.current){
          setOpenAlertSuccess(true);
          setOpenAlertError(false);
          resetFields();
        }
      }
      catch(res){
        if(mounted.current){
          setOpenAlertSuccess(false);
          setOpenAlertError(true);
        }
      }
    }
    setSubmit(false);
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

    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
            {imgBase64 && (<button className="CadastroResponsavel__buttonEdit" style={{marginLeft: '10px'}} onClick={handleOpen}>Editar foto</button>)}
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

      {telefones.map((_, index) => (
          <Contato key={index} id={index} contacts={telefones} setContacts={setTelefones} type="telefone" />
        ))
      }
      <Button as={Row} variant="link" onClick={addNewPhone} className="CadastroResponsavel__buttonAdd">Novo telefone</Button>

      {emails.map((_, index) => (
          <Contato key={index} id={index} contacts={emails} setContacts={setEmails} type="email"/>
        ))
      }
      <Button as={Row} variant="link" onClick={addNewEmail} className="CadastroResponsavel__buttonAdd">Novo e-mail</Button>

      <ButtonSave 
        isLoading={submit}
      >Salvar
      </ButtonSave>
    </Form>
    </>
  );
}
