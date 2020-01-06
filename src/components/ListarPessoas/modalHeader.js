import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {deleteCrianca, deleteResponsavel} from '../../services'
import './modalHeader.scss';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

export default function ModalHeader(props) {
  const {error, remover, crianca, dados, showAlert, setShowAlert, setOpen, handleClose, edit, setEdit, setSubmitEdit} = props;

  const handleOpenDeletar = () => {
    setShowAlert(true);
  };

  const handleConfirm = e => {
    if(crianca === true){
      if(deleteCrianca(dados.id) === true){
        setShowAlert(false);
        setOpen(false);
        console.log(dados.id + " oii");
        remover(dados.id);
      }
      else{
        setShowAlert(false);
        setOpen(false);
      }
    }
    else{
      deleteResponsavel(dados.id)
      .then(() => {
        setShowAlert(false);
        setOpen(false);
        remover(dados.id);
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
    console.log("aaa");
    e.preventDefault();
    e.stopPropagation();
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
      customClass="sweetAlert"
      title={"Deseja mesmo deletar todas as informações de " + dados.nome + " ?"} 
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