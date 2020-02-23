import React, {useState} from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Form, Row, Col} from 'react-bootstrap';
import {updateAlbum} from '../../services/index';
import {Modal} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

export default function ModalEditTitle(props){
  const { title, open, setOpen, salvar, idAlbum} = props;

  const [newTitle, setNewTitle] = useState("");
  const [validatedTitle, setValidatedTitle] = useState(false);
  const [invalidatedTitle, setInvalidatedTitle] = useState(false);

  const onChangeTitulo = e => {
    setNewTitle(e.value);
    if(e.value.length > 0){
      setValidatedTitle(true);
      setInvalidatedTitle(false);
    }
    else{
      setValidatedTitle(false);
      setInvalidatedTitle(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let flag = false;

    if(validatedTitle === false){
      setInvalidatedTitle(true);
      flag = true;
    }

    if(flag === false){
      try{
        const album = {
          "nome" : newTitle
        }
        await updateAlbum(idAlbum, album);

        onClose();
        salvar(true);
      }
      catch(res){
        onClose();
        salvar(false);
      }
    }
  }

  const handleCancelar = () => {
    onClose()
  }

  const fakeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onClose = (e) => {
    setNewTitle("");
    setValidatedTitle(false);
    setInvalidatedTitle(false);
    setOpen(false);
  }
  return(
    <>
    <Modal
      className="modalEditTitle"
      show={open}
      onHide={onClose}
      dialogClassName="modalEditTitle__dialog"
      aria-labelledby="example-custom-modal-styling-title"
      scrollable
      centered
    >
      <Modal.Header className="modalEditTitle__header">
        <p className="modalEditTitle__link" onClick={handleCancelar}><CloseIcon/> Cancelar</p>
        <p className="modalEditTitle__link" onClick={handleSubmit}><SaveAltIcon/> Salvar</p>
      </Modal.Header>
      <Modal.Body>
        <h5>Alterar o nome do álbum: {title}</h5>
        <label className="modalEditTitle__descricao">É obrigatório o preenchimento do campo com * (Asterisco)</label>

        <Form onSubmit={fakeSubmit} noValidate autoComplete="off">
          <Form.Group as={Row} controlId="formGroupTitulo">
            <Form.Label column sm={2} className="modalEditTitle__label">
              Nome do álbum*
            </Form.Label>
            <Col sm={8} className="modalEditTitle__inputText">
              <Form.Control 
                required 
                type="text" 
                placeholder="Ex: Festa de natal" 
                onChange={e => onChangeTitulo(e.target)}
                value={newTitle}
                isValid={validatedTitle}
                isInvalid={invalidatedTitle}
                />
              <Form.Control.Feedback type="invalid">
                Campo obrigatório, preencha o título do álbum.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
}