import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import error404 from '../assets/error404.png';

function Error404() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            Swal.fire({
                title: 'Esta página volverá al inicio en 5 segundos.',
                timer: 5000,
                timerProgressBar: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                didOpen: () => {
                    Swal.showLoading();
                    setInterval(() => {
                        setCountdown(countdown => countdown - 1);
                    }, 1000);
                }
            }).then(() => {
                window.location.href = "/";
            });
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className="error-container">
                <h3>Ops !</h3>
                <p>Pagina no encontrada</p>
                <img src={error404} width="100%" height="400px" />
                <button className="btn2" onClick={() => window.location.href = "/"}>
                    Volver a Inicio
                </button>
                <p>Redirección automática en {countdown} segundos.</p>
            </div>
        </>
    );
}
export default Error404;

