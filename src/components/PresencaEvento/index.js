import React, { useState, useEffect } from 'react';

import {Form, Row, Col, Jumbotron, Button as ButtonBootstrap} from 'react-bootstrap';
 import Button from '@material-ui/core/Button';

import { getEventoParticipante } from '../../services';
import { postEventoParticipante, deleteEventoParticipante } from '../../services';

import CardPerson from "../CardPerson";

import SeletorDeEventos from './SeletorDeEventos'

import './styles.scss';

export default function PresencaEvento(){
  const [people, setPeople] = useState([]);
  const [personSearch, setPersonSearch] = useState("");

  
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showModal, setShowModal] = useState(false);
  

  async function loadPeople(){
    if(selectedEvent){
      const response = await getEventoParticipante(selectedEvent.id);
      setPeople(response.data);
    }

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

  async function addPerson(id){
    try { 
      const response = await postEventoParticipante(selectedEvent.id, id);
      console.log(response);
    } catch (error) {
      console.log("<ERRO postEventoParticipante>");
      console.log(error);
    }
  }

  async function removePerson(id){
    try { 
      const response = await deleteEventoParticipante(selectedEvent.id, id);
      console.log(response);
    } catch (error) {
      console.log("<ERRO deleteEventoParticipante>");
      console.log(error);
    }
    
  }

  /* Atualiza a lista de pessoas que estão confirmadas no evento */
  useEffect(() => {
    async function load(){
      await loadPeople();
    }
    if(selectedEvent){
      load();
    }     
  }, [selectedEvent])

  function onClickCardButton(isSelected, person){
    if(isSelected){
      removePerson(person.id);
    }
    else{
      addPerson(person.id);
    }
    loadPeople(); 
  }

  function opcCardButton(data){
    if(people.find(person => person.id === data.id)){
      return "Remover Presença";
    }
    else{
      return "Confirmar Presença";
    }  
  }

  function renderCards(){
    if(selectedEvent){
      const filteredPeople = people.filter(filterPeople);
      return filteredPeople.map((data, key) => 
      {
        console.log(data.idEvento);
        return (
          <CardPerson 
            key={key}
            action={() => {}} 
            person={data} 
            isChild={true} 
          >
            { data.idEvento ?
            <ButtonBootstrap 
              type="submit" 
              size="small" 
              variant="danger" 
              onClick={() => {
                onClickCardButton(data.idEvento, data)
              }}
            >
              Remover Presença
            </ButtonBootstrap>          
            :
            <ButtonBootstrap 
              type="submit" 
              size="small" 
              variant="success" 
              onClick={() => {
                onClickCardButton(data.idEvento, data)
              }}
            >
              Confirmar presença
            </ButtonBootstrap>
            }
          </CardPerson>
        )
      });

    }
    
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




