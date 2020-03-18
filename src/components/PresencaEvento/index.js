import React, { useState, useEffect, useRef } from 'react';

import {Form, Row, Col} from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import { getEventoParticipante } from '../../services';
import { postEventoParticipante, deleteEventoParticipante } from '../../services';

import { notFind, loadingError } from "../../assist/feedback";

import CardPerson from '../CardPerson';
import LoadButton from '../LoadButton';
import Loader from '../Loader';

import SeletorDeEventos from './SeletorDeEventos';
import VisualizarEvento from './VisualizarEvento';

import './styles.scss';

export default function PresencaEvento(){
  const [people, setPeople] = useState([]);
  const [personSearch, setPersonSearch] = useState("");
  
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  
  const mounted = useRef(true);

  let filteredPeople = []; 

  async function loadPeople(){
    setIsLoadingButton(true);
    try {
      if(selectedEvent){
        const response = await getEventoParticipante(selectedEvent.id);
        if(mounted.current){
          setPeople(response.data);
          setIsLoadingButton(false);
        }      
      }
    } catch (error) {
      if(mounted.current){
        console.log(error);
        setErrors(true);
        setIsLoadingButton(false);
      }
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

  /* useEffect para controlar o mounted */
  useEffect(() => {
    return () => {mounted.current = false}   
  }, []);

  /* Atualiza a lista de pessoas que estão confirmadas no evento */
  useEffect(() => {
    async function load(){
      setIsLoading(true);
      try {
        if(selectedEvent){
          const response = await getEventoParticipante(selectedEvent.id);
          if(mounted.current){
            setPeople(response.data);
            setIsLoading(false);
          }        
        }
      } catch (error) {
        if(mounted.current){
          console.log(error);
          setErrors(true);
          setIsLoading(false);
        }
      }

      return;
    }

    if(selectedEvent){
      load();
    }

      
  }, [selectedEvent]);


  /* Mensagens de feedback */
  useEffect(() => {   
    if(errors){
      setFeedback(loadingError());
    }
    else if(!filteredPeople.length && personSearch.length){
      setFeedback(notFind('pessoa', personSearch));
    }
    else if (!filteredPeople.length && !isLoading){
      setFeedback(notFind('pessoa'));
    }
    else{
      setFeedback("");
    }      
  }, [filteredPeople, personSearch, isLoading, errors]);


  async function onClickCardButton(isSelected, person){
    if(isLoadingButton){
      return;
    }
    setIsLoadingButton(true)
    if(isSelected){
      await removePerson(person.id);
    }
    else{
      await addPerson(person.id);
    }
    if(mounted.current){
      setIsLoadingButton(false);
      loadPeople(); 
    }    
  }

  function renderCards(){
    if(selectedEvent){
      filteredPeople = people.filter(filterPeople);
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
            <LoadButton 
              type="submit" 
              size="small" 
              variant={variant}
              isLoading={isLoadingButton}
              className="loadButton"
              onClick={() => {
                onClickCardButton(data.idEvento, data)
              }}
            >
              {buttonText}
            </LoadButton>          
          </CardPerson>
        )
      });
    }
    
  }

  const fakeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    

    <Form onSubmit={fakeSubmit} autoComplete="off">
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

    <p>{feedback}</p>

    {isLoading && selectedEvent? 
      <Loader type="dots"/>
    :
    <div className="listPeople">
      {
        renderCards()  
      }
    </div>
    }

    
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




