import React from 'react';
import './styles.scss';

import {cpfFormat, idade, nascimento, formatDadosCrianca } from '../../assist';

export default function ModalCard(props){
  const {dados} = props;

  return(
    <>
    <div className="infoResp">
      <div className="infoResp__divTitle">
        <h6 className="infoResp__title">Dados pessoais</h6>
      </div>
      <div className="infoResp__divFlex">
        <img src={dados.foto} alt="foto de perfil" className="infoResp__img"/>
        <div className="infoResp__dadosPessoais">
          <h5 className="infoResp__text">{dados.nome}</h5>
          {idade(dados.dataNascimento) > 1 ? 
            <p className="infoResp__text">Idade: {idade(dados.dataNascimento)} anos</p>
            :
            <p className="infoResp__text">Idade: {idade(dados.dataNascimento)} ano</p>
          }
          <p className="infoResp__text">Nascimento: {nascimento(dados.dataNascimento)}</p>
          <p className="infoResp__text">CPF: {cpfFormat(dados.cpf)}</p>
          {dados.sexo === "F" ?
            <p className="infoCrianca__text">Sexo: Feminino</p>
            :
            <p className="infoCrianca__text">Sexo: Masculino</p>
          }
        </div>
      </div>
      {dados.comentario !== "" ? 
        <p className="infoResp__text-margin">Comentário: {dados.comentario}</p>
        :
        <p className="infoResp__text-margin">Não há comentário para essa pessoa</p>
      }
    </div>

    <div className="infoResp">
      <div className="infoResp__divTitle">
        <h6 className="infoResp__title">Responsabilidade</h6>
      </div>
      {dados.criancas.length === 0 ? 
        <p className="infoResp__text-margin">Essa pessoa não possui crianças cadastradas em seu nome</p>
        : 
        <>     
        {dados.criancas.map(crianca =>
          <p key={crianca.id} className="infoResp__text-margin">{formatDadosCrianca(crianca)}</p>
        )}
        </>
      }
    </div>

    <div className="infoResp">
      <div className="infoResp__divTitle">
        <h6 className="infoResp__title">Contato</h6>
      </div>
      {dados.contatos.length === 0 ? 
        <p className="infoResp__text-margin">Essa pessoa não possui meio de contato cadastrado</p>
        :
        <>
        {dados.contatos.map(contato =>
          contato.tipo === "email" ? 
          <p key={contato.id} className="infoResp__text-margin">E-mail: {contato.contato}</p>
          :
          <p key={contato.id} className="infoResp__text-margin">Telefone: {contato.contato}</p>
        )}
        </>
      }
    </div>

    <div className="infoResp">
      <div className="infoResp__divTitle">
        <h6 className="infoResp__title">Endereço</h6>
      </div>
      {dados.endereco === undefined || dados.endereco === null ? 
        <p className="infoResp__text-margin">Essa pessoa não possui endereço cadastrado</p>
        :
        <>
          <p className="infoResp__text-margin">Logradouro: {dados.endereco.logradouro}</p>
          <p className="infoResp__text-margin">Bairro: {dados.endereco.bairro}</p>
          <p className="infoResp__text-margin">Cidade: {dados.endereco.cidade}</p>
          {dados.endereco.cep !== "" ? 
          <p className="infoResp__text-margin">CEP: {dados.endereco.cep}</p>
          :
          <p className="infoResp__text-margin">CEP não cadastrado</p>
          }
          <p className="infoResp__text-margin">Número: {dados.endereco.numero}</p>
        </>
      }
    </div>
    </>
  );
}