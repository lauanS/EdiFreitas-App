import React from "react";
import './styles.scss';
import ModalCard from './modalCard';
import nozaki from '../../assets/nozaki.jpg';
import stein from '../../assets/stein.jpg';
import cad from '../../assets/cad.jpg';
import crack from '../../assets/crack.jpg';

export default function ListarPessoas() {
  return (
    <div>
      
      <div className="resultadosPessoas"> 
        <ModalCard crianca={false} dtNasc={"02/02/1998"} photo={nozaki} name="Leonardo Seiji Nozaki nozaki nozaki nozaki" idade={21}/>
        <ModalCard crianca={true} dtNasc={"02/02/1998"} numCalcado={38} photo={stein} name="Leonardo Stein Campelo" idade={20}/>
        <ModalCard photo={cad} name="Lauan dos Santos Souza" idade={20}/>
        <ModalCard photo={crack} name="Lucas Sampaio de Souza" idade={20}/>
      </div>
    </div>
  );
}