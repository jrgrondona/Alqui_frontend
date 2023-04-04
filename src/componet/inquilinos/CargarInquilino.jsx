import { useRef, useState } from 'react';
import * as API from '../../conexiones/conexion';
import '../login/registro.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function AgregarInquilino({ show, handleClose }) {
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
      setmensajeError("Por favor complete todos los campos requeridos");
      setTimeout(() => {
        setmensajeError("");
        handleClose();
        window.location.reload(false);
      }, 3000);
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
        handleClose();
        window.location.reload(true);
      }, 3000);
    } else {
      setmensajeError(user.mensaje);
      setTimeout(() => {
        setmensajeError("");
        handleClose();
        window.location.reload(false);
      }, 3000);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cargar de datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
          {mensajeSuccess && <div className="alert alert-success" role="alert">{mensajeSuccess}</div>}
          <Form>
            <Form.Group controlId="nombreInquilino">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" ref={nombre_inquilino} placeholder="" required />
            </Form.Group>

            <Form.Group controlId="telefonoInquilino">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" ref={numero_telefono_inquilino} placeholder="" required />
            </Form.Group>

            <Form.Group controlId="fechaInicioInquilino">
              <Form.Label>Fecha inicio</Form.Label>
              <Form.Control type="date" ref={fecha_inicio_inquilino} placeholder="" required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={guardar_inquilino}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
