import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";

import LastestContainer from "../LastestContainer";

import { getNoticiasHome } from "../../services";
import { desconverterDataFormatISO } from "../../assist";

import './styles.scss';

export default function LastestNews(){
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  
  const mounted = useRef(true);

  function loadView(obj){
    history.push(`/noticias/view/${obj.id}`);
  }

  useEffect(() => {
    async function load(){
      try {
        setIsLoading(true);
        const response = await getNoticiasHome();
        const responseData = response.data;

        let newData = [];
        if(responseData){
          responseData.forEach((obj, i) => {
            newData.push({
              id: obj.id,
              title: obj.titulo,
              description: obj.descricao,
              footer: desconverterDataFormatISO(obj.data),
              urlImg: obj.foto
            })
          })
        }
        if(mounted.current){
          setData(newData);
          setIsLoading(false);
          setErrors(false);
        }
      } catch (error) {
        if(mounted.current){
          setData([]);
          setIsLoading(false);
          setErrors(true);
        }
      }
    }

    load()

    return () => {mounted.current = false}
  }, []);

  return(
    <>
      <LastestContainer data={data} isLoading={isLoading} action={loadView} errors={errors}/>
    </>
  );
}