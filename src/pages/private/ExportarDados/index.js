import React from 'react';

import Sidebar from '../../../components/Sidebar/index';
import Exportar from '../../../components/ExportarDados';

export default function ExportarDados(){
  return (
    <Sidebar titulo="Exportar os dados" ativo={11} key={"sidebar"}>
      <Exportar/>
    </Sidebar>
  );
}