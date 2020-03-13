import React, { useState, useEffect, useRef } from 'react';

import {Form, Row, Col, CardColumns} from 'react-bootstrap';

import SweetAlert from 'react-bootstrap-sweetalert';

import CardConsulta from '../CardConsulta';
import EditorDeEventos from "./EditarEventos";
import Snackbar from '../Snackbars';
import OpcoesConsulta from '../OpcoesConsulta'
import Loader from '../Loader';

import { getEventos, deleteEvento } from '../../services';
import { desconverterData, getUrlBase } from "../../assist/";
import { notFind, deleteError, deleteSuccess } from "../../assist/feedback";


import urlImg from '../../assets/ong_logo.jpg'

import './styles.scss';

export default function ConsultarEventos({selectEvent, action}){
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [alertDeleteSucess, setAlertDeleteSucess] = useState(false);
  const [alertDeleteError, setAlertDeleteError] = useState(false);

  const [selectedEvent, setSelectedEvent ] = useState({id: undefined, nome: ""});

  const [isLoading, setIsLoading] = useState(true);
  
  const mounted = useRef(true);

  let filteredEvents = [];

  async function loadEvents(){
    const response = await getEventos();
    if(mounted.current){
      setEvents(response.data);
    }
    return;
  }

  async function deleteEvent(id){
    try {
      await deleteEvento(id);
      setAlertDeleteSucess(true);
      setAlertDeleteError(false);
    } catch (error) {
      setAlertDeleteSucess(false);
      setAlertDeleteError(true);
    }    
  }

  function updateSearch(e) {
    setSearch(e.target.value);  
  }

  function filterEvents(value){  
    const searchLowerCase = search.toLowerCase()
    const valueLowerCase = value.nome.toLowerCase()
    return valueLowerCase.includes(searchLowerCase);
  }

  async function handleConfirm(){
    setShowAlert(false);
    await deleteEvent(selectedEvent.id);    
    await loadEvents();
  }

  function handleCancel(){
    setShowAlert(false);
  }

  /* Função chamada ao clicar em deletar no cardConsulta */
  function showDeleteAlert(){
    setShowAlert(true);
  }

  /* Carregando os eventos */
  useEffect(() => {   
    async function load(){
      setIsLoading(true);
      const response = await getEventos();
      if(mounted.current){
        setEvents(response.data);
        setIsLoading(false);  
      }
      return;
    }
    load(); 
    
    return () => {mounted.current = false} 
  }, []);

  /* Mensagens de feedback */
  useEffect(() => {   
    if(!filteredEvents.length && search.length){
      setFeedback(notFind('evento', search));
    }
    else if (!filteredEvents.length && !isLoading){
      setFeedback(notFind('evento'));
    }
    else{
      setFeedback("");
    }      
  }, [filteredEvents, search, isLoading]);

  function renderCards(){
    filteredEvents = events.filter(filterEvents)

    return (filteredEvents.map((event, key) => (
      <CardConsulta
        key={key}
        title={event.nome}
        description={event.descricao}
        urlImg={event.capa? event.capa : urlImg}
        firstFooter={`Dia: ${desconverterData(event.dataEvento)}`}
        lastFooter={`Local: ${event.local}`}
      >
        {selectEvent === true ?
          action(event)
          :
          <OpcoesConsulta 
            obj={event}
            setSelectedObj={setSelectedEvent}          
            setShowModal={setShowModal}
            deleteItem={showDeleteAlert}
            viewCard={`${getUrlBase()}/eventos/${event.id}`}
          />
          
        }
      </CardConsulta>
    )));
  }

  return (
    isLoading? 
      < Loader type="dots" />
    :
      <>
      <Snackbar open={alertDeleteSucess} setOpen={setAlertDeleteSucess} msg={deleteSuccess("Evento")}type="success"/>
      <Snackbar open={alertDeleteError} setOpen={setAlertDeleteError} msg={deleteError()} type="error"/>

      <Form autoComplete="off">
        <Form.Group as={Row} controlId="formGroupName">
          <Form.Label column sm={2} className="listarPessoas__label">
            Evento
          </Form.Label>
          <Col sm={8} className="listarPessoas__inputText">
            <Form.Control 
              type="text" 
              placeholder="Ex: Dia das Crianças" 
              value={search}
              onChange={updateSearch}
            />
          </Col>
        </Form.Group>
      </Form>

      <p>{feedback}</p>
      
      <CardColumns>
        {
          renderCards()  
        }
      </CardColumns>

      <SweetAlert 
        customClass="sweetAlert"
        title={`Deseja mesmo deletar o evento "${selectedEvent.nome}" ?`} 
        show={showAlert}
        type='warning' 
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        btnSize='sm' 
        confirmBtnText="Deletar"
        confirmBtnBsStyle="danger"
        cancelBtnText="Cancelar"
        cancelBtnBsStyle="secondary"
        showCancel={true}
        focusConfirmBtn={false}
        showCloseButton={true}
      />

      <EditorDeEventos 
        obj={selectedEvent}
        updateList={loadEvents}
        show={showModal}
        setShow={setShowModal}
      />
      </>
    
  );
      
}




