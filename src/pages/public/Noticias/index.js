import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
// import Footer from '../../../components/Footer/index';
import Feed from '../../../components/Noticias/Feed'
import './styles.scss';

export default function Noticia(){

  return (
    <div>
      <div className="nav">
        <MyNavbar initActive={2}/>
      </div>
      <div className="pagNoticia">
        <Feed />        
      </div>      
      <div className="footer">
        {/* <Footer /> */}
      </div>
    </div>
  );  
}
