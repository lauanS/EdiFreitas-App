import React from "react";
import './card.scss';
import {cpfFormat, idade} from '../../assist';
import foto from '../../assets/usuario.png';
import Button from '@material-ui/core/Button';

export default function card(props) {
    const { setSelect, dados, modal} = props;

    const handleClick = e => {
      setSelect(dados);
      e.preventDefault();
    }

    return (
      <div className={modal === true ? "cardResponsavel" : "cardResponsavel2"}> 
				<img src={foto} alt='foto de perfil' className = "cardResponsavel__img"/>

        
        <div className="cardResponsavel__divInfo">
          <p className="cardResponsavel__dados">Nome: {dados.nome}</p>
          {idade(dados.dataNascimento) > 1 ? <p className="cardResponsavel__dados">Idade: {idade(dados.dataNascimento)} anos</p> :
          <p className="cardResponsavel__dados">Idade: {idade(dados.dataNascimento)} ano</p>}
          <p className="cardResponsavel__dados">CPF: {cpfFormat(dados.cpf)}</p>
          <p className="cardResponsavel__dados">Endereço: {dados.endereco.logradouro}, {dados.endereco.bairro}, {dados.endereco.cidade}</p>
          
          {modal === true ?
          <Button 
            className="cardResponsavel__button"
            size="small" 
            variant="contained" 
            color="primary"
            onClick={handleClick}
            >
            Selecionar
          </Button>
          :
            ''
          }
        </div>
        
        
      </div>
    );
}