import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index'
import './styles.css';

export default class Eventos extends React.Component{
  render(){
    return (
      <div>
        <div className="nav">
          <MyNavbar initActive={1}/>
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
