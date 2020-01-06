import React, {useState, useEffect} from "react";
import {Modal, Form, Row, Col} from 'react-bootstrap';
import './modalBusca.scss';
import Card from './card'
import {getResponsaveis} from '../../services'
import Button from '@material-ui/core/Button';

export default function ModalBusca(props) {
  const {setDadosResponsavel, valor} = props;

  const [open, setOpen] = useState(false);
  const [filteredResponsaveis, setFilteredResponsaveis] = useState([]);
  const [search, setSearch] = useState("");
  const [responsaveis, setResponsaveis] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getResponsaveis()
      .then(res => {
        setResponsaveis(res.data);
        setFilteredResponsaveis(res.data);
      })
      .catch(() => {
        console.log("");
      });
  }, []);

  const updateSearch = e => {
    setFilteredResponsaveis(searchPeople(responsaveis, e.target.value) || []);
    setSearch(e.target.value);
    e.preventDefault();
  }

  const searchPeople = (list, search) => {
    if (search === '') {
      return list;
    }

    return Array.isArray(list) ? list.filter(person =>
      person.nome.toLowerCase().indexOf(search.toLowerCase()) !== -1 )
      : [];
  }

  const setSelect = (dados) => {
    setDadosResponsavel(dados);
    setOpen(false);
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
      <Form autoComplete="off" className="modalBusca__form">
        <Form.Group as={Row} controlId="formGroupName">
          <Form.Label column sm={4} className="modalBusca__label">
            Nome do responsável
          </Form.Label>
          <Col sm={8} className="modalBusca__inputText">
            <Form.Control 
              type="text" 
              placeholder="Ex: Leonardo dos Santos Sampaio" 
              onChange={updateSearch}
            />
          </Col>
        </Form.Group>
      </Form>
      </Modal.Header>
      <Modal.Body>
      <>
      {filteredResponsaveis.length === 0 ? 
        <p>Nenhuma pessoa encontrada com o nome: "{search}"</p> 
        :
        <>
        {search === '' ?
          <p>Total de {filteredResponsaveis.length} resultados</p>:
          <p>Total de {filteredResponsaveis.length} resultados para "{search}"</p>
        }
        
        <div className="modalBusca__listarPessoas"> 
          {filteredResponsaveis.length > 0 ? filteredResponsaveis.map(pessoa =>
            <Card modal={true} setSelect={setSelect} dados={pessoa} key={pessoa.id}/>
          ) : ''}
        </div>
        </>
      }
      </>
      </Modal.Body>
    </Modal>
    </>
  );
}
  