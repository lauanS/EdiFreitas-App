//Refatorada em 08/02/2020 por Leonardo Nozaki
import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import CadCrianca from '../../../components/CadastroCrianca/index';

export default class CadastrarCrianca extends React.Component{
  render(){
    return (
      <Sidebar titulo="Cadastrar criança" ativo={1} key={"sidebar"}>
        <CadCrianca />
      </Sidebar>
    );
  }
}
