import React from 'react';
import './styles.scss';

import SweetAlert from 'react-bootstrap-sweetalert';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import {deleteCrianca, deleteResponsavel} from '../../services'

export default function ModalHeader(props) {
  const {updateList, error, remover, crianca, dados, showAlert, setShowAlert, setOpen, handleClose, edit, setEdit, setSubmitEdit} = props;

  const handleOpenDeletar = () => {
    setShowAlert(true);
  };

  const handleConfirm = e => {
    if(crianca === true){
      deleteCrianca(dados.id)
      .then(() => {
        setShowAlert(false);
        setOpen(false);
        remover(dados.id);
        updateList();
      })
      .catch(() => {
        setShowAlert(false);
        setOpen(false);
        error();
      });
    }
    else{
      deleteResponsavel(dados.id)
      .then(() => {
        setShowAlert(false);
        setOpen(false);
        remover(dados.id);
        updateList();
      })
      .catch(() => {
        setShowAlert(false);
        setOpen(false);
        error();
      });
    }

  }

  const handleCancel = e => {
    setShowAlert(false);
  }

  const handleSalvar = e => {
    setSubmitEdit(true);
    e.preventDefault();
    e.stopPropagation();
  }

  const handleCancelar = e => {
    setEdit(false);
    e.preventDefault();
    e.stopPropagation();
  }

  const handleEdit = e => {
    setEdit(true);
    e.preventDefault();
    e.stopPropagation();
  }

  let texto = "";
  if(dados.criancas === undefined || dados.criancas.length === 0){
    texto = dados.nome;
  }
  else{
    texto = dados.nome + " e as crianças relacionadas";
  }

  return (
    <>
    {edit ?
      <div className="modalHeader">
        <p className="modalHeader__link" onClick={handleCancelar}><CloseIcon/> Cancelar</p>
        <p className="modalHeader__link" onClick={handleSalvar}><SaveAltIcon/> Salvar</p>
      </div>
    :
    <>
    <div className="modalHeader">
      <p className="modalHeader__link" onClick={handleClose}><CloseIcon/> Fechar</p>
      <p className="modalHeader__link" onClick={handleEdit}><EditIcon/> Editar</p>
      <p className="modalHeader__link-remover" onClick={handleOpenDeletar}><DeleteIcon/> Deletar</p>
    </div>

    <SweetAlert 
      customClass="modalHeader__sweetAlert"
      title={"Deseja mesmo deletar todas as informações de " + texto + " ?"} 
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
    </>
    }
    </>
  );

}