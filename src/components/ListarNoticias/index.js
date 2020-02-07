import React, { useState, useEffect } from 'react';
import { Form, Row, Col, CardColumns } from 'react-bootstrap';

import CardConsulta from '../CardConsulta';
import EditorDeNoticia from "./EditarNoticia";

import { getNoticias, deleteNoticia } from '../../services';
import { notFind } from '../../assist/feedback';

import './styles.scss';

export default function ConsultarNoticias(){
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');

  const urlImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0h6YYldvKZUH9MQu3WWhxpDGh9Uvu8mNafg-GGaQyvHcdK_ca";

  let filteredNews = [];

  async function loadNews(){
    const response = await getNoticias();
    setNews(response.data)
    return;
  }


  async function deleteNews(id){
    try {
      const response = await deleteNoticia(id);
      console.log(`Noticia -${id}- deletada com sucesso\nResponse: ${response}`);
    } catch (error) {
      console.log(`Erro ao deletar a noticia -${id}-\nErro: ${error}`);
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
        id={news.id}
        title={news.titulo}
        description={news.descricao}
        urlImg={(news.foto ? news.foto : urlImg)}
        firstFooter={`Criado em ${news.data}`}
        lastFooter={`${news.tag}`}
        deleteCard={deleteNews}
        editor={
          <EditorDeNoticia 
            title={news.titulo}
            subtitle={news.descricao}
          />
        }
      />
    ))
  }

  return (
    <>
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
    </>
  );
      
}




