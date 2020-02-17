import React from 'react';
import './styles.scss';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';

export default function visualizarImagens(props){
  const {src, nome, voltar, editar, id} = props;

  return (
    <>
    <div className="visualizarImagem__header">
      <div className="visualizarImagem__options">
        <p className="visualizarImagem__dados" onClick={e => voltar()}><ArrowBackIosIcon /><span className="visualizarImagem__text">Voltar</span></p>
        <p className="visualizarImagem__dados" onClick={e => editar(id, nome)}><EditIcon /><span className="visualizarImagem__text">Editar álbum</span></p>
      </div>
      <h2>Álbum: {nome}</h2>
    </div>
    
    <div className="visualizarImagem">
      {src.length > 0 ? src.map((img, index) => 
        <div className="visualizarImagem__itemListImage" key={index}>
          <div className="visualizarImagem__divImg">
            <div className="visualizarImagem__divFundo">
              <div className="visualizarImagem__fundo">
                <span className="visualizarImagem__span">
                  <img 
                    className="visualizarImagem__imgFundo"
                    alt="Crop" 
                    src={img.url} 
                  />
                </span>
              </div>
            </div>
            <img 
              className="visualizarImagem__img"
              alt="Crop" 
              src={img.url} 
            />
          </div>
        </div>
      ) : ''}
        </div>
        
    </>

  );
}