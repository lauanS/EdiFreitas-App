import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class CriarNoticia extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Criar notícia" ativo={6}/>
          </>
        );
      }

}
