import React, { useState, useEffect } from 'react';

import {Form, Row, Col, Jumbotron, Image} from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import { getCriancas } from '../../services';
import CardPerson from "../CardPerson";

import { idade } from '../../assist';

import './styles.scss';

export default function PresencaEvento(){
  const imgUrl = "https://data.whicdn.com/images/106478614/original.png";

  const [people, setPeople] = useState([]);
  const [personSearch, setPersonSearch] = useState("");

  async function loadPeople(){
    const response = await getCriancas();
    setPeople(response.data);
    return;
  }

  function updatePersonSearch(e) {
    setPersonSearch(e.target.value);
  }

  function filterPeople(value){  
    const personSearchLowerCase = personSearch.toLowerCase()
    const valueLowerCase = value.nome.toLowerCase()
    return valueLowerCase.includes(personSearchLowerCase);
  }

  /* Carrega todas as pessoas após renderizar o componente */
  useEffect(() => {
    loadPeople();
  }, [])


  function renderCards(){
    const filteredPeople = people.filter(filterPeople);
    return filteredPeople.map((dados, key) => (
      <CardPerson 
        key={key}
        change={loadPeople} 
        foto={imgUrl} 
        dados={dados} 
        crianca={true} 
        idade={idade(dados.dataNascimento)} 
      />
    ));

  }

  return (
    <>
    <Row>
      <Col>
        <Jumbotron className="jumbotron-event">
          <h2>Titulo do evento</h2>
          <p>Local: Rua do Três, 33, Jd. Terço</p>
          <p>10/10/2020</p>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Selecionar evento
          </Button>      
        </Jumbotron>  
      </Col>
    </Row>

    <Form autoComplete="off">
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2} className="presenceControl-label">
          Nome da pessoa
        </Form.Label>
        <Col sm={8} className="presenceControl-inputText">
          <Form.Control 
            type="text" 
            placeholder="Ex: Leonardo dos Santos Sampaio" 
            onChange={updatePersonSearch}
            value={personSearch}
          />
        </Col>
      </Form.Group>
    </Form>

    <div>
      {
        renderCards()  
      }
    </div>
    
    </>
  );
      
}




