import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Panel() {
  const [usuario, setUsuario] = useState("");
  const logout = async (event) => {
    setUsuario("");
    window.localStorage.removeItem("usuario");
    window.location.reload(true);
    window.location.assign("/");
  };
  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioLogueado) {
      console.log(usuarioLogueado.datos[0].apellido_nombre);
      setUsuario(usuarioLogueado.datos[0].apellido_nombre);
      console.log("usuario logueado", usuarioLogueado);
    }
  }, []);
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand">
          <Link className="nav-link" to={"/"}>
            Alquileres
          </Link>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to={"/"}>
                Inicio
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/inquilinos"}>
                Listado de Inquilinos
              </Link>
            </li>
          </ul>
        </div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="" href="#">
              {" "}
              Hola, {usuario}
            </a>
          </li>
          &nbsp;
          &nbsp;
          <li className="nav-item active">
            <button
              type="button"
              onClick={logout}
              className="btn btn-outline-danger"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
      <div className="content" style={{ paddingTop: "50px" }}>
      </div>
    </div>
  );
}