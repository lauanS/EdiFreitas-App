import React, { useState, useEffect } from 'react';

import LastestContainer from "../LastestContainer";
import { getNoticiasHome } from '../../services';

import { notFind, deleteError, deleteSuccess} from "../../assist/feedback";
import { desconverterData, getUrlBase } from "../../assist/";

import './styles.scss';

export default function LastestNews(){
  const [data, setData] = useState(false);

  useEffect(() => {
    async function load(){
      setIsLoading(true);
      const response = await getNoticiasHome();
      const obj = response.data;


      setData({
        title: obj.titulo,
        description: obj.subtitulo,
        footer: obj.data
      });
      setIsLoading(false);
      return;
    }

    load()
  }, []);

  return(
    <>
      <LastestContainer />
    </>
  );
}