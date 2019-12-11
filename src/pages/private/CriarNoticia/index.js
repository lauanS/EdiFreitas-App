import React, {useState} from 'react';
import './styles.scss';
import { Form, Button } from 'react-bootstrap';
import Sidebar from '../../../components/Sidebar/index';
import TextEditor from '../../../components/EditorDeTexto/index'
import DadosNoticia from '../../../components/DadosNoticia/index'

export default function CriarNoticia(){
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = e => {
    console.log('Title: ', title);
    console.log('Subtitle: ', subtitle);
    console.log('Text: ', text);

    e.preventDefault();
    e.stopPropagation();
  }

  // Function that will be called by your child when he changed
  const handleChildChange = e => {
    setText(e.target.getContent());
    console.log('New text: ' + text);
  }


  return (
    <>
    <Sidebar titulo="Criar notícia" ativo={6} key={"sidebar"}/>
    <div className='newsContent'>
      <Form onSubmit={handleSubmit} >
        <DadosNoticia setTitle={setTitle} setSubtitle={setSubtitle} />
        <div className='newsEditor'>
          <TextEditor handleChange={handleChildChange}/>   
        </div>

        <Button type="submit" block>Cadastrar</Button>

      </Form>

    </div>

    </>
  );
    

}
