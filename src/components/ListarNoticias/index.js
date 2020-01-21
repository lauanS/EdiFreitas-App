import React from 'react';

import {Form, Row, Col, Card, CardColumns, Button} from 'react-bootstrap';

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
      <Card>
        <Card.Header as="h5">
          Trabalho de Extensão para a ONG EdiFreitas
        </Card.Header>

        <Card.Body className="card-body">    
          
          <Card.Img           
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGSchNBJSYBWUARzgM2YisE5S9_Ew8LSyblcHTg_sCRf38-ApP" 
          />
          <Col>
            <Row>
              <Card.Subtitle className="card-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae, numquam, eaque alias aspernatur molestiae! Harum nulla dolorem inventore, eius ut pariatur.  
              </Card.Subtitle>
            </Row>
            <Row>      
                <Button as={Col} variant="link"> Visualizar </Button>
                <Button as={Col} variant="link"> Editar </Button>    
                <Button as={Col} variant="link"> Excluir </Button>        
            </Row>
          </Col>    

          <footer className="card-footer ">
            <p>Criado em 10/09/2019</p>
            <p>Última atualização 15/09/2019</p>
          </footer>
        </Card.Body>
      
      </Card>
      <br />

      <Card>
        <Card.Header as="h5">
          Trabalho de Extensão para a ONG EdiFreitas
        </Card.Header>

        <Card.Body className="card-body">    
          
          <Card.Img           
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkYn64tYtWf04OeSY2Wnapanr_BzXLNtUbukVcbzEP7Ox04wls" 
          />
          <Col>
            <Row>
              <Card.Subtitle className="card-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae, numquam, eaque alias aspernatur molestiae! Harum nulla dolorem inventore, eius ut pariatur.  
              </Card.Subtitle>
            </Row>
            <Row>      
                <Button as={Col} variant="link"> Visualizar </Button>
                <Button as={Col} variant="link"> Editar </Button>    
                <Button as={Col} variant="link"> Excluir </Button>        
            </Row>
          </Col>    

          <footer className="card-footer ">
            <p>Criado em 10/09/2019</p>
            <p>Última atualização 15/09/2019</p>
          </footer>
        </Card.Body>
      
      </Card>

      <Card>
        <Card.Header as="h5">
          Trabalho de Extensão para a ONG EdiFreitas
        </Card.Header>

        <Card.Body className="card-body">    
          
          <Card.Img           
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9ZMs6-RUMHVgbRhRwZh8KhRZizU55MwhREo75SwFNSthHbGWC" 
          />
          <Col>
            <Row>
              <Card.Subtitle className="card-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae, numquam, eaque alias aspernatur molestiae! Harum nulla dolorem inventore, eius ut pariatur.  
              </Card.Subtitle>
            </Row>
            <Row>      
                <Button as={Col} variant="link"> Visualizar </Button>
                <Button as={Col} variant="link"> Editar </Button>    
                <Button as={Col} variant="link"> Excluir </Button>        
            </Row>
          </Col>    

          <footer className="card-footer ">
            <p>Criado em 10/09/2019</p>
            <p>Última atualização 15/09/2019</p>
          </footer>
        </Card.Body>
      
      </Card>

      <Card>
        <Card.Header as="h5">
          Trabalho de Extensão para a ONG EdiFreitas
        </Card.Header>

        <Card.Body className="card-body">    
          
          <Card.Img           
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT0h6YYldvKZUH9MQu3WWhxpDGh9Uvu8mNafg-GGaQyvHcdK_ca" 
          />
          <Col>
            <Row>
              <Card.Subtitle className="card-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente minus id voluptatibus atque nam voluptatum illum temporibus repudiandae, numquam, eaque alias aspernatur molestiae! Harum nulla dolorem inventore, eius ut pariatur.  
              </Card.Subtitle>
            </Row>
            <Row>      
                <Button as={Col} variant="link"> Visualizar </Button>
                <Button as={Col} variant="link"> Editar </Button>    
                <Button as={Col} variant="link"> Excluir </Button>        
            </Row>
          </Col>    

          <footer className="card-footer ">
            <p>Criado em 10/09/2019</p>
            <p>Última atualização 15/09/2019</p>
          </footer>
        </Card.Body>
      
      </Card>

    </CardColumns>
    </>
  );
      
}




