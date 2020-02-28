import React from 'react';
import Interweave  from 'interweave';
import './styles.scss';

export default function View(props){
  const { obj } = props;

  return (
    <>  
    <div className="View">
      {obj?
      <>
      {/* <img className="View-img" src={obj.foto} /> */}
      <div className="View-header">
        <h1>{obj.titulo}</h1>
        <h2>{obj.descricao}</h2>
      </div>
      <div className="View-text">
        <Interweave content={obj.texto} />
      </div>
      </>
      :
      <h1>Ocorreu um erro ao carregar a notícia</h1>
    }
    </div>

    </>
  );
}