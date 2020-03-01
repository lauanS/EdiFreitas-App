import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import MyNavbar from '../../../../components/Navbar/index';
// import Footer from '../../../../components/Footer/index';
import View from '../../../../components/Noticias/View'
import Loader from '../../../../components/Loader';
import {getNoticias} from '../../../../services'

import '../styles.scss';

export default function ViewNews(){
  const { id } = useParams();
  const [obj, setObj] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    async function load(){
      const response = await getNoticias();
      const objTemp = response.data.find(data => data.id === parseInt(id));
      setObj(objTemp);
      setIsLoading(false);
    }
    load();
  }, [id]);

  return (
    <>  
    <div>
      <div className="nav">
        <MyNavbar initActive={2}/>
      </div>
      <div className="pagNoticia">
      {isLoading ? 
      <>
        <Loader type="dots" />
      </>
      :
        <View obj={obj}/>
      }
      </div>      
      <div className="footer">
        {/* <Footer /> */}
      </div>
    </div>

    </>
  );
}