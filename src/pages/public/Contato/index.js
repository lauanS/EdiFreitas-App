import React from 'react';
import MyNavbar from '../../../components/Navbar/index';
import Footer from '../../../components/Footer/index';
import ContatoEmail from '../../../components/ContatoEmail/index'
import ContatoOng from '../../../components/ContatoOng/index'
import './styles.css';

export default class Contato extends React.Component{
  render(){
    return (
      <div>
        <div className="nav">
          <MyNavbar initActive={5}/>
        </div>
        <br />
        <br />


        <div className="row">
          <div className="col-12 col-sm-4">
            <ContatoOng/>
          </div>
          <div className="col-12 col-sm-8">
            <ContatoEmail/>
          </div>
        </div>  


        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}
