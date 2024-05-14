import { SessionStorageService } from "../views/src/services/SessionStorage.service.js";

const manejarErrores = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const iniciarSesion = async (username, password) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, password })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
};
export const registrar = async (username, email, password) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, email, password })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
};

export const usuario = async () => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
};

export const obtenerTodasLasCuentas = async () => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/cuenta', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener todas las cuentas:', error);
    }
};

export const obtenerCuentaPorId = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/cuenta/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener la cuenta por ID:', error);
    }
};

export const crearCuenta = async (usuario, email, password) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch('http://localhost:3000/api/cuenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ usuario, email, password })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al crear la cuenta:', error);
    }
};

export const actualizarCuenta = async (id, usuario, email, password) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/cuenta/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ usuario, email, password })
        });
        manejarErrores(respuesta);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al actualizar la cuenta:', error);
    }
};

export const eliminarCuenta = async (id) => {
    try {
        const token = SessionStorageService.getItem('token');
        const respuesta = await fetch(`http://localhost:3000/api/cuenta/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        manejarErrores(respuesta);
        return { message: 'Cuenta eliminada' };
    } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
    }
};
