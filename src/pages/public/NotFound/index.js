import React from 'react';
import "./styles.scss"

import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export default function NotFound(){

  return (
    <div className="notFound">
      <MyNavbar initActive={-1}/>
      <main className="notFound__main">

        <SentimentVeryDissatisfiedIcon style={{fontSize: '35px'}}/>
        <h3>404 - Página não encontrada</h3>

      </main>
      <Footer />      
    </div>
  );

}