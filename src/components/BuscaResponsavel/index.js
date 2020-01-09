import React, {useState} from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import './index.scss';
import Card from '../CardResponsavel'

export default function useResponsavelBuscar(props) {
  const {setDadosResponsavel, setOpen, responsaveis} = props;
  
  const [filteredResponsaveis, setFilteredResponsaveis] = useState(responsaveis);
  const [search, setSearch] = useState('');
  
  const updateSearch = e => {
    setFilteredResponsaveis(searchPeople(responsaveis, e.target.value) || []);
    setSearch(e.target.value);
    e.preventDefault();
  }

  const searchPeople = (list, search) => {
    if (search === '') {
      return list;
    }

    return Array.isArray(list) ? list.filter(person =>
      person.nome.toLowerCase().indexOf(search.toLowerCase()) !== -1 )
      : [];
  }

  const setSelect = (dados) => {
    setDadosResponsavel(dados);
    setOpen(false);
  }

  return (
  <>
  <Form autoComplete="off" className="buscaResponsavel__form">
    <Form.Group as={Row} controlId="formGroupName">
      <Form.Label column sm={4} className="buscaResponsavel__label">
        Nome do responsável
      </Form.Label>
      <Col sm={8} className="buscaResponsavel__inputText">
        <Form.Control 
          type="text" 
          placeholder="Ex: Leonardo dos Santos Sampaio" 
          onChange={updateSearch}
        />
      </Col>
    </Form.Group>
  </Form>
  {filteredResponsaveis.length === 0 ? 
    <p>Nenhuma pessoa encontrada com o nome: "{search}"</p> 
    :
    <>
    {search === '' ?
      <p>Total de {filteredResponsaveis.length} resultados</p>:
      <p>Total de {filteredResponsaveis.length} resultados para "{search}"</p>
    }
    
    <div className="buscaResponsavel__listarPessoas"> 
      {filteredResponsaveis.length > 0 ? filteredResponsaveis.map(pessoa =>
        <Card modal={true} setSelect={setSelect} dados={pessoa} key={pessoa.id}/>
      ) : ''}
    </div>
    </>
  }
  </>
  );
}