import React, {useState, useRef, useEffect} from 'react';
import './styles.scss';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Snackbar from '../Snackbars';
import CampoImagem from '../CampoImagem';
//import CropFotos from '../CropFotos';
import {Form, Row, Col} from 'react-bootstrap';
//import CropIcon from '@material-ui/icons/Crop';
import CloseIcon from '@material-ui/icons/Close';
import ButtonSave from '../ButtonSave';
import OverlayLoading from '../OverlayLoading';
import {saveError, onSave, onLoad} from '../../assist/feedback';

import {postImagem} from '../../services'

export default function AdicionarFotos(props){
  const {title, voltar, idAlbum} = props;

  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  const [imgBase64, setImgBase64] = useState([]);
  const [imgOriginal, setImgOriginal] = useState([]);
  //const [src, setSrc] = useState(null);
  //const [openCrop, setOpenCrop] = useState(false);
  //const [index, setIndex] = useState(null);
  const [invalidatedFotos, setInvalidatedFotos] = useState(false);

  const [multiple, setMultiple] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    return () => { mounted.current = false; }
  }, []);

  const onSelectImg = async (e) => {
    e.persist();
    let queUrl = [];
    if (e.target.files && e.target.files.length > 0) {
      setLoadingImage(true);
      for(let i = 0; i < e.target.files.length; i++){
        let url = await loadImg(e.target.files[i]);
        queUrl.push(url);
      }
      if(mounted.current){
        setImgOriginal(imgOriginal.concat(queUrl));
        setImgBase64(imgBase64.concat(queUrl));
        setLoadingImage(false);
      }
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

  /*const handleImg = (base64, index) => {
    let newBase64 = imgBase64.slice();
    newBase64[index] = base64;
    setImgBase64(newBase64);
  }*/

  /*const handleEditar = (e, indice) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(indice);
    setSrc(imgOriginal[indice]);
    setOpenCrop(true);
  }*/

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

  /*const handleClose = () => {
    setSrc(null);
    setOpenCrop(false);
  }*/

  const resetFields = () => {
    setImgBase64([]);
    setImgOriginal([]);
    //setSrc(null);
    //setOpenCrop(false);
    //setIndex(null);
    setInvalidatedFotos(false);
    setSubmit(false);
    setLoadingImage(false);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    if(submit === true) {
      return;
    }
    setSubmit(true);
    
    let flag = false;

    if(!(imgBase64.length > 0)){
      setInvalidatedFotos(true);
      flag = true;
    }

    if(flag === false){
      try{
        for(let i = 0; i < imgBase64.length; i++){
          let d = new Date();
          let img = {
            iBase: imgBase64[i],
            filename: title + "" + i + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds(),
            album: idAlbum
          }

          await postImagem(img);
        }

        if(mounted.current){
          if(imgBase64.length > 0){
            setMultiple(true);
          }
          else{
            setMultiple(false);
          }
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
  }


  return (
    <>
    <OverlayLoading showOverlay={submit} msg={onSave("álbum")}/>
    <OverlayLoading showOverlay={loadingImage} msg={onLoad("imagens")}/>
    <Snackbar open={openAlertSuccess} setOpen={setOpenAlertSuccess} msg={multiple ? "Imagens salvas" : "Imagem salva"} type="success"/>
    <Snackbar open={openAlertError} setOpen={setOpenAlertError} msg={saveError()} type="error"/>

    <div className="visualizarAlbum__header" style={{marginBottom: '16px'}}>
      <p className="visualizarAlbum__dados" onClick={e => voltar()}><ArrowBackIosIcon /><span className="visualizarAlbum__text">Voltar</span></p>
      <h2>Álbum: {title}</h2>
    </div>    

    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Form.Group as={Row} controlId="formGroupImagem">
        <Form.Label column sm={2} className="adicionarFotos__label">
          Fotos para o álbum *
        </Form.Label>
        <Col sm={8} className="adicionarFotos__inputText">
          <CampoImagem 
            onSelectFile={onSelectImg}
            text={"Adicionar fotos"}
            multiple={true}
          />
          {/*<CropFotos
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
          />*/}
          {invalidatedFotos && <div className="adicionarFotos__error">Campo obrigatório, selecione pelo menos uma foto para o álbum</div>}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <div className="visualizarAlbum" style={{paddingLeft: '15px'}}>
        {imgBase64.length > 0 ? imgBase64.map((img, index) => 
          <div className="visualizarAlbum__itemListImage" key={index}>
            <div className="visualizarAlbum__headerImg">
              {/*<div className="visualizarAlbum__link" onClick={(e) => {handleEditar(e, index)}}><CropIcon/><span>Cortar foto</span></div>*/}
              <div className="visualizarAlbum__link" onClick={(e) => {handleExcluir(e, index)}}><CloseIcon/><span>Retirar foto</span></div>
            </div>
                        
            <div className="visualizarAlbum__divImg">
              <div className="visualizarAlbum__divFundo">
                <div className="visualizarAlbum__fundo">
                  <span className="visualizarAlbum__span">
                    <img 
                      className="visualizarAlbum__imgFundo"
                      alt="Crop" 
                      src={img} 
                    />
                  </span>
                </div>
              </div>
              <img 
                className="visualizarAlbum__img"
                alt="Crop" 
                src={img} 
              />
            </div>
          </div>
        ) : ''}
      </div>
    </Form.Group>

    <ButtonSave 
        isLoading={submit}
      >Salvar
      </ButtonSave>
    </Form>
  </>
  );
}