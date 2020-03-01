import React from 'react';
import './styles.scss';

import Button from '@material-ui/core/Button';

export default function ExportarDados() {

  const exportarCriancas = () => {
    window.open('https://edi-freitas.herokuapp.com/api/criancas/export')
  }

  const exportarResponsaveis = () => {
    window.open('https://edi-freitas.herokuapp.com/api/responsaveis/export')
  }

  return(
    <div>
      <label className="exportarDados__descricao">É possível exportar os dados de crianças e responsáveis no formato CSV</label>
      
      <div className="exportarDados__divButton">
        <Button 
          onClick={exportarCriancas} 
          className="exportarDados__button" 
          variant="contained" 
          color="primary"
        >Exportar dados sobre crianças
        </Button>
      </div>
      
      <div className="exportarDados__divButton">
        <Button 
          onClick={exportarResponsaveis} 
          className="exportarDados__button" 
          variant="contained" 
          color="primary"
        >Exportar dados sobre responsáveis
        </Button>
      </div>
    </div>
  );
}