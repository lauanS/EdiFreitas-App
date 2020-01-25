import React from 'react';
import {Form, Row, Col, Card, CardColumns, Button} from 'react-bootstrap';

import CardConsulta from '../CardConsulta';

import './styles.scss';

export default function ConsultarNoticias(){

  return (
    <>
    <Form autoComplete="off">
      <Form.Group as={Row} controlId="formGroupName">
        <Form.Label column sm={2} className="listarPessoas__label">
          Título
        </Form.Label>
        <Col sm={8} className="listarPessoas__inputText">
          <Form.Control 
            type="text" 
            placeholder="Ex: Especial de Natal na EdiFreitas" 
            onChange={() => {}}
          />
        </Col>
      </Form.Group>
    </Form>
    
    <CardColumns>
      <CardConsulta 
        title="Novo title"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae,"
        urlImg="https://steamuserimages-a.akamaihd.net/ugc/486769343081008872/C1C2C608F78907DCBFBD78ADFE683C942E7B9C25/"
        creationDate="25/01/2020"
        updateDate="26/01/2020"      
      />

      <CardConsulta 
        title="Lorem ipsum dolor"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae,"
        urlImg="https://cdn.myanimelist.net/r/360x360/images/characters/15/266029.jpg?s=029bb39a4d062e862fbbc59bd9dea268"
        creationDate="25/01/2020"
        updateDate="26/01/2020"      
      />

      <CardConsulta 
        title="Trabalho de Extensão para a ONG EdiFreitas Extensão para a ONG EdiFreitas"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae,"
        urlImg="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGSchNBJSYBWUARzgM2YisE5S9_Ew8LSyblcHTg_sCRf38-ApP"
        creationDate="20/01/2020"
        updateDate="26/01/2020"      
      />

      <CardConsulta 
        title="Lorem ipsum dolor"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae,"
        urlImg="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkYn64tYtWf04OeSY2Wnapanr_BzXLNtUbukVcbzEP7Ox04wls"
        creationDate="20/01/2020"
        updateDate="26/01/2020"      
      />

      <CardConsulta 
        title="Lorem ipsum dolor"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae,"
        urlImg="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0h6YYldvKZUH9MQu3WWhxpDGh9Uvu8mNafg-GGaQyvHcdK_ca"
        creationDate="25/01/2020"
        updateDate="26/01/2020"      
      />

      <CardConsulta 
        title="Lorem ipsum dolor"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae,"
        urlImg="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9ZMs6-RUMHVgbRhRwZh8KhRZizU55MwhREo75SwFNSthHbGWC"
        creationDate="25/01/2020"
        updateDate="26/01/2020"      
      />      

    </CardColumns>
    </>
  );
      
}




