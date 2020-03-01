import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index'
import donaEdi from "../../../assets/donaedi.jpg";
import pessoal from "../../../assets/pessoal.jpg";

import "./styles.scss"

export default function Sobre(){

  return (
    <div className="sobre">
      <MyNavbar initActive={4}/>
      <main className="sobre__main">
        <section className="sobre__content">
          <img className="imagem" src={donaEdi} alt="foto da dona edi"/>
          <h5>Quem Somos</h5>
          <p>&nbsp;&nbsp;&nbsp;A ONG Edi Freitas foi criada em memória a dona Edi, tendo sua raíz nas ações e no desejo dela em fazer o bem ao próximo, principalmente às crianças. </p>
          <h5>O que fazemos</h5>
          <p>&nbsp;&nbsp;&nbsp;Em 2015, após o falecimento da dona Edi, seu filho Diego continuou seu trabalho social com a ajuda de amigos e desde então, realiza  entrega de ovos de páscoa para as crianças do jardim Itapemirim, festa no dia das crianças e almoço de natal com entrega de brinquedos. Também realiza a entrega de cestas básicas, doação de roupas usadas e cobertores, assim como qualquer outra necessidade que as pessoas da comunidade venham a ter, se esta estiver ao alcance da equipe ONG Edi Freitas.</p>
          <p>&nbsp;&nbsp;&nbsp;Esse trabalho acontece por meio de arrecadações de valores em dinheiro para a compra dos insumos necessários (doces, sucos, lanches, brinquedos, chocolates para os ovos de páscoa, etc) ou dos próprios insumos. Arrecadação de alimentos para as cestas básicas com os eventos da comunidade, rifas beneficentes e o trabalho dos voluntários que estão sempre presentes na ONG colocando a mão na massa e fazendo essas ações acontecerem.</p>
          <h5>Nossa equipe</h5>
          <img className="imagem100" src={pessoal} alt="foto da equipe"/>
        </section>
      </main>
      <Footer />

      
    </div>
  );
  
}
