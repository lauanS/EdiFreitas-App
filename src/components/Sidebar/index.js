import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';
import { Link , Redirect} from 'react-router-dom'

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import NewsIcon from '@material-ui/icons/ImportContacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import {logout} from '../../services/auth';

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: '26px 50px',
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      padding: '26px 15px',
    }
  },
}));

function ResponsiveDrawer(props) {
  const { container, titulo, ativo, children } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [toRedirect, setToRedirect] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExit = () => {
    logout();
    setToRedirect(true);
  };

  var arrayLink = ['/cadastrarResponsavel',
                  '/cadastrarCriança',
                  '/consultarPessoas',
                  '/cadastrarEvento',
                  '/consultarEventos',
                  '/controlePresenca',
                  '/cadastrarNoticia',
                  '/consultarNoticias',
                  '/cadastrarAlbum',
                  '/consultarGaleria',
                  '/cadastrarLogin',
                  '/exportarDados'
                ];

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Divider className="sidebar__divider" key={"d1"}/>

      <List key={"list1"}>
        <div className="sidebar__sectionDiv">
          <PeopleIcon className="sidebar__icons"/>
          <h6 className="sidebar__sectionTitulo">Pessoas</h6>  
        </div>
        {['Cadastrar responsável', 'Cadastrar criança', 'Consultar pessoas'].map((text, index) => (
          <Link key={text} to={arrayLink[index]} className={index === ativo ? "sidebar__activeItem" : "sidebar__item"}>{text}</Link>
        ))}
      </List>

      <Divider className="sidebar__divider" key={"d2"}/>
          
      <List key={"list2"}>
        <div className="sidebar__sectionDiv">
          <EventIcon className="sidebar__icons"/>
          <h6 className="sidebar__sectionTitulo">Eventos</h6>  
        </div>
        {['Cadastrar evento', 'Consultar eventos', 'Controle de presença'].map((text, index) => (
          <Link key={text} to={arrayLink[index+3]} className={index+3 === ativo ? "sidebar__activeItem" : "sidebar__item"}>{text}</Link>
        ))}
      </List>

      <Divider className="sidebar__divider" key={"d3"}/>

      <List key={"list3"}>
        <div className="sidebar__sectionDiv">
          <NewsIcon className="sidebar__icons"/>
          <h6 className="sidebar__sectionTitulo">Notícias</h6>  
        </div>
        {['Cadastrar notícia', 'Consultar notícias'].map((text, index) => (
          <Link key={text} to={arrayLink[index+6]} className={index+6 === ativo ? "sidebar__activeItem" : "sidebar__item"}>{text}</Link>
        ))}
      </List>

      <Divider className="sidebar__divider" key={"d4"}/>

      <List key={"list4"}>
        <div className="sidebar__sectionDiv">
          <PhotoLibraryIcon className="sidebar__icons"/> 
          <h6 className="sidebar__sectionTitulo">Galeria</h6>
        </div>
        {['Cadastrar álbum', 'Consultar galeria'].map((text, index) => (
          <Link key={text} to={arrayLink[index+8]} className={index+8 === ativo ? "sidebar__activeItem" : "sidebar__item"}>{text}</Link>
        ))}
      </List>

      <Divider className="sidebar__divider" key={"d5"}/>

      <List key={"list5"}>
        <div className="sidebar__sectionDiv">
          <SettingsIcon className="sidebar__icons"/> 
          <h6 className="sidebar__sectionTitulo">Administrar</h6>
        </div>
        {['Cadastrar login', 'Exportar dados'].map((text, index) => (
          <Link key={text} to={arrayLink[index+10]} className={index+10 === ativo ? "sidebar__activeItem" : "sidebar__item"}>{text}</Link>
        ))}
      </List>

      <Divider className="sidebar__divider" key={"d6"}/>

      <button onClick={handleExit} className="sidebar__exit"><ExitToAppIcon className="sidebar__iconExit"/>Sair</button>

      <Divider className="sidebar__divider" key={"d7"}/>

    </>
  );
  
  return (
    <>
    {toRedirect ? <Redirect to="/"/> : null }
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>{titulo} </Typography>
        </Toolbar>
      </AppBar>
      <nav className="drawerNav" aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor= 'left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;