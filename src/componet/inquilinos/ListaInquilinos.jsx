import React, { useState, useEffect } from "react";
import * as API from "../../conexiones/conexion";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css';
import 'styled-components'
import DataTable from "react-data-table-component";
import { AgregarInquilino } from "./CargarInquilino";
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function Listado() {
  const [listado, setListado] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mensajeError, setmensajeError] = useState("");
  const [mensajeSuccess, setmensajeSuccess] = useState("");
  const swalboton = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  useEffect(() => {
    API.getListadoInquilinos().then(setListado)
  }, [])
  const deleteInquilino = async (id_inquilinos) => {
    confirmAlert({
      title: 'Estas seguro?',
      message: 'La info no podra ser recuperada!',
      buttons: [
        {
          label: 'Si, Borrar',
          onClick: async () => {
            await API.DeleteInquilino(id_inquilinos);
            setTimeout(() => {
              setmensajeError("");
              window.location.reload(true);
            }, 3000);
            swalboton.fire(
              'Borrado!',
              'LA INFO FUE BORRADA CORRECTAMENTE.',
              'success'
            );
          }
        },
        {
          label: 'No, Cancelar',
          onClick: () => {
            swalboton.fire(
              'Cancelado',
              'la info no se borro',
              'error'
            );
          }
        }
      ]
    });
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_inquilinos,
    },
    {
      name: "NOMBRE Y APELLIDO",
      selector: (row) => row.nombre,
    },
    {
      name: "TELEFONO",
      selector: (row) => row.numero_telefono,
    },
    {
      name: "FECHA INICIO",
      selector: (row) => row.fecha,
    },
    {
      name: "FECHA FINALIZACION",
      selector: (row) => row.fecha_finalizacion,
    },
    {
      name: "EDITAR",
      selector: (row) => <button className="btn btn-sm btn-outline-primary"><FaEdit /></button>,
    },
    {
      name: "ELIMINAR",
      selector: (row) => <button onClick={() => deleteInquilino(row.id_inquilinos)} className="btn btn-sm btn-outline-danger"><FaTrash /></button>,
    },
  ];
  return (
    <>
      <div className="card-header text-center mt-3"><h3 className="">INQUILINOS</h3></div>
      <div className="col-2">
        <Button variant="btn btn-outline-primary" size="sm" onClick={handleShow}>
          Agregar Inquilino
        </Button>
        <AgregarInquilino show={show} handleClose={handleClose} />
      </div>
      <div className="card-body">
        <DataTable
          columns={columns}
          data={listado}
          noHeader
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
          striped
          highlightOnHover
          pointerOnHover
        />
      </div>
    </>
  );
}