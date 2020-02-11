import React from 'react';
import './styles.scss';

export default function CampoImagem(props) {
  const {onSelectFile, text, multiple} = props;

  return (
    <>
    <input 
      type="file" 
      accept="image/*" 
      id="inputImagem" 
      multiple={multiple} 
      onChange={e => onSelectFile(e)}
    />
    <label id="labelImagem" htmlFor="inputImagem">{text}</label>
    </>
  );
}