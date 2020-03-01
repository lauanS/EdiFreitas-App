import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRouter/index';
import RestrictedRoute from './components/RestrictedRouter/index';

import Sobre from "./pages/public/Sobre/index";
import Inicio from "./pages/public/Inicio/index";
import Contato from "./pages/public/Contato/index";
import Eventos from "./pages/public/Eventos/index";
import Galeria from "./pages/public/Galeria/index";
import Noticias from "./pages/public/Noticias/index";
import ViewNews from "./pages/public/Noticias/View/index";
import ViewPhotos from "./pages/public/Galeria/View/index";
import ViewEvents from "./pages/public/Eventos/View/index";

import LoginAdmin from "./pages/private/LoginAdmin/index";
import Administrar from "./pages/private/Administrar/index";
import CadastrarCrianca from "./pages/private/CadastrarCrianca/index";
import CadastrarResponsavel from "./pages/private/CadastrarResponsavel/index";
import ConsultarPessoas from "./pages/private/ConsultarPessoas/index";
import ConsultarEventos from "./pages/private/ConsultarEventos/index";
import CriarEvento from "./pages/private/CriarEvento/index";
import ControlePresenca from "./pages/private/ControlePresenca/index";
import CriarNoticia from "./pages/private/CriarNoticia/index";
import ConsultarNoticias from "./pages/private/ConsultarNoticias/index";
import AdicionarFotos from "./pages/private/AdicionarFotos/index";
import ConsultarGaleria from "./pages/private/ConsultarGaleria/index";
import CadastrarAdministrador from "./pages/private/CadastrarAdministrador";
import ExportarDados from "./pages/private/ExportarDados";

const Routes = () => (
  <BrowserRouter key={"browserRouter"}>
    <Switch key={"SwitcherRouter"}>
      <Route key={"pub1"} exact path="/" component={Inicio} />
      <Route key={"pub2"} exact path="/sobre" component={Sobre} />
      <Route key={"pub3"} exact path="/fale-conosco" component={Contato} />
      <Route key={"pub4"} exact path="/eventos" component={Eventos} />
      <Route key={"pub5"} exact path="/galeria" component={Galeria} />
      <Route key={"pub6"} exact path="/noticias" component={Noticias} />
      <Route key={"pub7"} exact path="/noticias/view/:id" component={ViewNews} />
      <Route key={"pub8"} exact path="/galeria/:id" component={ViewPhotos} />
      <Route key={"pub9"} exact path="/eventos/:id" component={ViewEvents} />

      <RestrictedRoute key={"res1"} exact path="/login" component={LoginAdmin} />

      <PrivateRoute key={"pri1"} exact path="/admin" component={Administrar} />
      <PrivateRoute key={"pri2"} exact path="/cadastrarResponsavel" component={CadastrarResponsavel} />
      <PrivateRoute key={"pri3"} exact path="/cadastrarCriança" component={CadastrarCrianca} />
      <PrivateRoute key={"pri4"} exact path="/consultarPessoas" component={ConsultarPessoas} />
      <PrivateRoute key={"pri5"} exact path="/cadastrarEvento" component={CriarEvento} />
      <PrivateRoute key={"pri6"} exact path="/consultarEventos" component={ConsultarEventos} />
      <PrivateRoute key={"pri7"} exact path="/controlePresenca" component={ControlePresenca} />
      <PrivateRoute key={"pri8"} exact path="/cadastrarNoticia" component={CriarNoticia} />
      <PrivateRoute key={"pri9"} exact path="/consultarNoticias" component={ConsultarNoticias} />
      <PrivateRoute key={"pri10"} exact path="/cadastrarAlbum" component={AdicionarFotos} />
      <PrivateRoute key={"pri11"} exact path="/consultarGaleria" component={ConsultarGaleria} />
      <PrivateRoute key={"pri12"} exact path="/cadastrarLogin" component={CadastrarAdministrador} />
      <PrivateRoute key={"pri13"} exact path="/exportarDados" component={ExportarDados} />

      <Route key={"RDefault"} path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
