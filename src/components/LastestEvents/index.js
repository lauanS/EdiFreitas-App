import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import LastestContainer from "../LastestContainer";
import { getEventosHome } from "../../services";
// import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
import { desconverterDataFormatISO } from "../../assist";

import './styles.scss';

export default function LastestEvents(){
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  function loadView(obj){
    history.push(`/eventos/${obj.id}`);
  }

  useEffect(() => {
    async function load(){
      setIsLoading(true);
      const response = await getEventosHome();
      const responseData = response.data;

      let newData = [];
      if(responseData){
        responseData.forEach((obj) => {
          newData.push({
            title: obj.nome,
            description: obj.descricao,
            footer: desconverterDataFormatISO(obj.dataEvento),
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
      <LastestContainer data={data} isLoading={isLoading} action={loadView}/>
    </>
  );
}