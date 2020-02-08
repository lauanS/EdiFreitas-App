import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';
import CampoImagem from '../../../components/CampoImagem/index'
export default class AdicionarFotos extends React.Component{
    render(){
        return (
          <Sidebar titulo="Adicionar fotos" ativo={8}>
            <CampoImagem />
          </Sidebar>
        );
      }
}
