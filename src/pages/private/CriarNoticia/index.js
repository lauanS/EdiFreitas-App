import React from 'react';
import Sidebar from '../../../components/Sidebar/index';
import EditorDeNoticia from '../../../components/EditorDeNoticia';

import './styles.scss';

export default function CriarNoticia(){


  return (
    <>
    <Sidebar titulo="Cadastrar notícia" ativo={6} key={"sidebar"}>
      <EditorDeNoticia />
    </Sidebar>   
    </>
  );
    

}
