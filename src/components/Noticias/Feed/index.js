import React, { useState, useEffect } from 'react';

import Post from '../Post'

import { getNoticias } from "../../../services";

import './styles.scss';


export default function Feed(props){
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

  /* Carregando as notícias */
  useEffect(() => {
    loadNews();       
  }, []);


  return (
    <>  
    <div className="Noticia-feed">
      {news.map((obj, key) => (
        <Post key={key} news={obj}/>
      ))}
    </div>    
    </>
  );
}