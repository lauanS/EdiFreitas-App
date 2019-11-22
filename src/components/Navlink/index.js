import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

export default class Navlink extends React.Component{
    render(){
        let className;
        if (this.props.isActive) {
            className = ' link-active';
        }
        else{
            className = ' link';
        }
        return <Link className={className} to={this.props.link}>{this.props.value}</Link>
            
    }
}
