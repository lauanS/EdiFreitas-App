import React, {useState} from 'react';
import './styles.scss';

import CampoImagem from '../CampoImagem';
import CropFotos from '../CropFotos';
import Snackbar from '../Snackbars';
import {Form, Row, Col, Button} from 'react-bootstrap';
import CropIcon from '@material-ui/icons/Crop';
import CloseIcon from '@material-ui/icons/Close';

import {postAlbum, postImagem} from '../../services'

export default function AddFotos() {
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [validatedTitulo, setValidatedTitulo] = useState(false);
  const [invalidatedTitulo, setInvalidatedTitulo] = useState(false);

  const [imgBase64, setImgBase64] = useState([]);
  const [imgOriginal, setImgOriginal] = useState([]);
  const [src, setSrc] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [index, setIndex] = useState(null);
  const [invalidatedFotos, setInvalidatedFotos] = useState(false);

  const [submit, setSubmit] = useState(false);

  const onSelectImg = async (e) => {
    e.persist();
    let queUrl = [];
    if (e.target.files && e.target.files.length > 0) {
      for(let i = 0; i < e.target.files.length; i++){
        let url = await loadImg(e.target.files[i]);
        queUrl.push(url);
      }
      setImgOriginal(imgOriginal.concat(queUrl));
      setImgBase64(imgBase64.concat(queUrl));
      e.target.value = '';
    }
  }

  const loadImg = (file) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          resolve(reader.result);
        }
        );
        reader.readAsDataURL(file);
      }, 100);
    });
  }
  
  const handleImg = (base64, index) => {
    let newBase64 = imgBase64.slice();
    newBase64[index] = base64;
    setImgBase64(newBase64);
  }

  const handleEditar = (e, indice) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(indice);
    setSrc(imgOriginal[indice]);
    setOpenCrop(true);
  }

  const handleExcluir = (e, indice) => {
    e.preventDefault();
    e.stopPropagation();

    let imgArray = imgBase64.slice();
    let originalArray = imgOriginal.slice();

    imgArray.splice(indice, 1);
    originalArray.splice(indice, 1);

    setImgBase64(imgArray);
    setImgOriginal(originalArray);
  }

  const handleClose = () => {
    setSrc(null);
    setOpenCrop(false);
  }

  const resetFields = () => {
    setTitulo("");
    setValidatedTitulo(false);
    setInvalidatedTitulo(false);
  
    setImgBase64([]);
    setImgOriginal([]);
    setSrc(null);
    setOpenCrop(false);
    setIndex(null);
    setInvalidatedFotos(false);

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

    if(validatedTitulo === false){
      setInvalidatedTitulo(true);
      flag = true;
    }
    if(!(imgBase64.length > 0)){
      setInvalidatedFotos(true);
      flag = true;
    }

    if(flag === false){
      try{
        const album = {
          "nome" : titulo
        }
        
        const resAlbum = await postAlbum(album);

        for(let i = 0; i < imgBase64.length; i++){
          let d = new Date();
          let img = {
            iBase: imgBase64[i],
            filename: titulo + "" + i + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds(),
            album: resAlbum.data.id
          }

          await postImagem(img);
        }

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

  const onChangeTitulo = e => {
    setTitulo(e.value);
    if(e.value.length > 0){
      setValidatedTitulo(true);
      setInvalidatedTitulo(false);
    }
    else{
      setValidatedTitulo(false);
      setInvalidatedTitulo(true);
    }
  };

  return (
    <>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg="Álbum cadastrado" type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg="Ocorreu um erro ao cadastrar" type="error"/>

    <label className="addFotos__descricao">É obrigatório o preenchimento de campos com * (Asterisco) no título, é opcional quando não possuem o asterisco</label>
    
    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Form.Group as={Row} controlId="formGroupTitulo">
        <Form.Label column sm={2} className="addFotos__label">
          Nome do álbum*
        </Form.Label>
        <Col sm={8} className="addFotos__inputText">
          <Form.Control 
            required 
            type="text" 
            placeholder="Ex: Festa de natal" 
            onChange={e => onChangeTitulo(e.target)}
            value={titulo}
            isValid={validatedTitulo}
            isInvalid={invalidatedTitulo}
            />
          <Form.Control.Feedback type="invalid">
            Campo obrigatório, preencha o título do álbum.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formGroupImagem">
        <Form.Label column sm={2} className="addFotos__label">
          Fotos do álbum *
        </Form.Label>
        <Col sm={8} className="addFotos__inputText">
          <CampoImagem 
            onSelectFile={onSelectImg}
            text={"Adicionar fotos"}
            multiple={true}
          />
          <CropFotos
            cropping={{unit: 'px', aspect: null, width: 200, height: 200, x: 0, y: 0}}
            open={openCrop}
            closed={handleClose}
            setNewImage={handleImg}
            src={src}
            minWidth={200}
            minHeight={200}
            maxWidth={500}
            maxHeight={500}
            maxWidthImg={500}
            textButton={"Concluir edição da foto"}
            index={index}
          />
          {invalidatedFotos ? 
          <div className="addFotos__error">Campo obrigatório, selecione pelo menos uma foto para o álbum</div>
          :
          ''}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <div className="addFotos">
        {imgBase64.length > 0 ? imgBase64.map((img, index) => 
          <div className="addFotos__itemListImage" key={index}>
            <div className="addFotos__headerImg">
              <p className="addFotos__link" onClick={(e) => {handleEditar(e, index)}}><CropIcon/> Editar</p>
              <p className="addFotos__link" onClick={(e) => {handleExcluir(e, index)}}><CloseIcon/> Excluir</p>
            </div>
            <div className="addFotos__divImg">
              <div className="addFotos__divFundo">
                <div className="addFotos__fundo">
                  <span className="addFotos__span">
                    <img 
                      className="addFotos__imgFundo"
                      alt="Crop" 
                      src={img} 
                    />
                  </span>
                </div>
              </div>
              <img 
                className="addFotos__img"
                alt="Crop" 
                src={img} 
              />
            </div>
          </div>
        ) : ''}
        </div>
      </Form.Group>

      <Button className="CadastroCrianca__buttonSubmit" variant="success" onClick={handleSubmit}>Cadastrar album</Button>
    </Form>
    </>
  );
}