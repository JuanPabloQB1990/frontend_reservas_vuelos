const calcularTiempo = (fechaPartida, fechaLlegada) => {

    // Calcular la diferencia en milisegundos
    var diferenciaEnMilisegundos = fechaLlegada - fechaPartida;
    
    // Calcular la diferencia en horas y minutos
    var diferenciaEnHoras = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
    var diferenciaEnMinutos = Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60)) / (1000 * 60));
    console.log(diferenciaEnHoras.toString(), " h ", diferenciaEnMinutos.toString());
    return `${diferenciaEnHoras} h ${diferenciaEnMinutos} m`
}

export default calcularTiempo
