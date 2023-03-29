import { Link } from "react-router-dom";
import { useState } from "react";
import * as API from "../../conexiones/conexion"
import "../login/registro.css"
import 'bootstrap/dist/css/bootstrap.min.css'

export function Registro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [apellido_nombre, setApellido_nombre] = useState("");
  const [mensajeSuccess, setmensajeSuccess] = useState("");
  const [mensajeError, setmensajeError] = useState("");

  const registroForm = async (event) => {
    event.preventDefault();
    const user = await API.Registro({
      username,
      password,
      email,
      apellido_nombre,
    });
    if (user.status) {
      setmensajeSuccess(user.mensaje);
      setTimeout(() => {
        setmensajeSuccess("");
        window.location.href("/");
      }, 2000);
    } else {
      setmensajeError(user.mensaje);
      setTimeout(() => {
        setmensajeError("");
        window.location.reload(false);
      }, 2000);

    }
  };
  <Link rel="stylesheet" href="style.css" />
  return (
    <section>
      <div className="">
        {
          mensajeError ?
            <div className="alert alert-warning" role="alert">
              {mensajeError}
            </div> : ''
        }
        {
          mensajeSuccess ?
            <div className="alert alert-success" role="alert">
              {mensajeSuccess}
            </div> : ''
        }
        <div className="form">
          <div className="card-body">
            <div className="form-box">
              <div className="form-value">
                <form action="" />
                <h2>CREAR USUARIO</h2>
                <div className="imput-box">
                  <form id="quote-process-form" data-hs-cf-bound="true"></form>
                  <form onSubmit={registroForm}>


                    <div className="inputbox">


                      <input
                        required="required"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                      <label for="">Nombre Usuario</label>
                      <small id="helpId" className="text-muted"></small>
                    </div>

                    <div className="inputbox">

                      <input
                        required
                        type="password"
                        value={password}

                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <label for="">Password</label>
                      <small id="helpId" className="text-muted"></small>
                    </div>



                    <div className="inputbox">
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <label for="">Email</label>
                      <small id="helpId" className="text-muted"></small>
                    </div>

                    <div className="inputbox">

                      <input
                        required
                        type="text"
                        value={apellido_nombre}

                        onChange={(event) => setApellido_nombre(event.target.value)}
                      />
                      <label for="">Apellido y Nombre</label>
                      <small id="helpId" className="text-muted"></small>
                    </div>


                    <button type="submit" className="btn2" >
                      Guardar
                    </button>


                    <Link to={"/"}>
                      <button className="Btn" >
                        Volver
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}