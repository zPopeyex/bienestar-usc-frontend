import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../database/Firebase";
import GoogleButton from "react-google-button";
import Logo from "../resources/logo.png";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    history.push("/");
    await auth.signInWithEmailAndPassword(email, password);
  };

  const iniciarGoogle = () => {
    history.push("/");
    auth.signInWithPopup(googleProvider);
  };

  return (
    <>
      <div className="container w-25 mt-5 card">
        <form onSubmit={iniciarSesion} className="card-body m-3">
          <div className="mb-3 row">
            <div className="mb-3">
              <label for="email" className="form-label">
                Dirección de correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@usc.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="mb-3">
              <label for="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <p>
            ¿No tienes una cuenta?{" "}
            <Link className="fst-italic" to="register">
              Registrate
            </Link>
          </p>

          <div className="d-flex flex-row justify-content-around mt-5">
            <button type="submit" className="btn btn-primary">
              Iniciar sesión
            </button>

            <GoogleButton style={{}} onClick={iniciarGoogle} />
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <img src={Logo} />
      </div>
    </>
  );
};

export default Login;
