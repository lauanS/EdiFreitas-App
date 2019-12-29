import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardPessoa from './cardPessoa';
import './styles.scss';
import SweetAlert from 'react-bootstrap-sweetalert';
import {delPeople} from '../../services'
import photo from '../../assets/usuario.png';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#F8F9FA',
    border: '1px solid #30333C',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 1),
    '&:focus': { outline: 'none',},
    borderRadius: '5px',
    width: '40%',
    minWidth: '300px',
    display: 'block',
  },
  paper1: {
    backgroundColor: '#F8F9FA',
    border: '1px solid #30333C',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 1),
    '&:focus': { outline: 'none',},
    borderRadius: '5px',
    width: '250px',
    display: 'block',
  },
  
}));

export default function TransitionsModal(props) {
  const { dados, crianca} = props;

  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const idade = (niver) => {
    let ano_aniversario = + parseInt(niver.substring(0,4)),
      mes_aniversario = + parseInt(niver.substring(5,7)),
      dia_aniversario = + parseInt(niver.substring(8,10));

    let d = new Date(),
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),

      quantos_anos = ano_atual - ano_aniversario;

    if ((mes_atual < mes_aniversario) || (mes_atual === mes_aniversario && dia_atual < dia_aniversario)) {
      quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  }

  const nascimento = (data) => {
    let ano_aniversario = + parseInt(data.substring(0,4)),
      mes_aniversario = + parseInt(data.substring(5,7)),
      dia_aniversario = + parseInt(data.substring(8,10));
      
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril",	"Maio", "Junho", 	
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let dataBR = dia_aniversario + " de " + meses[mes_aniversario-1] + " de " + ano_aniversario;
    return dataBR;
  }

  const handleConfirm = e => {
    setTimeout(() => {
      delPeople(dados.id)
        .then(res => {
          console.log("ok");
          setShowAlert(false);
          setOpen(false);
        })
        .catch(() =>{
          setShowAlert(false);
          setOpen(false);
        });
    }, 2000);
  }

  const handleCancel = e => {
    setShowAlert(false);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeletar = () => {
    setShowAlert(true);
  };

  /* {
        "id": 1,
        "nome": "Carlos Teste da Silva",
        "dataNascimento": "2003-03-18",
        "cpf": "11111111111",
        "comentario": "Como assim? O responsavel é uma crianca?",
        "foto": "https://www.diariodepernambuco.com.br/static/app/noticia_127983242361/2016/09/01/663122/20160901220710185056e.jpg",
        "criancas": [],
        "contatos": [
            {
                "id": 1,
                "tipo": "email",
                "contato": "carlos.teste@gmail.com"
            }
        ],
        "endereco": {
            "logradouro": "Rua três",
            "bairro": "Itapemirim",
            "cidade": "Sorocaba",
            "cep": "18071536",
            "numero": "2"
        }
    }*/
  return (
    <>
      <CardPessoa change={handleOpen} foto={photo} cpf={dados.cpf} endereco={dados.endereco} nome={dados.nome} idade={idade(dados.dataNascimento)}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableEscapeKeyDown={showAlert}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="modalPessoa__header">
              <p className="modalPessoa__link" onClick={handleClose}>Fechar</p>
              <p className="modalPessoa__link" >Editar</p>
              <p className="modalPessoa__link-remover" onClick={handleOpenDeletar}>Deletar</p>
            </div>

            <img src={photo} alt="foto de perfil" className="modalPessoa__img"/>
            {crianca ?
            <div className="modalPessoa__info">
              <p>Idade: {} anos</p>
              <p>Nascimento: {}</p>
              <p>Número calçado: {}</p>
            </div>
            :
            <div className="modalPessoa__info">
              <h5 className="modalPessoa__title">{dados.nome}</h5>
              <p>Idade: {idade(dados.dataNascimento)} anos</p>
              <p>Nascimento: {nascimento(dados.dataNascimento)}</p>
            </div>
            }
            

            
          </div>
        </Fade>
      </Modal>

      <SweetAlert 
        title={"Deseja mesmo deletar todas as informações de " + dados.nome + " ?"} 
        show={showAlert} 
        type='warning' 
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        btnSize='sm' 
        confirmBtnText="Deletar"
        confirmBtnBsStyle="danger"
        cancelBtnText="Cancelar"
        cancelBtnBsStyle="secondary"
        showCancel={true}
        focusConfirmBtn={false}
        showCloseButton={true}
      />

    </>
  );
}