import React, { useState, useEffect } from 'react';
import {Form, Row, Col, CardColumns} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import CardConsulta from '../CardConsulta';
import EditorDeEventos from "./EditarEventos";
import Snackbar from '../Snackbars';

import { getEventos, deleteEvento } from '../../services';

import { notFind, deleteError, deleteSucess } from "../../assist/feedback";
import './styles.scss';

export default function ConsultarEventos(){
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [alertDeleteSucess, setAlertDeleteSucess] = useState(false);
  const [alertDeleteError, setAlertDeleteError] = useState(false);


  const [selectedEvent, setSelectedEvent ] = useState({id: undefined, nome: ""});

  const urlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGSchNBJSYBWUARzgM2YisE5S9_Ew8LSyblcHTg_sCRf38-ApP"

  let filteredEvents = [];

  async function loadEvents(){
    const response = await getEventos();
    setEvents(response.data);
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
    loadEvents();
  }

  function handleCancel(){
    setShowAlert(false);
  }

  /* Função chamada ao clicar em deletar no cardConsulta */
  function showDeleteAlert(){
    setShowAlert(true);
  }

  /* Carregando as notícias */
  useEffect(() => {   
    loadEvents();      
  }, []);

  /* Mensagens de feedback */
  useEffect(() => {   
    if(!filteredEvents.length && search.length){
      setFeedback(notFind('notícia', search));
    }
    else{
      setFeedback("");
    }      
  }, [filteredEvents, search]);

  function renderCards(){
    filteredEvents = events.filter(filterEvents)
    return filteredEvents.map((card, key) => (
      <CardConsulta
        key={key}
        obj={card}
        title={card.nome}
        description={card.descricao}
        urlImg={urlImg}
        firstFooter={`Dia: ${card.dataEvento}`}
        lastFooter={`Local: ${card.local}`}
        deleteThisCard={showDeleteAlert}
        showModal={showModal}
        setShowModal={setShowModal}
        setSelectedObj={setSelectedEvent}
      />
    ))
  }

  return (
    <>
    <Snackbar open={alertDeleteSucess} setOpen={setAlertDeleteSucess} msg={deleteSucess("Evento")}type="success"/>
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
      title={selectedEvent.nome}
      subtitle={selectedEvent.descricao} 
      show={showModal}
      setShow={setShowModal}
    />
    </>
  );
      
}



