import React, {useState} from "react";
import {Modal} from 'react-bootstrap';
import ModalHeader from './modalHeader';
import './modalCard.scss';
import photo from '../../assets/usuario.png';
import {idade  } from '../../assist';
import CardPessoa from './cardPessoa';
import InfoResponsavel from './infoResponsavel';
import InfoCrianca from './infoCrianca';
import EditarCrianca from '../EditarCrianca/index';

export default function ModalCard(props) {
  const { dados, crianca, remover, erroRemover, update, erroUpdate, responsaveis, updateList} = props;

  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {edit === true ? 
      crianca === true ?
        <EditarCrianca update={update} erroUpdate={erroUpdate} setOpen={setOpen} updateList={updateList} responsaveis={responsaveis} dados={dados} setEdit={setEdit}/>
        :
        ''
    :
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
        <ModalHeader updateList={updateList} error={erroRemover} remover={remover} crianca={crianca} edit={edit} setEdit={setEdit} setOpen={setOpen} handleClose={handleClose} showAlert={showAlert} setShowAlert={setShowAlert} dados={dados}/>
      </Modal.Header>
      <Modal.Body>
        {crianca === true ?
          <InfoCrianca dados={dados}/>
          :
          <InfoResponsavel dados={dados}/>
        }
      </Modal.Body>
    </Modal>
    </>
    }
    </>
  );
}
  