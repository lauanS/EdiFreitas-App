import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import CadastrarEvento from '../../../components/CadastroEvento/index';

export default class CriarEvento extends React.Component{
  render(){
    return (
      <Sidebar titulo="Criar evento" ativo={3} key={"sidebar"}>
        <CadastrarEvento />   
      </Sidebar>
    );
  }
}
