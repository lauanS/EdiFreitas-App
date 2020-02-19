import React from 'react';

import './styles.scss';

export default function Post(props){
  const {news} = props;
  return (
    <>  
    <div className="post">
      <h2>{news.titulo}</h2>
      <p>{news.descricao}</p>
      <p>{news.tag}</p>
    </div>
    </>
  );
}