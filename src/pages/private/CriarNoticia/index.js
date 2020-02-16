import React from 'react';
import Sidebar from '../../../components/Sidebar/index';
import ContainerNoticia from '../../../components/EditorDeNoticia/ContainerNoticia';

import './styles.scss';

export default function CriarNoticia(){


  return (
    <>
    <Sidebar titulo="Criar notícia" ativo={6} key={"sidebar"}>
      <ContainerNoticia />
    </Sidebar>   
    </>
  );
    

}
