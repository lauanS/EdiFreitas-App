import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default class Administrar extends React.Component{
    render(){
        return (
          <div>
            <label>Nome do Responsável: </label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  Nome:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Insira o nome completo aqui"
                aria-label="Nome"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  RG:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Ex: 954.214.555-8"
                aria-label="RG"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            Data de Nascimento <input type="date" name="dataNasc"/><br /><br />

            <label htmlFor="basic-url">Sexo: </label><br />
            <InputGroup className="mb-3">            
              <label htmlFor="basic-url">Masculino: </label>  
              <InputGroup.Radio aria-label="Radio button for following text input" />
              <label htmlFor="basic-url">Feminino: </label>
              <InputGroup.Radio aria-label="Radio button for following text input" />
            </InputGroup>

            <textarea type="text-area" name="Comentario"/> Comentario

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon3">
                  Nome:
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Insira o nome completo aqui"
                aria-label="Nome"
                aria-describedby="basic-addon1"
              />
            </InputGroup>


          </div>
         
        );
      }

}
