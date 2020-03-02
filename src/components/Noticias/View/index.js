import React from 'react';
import Interweave  from 'interweave';
import { desconverterDataFormatISO } from "../../../assist";
import './styles.scss';

export default function View(props){
  const { obj } = props;

  return (
    <>  
    <div className="View">
      {obj?
      <>
      <img alt="capa do álbum" className="View-img" src={obj.foto} />
      <div className="View-header">
        <h1>{obj.titulo}</h1>
        <h2>{obj.descricao}</h2>
        <p>{desconverterDataFormatISO(obj.data)}</p>
        <hr />
      </div>
     
      <div className="View-text Content">
        <Interweave content={obj.texto.replace(/&quot;/g, '"')} className="Content"/>
      </div>
      </>
      :
      <h1>Ocorreu um erro ao carregar a notícia</h1>
      }
    </div>

    </>
  );
}