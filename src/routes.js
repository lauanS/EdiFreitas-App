import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sobre from "./pages/Sobre/index";
import Inicio from "./pages/Inicio/index";
import Contato from "./pages/Contato/index";
import Eventos from "./pages/Eventos/index";
import Galeria from "./pages/Galeria/index";
import Noticias from "./pages/Noticias/index";
import LoginAdmin from "./pages/LoginAdmin/index";
import Administrar from "./pages/Administrar/index";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Inicio} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/contato" component={Contato} />
      <Route path="/eventos" component={Eventos} />
      <Route path="/galeria" component={Galeria} />
      <Route path="/noticias" component={Noticias} />
      <Route path="/login" component={LoginAdmin} />
      <Route path="/admin" component={Administrar} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
