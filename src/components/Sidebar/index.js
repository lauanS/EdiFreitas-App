import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      display: 'block',
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container, titulo, ativo } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider className="divider-list"/>
      <List>
        <h6 className="list-titulo">Pessoas</h6>  
        {['Cadastrar pessoa', 'Consultar pessoas'].map((text, index) => (
          <ListItem button className="list-item">
          <span className={index === ativo ? "active-item" : "item"}>{text}</span>
          </ListItem>
        ))}
      </List>
      <Divider className="divider-list"/>
      
      <List>
        <h6 className="list-titulo">Eventos</h6>  
        {['Criar evento', 'Consultar eventos', 'Controle de presença'].map((text, index) => (
          <ListItem button className="list-item">
          <span className={index+2 === ativo ? "active-item" : "item"}>{text}</span>
          </ListItem>
        ))}
      </List>
      <Divider className="divider-list"/>

      <List>
        <h6 className="list-titulo">Notícias</h6>  
        {['Criar notícia', 'Consultar notícias'].map((text, index) => (
          <ListItem button className="list-item">
          <span className={index+5 === ativo ? "active-item" : "item"}>{text}</span>
          </ListItem>
        ))}
      </List>
      <Divider className="divider-list"/>

      <List>
        <h6 className="list-titulo">Galeria</h6>  
        {['Adicionar fotos', 'Consultar galeria'].map((text, index) => (
          <ListItem button className="list-item">
          <span className={index+7 === ativo ? "active-item" : "item"}>{text}</span>
          </ListItem>
        ))}
      </List>
      <Divider className="divider-list"/>
    </div>
  );
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>{titulo}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
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
        <Hidden xsDown implementation="css">
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
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;