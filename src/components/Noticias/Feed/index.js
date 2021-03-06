import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";

import Post from '../Post'
import Loader from '../../Loader';

import { getNoticias } from "../../../services";

import './styles.scss';


export default function Feed(){
  const history = useHistory();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const mounted = useRef(true);

  function loadView(obj){
    history.push(`/noticias/view/${obj.id}`);
  }

  function renderFeedback(){
    if(loadError){
      return (
        <p style={{textAlign: 'center'}}>Houve algum problema</p>
      );
    }
    else if(isLoading){
      return( <div>
        <Loader type="dots" />
        <p style={{textAlign: 'center'}}>Carregando as notícias</p>
      </div>);
    } else if (news.length === 0){
      return(
        <p style={{textAlign: 'center'}}>Nenhum resultado encontrado</p>
      )
    }

  }

  /* Carregando as notícias */
  useEffect(() => {
    async function load(){
      try {
        const response = await getNoticias();
        if(mounted.current){
          setNews(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        if(mounted.current){
          setLoadError(true);
          setIsLoading(false);
        }
      }
      
    } 
    
    load();

    return () => {mounted.current = false}
  }, [setNews, setIsLoading]);


  return (
    <>  
    {(isLoading || loadError || news.length === 0) ? 
      renderFeedback()
    :
    <div className="NoticiaFeed">
    {news.map((obj, key) => (
      <Post key={key} news={obj} action={loadView}/>
    ))}
    </div>  
    }
  
    </>
  );
}