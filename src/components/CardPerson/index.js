import React from "react";
import './styles.scss';


import { idade as convertDateToAge, cpfFormat } from '../../assist';

export default function cardPerson(props) {
  const { setSelect, person, isChild, extraFields} = props;
  let idade = convertDateToAge(person.dataNascimento);;

  const handleClick = () => {
    setSelect(person.id);
  }

  return (
    <div className="cardPerson" onClick={handleClick}> 
      <img src={person.foto} alt='foto de perfil' className = "cardPerson__img"/>

      {isChild === true ? 
        <div className="cardPerson__divInfo">
          <p className="cardPerson__dadosNome">{person.nome}</p>
          <p className="cardPerson__dados">Criança</p>
          {idade > 1 ? <p className="cardPerson__dados">
            Idade: {idade} anos
          </p> :
          <p className="cardPerson__dados">Idade: {idade} ano</p>}
          <p className="cardPerson__dados">Responsável: {person.responsavel.nome}</p>
          {person.responsavel.endereco === null ?
            <p className="cardPerson__dados">O responsavel não possui endereço cadastrado</p>
          :
            <p className="cardPerson__dados">Endereço: {person.responsavel.endereco.logradouro}, {person.responsavel.endereco.bairro}, {person.responsavel.endereco.cidade}</p>
          }
          {extraFields}
        </div>
      :
        <div className="cardPerson__divInfo">
          <p className="cardPerson__dadosNome">{person.nome}</p>
          <p className="cardPerson__dados">Responsável</p>
          {idade > 1 ? <p className="cardPerson__dados">Idade: {idade} anos</p> :
          <p className="cardPerson__dados">Idade: {idade} ano</p>}
          <p className="cardPerson__dados">CPF: {cpfFormat(person.cpf)}</p>
          {person.endereco === null ?
            <p className="cardPerson__dados">Essa pessoa não possui endereço cadastrado</p>
          :
            <p className="cardPerson__dados">Endereço: {person.endereco.logradouro}, {person.endereco.bairro}, {person.endereco.cidade}</p>
          }
          {extraFields}
        </div>
      }
    </div>  
  );
}