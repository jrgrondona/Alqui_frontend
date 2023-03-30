const API_URL = "http://localhost:3301";

/// LOGIN ///
export async function Login(datos_enviar) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos_enviar),
    };
    try {
      const response = await fetch(`${API_URL}/login`, requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log("Error en el servidor");
    }
  }
  //// REGISTROS DE NUEVOS USUARIOS ////
  export async function Registro(datos_enviar) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos_enviar),
    };
    try {
      const response = await fetch(`${API_URL}/registro`, requestOptions);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log("Error en el servidor");
    }
  }
   //// LISTADO DE INQUILINOS ////
   export async function getListadoInquilinos() {
    const token = JSON.parse(localStorage.getItem('token'));
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(`${API_URL}/inquilinos`, requestOptions);
      const data = await response.json(); 
      return data;
    } catch(error) {
      console.log('Nuestro error', error);
    }
  }
  export function SaveInquilino(datos_enviar) {
    const token = JSON.parse(localStorage.getItem("token"));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datos_enviar),
    };
    return fetch(`${API_URL}/inquilinos`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }