import React from 'react';
import Sidebar from '../../../components/Sidebar/index';
import EditorDeNoticia from '../../../components/EditorDeNoticia';

import './styles.scss';

export default function CriarNoticia(){


  return (
    <>
    <Sidebar titulo="Criar notícia" ativo={6} key={"sidebar"}>
      <EditorDeNoticia />
    </Sidebar>   
    </>
  );
    

}
