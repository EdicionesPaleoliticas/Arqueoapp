import { map } from './scripts.mjs';
import { obtenerElementosDOM } from './obtenerElementosDOM.mjs';
import { guardarElemento } from './elementoExiste.mjs';



const { bdEsFilas, consola, btnGps, disLat, disLon, bdFront } = obtenerElementosDOM();

const marcadoresAgregados = {};

// Modificamos la función 'ubicarEnMapa' para aceptar argumentos
export function ubicarEnMapa(lat, lon, titulo, idWiki, icono) {
    const claveMarcador = idWiki;

    if (marcadoresAgregados[claveMarcador]) {
    
        // Si el marcador ya existe, lo eliminamos del mapa y del registro
        map.removeLayer(marcadoresAgregados[claveMarcador]);
        delete marcadoresAgregados[claveMarcador];
    } else {
    
    try {

        // Definir el icono personalizado
    const customIcon = L.icon({
        iconUrl: icono,
        iconSize: [32, 32], // Tamaño del icono
        iconAnchor: [16, 32], // Punto de anclaje del icono
        popupAnchor: [0, -32] // Punto de anclaje del popup
    });

    if (icono === undefined){

        const marcador = L.marker([lat, lon], { opacity: 0.8})
        .addTo(map)
        .bindPopup(titulo);
        marcadoresAgregados[claveMarcador] = marcador;
    } else{
        const marcador = L.marker([lat, lon], { opacity: 0.8, icon: customIcon })
                            .addTo(map)
                            .bindPopup(titulo);

                            marcadoresAgregados[claveMarcador] = marcador;
                        }

            } catch (err) {
        consola.textContent = `'Error al agregar marcador: ${err}`;
    }
} }

// Define un objeto para almacenar los marcadores agregados

export async function ubicarTodo() {
    
    const response = await fetch('https://arqueoapp.onrender.com/sitios');
    const json = await response.json();
    const sitios = json.sitios;

    for (let i = 0; i < sitios.length; i++) {
        const sitio = sitios[i];
        const { lat, lon, nombre, idWiki, icono } = sitio;

        // Definir el icono personalizado
        const customIcon = L.icon({
            iconUrl: icono,
            iconSize: [32, 32], // Tamaño del icono
            iconAnchor: [16, 32], // Punto de anclaje del icono
            popupAnchor: [0, -32] // Punto de anclaje del popup
        });

        const claveMarcador = idWiki; // Usa las coordenadas como clave del marcador        

        if (sitio.lat,sitio.lon && !marcadoresAgregados[claveMarcador]){

            try {

                if(icono === undefined){
                    const marcador = L.marker([lat, lon], { opacity: 0.8 })
                    .addTo(map)
                    .bindPopup(nombre);

                    marcadoresAgregados[claveMarcador] = marcador; // Registra el marcador
                    guardarElemento(sitio);

                } else{
                    const marcador = L.marker([lat, lon], { opacity: 0.8, icon: customIcon })
                                    .addTo(map)
                                    .bindPopup(nombre);
                
                                    marcadoresAgregados[claveMarcador] = marcador; // Registra el marcador
                                    guardarElemento(sitio);
                                }

            } catch (err) {
                console.log(err);
            }
    }}
}

export function eliminarMarcador(objeto) {
    const claveMarcador = objeto.idWiki;
    
        // Busca y elimina la fila correspondiente
        const filas = bdEsFilas.getElementsByClassName('bd-escritorio-filas');
        for (let i = 0; i < filas.length; i++) {
            let fila = filas[i];
    
            //if (fila.firstChild.textContent === objeto.nombre) {
            if (fila.firstChild.textContent === objeto.nombre) {

                try {map.removeLayer(marcadoresAgregados[claveMarcador]);
                    delete marcadoresAgregados[claveMarcador];
                }
                catch (error){
                    console.log(error);
                }
                
                bdEsFilas.removeChild(fila);

                break; // Termina el bucle una vez que se elimina la fila
            }
        }
    }

let marcadorsio; // Variable global para mantener la referencia al marcador

// Evento cuando se mantiene presionado el clic del ratón
btnGps.addEventListener('mousedown', () => {
    console.log(disLat,disLon)
    let lat = disLat.textContent; // Coordenadas de ejemplo
    let lon = disLon.textContent; // Coordenadas de ejemplo
    
    // Crear el marcador en la ubicación deseada y agregarlo al mapa
    marcadorsio = L.marker([lat, lon], { opacity: 1 })
        .addTo(map);
    
    // Centrar el mapa en la ubicación del marcador
    map.setView([lat, lon], 5); // El segundo parámetro es el nivel de zoom
});

// Evento cuando se suelta el clic del ratón en cualquier parte del documento
document.addEventListener('mouseup', () => {
    // Remover el marcador del mapa
    if (marcadorsio) {
        map.removeLayer(marcadorsio);
        marcadorsio = null; // Limpiar la referencia al marcador
    }
});
