import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import CadastroLogin from '../../../components/CadastroLogin';

export default function CadastrarAdministrador(){
  return (
    <Sidebar titulo="Cadastrar login" ativo={10} key={"sidebar"}>
      <CadastroLogin/>
    </Sidebar>
  );
}