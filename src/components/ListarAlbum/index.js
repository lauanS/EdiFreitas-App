import React, {useState, useEffect, useRef } from 'react';
import './styles.scss';

import CardAlbum from './cardAlbum';
import VisualizarAlbum from './visualizarAlbum';
import ModalEditTitle from './modalEditTitle';
import AdicionarFotos from './adicionarFotos';
import Snackbar from '../Snackbars';
import SweetAlert from 'react-bootstrap-sweetalert';

import {deleteSuccess, deleteError, updateSuccess, updateError} from '../../assist/feedback'
import {getAlbum, deleteAlbum, getImagem} from '../../services';

export default function ListarAlbum(){
  const [openAlertSuccessDelete, setOpenAlertSuccessDelete] = useState(false);
  const [openAlertErrorDelete, setOpenAlertErrorDelete] = useState(false);

  const [openAlertSuccessUpdate, setOpenAlertSuccessUpdate] = useState(false);
  const [openAlertErrorUpdate, setOpenAlertErrorUpdate] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [nomeAlbum, setNomeAlbum] = useState("");
  const [idAlbum, setIdAlbum] = useState(0);

  const [albuns, setAlbuns] = useState([]);
  const [fotos, setFotos] = useState([]);

  const [visualizar, setVisualizar] = useState(false);
  const [editarNome, setEditarNome] = useState(false);
  const [adicionarFotos, setAdicionarFotos] = useState(false)

  const [errors, setErros] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    async function load(){
      try {
        const res = await getAlbum();
        if(mounted.current){
          setAlbuns(res.data);
          setErros(false);
        }
      } catch(res) {
        if(mounted.current){
          setErros(true);
        }
      }
    }
    load();
    return () => {mounted.current = false}
  }, []);

  const handleExcluir = (id, nome) => {
    setIdAlbum(id);
    setNomeAlbum(nome);
    setShowAlert(true);
  }

  const handleConfirm = async () => {
    try{
      await deleteAlbum(idAlbum);
      let albuns = await getAlbum();

      if(mounted.current){
        setShowAlert(false);
        setOpenAlertSuccessDelete(true);
        setOpenAlertErrorDelete(false);
        setAlbuns(albuns.data);
        setErros(false);
      }
    }
    catch(res){
      if(mounted.current){
        setShowAlert(false);
        setOpenAlertSuccessDelete(false);
        setOpenAlertErrorDelete(true);
        setErros(true);
      }
    }
  }

  const handleVisualizar = async (idAlbum, nomeAlbum) => {
    try {
      const res = await getImagem(idAlbum)

      if(mounted.current){
        setIdAlbum(idAlbum);
        setFotos(res.data);
        setNomeAlbum(nomeAlbum);
        setEditarNome(false);
        setAdicionarFotos(false);
        setVisualizar(true);
      }
    } catch(res) {
      if(mounted.current){
        setEditarNome(false);
        setVisualizar(false);
        setAdicionarFotos(false);
      }
    }
  }

  const handleAdicionar = (idAlbum, nomeAlbum) => {
    setIdAlbum(idAlbum);
    setNomeAlbum(nomeAlbum);
    setVisualizar(false);
    setEditarNome(false);
    setAdicionarFotos(true);
  }

  const handleEditar = (idAlbum, nomeAlbum) => {
    setIdAlbum(idAlbum);
    setNomeAlbum(nomeAlbum);
    setVisualizar(false);
    setAdicionarFotos(false);
    setEditarNome(true);
  }

  const handleSalvarEditTitle = (b) => {
    setOpenAlertSuccessUpdate(b);
    setOpenAlertErrorUpdate(!b);
    updatePage();
  }

  const updatePage = async () => {
    if(!mounted.current){
      return;
    }

    setVisualizar(false);
    setEditarNome(false);
    setAdicionarFotos(false);
    try {
      const res = await getAlbum();

      if(mounted.current){
        setAlbuns(res.data);
        setErros(false);
      }
    } catch(res) {
      if(mounted.current){
        setErros(true);
      }
    }
  }

  return(
    <>
    <Snackbar open={openAlertSuccessDelete} setOpen={setOpenAlertSuccessDelete} msg={deleteSuccess("Álbum")} type="success"/>
    <Snackbar open={openAlertErrorDelete} setOpen={setOpenAlertErrorDelete} msg={deleteError()} type="error"/>

    <Snackbar open={openAlertSuccessUpdate} setOpen={setOpenAlertSuccessUpdate} msg={updateSuccess()} type="success"/>
    <Snackbar open={openAlertErrorUpdate} setOpen={setOpenAlertErrorUpdate} msg={updateError()} type="error"/>

    <SweetAlert 
      title={"Deseja mesmo excluir todas as fotos do álbum  " + nomeAlbum + " ?"} 
      show={showAlert} 
      type='warning' 
      onConfirm={handleConfirm}
      onCancel={e => setShowAlert(false)}
      btnSize='sm' 
      confirmBtnText="Deletar"
      confirmBtnBsStyle="danger"
      cancelBtnText="Cancelar"
      cancelBtnBsStyle="secondary"
      showCancel={true}
      focusConfirmBtn={false}
      showCloseButton={true}
    />

    {errors && <p>Houve algum problema</p>}
    
    {!errors && visualizar && !adicionarFotos && <VisualizarAlbum src={fotos} title={nomeAlbum} voltar={updatePage} idAlbum={idAlbum}/>}
    {!errors && adicionarFotos && !visualizar && <AdicionarFotos voltar={updatePage} title={nomeAlbum} idAlbum={idAlbum} />}
    {!errors && <ModalEditTitle title={nomeAlbum} open={editarNome} setOpen={setEditarNome} salvar={handleSalvarEditTitle} idAlbum={idAlbum}/>}
    {!errors && !visualizar && !adicionarFotos && albuns && albuns.length > 0 &&
      <p>Total de {albuns.length} álbuns encontrados</p> &&
      <div className="listarAlbum">
        {albuns.map((album, index) => 
          <CardAlbum key={index} dados={album} visualizar={handleVisualizar} excluir={handleExcluir} editar={handleEditar} adicionar={handleAdicionar}/>
        )}
      </div>
    }
    {!errors && !visualizar && !adicionarFotos && albuns.length === 0 &&
      <p>Nenhum álbum foi encontrado</p> 
    }
    </>
  );
}