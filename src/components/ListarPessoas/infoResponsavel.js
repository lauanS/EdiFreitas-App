import React from 'react';
import photo from '../../assets/usuario.png';
import {cpfFormat, idade, nascimento, formatDadosCrianca } from '../../assist';
import './infoResponsavel.scss';

export default function ModalCard(props){
  const {dados} = props;

  return(
    <>
    <div className="infoResp">
      <div className="infoResp__divTitle">
        <h6 className="infoResp__title">Dados pessoais</h6>
      </div>
      <div className="infoResp__divFlex">
        <img src={photo} alt="foto de perfil" className="infoResp__img"/>
        <div className="infoResp__dadosPessoais">
          <h5 className="infoResp__text">{dados.nome}</h5>
          {idade(dados.dataNascimento) > 1 ? 
            <p className="infoResp__text">Idade: {idade(dados.dataNascimento)} anos</p>
            :
            <p className="infoResp__text">Idade: {idade(dados.dataNascimento)} ano</p>
          }
          <p className="infoResp__text">Nascimento: {nascimento(dados.dataNascimento)}</p>
          <p className="infoResp__text">CPF: {cpfFormat(dados.cpf)}</p>
          
        </div>
      </div>
      {dados.comentario.length > 0 ? 
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
          <p className="infoResp__text-margin">{formatDadosCrianca(crianca)}</p>
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
          <p className="infoResp__text-margin">E-mail: {contato.contato}</p>
          :
          <p className="infoResp__text-margin">Telefone: {contato.contato}</p>
        )}
        </>
      }
    </div>

    <div className="infoResp">
      <div className="infoResp__divTitle">
        <h6 className="infoResp__title">Endereço</h6>
      </div>
      {dados.endereco === undefined ? 
        <p className="infoResp__text-margin">Essa pessoa não possui endereço cadastrado</p>
        :
        <>
          <p className="infoResp__text-margin">Logradouro: {dados.endereco.logradouro}</p>
          <p className="infoResp__text-margin">Bairro: {dados.endereco.bairro}</p>
          <p className="infoResp__text-margin">Cidade: {dados.endereco.cidade}</p>
          <p className="infoResp__text-margin">CEP: {dados.endereco.cep}</p>
          <p className="infoResp__text-margin">Número: {dados.endereco.numero}</p>
        </>
      }
    </div>
    </>
  );
}