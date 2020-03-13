import React, { useState, useEffect, useRef } from 'react';

import { Form, Row, Col, CardColumns } from 'react-bootstrap';

import SweetAlert from 'react-bootstrap-sweetalert';

import CardConsulta from '../CardConsulta';
import EditorDeNoticia from "./EditarNoticia";
import Snackbar from '../Snackbars';
import OpcoesConsulta from '../OpcoesConsulta'
import Loader from '../Loader';

import { getNoticias, deleteNoticia } from '../../services';

import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
import { desconverterData, getUrlBase } from "../../assist/";

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

  const [isLoading, setIsLoading] = useState(true);

  const mounted = useRef(true);

  async function loadNews(){
    const response = await getNoticias();
    if(mounted.current){
      setNews(response.data);
    }
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
    await loadNews();
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
    async function load(){
      setIsLoading(true);
      const response = await getNoticias();
      // Apenas troca o estado caso o componente esteja montado
      if(mounted.current){
        setNews(response.data);
        setIsLoading(false);
      }
      return;
    }
    load();  
    
    // A função do return de um userEffect é chamado quando o componente irá ser desmontado
    return () => {mounted.current = false}
  }, []);

  /* Mensagens de feedback */
  useEffect(() => {   
    if(!filteredNews.length && title.length){
      setFeedback(notFind('notícia', title));
    }
    else if (!filteredNews.length && !isLoading){
      setFeedback(notFind('notícia'));
    }
    else{
      setFeedback("");
    }      
  }, [filteredNews, title, isLoading]);

  function renderCards(){
    filteredNews = news.filter(filterNews)

    return filteredNews.map((news, key) => (
      <CardConsulta
        key={key}
        title={news.titulo}
        description={news.descricao}
        urlImg={(news.foto ? news.foto : urlImg)}
        firstFooter={`Criado em ${desconverterData(news.data)}`}
        lastFooter={`${news.tag}`}
      >
        <OpcoesConsulta 
          obj={news}
          setSelectedObj={setSelectedNews}          
          setShowModal={setShowModal}
          deleteItem={showDeleteAlert}
          viewCard={`${getUrlBase()}/noticias/view/${news.id}`}
        />
    </CardConsulta>
    ))
  }

  return (
    isLoading? 
      < Loader type="dots" />
    :
      <>
      <Snackbar open={alertDeleteSucess} setOpen={setAlertDeleteSucess} msg={deleteSuccess("Notícia")}type="success"/>
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
        urlImg={selectedNews.foto}
        show={showModal}
        setShow={setShowModal}
        updateList={loadNews}
      />

      </>
  );
      
}




