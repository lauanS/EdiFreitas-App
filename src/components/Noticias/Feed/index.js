import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Post from '../Post'

import { getNoticias } from "../../../services";

import './styles.scss';


export default function Feed(props){
  const history = useHistory();
  const [news, setNews] = useState([]);

  async function loadNews(){
    try {
      const response = await getNoticias();
      setNews(response.data);
    } catch (error) {
      console.log(`<ERRO>: ${error}`);
    }

    return;
  }

  function loadView(obj){
    history.push(`/noticias/view/${obj.id}`);
  }

  /* Carregando as notícias */
  useEffect(() => {
    loadNews();       
  }, []);


  return (
    <>  
    <div className="Noticia-feed">
      {news.map((obj, key) => (
        <Post key={key} news={obj} action={loadView}/>
      ))}
    </div>    
    </>
  );
}