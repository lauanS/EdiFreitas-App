import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';
import EditorDeNoticia from '../../../components/EditorDeNoticia';


export default function CriarNoticia(){


  return (
    <>
    <Sidebar titulo="Criar notícia" ativo={6} key={"sidebar"}/>
    <div className="div-news">
      <EditorDeNoticia />
    </div>
    

    </>
  );
    

}
