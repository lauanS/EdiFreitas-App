import React from "react";
import './styles.scss';


export default function cardPessoas(props) {
    const { change, foto, cpf, endereco, nome, idade, } = props;

    const cpfFormat = (cpf) => {
      var newCpf = cpf.substring(0,3) + "." + cpf.substring(3,6) + "." + cpf.substring(6,9)
        + "-" + cpf.substring(9,11)
      return newCpf;
    };

    return (
      <div className="cardPessoa" onClick={change}> 
				<img src={foto} alt='foto de perfil' className = "cardPessoa__img"/>

			  <div className="cardPessoa__div-info">
          <p className="cardPessoa__dados">Nome: {nome}</p>
          {idade > 1 ? <p className="cardPessoa__dados">Idade: {idade} anos</p> :
          <p className="cardPessoa__dados">Idade: {idade} ano</p>}
          <p className="cardPessoa__dados">CPF: {cpfFormat(cpf)}</p>
          <p className="cardPessoa__dados">Endereço: {endereco.logradouro}, {endereco.bairro}, {endereco.cidade}</p>
			  </div>

      </div>
    );
}