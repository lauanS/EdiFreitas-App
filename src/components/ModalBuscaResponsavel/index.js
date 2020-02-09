import React, {useState, useEffect} from "react";
import './styles.scss';

import {Modal} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import BuscaResponsavel from '../BuscaResponsavel';

import {getResponsaveis} from '../../services'

export default function ModalBusca(props) {
  const {setDadosResponsavel, valor} = props;

  const [open, setOpen] = useState(false);
  const [responsaveis, setResponsaveis] = useState([]);

  useEffect(() => {
    getResponsaveis()
    .then(res => {
      setResponsaveis(res.data);
    })
    .catch(() => {

    });
  }, []);

  const handleOpen = e => {
    setOpen(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClose = e => {
    setOpen(false);
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
     <Button 
      onClick={handleOpen} 
      className="modalBusca__button" 
      variant="contained" 
      color="primary"
    >{valor}
    </Button>
    
    <Modal
      className="modalBusca"
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="modalBusca__dialog"
      aria-labelledby="example-custom-modal-styling-title"
      scrollable
      centered
    >
      <Modal.Header className="modalBusca__header">
        <p className="modalBusca__text">Selecionar o responsável</p>
        <p className="modalBusca__link" onClick={handleClose}><CloseIcon/> Fechar</p>
      </Modal.Header>
      <Modal.Body>
        <BuscaResponsavel responsaveis={responsaveis} setOpen={setOpen} setDadosResponsavel={setDadosResponsavel}/>
      </Modal.Body>
    </Modal>
    </>
  );
}
  