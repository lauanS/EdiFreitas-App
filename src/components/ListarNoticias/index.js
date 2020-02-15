import React, { useState, useEffect } from 'react';

import { Form, Row, Col, CardColumns } from 'react-bootstrap';

import SweetAlert from 'react-bootstrap-sweetalert';

import Button from '@material-ui/core/Button';

import CardConsulta from '../CardConsulta';
import EditorDeNoticia from "./EditarNoticia";
import Snackbar from '../Snackbars';

import { getNoticias, deleteNoticia } from '../../services';

import { notFind, deleteError, deleteSucess } from "../../assist/feedback";
import './styles.scss';

export default function ConsultarNoticias(){
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedNews, setSelectedNews ] = useState({id: undefined, titulo: ""});

  const urlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0h6YYldvKZUH9MQu3WWhxpDGh9Uvu8mNafg-GGaQyvHcdK_ca";

  let filteredNews = [];  

  const [alertDeleteSucess, setAlertDeleteSucess] = useState(false);
  const [alertDeleteError, setAlertDeleteError] = useState(false);

  async function loadNews(){
    const response = await getNoticias();
    setNews(response.data)
    return;
  }


  async function deleteNews(id){
    try {
      await deleteNoticia(id);
      setAlertDeleteSucess(true);
      setAlertDeleteError(false);
    } catch (error) {
      setAlertDeleteSucess(false);
      setAlertDeleteError(true);
    }    
  }


  function updateTitle(e) {
    setTitle(e.target.value);  
  }

  function filterNews(value){  
    const titleLowerCase = title.toLowerCase()
    const valueLowerCase = value.titulo.toLowerCase()
    return valueLowerCase.includes(titleLowerCase);
  }

  async function handleConfirm(){
    setShowAlert(false);
    await deleteNews(selectedNews.id);    
    loadNews();
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
    loadNews();      
  }, []);

  /* Mensagens de feedback */
  useEffect(() => {   
    if(!filteredNews.length && title.length){
      setFeedback(notFind('notícia', title));
    }
    else{
      setFeedback("");
    }      
  }, [filteredNews, title]);

  function renderCards(){
    filteredNews = news.filter(filterNews)

    return filteredNews.map((news, key) => (
      <CardConsulta
        key={key}
        title={news.titulo}
        description={news.descricao}
        urlImg={(news.foto ? news.foto : urlImg)}
        firstFooter={`Criado em ${news.data}`}
        lastFooter={`${news.tag}`}
      >
        <Button as={Col} variant="outlined" color="primary"> Visualizar </Button>
        <Button 
          as={Col} 
          variant="outlined" 
          color="primary"
          onClick={() => {
            setSelectedNews(news);
            setShowModal(true);
          }}
        > 
          Editar 
        </Button>
        <Button 
          as={Col} 
          variant="outlined" 
          color="primary"
          className="btn-card-consulta"
          onClick={() => {  
              setSelectedNews(news);
              showDeleteAlert();
          }}
        > 
          Excluir 
        </Button>
    </CardConsulta>
    ))
  }

  return (
    <>
    <Snackbar open={alertDeleteSucess} setOpen={setAlertDeleteSucess} msg={deleteSucess("Notícia")}type="success"/>
    <Snackbar open={alertDeleteError} setOpen={setAlertDeleteError} msg={deleteError()} type="error"/>


    <Form autoComplete="off">
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2} className="listarPessoas__label">
          Título
        </Form.Label>
        <Col sm={8} className="listarPessoas__inputText">
          <Form.Control 
            type="text" 
            placeholder="Ex: Especial de Natal na EdiFreitas" 
            value={title}
            onChange={updateTitle}
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
      title={`Deseja mesmo deletar à notícia "${selectedNews.titulo}" ?`} 
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

    <EditorDeNoticia
      id={selectedNews.id} 
      title={selectedNews.titulo}
      subtitle={selectedNews.descricao}
      text={selectedNews.texto}
      tags={selectedNews.tag}
      show={showModal}
      setShow={setShowModal}
      updateList={loadNews}
    />

    </>
  );
      
}




