import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default class MyCarousel extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            path_imgs: ["/home/moura/law/gitRep/Atividade-ERUS---UFSCar/app/src/assets/ong_01.jpg",
                "/home/moura/law/gitRep/Atividade-ERUS---UFSCar/app/src/assets/ong_02.jpg",
                "/home/moura/law/gitRep/Atividade-ERUS---UFSCar/app/src/assets/ong_03.jpg"
            ]
        };
      }

    render(){
        return (
            <div class="row">
              <div class="col-xs-6">
                <Carousel>
                  <Carousel.Item>
                    <img
                      width={900}
                      height={500}
                      alt="900x500"
                      src={require(this.state.path_imgs[0])}
                    />
                    <Carousel.Caption>
                      <h3>First slide label.</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/src/assets/ONG_02.jpg"
                      alt="Second slide"
                    />
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="/src/assets/ONG_03.jpg"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>

                </Carousel>
              </div>
            </div>
        );
    }
}
