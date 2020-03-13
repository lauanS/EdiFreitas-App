import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";

import LastestContainer from "../LastestContainer";
import { getEventosHome } from "../../services";
import { dateFullFormat } from "../../assist";

import './styles.scss';

export default function LastestEvents(){
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const mounted = useRef(true);

  function loadView(obj){
    history.push(`/eventos/${obj.id}`);
  }

  useEffect(() => {
    async function load(){
      setIsLoading(true);

      try {
        const response = await getEventosHome();
        const responseData = response.data;

        let newData = [];
        if(responseData){
          responseData.forEach((obj) => {
            newData.push({
              id: obj.id,
              title: obj.nome,
              description: obj.descricao,
              footer: dateFullFormat(obj.dataEvento),
              urlImg: obj.capa
            })
          })
        }

        if(mounted.current){
          setData(newData);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
      

      return;

    }

    load()

    return () => {mounted.current = false}
  }, []);

  return(
    <>
      <LastestContainer data={data} isLoading={isLoading} action={loadView}/>
    </>
  );
}