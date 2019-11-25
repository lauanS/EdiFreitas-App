import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index'
import './styles.css';

export default class Galeria extends React.Component{
  render(){
    return (
      <div>
        <div className="nav">
          <MyNavbar initActive={3}/>
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
