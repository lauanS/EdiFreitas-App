import React from 'react';

import CardPublic from '../../CardPublic';

import logo from "../../../assets/ong_logo.jpg";
import { desconverterDataFormatISO } from "../../../assist";
import './styles.scss';

export default function Post(props){
  const {news, action} = props;

  const obj = {
    id: news.id,
    title: news.titulo,
    description: news.descricao,
    footer: desconverterDataFormatISO(news.data),
    urlImg: news.foto? news.foto : logo
  }

  const handleClick = () => {
    action(obj);
  }

  return (
    <>  
      <CardPublic obj={obj} action={handleClick} />
    </>
  );
}