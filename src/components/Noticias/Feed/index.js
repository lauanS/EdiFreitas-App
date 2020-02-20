import React, { useState, useEffect } from 'react';

import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'

import Post from '../Post'

import { getNoticias } from "../../../services";

import './styles.scss';


export default function Feed(props){
  const [news, setNews] = useState([]);
  const [items, setItems] = useState([]);

  async function loadNews(){
    const response = await getNoticias();
    setNews(response.data)

    return;
  }

  /* Carregando as notícias */
  useEffect(() => {
    async function load(){
      await loadNews();       
    }   
    load();
       
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