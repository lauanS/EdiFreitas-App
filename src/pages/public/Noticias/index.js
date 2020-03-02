import React from 'react';
import './styles.scss';

import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index';
import Feed from '../../../components/Noticias/Feed'

export default function Noticia(){
  return (
    <div className="noticias">
      <MyNavbar initActive={2}/>

      <main className="noticias__main">
        <Feed />
      </main>

      <Footer />
    </div>
  );  
}
