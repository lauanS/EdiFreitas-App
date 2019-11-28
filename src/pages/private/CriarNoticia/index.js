import React from 'react';
import './styles.scss';
import { Form } from 'react-bootstrap';
import Sidebar from '../../../components/Sidebar/index';
import TextEditor from '../../../components/EditorDeTexto/index'
import DadosNoticia from '../../../components/DadosNoticia/index'

export default class CriarNoticia extends React.Component{
    render(){
        return (
          <>
          <Sidebar titulo="Criar notícia" ativo={6}/>
          <div className='newsContent'>
            <Form>
              <DadosNoticia />
              <div className='newsEditor'>
                <TextEditor />   
              </div>
            </Form>

          </div>

          </>
        );
      }

}
