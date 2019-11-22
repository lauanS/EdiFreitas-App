import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../../components/Navbar/index';
import Footer from '../../components/Footer/index';
import './styles.css';

export default class Noticia extends React.Component{
  render(){
    return (
      <div>
        <div className="nav">
          <MyNavbar initActive={2}/>
        </div>
        <br />
        <br />


        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}
