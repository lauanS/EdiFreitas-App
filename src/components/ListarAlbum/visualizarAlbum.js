import React, {useState, useRef, useEffect} from 'react';
import './styles.scss';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import SweetAlert from 'react-bootstrap-sweetalert';
import Snackbar from '../Snackbars';

import {deleteImagem, getImagem} from '../../services/index';
import {deleteSuccess, deleteError} from '../../assist/feedback';

export default function VisualizarAlbum(props){
  const { src, title, voltar, idAlbum} = props;

  const [idImg, setIdImg] = useState(0);
  const [imagemSrc, setImagemSrc] = useState(src);
  const [showAlert, setShowAlert] = useState(false);
  const [openAlertSuccessDelete, setOpenAlertSuccessDelete] = useState(false);
  const [openAlertErrorDelete, setOpenAlertErrorDelete] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    return () => { mounted.current = false; }
  }, []);

  const handleDelete = (e, idImagem) => {
    e.preventDefault();
    e.stopPropagation();
    setIdImg(idImagem);
    setShowAlert(true);
  }

  const handleConfirm = async () => {
    try{
      await deleteImagem(idImg);
      let imagens = await getImagem(idAlbum);

      if(mounted.current){
        setShowAlert(false);
        setOpenAlertSuccessDelete(true);
        setOpenAlertErrorDelete(false);
        setImagemSrc(imagens.data);
      }
    }
    catch(res){
      if(mounted.current){
        setShowAlert(false);
        setOpenAlertSuccessDelete(false);
        setOpenAlertErrorDelete(true);
      }
    }
  }

  return (
    <>
    <Snackbar open={openAlertSuccessDelete} setOpen={setOpenAlertSuccessDelete} msg={deleteSuccess("Imagem")} type="success"/>
    <Snackbar open={openAlertErrorDelete} setOpen={setOpenAlertErrorDelete} msg={deleteError()} type="error"/>

    <SweetAlert 
      title={"Deseja mesmo excluir essa foto do álbum  " + title + " ?"} 
      show={showAlert} 
      type='warning' 
      onConfirm={handleConfirm}
      onCancel={e => setShowAlert(false)}
      btnSize='sm' 
      confirmBtnText="Excluir foto"
      confirmBtnBsStyle="danger"
      cancelBtnText="Cancelar"
      cancelBtnBsStyle="secondary"
      showCancel={true}
      focusConfirmBtn={false}
      showCloseButton={true}
    />

    <div className="visualizarAlbum__header">
      <p className="visualizarAlbum__dados" onClick={e => voltar()}><ArrowBackIosIcon /><span className="visualizarAlbum__text">Voltar</span></p>
      <h2>Álbum: {title}</h2>
    </div>

    <div className="visualizarAlbum">
      {imagemSrc.length > 0 ? imagemSrc.map((img, index) => 
        <div className="visualizarAlbum__itemListImage" key={index}>
          <div className="visualizarAlbum__headerDelete">
            <div className="visualizarAlbum__link-delete" onClick={(e) => {handleDelete(e, img.id)}}><DeleteIcon/><span>Excluir foto</span></div>
          </div>
          <div className="visualizarAlbum__divImg">
            <div className="visualizarAlbum__divFundo">
              <div className="visualizarAlbum__fundo">
                <span className="visualizarAlbum__span">
                  <img 
                    className="visualizarAlbum__imgFundo"
                    alt="Crop" 
                    src={img.url} 
                  />
                </span>
              </div>
            </div>
            <img 
              className="visualizarAlbum__img"
              alt="Crop" 
              src={img.url} 
            />
          </div>
        </div>
      ): ''}
    </div>
    </>

  );
}