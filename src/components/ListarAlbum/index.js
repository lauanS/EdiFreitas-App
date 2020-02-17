import React, {useState, useEffect} from 'react';

import CardAlbum from './cardAlbum';
import Snackbar from '../Snackbars';
import VisualizarImagens from '../VisualizarImagens';
import EditarImagens from '../EditarImagens';
import SweetAlert from 'react-bootstrap-sweetalert';

import {deleteSuccess, deleteError, updateSuccess, updateError} from '../../assist/feedback'
import {getAlbum, deleteAlbum, getImagem} from '../../services';

export default function ListarAlbum(){
  const [openAlertSuccessDelete, setOpenAlertSuccessDelete] = useState(false);
  const [openAlertErrorDelete, setOpenAlertErrorDelete] = useState(false);

  const [openAlertSuccessUpdate, setOpenAlertSuccessUpdate] = useState(false);
  const [openAlertErrorUpdate, setOpenAlertErrorUpdate] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [texto, setTexto] = useState("");
  const [id, setId] = useState(0);

  const [albuns, setAlbuns] = useState([]);
  const [fotos, setFotos] = useState([]);

  const [visualizar, setVisualizar] = useState(false);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getAlbum()
    .then(res => {
      setAlbuns(res.data);
    })
    .catch(() => {
      
    });
  }, []);

  const handleExcluir = (id, nome) => {
    setId(id);
    setTexto(nome);
    setShowAlert(true);
  }

  const handleConfirm = async () => {
    try{
      await deleteAlbum(id);

      setShowAlert(false);
      setOpenAlertSuccessDelete(true);
      setOpenAlertErrorDelete(false);

      let albuns = await getAlbum();
      setAlbuns(albuns.data);
    }
    catch(res){
      setShowAlert(false);
      setOpenAlertSuccessDelete(false);
      setOpenAlertErrorDelete(true);
    }
  }

  const handleCancel = () => {
    setShowAlert(false);
  }

  const handleVisualizar = (id, nome) => {
    getImagem(id)
    .then(res => {
      setEditar(false);
      setVisualizar(true);
      setFotos(res.data);
      setTexto(nome);
      
    })
    .catch(res => {
      
    });
  }

  const handleEditar = (id, nome) => {
    getImagem(id)
    .then(res => {
      setEditar(true);
      setVisualizar(false);
      setFotos(res.data);
      setTexto(nome);
    })
    .catch(res => {
      
    });
  }

  const handleVoltar = () => {
    setEditar(false);
    setVisualizar(false);
  }

  return(
    <>
    <Snackbar open={openAlertSuccessDelete} setOpen={setOpenAlertSuccessDelete} msg={deleteSuccess("Álbum")} type="success"/>
    <Snackbar open={openAlertErrorDelete} setOpen={setOpenAlertErrorDelete} msg={deleteError} type="error"/>

    <Snackbar open={openAlertSuccessUpdate} setOpen={setOpenAlertSuccessUpdate} msg={updateSuccess} type="success"/>
    <Snackbar open={openAlertErrorUpdate} setOpen={setOpenAlertErrorUpdate} msg={updateError} type="error"/>

    <SweetAlert 
      title={"Deseja mesmo deletar todas as informações do álbum  " + texto + " ?"} 
      show={showAlert} 
      type='warning' 
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      btnSize='sm' 
      confirmBtnText="Deletar"
      confirmBtnBsStyle="danger"
      cancelBtnText="Cancelar"
      cancelBtnBsStyle="secondary"
      showCancel={true}
      focusConfirmBtn={false}
      showCloseButton={true}
    />

    {visualizar === true ?
      <VisualizarImagens src={fotos} nome={texto} voltar={handleVoltar} editar={handleEditar} id={id}/>
    :
    <>
     {editar === true ? 
      ''
      :
      <div className="listarAlbum">
        {albuns.length > 0 ? albuns.map((album, index) => 
          <CardAlbum key={index} dados={album} visualizar={handleVisualizar} excluir={handleExcluir} editar={handleEditar} id={album.id}/>
        )
        :
        ''}
      </div>
    }
    </>
    
    }
    
    </>
  );
}