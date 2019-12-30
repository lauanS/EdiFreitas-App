import React, {useState} from "react";
import {Modal} from 'react-bootstrap';
import ModalHeader from './modalHeader';
import './modalCard.scss';
import photo from '../../assets/usuario.png';
import {idade  } from '../../assist';
import CardPessoa from './cardPessoa';
import InfoResponsavel from './infoResponsavel';
import InfoCrianca from './infoCrianca';

export default function ModalCard(props) {
  const { dados, crianca} = props;

  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <CardPessoa change={handleOpen} foto={photo} dados={dados} crianca={crianca} idade={idade(dados.dataNascimento)}/>
    <Modal
      className="modalCard"
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="modalCard__dialog"
      aria-labelledby="example-custom-modal-styling-title"
      scrollable
      keyboard={!showAlert}
      centered
    >
      <Modal.Header className="modalCard__header">
        <ModalHeader setOpen={setOpen} handleClose={handleClose} showAlert={showAlert} setShowAlert={setShowAlert} dados={dados}/>
      </Modal.Header>
      <Modal.Body>
        {crianca ?
          ''
        :
        <InfoResponsavel dados={dados}/>
        }
      </Modal.Body>
    </Modal>
    </>
  );
}
  