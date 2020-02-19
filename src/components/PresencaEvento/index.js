import React, { useState, useEffect } from 'react';

import {Form, Row, Col, Button as ButtonBootstrap} from 'react-bootstrap';
 import Button from '@material-ui/core/Button';

import { getEventoParticipante } from '../../services';
import { postEventoParticipante, deleteEventoParticipante } from '../../services';

import CardPerson from "../CardPerson";

import SeletorDeEventos from './SeletorDeEventos'
import VisualizarEvento from './VisualizarEvento'

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
      await postEventoParticipante(selectedEvent.id, id);
    } catch (error) {
      console.log(error);
    }
  }

  async function removePerson(id){
    try { 
      await deleteEventoParticipante(selectedEvent.id, id);
    } catch (error) {
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

  async function onClickCardButton(isSelected, person){
    if(isSelected){
      await removePerson(person.id);
    }
    else{
      await addPerson(person.id);
    }
    loadPeople(); 
  }

  function renderCards(){
    if(selectedEvent){
      const filteredPeople = people.filter(filterPeople);
      return filteredPeople.map((data, key) => 
      {
        const isConfirmed = data.idEvento !== null;
        let variant;
        let buttonText;
        if(isConfirmed){
          variant = "danger";
          buttonText = "Remover presença";
        }
        else{
          variant = "success";
          buttonText = "Confirmar presença";
        }
        return (
          <CardPerson 
            key={key}
            action={() => {}} 
            person={data} 
            isChild={true} 
          >
            <ButtonBootstrap 
              type="submit" 
              size="small" 
              variant={variant}
              onClick={() => {
                onClickCardButton(data.idEvento, data)
              }}
            >
              {buttonText}
            </ButtonBootstrap>          
          </CardPerson>
        )
      });
    }
    
  }

  return (
    <>
    <Row>
      <VisualizarEvento 
        nome={'texto'} 
        voltar={() => {return}} 
        editar={() => {return}} 
        id={0}
      >
        <h2>{selectedEvent ? selectedEvent.nome : "Selecione o evento"}</h2>
        <p>{selectedEvent ? "Local: " + selectedEvent.local : ""}</p>
        <p>{selectedEvent ? selectedEvent.dataEvento : ""}</p>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          onClick={selectEvent}
        >
          Selecionar evento
        </Button>  
      </VisualizarEvento>
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




