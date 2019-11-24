import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ongImg1 from '../../assets/ong_01.jpg';
import ongImg2 from '../../assets/ong_02.jpg';
import ongImg3 from '../../assets/ong_03.jpg';
import './styles.css';

export default class MyCarousel extends React.Component{
  render(){
    return (
          <Carousel className="carousel-small">
            <Carousel.Item >
              <img
                src={ongImg1}
                alt="First slide"
                className="carousel-img"
              />
              <Carousel.Caption className="background-opacity">
                <h3 className="text-border-light">Dia das crianças</h3>
                <p className="text-border-light"><b>Comemoração do dia das crianças na ONG EDI Freitas</b></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={ongImg2}
                alt="First slide"
                className="carousel-img"
              />
              <Carousel.Caption className="background-opacity">
                <h3 className="text-border-light">Olha o algodão doce!!</h3>
                <p className="text-border-light"><b>Muito açucar e alegria para a garotada!!</b></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={ongImg3}
                alt="First slide"
                className="carousel-img"
              />
              <Carousel.Caption className="background-opacity">
                <h3 className="text-border-light">The winter is coming!</h3>
                <p className="text-border-light"><b>O inverno está chegando e a EDI Freitas já garantiu lares quentinhos</b></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
    );
  }
}
