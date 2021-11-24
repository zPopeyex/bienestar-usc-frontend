import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import { auth } from "./database/Firebase";
import Error404 from "./pages/error404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Routes = () => {
  const [inicializando, setInicializando] = useState(true);
  const [usuario, setUsuario] = useState();

  const onAuthStateChanged = (usuario) => {
    setUsuario(usuario);

    if (inicializando) setInicializando(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (inicializando) return null;

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {!usuario ? (
          <>
            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} exact />
          </>
        ) : (
          <Route path="/" component={Home} exact />
        )}
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
