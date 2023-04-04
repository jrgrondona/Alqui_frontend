import React, { useState, useEffect } from "react";
import * as API from "../../conexiones/conexion";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css';
import 'styled-components'
import DataTable from "react-data-table-component";
import { AgregarInquilino } from "./CargarInquilino";
import Button from 'react-bootstrap/Button';

export function Listado() {
  const [listado, setListado] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    API.getListadoInquilinos().then(setListado)
  }, [])

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
    }
  ];
  return (
    <>
      <div className="card-header text-center mt-3"><h3 className="">INQUILINOS</h3></div>
      <div className="col-2">
        <Button variant="primary" size="sm" onClick={handleShow}>
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