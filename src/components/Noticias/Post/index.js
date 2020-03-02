import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import logo from "../../../assets/ong_logo.jpg";
import { desconverterDataFormatISO } from "../../../assist";
import './styles.scss';

export default function Post(props){
  const {news, action} = props;

  const handleClick = () => {
    action(news);
  }

  return (
    <>  
    <Card className="NoticiaPost-card" onClick={handleClick}>
      <CardHeader 
        title={news.titulo}  
        subheader={desconverterDataFormatISO(news.data)}
      />
      <div className="NoticiaPost-content">
        <div>
          <img src={news.foto? news.foto : logo} alt="some text" className="NoticiaPost-img" />
        </div>  
        <div className="NoticiaPost-item">
          <CardContent>
            <p>{news.descricao}</p>
            <p className="NoticiaPost-tag">{news.tag}</p>
          </CardContent>
        </div>      


      </div>
    </Card>
    </>
  );
}