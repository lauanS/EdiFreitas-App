//Refatorada em 08/02/2020 por Leonardo Nozaki
import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import CadResponsavel from '../../../components/CadastroResponsavel/index';

export default class CadastrarResponsavel extends React.Component{
  render(){
    return (
      <Sidebar titulo="Cadastrar responsável" ativo={0} key={"sidebar"}>
        <CadResponsavel />   
      </Sidebar>
    );
  }
}