export function crearMapa() {
    
    // Crear el mapa
    const map = L.map('map', {
        maxZoom: 18, // Establece el zoom máximo permitido
        minZoom: 1.5,    // Establece el zoom mínimo permitido
        continuousWorld: false,
        worldCopyJump: true // Esto hace que el mapa se salte al otro lado del mundo cuando llegues al borde
    }).setView([20.000, -0.00], 2);


    // Configurar capa de azulejos (tiles)
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);


    L.control.browserPrint({position: 'topleft', title: 'Print ...'}).addTo(map);
   
    // Devolver el mapa creado
    return map;
}
