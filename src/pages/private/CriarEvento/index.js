import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import EditorDeEventos from '../../../components/EditorDeEventos';

export default class CriarEvento extends React.Component{
  render(){
    return (
      <Sidebar titulo="Cadastrar evento" ativo={3} key={"sidebar"}>
        <EditorDeEventos />   
      </Sidebar>
    );
  }
}
