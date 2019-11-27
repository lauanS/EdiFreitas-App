import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardPessoa from './cardPessoa';
import './styles.scss';


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
  const { photo, name, idade, dtNasc, crianca, numCalcado } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDeletar, setOpenDeletar] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeletar = () => {
    setOpenDeletar(true);
  };

  const handleCloseDeletar = () => {
    setOpenDeletar(false);
  };

  const handleCloseAll = () => {
    setOpenDeletar(false);
    setOpen(false);
  };

  return (
    <>
      <CardPessoa change={handleOpen} photo={photo} name={name} idade={idade}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
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

            <h5 className="modalPessoa__title">{name}</h5>

            <img src={photo} alt="foto de perfil" className="modalPessoa__img"/>
            {crianca ?
            <div className="modalPessoa__info">
              <p>Idade: {idade} anos</p>
              <p>Nascimento: {dtNasc}</p>
              <p>Número calçado: {numCalcado}</p>
            </div>
            :
            <div className="modalPessoa__info">
              <p>Idade: {idade} anos</p>
              <p>Nascimento: {dtNasc}</p>
            </div>
            }
            

            
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDeletar}
        onClose={handleCloseDeletar}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeletar}>
          <div className={classes.paper1}>
            <p>Deseja mesmo deletar todas as informações de {name}?</p>
            <div className="modalPessoa__header">
              <button className="modalPessoa__buttonCancelar" onClick={handleCloseDeletar}>Cancelar</button>
              <button className="modalPessoa__buttonDeletar" onClick={handleCloseAll}>Deletar</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}