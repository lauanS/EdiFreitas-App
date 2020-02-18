import React from 'react';
import './styles.scss';

export default function VisualizarEvento(props){
  return (
    <>
    <div className="visualizarEvento-content">
      {props.children}
    </div>  
    </>

  );
}