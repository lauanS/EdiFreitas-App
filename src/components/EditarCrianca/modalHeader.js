import React from 'react';
import './modalHeader.scss';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function ModalHeader(props) {
  const { setEdit, submit, busca, setOpenBusca} = props;

  const handleSalvar = e => {
    submit();
    e.preventDefault();
    e.stopPropagation();
  }

  const handleCancelar = e => {
    setEdit(false);
    e.preventDefault();
    e.stopPropagation();
  }

  const handleVoltar = e => {
    setOpenBusca(false);
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
    {busca === true ? 
    <div className="modalHeaderEditCrianca">
      <p className="modalHeaderEditCrianca__link" onClick={handleVoltar}><ArrowBackIcon/> Voltar</p>
    </div>
    :

    <div className="modalHeaderEditCrianca">
      <p className="modalHeaderEditCrianca__link" onClick={handleCancelar}><CloseIcon/> Cancelar</p>
      <p className="modalHeaderEditCrianca__link" onClick={handleSalvar}><SaveAltIcon/> Salvar</p>
    </div>
    }
    </>
  );
}