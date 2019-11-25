import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index'
import MyCarousel from '../../../components/MyCarrousel/index';
import './styles.css';

export default class Inicio extends React.Component{
  render(){
    return (
      <div>
        <div className="nav">
          <MyNavbar initActive={0}/>
        </div>

        <br />
        <br />

        <div className="carousel">
          <MyCarousel />
        </div>

        <br/>

        <div>
          <Footer />
        </div>
        
      </div>
    );
  }
}
