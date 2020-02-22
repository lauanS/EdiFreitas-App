import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import MyNavbar from '../../../../components/Navbar/index';
// import Footer from '../../../../components/Footer/index';
import View from '../../../../components/Noticias/View'

import {getNoticias} from '../../../../services'

import '../styles.scss';

export default function ViewNews(){
  const { id } = useParams();
  const [obj, setObj] = useState();

  useEffect( () => {
    async function load(){
      const response = await getNoticias();
      const objTemp = response.data.find(data => data.id === parseInt(id));
      setObj(objTemp);
    }
    load();
  }, [id]);

  console.log(obj);
  return (
    <>  
    <div>
      <div className="nav">
        <MyNavbar initActive={2}/>
      </div>
      <div className="pagNoticia">
        <View obj={obj}/>
      </div>      
      <div className="footer">
        {/* <Footer /> */}
      </div>
    </div>

    </>
  );
}