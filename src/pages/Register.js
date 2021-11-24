import React, { useState } from "react";
import Swal from "sweetalert2";
import { auth, googleProvider } from "../database/Firebase";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationPassword, setValidationPassword] = useState("");

  const registrarse = async (e) => {
    e.preventDefault();

    if (password === validationPassword) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        Swal.fire("El correo está siendo usado por otra cuenta.");
      }
    } else {
      Swal.fire("HOLI");
    }
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className="container w-25 mt-5 card">
        <div
          className="d-flex align-items-center mt-3"
          style={{ cursor: "pointer" }}
          onClick={goBack}
        >
          <i className="large material-icons">arrow_back</i>
          <div className="mx-1">Regresar</div>
        </div>
        <form onSubmit={registrarse} className="card-body m-3">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="mb-3">
              <label for="password" className="form-label">
                Verificar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={validationPassword}
                onChange={(e) => setValidationPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Registrate
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
