import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";

import MyNavbar from '../../../../components/Navbar/index';
import Footer from '../../../../components/Footer/index';
import View from '../../../../components/Noticias/View'
import Loader from '../../../../components/Loader';
import {getNoticias} from '../../../../services'
import { removeQuotationMarks } from "../../../../assist";

import '../styles.scss';

export default function ViewNews(){
  const { id } = useParams();
  const [obj, setObj] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const mounted = useRef(true);
  
  useEffect( () => {
    async function load(){
      const response = await getNoticias();
      const objTemp = response.data.find(data => data.id === parseInt(id));
      objTemp.texto = removeQuotationMarks(objTemp.texto)
      if(mounted.current){
        setObj(objTemp);
        setIsLoading(false);
      }
    }
    load();

    return () => {mounted.current = false} 
  }, [id]);

  return (  
    <div className="noticiasView">
      <MyNavbar initActive={2}/>

      <main className="noticias__main">
      {isLoading ? 
      <div>
        <Loader type="dots" />
        <p className="noticias__load">Carregando a notícia</p>
      </div>
      :
        <View obj={obj}/>
      }
      </main>

      <Footer />
    </div>
  );
}