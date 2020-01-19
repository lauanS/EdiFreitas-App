import React from 'react';
import photo from '../../assets/usuario.png';
import {cpfFormat, idade, nascimento} from '../../assist';
import './infoCrianca.scss';

export default function ModalCard(props){
  const {dados} = props;
  const dadosResp = dados.responsavel;

  return(
    <>
    <div className="infoCrianca">
      <div className="infoCrianca__divTitle">
        <h6 className="infoCrianca__title">Dados pessoais</h6>
      </div>
      <div className="infoCrianca__divFlex">
        <img src={photo} alt="foto de perfil" className="infoCrianca__img"/>
        <div className="infoCrianca__dadosPessoais">
          <h5 className="infoCrianca__text">{dados.nome}</h5>
          {idade(dados.dataNascimento) > 1 ? 
            <p className="infoCrianca__text">Idade: {idade(dados.dataNascimento)} anos</p>
            :
            <p className="infoCrianca__text">Idade: {idade(dados.dataNascimento)} ano</p>
          }
          <p className="infoCrianca__text">Nascimento: {nascimento(dados.dataNascimento)}</p>
          {dados.nCalcado !== 0 ?
          <p className="infoCrianca__text">Número do calçado: {dados.nCalcado}</p>
          :
          <p className="infoCrianca__text">Número do calçado não cadastrado</p>
          }
          {dados.tamRoupa !== "" ?
          <p className="infoCrianca__text">Tamanho da roupa: {dados.tamRoupa}</p>
          :
          <p className="infoCrianca__text">Tamanho de roupa não cadastrado</p>
          }
          
          {dados.sexo === "F" ?
            <p className="infoCrianca__text">Sexo: Feminino</p>
            :
            <p className="infoCrianca__text">Sexo: Masculino</p>
          }
        </div>
      </div>
      {dados.comentario !== "" ? 
        <p className="infoCrianca__text-margin">Comentário: {dados.comentario}</p>
        :
        <p className="infoCrianca__text-margin">Não há comentário para essa pessoa</p>
      }
    </div>
    
    {dadosResp === undefined || dadosResp === null ? 
    ''
    :
    <>
    <div className="infoCrianca">
      <div className="infoCrianca__divTitle">
        <h6 className="infoCrianca__title">Dados do responsável</h6>
      </div>
      <div className="infoCrianca__divFlex">
        <img src={photo} alt="foto de perfil" className="infoCrianca__img"/>
        <div className="infoCrianca__dadosPessoais">
          <h5 className="infoCrianca__text">{dadosResp.nome}</h5>
          {idade(dadosResp.dataNascimento) > 1 ? 
            <p className="infoCrianca__text">Idade: {idade(dadosResp.dataNascimento)} anos</p>
            :
            <p className="infoCrianca__text">Idade: {idade(dadosResp.dataNascimento)} ano</p>
          }
          <p className="infoCrianca__text">Nascimento: {nascimento(dadosResp.dataNascimento)}</p>
          <p className="infoCrianca__text">CPF: {cpfFormat(dadosResp.cpf)}</p>
          
        </div>
      </div>
      {dadosResp.comentario !== "" ? 
        <p className="infoCrianca__text-margin">Comentário: {dadosResp.comentario}</p>
        :
        <p className="infoCrianca__text-margin">Não há comentário para essa pessoa</p>
      }
    </div>

    <div className="infoCrianca">
      <div className="infoCrianca__divTitle">
        <h6 className="infoCrianca__title">Contato do responsável</h6>
      </div>
      {dadosResp.contatos.length === 0 ? 
        <p className="infoCrianca__text-margin">Esse responsável não possui meio de contato cadastrado</p>
        :
        <>
        {dadosResp.contatos.map(contato =>
          contato.tipo === "email" ? 
          <p className="infoCrianca__text-margin" key={contato.id}>E-mail: {contato.contato}</p>
          :
          <p className="infoCrianca__text-margin" key={contato.id}>Telefone: {contato.contato}</p>
        )}
        </>
      }
    </div>

    <div className="infoCrianca">
      <div className="infoCrianca__divTitle">
        <h6 className="infoCrianca__title">Endereço do responsável</h6>
      </div>
      {dadosResp.endereco === undefined || dadosResp.endereco === null ? 
        <p className="infoCrianca__text-margin">Essa responsável não possui endereço cadastrado</p>
        :
        <>
          <p className="infoCrianca__text-margin">Logradouro: {dadosResp.endereco.logradouro}</p>
          <p className="infoCrianca__text-margin">Bairro: {dadosResp.endereco.bairro}</p>
          <p className="infoCrianca__text-margin">Cidade: {dadosResp.endereco.cidade}</p>
          <p className="infoCrianca__text-margin">CEP: {dadosResp.endereco.cep}</p>
          <p className="infoCrianca__text-margin">Número: {dadosResp.endereco.numero}</p>
        </>
      }
    </div>
    </>
    }
    </>
  );
}