import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import logo from "../../../assets/ong_logo.jpg";
import { desconverterData } from "../../../assist";
import '../styles.scss';

export default function Post(props){
  const {news} = props;
  return (
    <>  
    <Card className="Noticia-card">
      <CardHeader 
        title={news.titulo}  
        subheader={desconverterData(news.data)}
      />
      <div className="Noticia-content">
        <div>
          <img src={logo} alt="some text" className="Noticia-img" />
        </div>  
        <div className="Noticia-item">
          <CardContent>
            <p>{news.descricao}</p>
            <p className="Noticia-tag">{news.tag}</p>
          </CardContent>
        </div>      


      </div>
    </Card>
    </>
  );
}