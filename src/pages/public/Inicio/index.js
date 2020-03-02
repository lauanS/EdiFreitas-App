import React from 'react';
import './styles.scss';

import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index';
import SectionTitle from '../../../components/SectionTitle/';
import Carousel from '../../../components/MyCarrousel';
import LastestNews from '../../../components/LastestNews';
import LastestEvents from '../../../components/LastestEvents';
import GaleriaHome from '../../../components/GaleriaHome';


export default function Inicio(){
  return (
    <div className="Home">
      <MyNavbar initActive={0}/>
      <main className="Home__main">
        <section className="Home__content">
          <Carousel />
          <div className="Home__contentPadding">
            <SectionTitle value={"Últimas notícias"}/>
            <div>
              <LastestNews />
            </div>
            <SectionTitle value={"Próximos eventos"}/>
            <div>
              <LastestEvents />
            </div>
            <SectionTitle value={"Últimos álbuns"}/>
            <div>
              <GaleriaHome />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );

}
