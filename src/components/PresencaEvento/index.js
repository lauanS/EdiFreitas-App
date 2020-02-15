import React, { useState, useEffect } from 'react';

import {Form, Row, Col, Jumbotron} from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import { getCriancas } from '../../services';
import CardPerson from "../CardPerson";

import SeletorDeEventos from './SeletorDeEventos'

import './styles.scss';

export default function PresencaEvento(){

  const [people, setPeople] = useState([]);
  const [personSearch, setPersonSearch] = useState("");

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showModal, setShowModal] = useState(false);
  

  async function loadPeople(){
    const response = await getCriancas();
    setPeople(response.data);
    return;
  }

  function updatePersonSearch(e) {
    setPersonSearch(e.target.value);
  }

  function filterPeople(value){  
    const personSearchLowerCase = personSearch.toLowerCase()
    const valueLowerCase = value.nome.toLowerCase()
    return valueLowerCase.includes(personSearchLowerCase);
  }

  function selectEvent(){
    setShowModal(true);
    return;
  }

  /* Carrega todas as pessoas após renderizar o componente */
  useEffect(() => {
    loadPeople();
  }, [])


  function renderCards(){
    const filteredPeople = people.filter(filterPeople);
    return filteredPeople.map((dados, key) => (
      <CardPerson 
        key={key}
        setSelect={setSelectedEvent} 
        person={dados} 
        isChild={true} 
        extraFields={
        <Button 
          type="submit" 
          size="small" 
          variant="contained" 
          color="primary"
        >
          {personSearch}
        </Button>
        }
      />
    ));

  }

  return (
    <>
    <Row>
      <Col>
        <Jumbotron className="jumbotron-event">
          <h2>{selectedEvent ? selectedEvent.nome : "Titulo do evento"}</h2>
          <p>{selectedEvent ? "Local: " + selectedEvent.local : "Local: Indefinido"}</p>
          <p>{selectedEvent ? selectedEvent.dataEvento : "DD/MM/AAAA"}</p>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            onClick={selectEvent}
          >
            Selecionar evento
          </Button>      
        </Jumbotron>  
      </Col>
    </Row>

    <Form autoComplete="off">
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2} className="presenceControl-label">
          Nome da pessoa
        </Form.Label>
        <Col sm={8} className="presenceControl-inputText">
          <Form.Control 
            type="text" 
            placeholder="Ex: Leonardo dos Santos Sampaio" 
            onChange={updatePersonSearch}
            value={personSearch}
          />
        </Col>
      </Form.Group>
    </Form>

    <div className="listPeople">
      {
        renderCards()  
      }
    </div>
    
    <SeletorDeEventos 
      show={showModal}
      setShow={setShowModal}
      action={(obj) => {
        return <>
        <Button 
          size="small"
          as={Col} 
          variant="outlined" 
          color="primary"
          onClick={() => {
            setSelectedEvent(obj);
            setShowModal(false);
          }}
        >
          Selecionar
        </Button>
        </>
      }}
    />
    
    </>
  );
      
}




