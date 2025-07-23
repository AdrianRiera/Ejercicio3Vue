export const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    });
};

export const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
}

export const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };
    return fechaObj.toLocaleDateString('es-ES', opciones);
}