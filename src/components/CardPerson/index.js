import React from "react";
import './styles.scss';
import {cpfFormat} from '../../assist';

import Button from '@material-ui/core/Button';

export default function cardPessoa(props) {
  const { setSelect, foto, dados, crianca, idade, opcao} = props;

  const handleClick = () => {
    setSelect(dados.id);
  }

  return (
    <div className="cardPessoa" onClick={handleClick}> 
      <img src={foto} alt='foto de perfil' className = "cardPessoa-img"/>

      {crianca === true ? 
        <div className="cardPessoa-divInfo">
          <p className="cardPessoa-dados">Criança</p>
          <p className="cardPessoa-dados">Nome: {dados.nome}</p>
          {idade > 1 ? <p className="cardPessoa-dados">Idade: {idade} anos</p> :
          <p className="cardPessoa-dados">Idade: {idade} ano</p>}
          {opcao}
        </div>
      :
        <div className="cardPessoa-divInfo">
        <p className="cardPessoa-dados">Responsável</p>
          <p className="cardPessoa-dados">Nome: {dados.nome}</p>
          {idade > 1 ? <p className="cardPessoa-dados">Idade: {idade} anos</p> :
          <p className="cardPessoa-dados">Idade: {idade} ano</p>}
          <p className="cardPessoa-dados">CPF: {cpfFormat(dados.cpf)}</p>
          {dados.endereco === null ?
            <p className="cardPessoa-dados">Essa pessoa não possui endereço cadastrado</p>
          :
            <p className="cardPessoa-dados">Endereço: {dados.endereco.logradouro}, {dados.endereco.bairro}, {dados.endereco.cidade}</p>
          }
        </div>
      }
    </div>
  );
}