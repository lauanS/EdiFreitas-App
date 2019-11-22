import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Login from '../../components/Login/index';

export default class LoginAdmin extends React.Component{
    render(){
        return (
          <div className="a">
              <Login/>
          </div>
        );
      }

}
