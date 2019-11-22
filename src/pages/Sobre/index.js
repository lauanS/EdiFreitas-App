import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../../components/Navbar/index';
import Footer from '../../components/Footer/index'

export default class Sobre extends React.Component{
  render(){
    return (
      <div>
        <div>
          <MyNavbar initActive={4}/>
        </div>

        <div className="footer">
        <Footer />
        </div>
      </div>
    );
  }
}
