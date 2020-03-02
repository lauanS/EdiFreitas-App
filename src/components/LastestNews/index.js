import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import LastestContainer from "../LastestContainer";
import { getNoticiasHome } from "../../services";
// import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
import { desconverterDataFormatISO } from "../../assist";

import './styles.scss';

export default function LastestNews(){
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  function loadView(obj){
    history.push(`/noticias/view/${obj.id}`);
  }

  useEffect(() => {
    async function load(){
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

      setData(newData);
      setIsLoading(false);
      return;

    }

    load()
  }, []);

  return(
    <>
      <LastestContainer data={data} isLoading={isLoading} action={loadView} />
    </>
  );
}