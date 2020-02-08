import React from 'react';
import './styles.scss';

import {Form, Row, Col} from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  root: {
    padding: '5px!important',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function CamposPessoa(props){
  const { nome, onChangeNome, valNome, invNome, data, onChangeData, valData, invData, sexo, onChangeSexo } = props;

  return (
    <>
    <Form.Group as={Row} controlId="formGroupName">
      <Form.Label column sm={2} className="CampoPessoa__label">
        Nome completo *
      </Form.Label>
      <Col sm={8} className="CampoPessoa__inputText">
        <Form.Control 
          required 
          type="text" 
          placeholder="Ex: Leonardo dos Santos Sampaio" 
          onChange={e => onChangeNome(e.target)}
          value={nome}
          isValid={valNome}
          isInvalid={invNome}
          />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório, preencha o nome completo (Apenas letras).
        </Form.Control.Feedback>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formGroupDate">
      <Form.Label column sm={2} className="CampoPessoa__label">
        Data de nascimento *
      </Form.Label>
      <Col sm={8} className="CampoPessoa__inputText">
        <Form.Control 
          className="CampoPessoa__inputNumber"
          required 
          type="text" 
          placeholder="dd/MM/aaaa" 
          onChange={e => onChangeData(e.target)}
          value={data}
          isValid={valData}
          isInvalid={invData}
        />
        <Form.Control.Feedback type="invalid">
          Campo obrigatório, preencha uma data de nascimento válida (Apenas números)
        </Form.Control.Feedback>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formGroupDate">
      <Form.Label column sm={2} className="CampoPessoa__label">
        Sexo *
      </Form.Label>
      <Col sm={8} className="CampoPessoa__inputText" >
        <RadioGroup className="CampoPessoa__inputSexo" defaultValue={sexo} name="customized-radios" onChange={onChangeSexo}>
          <FormControlLabel className="label-radio" value="M" control={<StyledRadio />} label="Masculino" />
          <FormControlLabel className="label-radio" value="F" control={<StyledRadio />} label="Feminino" />
        </RadioGroup>
      </Col>
    </Form.Group>
    
    </>
  );
}
