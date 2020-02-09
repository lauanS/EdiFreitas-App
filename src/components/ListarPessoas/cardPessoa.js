import React from "react";
import './styles.scss';
import {cpfFormat} from '../../assist';

export default function cardPessoa(props) {
  const { change, foto, dados, crianca, idade} = props;

  return (
    <div className="cardPessoa" onClick={change}> 
      <img src={foto} alt='foto de perfil' className = "cardPessoa__img"/>

      {crianca === true ? 
        <div className="cardPessoa__divInfo">
          <p className="cardPessoa__dados">Criança</p>
          <p className="cardPessoa__dados">Nome: {dados.nome}</p>
          {idade > 1 ? <p className="cardPessoa__dados">Idade: {idade} anos</p> :
          <p className="cardPessoa__dados">Idade: {idade} ano</p>}
        </div>
      :
        <div className="cardPessoa__divInfo">
        <p className="cardPessoa__dados">Responsável</p>
          <p className="cardPessoa__dados">Nome: {dados.nome}</p>
          {idade > 1 ? <p className="cardPessoa__dados">Idade: {idade} anos</p> :
          <p className="cardPessoa__dados">Idade: {idade} ano</p>}
          <p className="cardPessoa__dados">CPF: {cpfFormat(dados.cpf)}</p>
          {dados.endereco === null ?
            <p className="cardPessoa__dados">Essa pessoa não possui endereço cadastrado</p>
          :
            <p className="cardPessoa__dados">Endereço: {dados.endereco.logradouro}, {dados.endereco.bairro}, {dados.endereco.cidade}</p>
          }
        </div>
      }
    </div>
  );
}