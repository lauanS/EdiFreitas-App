import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index'
import SectionTitle from '../../../components/SectionTitle/'

import LastestNews from '../../../components/LastestNews'
import LastestEvents from '../../../components/LastestEvents';

import './styles.scss';


export default function Inicio(){
  return (
    <div className="Home">
      <MyNavbar initActive={0}/>
      <main className="Home__main">
        <section className="Home__content">
        <div className="Home__header">
          <h4>Certamente não é a Galeria</h4>
        </div>

        <SectionTitle value={"Últimas notícias"}/>
        <div>
          <LastestNews className="Home__divCards" />
        </div>
        <SectionTitle value={"últimos eventos"}/>
        <div>
          <LastestEvents className="Home__divCards" />
        </div>

        

        </section>
      </main>
      
      <Footer />
    </div>
  );

}
