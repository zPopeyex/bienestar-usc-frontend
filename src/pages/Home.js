import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../database/Firebase";
import Placeholder from "../resources/profile.png";

const Home = ({ history }) => {
  const [materias, setMaterias] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/matriculas/" + auth.currentUser.uid
      );

      const data = res.data;

      setMatriculas(data.result);
      console.log(data.result);
    } catch (error) {
      Swal.fire("Error en servidor - " + error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/materias");
        const data = res.data;

        setMaterias(data);
      } catch (error) {
        Swal.fire("Error en servidor - " + error);
      }

      fetchData();
    })();
  }, []);

  const cerrarSesion = async () => {
    history.push("/");
    auth.signOut();
  };

  const matricularMateria = async (idMateria) => {
    const swalRes = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a matricular esta materia...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Matricularme",
      cancelButtonText: "Cancelar",
    });

    if (swalRes.isConfirmed) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/matriculas", {
          id_usuario: auth.currentUser.uid,
          id_materia: idMateria,
          fecha: new Date(),
        });

        const data = res.data;

        if (data.status === "OK") {
          await Swal.fire({
            icon: "success",
            title: "Has matriculado la materia",
            showConfirmButton: false,
            timer: 1000,
          });

          fetchData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo pasó!",
          });
        }

        console.log(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Algo pasó!",
          footer: error,
        });
        console.log(error);
      }
    }
  };

  const eliminarMateria = async (idMateria) => {
    const swalRes = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas a eliminar esta materia...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (swalRes.isConfirmed) {
      try {
        const res = await axios.delete(
          "http://127.0.0.1:8000/api/matriculas/" + idMateria,
          {
            data: { id_usuario: auth.currentUser.uid, id_materia: idMateria },
          }
        );

        const data = res.data;

        if (data.status === "OK") {
          await Swal.fire({
            icon: "success",
            title: "Has eliminado la materia.",
            showConfirmButton: false,
            timer: 1000,
          });

          fetchData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo pasó, no pudimos eliminar la materia seleccionada!",
          });
        }

        console.log(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Algo pasó!",
          footer: error,
        });
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-9 d-flex flex-column justify-content-center">
          <h1 className="d-flex justify-content-sm-center">
            Lista de materias
          </h1>
          {materias.map((materia, key) => (
            <div className="card w-75 mx-auto mb-4" key={key}>
              <div className="card-body">
                <h5 className="card-title">{materia.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <b>Profesor:</b> {materia.profesor} - <b>Salón:</b>{" "}
                  {materia.salon}
                </h6>
                <p className="card-text">{materia.descripcion}</p>
                <div
                  className="card-link text-decoration-underline fst-italic"
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => matricularMateria(materia.id)}
                >
                  Inscribirse
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-3 border-start d-flex flex-column">
          <h4 className="text-center mt-4">{auth.currentUser.email}</h4>
          <img
            className="img-thumbnail rounded-circle w-25 mx-auto d-block"
            src={auth.currentUser.photoURL ?? Placeholder}
          />
          <hr className="mt-5" />
          <button
            type="button"
            className="btn btn-danger mx-5 mb-5"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
          <div className="d-flex justify-content-center align-items-center h4">
            Mis materias (Maximo 3)
          </div>
          {matriculas.map((item, key) => {
            return (
              <div
                key={key}
                className="d-flex w-100 justify-content-between align-items-center px-3 py-1"
              >
                <div className="text-nowrapd-flex w-50 justify-content-between align-items-center px-3 py-1 ">
                  {"Materia: " + item[0].nombre}
                </div>

                <div className="d-flex w-50  px-3 py-3">
                  {"Profesor: " + item[0].profesor}
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    eliminarMateria(item[0].id);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
