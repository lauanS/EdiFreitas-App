import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {delPeople} from '../../services'
import './modalHeader.scss';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ModalHeader(props) {
  const {dados, showAlert, setShowAlert, setOpen, handleClose} = props;
  
  const handleOpenDeletar = () => {
    setShowAlert(true);
  };

  const handleConfirm = e => {
    setTimeout(() => {
      delPeople(dados.id)
        .then(res => {
          setShowAlert(false);
          setOpen(false);
        })
        .catch(() =>{
          setShowAlert(false);
          setOpen(false);
        });
    }, 2000);
  }

  const handleCancel = e => {
    setShowAlert(false);
  }

  return (
    <>
    <div className="modalHeader">
      <p className="modalHeader__link" onClick={handleClose}><CloseIcon/> Fechar</p>
      <p className="modalHeader__link" ><EditIcon/> Editar</p>
      <p className="modalHeader__link-remover" onClick={handleOpenDeletar}><DeleteIcon/> Deletar</p>
    </div>

    <SweetAlert 
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
  );

}