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

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Inicio} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/contato" component={Contato} />
      <Route path="/eventos" component={Eventos} />
      <Route path="/galeria" component={Galeria} />
      <Route path="/noticias" component={Noticias} />

      <RestrictedRoute exact path="/login" component={LoginAdmin} />

      <PrivateRoute exact path="/admin" component={Administrar} />
      <PrivateRoute exact path="/cadastrarResponsavel" component={CadastrarResponsavel} />
      <PrivateRoute exact path="/cadastrarCriança" component={CadastrarCrianca} />
      <PrivateRoute exact path="/consultarPessoas" component={ConsultarPessoas} />
      <PrivateRoute exact path="/criarEvento" component={CriarEvento} />
      <PrivateRoute exact path="/consultarEventos" component={ConsultarEventos} />
      <PrivateRoute exact path="/controlePresenca" component={ControlePresenca} />
      <PrivateRoute exact path="/criarNoticia" component={CriarNoticia} />
      <PrivateRoute exact path="/consultarNoticias" component={ConsultarNoticias} />
      <PrivateRoute exact path="/adicionarFotos" component={AdicionarFotos} />
      <PrivateRoute exact path="/consultarGaleria" component={ConsultarGaleria} />           ,

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
