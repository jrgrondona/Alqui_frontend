import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as API from '../../conexiones/conexion'

export function AgregarInquilino() {
  const nombre_inquilino = useRef();
  const numero_telefono_inquilino = useRef();
  const fecha_inicio_inquilino = useRef();
  const [mensajeSuccess, setmensajeSuccess] = useState("");
  const [mensajeError, setmensajeError] = useState("");

  const guardar_inquilino = async () => {
    const nombre = nombre_inquilino.current.value;
    const numero_telefono = numero_telefono_inquilino.current.value;
    const fecha_inicio = fecha_inicio_inquilino.current.value;
    console.log('Datos ingresados son: ', nombre, numero_telefono, fecha_inicio)

    if (nombre_inquilino.current.value === "" ||
    numero_telefono_inquilino.current.value === "" ||
    fecha_inicio_inquilino.current.value === "") {
        swal.fire( {
          icon: 'error',
          title: "Por favor complete todos los campos requeridos",
          showConfirmButton: false,
          timer: 5000
        })
      return;
    }
    const datos_enviar = {
      nombre: nombre,
      numero_telefono: numero_telefono,
      fecha_inicio: fecha_inicio,
    };
    const user = await API.SaveInquilino(datos_enviar);
    if (user.status) {
    setmensajeSuccess(user.mensaje);
      setTimeout(() => {
        setmensajeSuccess("");
        window.location.reload(true);
      }, 5000);
    } else {
      setmensajeError(user.mensaje);
      setTimeout(() => {
        setmensajeError("");
        window.location.reload(false);
      }, 5000);

    }
  }
  return (
    <div className="card">
      {
        mensajeError ?
          <div className="alert alert-danger" role="alert">
            {mensajeError}
          </div> : ''
      }
      {
        mensajeSuccess ?
          <div className="alert alert-success" role="alert">
            {mensajeSuccess}
          </div> : ''
      }
      <div className="card-header">
        Nuevo 
      </div>
      <form className="card-body">
        <div className="form-group">
          <label htmlFor="">Nombre</label>
          <input type="text" ref={nombre_inquilino} name="" id="" className="form-control" placeholder="" aria-describedby="helpId" required />
          <small id="helpId" className="text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="">TELEFONO</label>
          <input type="text" ref={numero_telefono_inquilino} name="" id="" className="form-control" placeholder="" aria-describedby="helpId" required />
          <small id="helpId" className="text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="">FECHA INICIO</label>
          <input type="date" ref={fecha_inicio_inquilino} name="" id="" className="form-control" placeholder="" aria-describedby="helpId" required />
          <small id="helpId" className="text-muted"></small>
        </div>
        <div className="card-body">
          <button onClick={guardar_inquilino} type="button" className="btn btn-primary">Guardar</button>
          <Link to={'/inquilinos'}><button type="button" className="btn btn-secondary">Volver</button></Link>
        </div>
      </form>
    </div>
  )
}