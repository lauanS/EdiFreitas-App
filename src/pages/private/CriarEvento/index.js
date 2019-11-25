import React from 'react';
import './styles.scss';
import Sidebar from '../../../components/Sidebar/index';

export default class CriarEvento extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Criar evento" ativo={3}/>
          </>
        );
      }

}
