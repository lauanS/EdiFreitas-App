import React from 'react';
import { useParams } from "react-router-dom";

import MyNavbar from '../../../../components/Navbar/index';
import Footer from '../../../../components/Footer/index';
import '../styles.scss';

export default function View(){
  let { id } = useParams();
  return (
    <>  
    <div>
      <div className="nav">
        <MyNavbar initActive={2}/>
      </div>
      <div className="pagNoticia">
        <h1>ABRIU A NOTICIA {id}</h1>       
      </div>      
      <div className="footer">
        <Footer />
      </div>
    </div>

    </>
  );
}