import React, { useState, useEffect } from 'react';

import LastestContainer from "../LastestContainer";
import { getEventosHome } from "../../services";
// import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
import { desconverterDataFormatISO } from "../../assist";

import './styles.scss';

export default function LastestEvents(){
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function load(){
      setIsLoading(true);
      const response = await getEventosHome();
      const responseData = response.data;

      let newData = [];
      if(responseData){
        responseData.forEach((obj, i) => {
          newData.push({
            title: obj.nome,
            description: obj.descricao,
            footer: desconverterDataFormatISO(obj.Evento),
            urlImg: obj.capa
          })
        })
      }

      setData(newData);
      setIsLoading(false);
      return;

    }

    load()
  }, []);

  return(
    <>
      <LastestContainer data={data} isLoading={isLoading} />
    </>
  );
}