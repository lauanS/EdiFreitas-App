import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class CadastrarCrianca extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Cadastrar criança" ativo={1}/>
          </>
        );
      }

}
