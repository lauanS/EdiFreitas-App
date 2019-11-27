import React from "react";
import './styles.scss';


export default function cardPessoas(props) {
    const { photo, name, idade, change} = props;

    return (
      <div className="cardPessoa" onClick={change}> 
				<img src={photo} alt='foto de perfil' className = "cardPessoa__img"/>

			  <div className="cardPessoa__info">
          <p className="cardPessoa__nome">{name}</p>
          <p className="cardPessoa__idade">{idade} anos</p>
			  </div>

      </div>
    );
}