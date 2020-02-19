import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import logo from "../../../assets/ong_logo.jpg";
import '../styles.scss';

export default function Post(props){
  const {news} = props;
  return (
    <>  
    <Card className="Noticia-card">
      <CardHeader 
        title={news.titulo}  
        subheader="September 14, 2016"
      />
      <div className="Noticia-content">
        <div>
          <img src={logo} alt="some text" width={120} height={120}/>
        </div>  
        <div className="Noticia-item">
          <CardContent>
            <p>{news.descricao}</p>
            <p>{news.tag}</p>
          </CardContent>
        </div>      


      </div>
    </Card>
    </>
  );
}