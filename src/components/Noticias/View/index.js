import React from 'react';
import '../styles.scss';

export default function View(props){
  const { obj } = props;

  return (
    <>  
    <div className="Noticia-view">
      {obj?
      <>
      <h1>{obj.titulo}</h1>
      <h2>{obj.descricao}</h2>
      {obj.texto}
      </>
      :
      <h1>Ocorreu um erro ao carregar a notícia</h1>
    }
    </div>

    </>
  );
}