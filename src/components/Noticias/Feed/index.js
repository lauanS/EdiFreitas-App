import React, { useState, useEffect } from 'react';

import Post from '../Post'

// import { getNoticias } from "../../../services";
import getNews from "./news";
import './styles.scss';


export default function Feed(props){
  const [news, setNews] = useState([]);
  
  async function loadNews(){
    // const response = await getNoticias();
    // setNews(response.data)
    console.log(getNews());
    setNews(getNews());
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