export function obtenerElementosDOM() {
    const wikiImagen = document.getElementById('wiki-img');
    const wikiExtract = document.getElementById('wiki-extract');
    const wikiTitulo = document.getElementById('wiki-titulo');
    const disLat = document.getElementById('display-latitud');
    const disLon = document.getElementById('display-longitud');
    const notas = document.getElementById('comentarios');
    const notasCtn = document.getElementById('notas-ctn');
    const wikiID = document.getElementById('wiki-ID');
    const wikiLink = document.getElementById('enlace-wiki');
    const contenedor = document.getElementById('contenedor');
    const wikiBoton = document.getElementById('btn-ir-wiki');
    const btnUbicar = document.getElementById('btn-ubicar-todo');
    const iconos = document.getElementById('iconos-ctn');
    const consola = document.getElementById('consola');
    const btnGps = document.getElementById('gps');
    const buscarWikiBtn = document.getElementById('wiki-buscador-btn');
    const btnCrear = document.getElementById('btn-crear');
    const bdEscritorio = document.getElementById('bd-escritorio-ctn');
    const bdEsFilas = document.getElementById('bd-escritorio-filas');
    const bdFront = JSON.parse(sessionStorage.getItem('bdFront')) || [];
    
    // Botón para cargar toda la base de datos
    const databaseModal = document.getElementById('database-section');
    const databaseCont = document.getElementById('database');
    const databaseCargar = document.getElementById('btn-database-cargar');

    return { databaseCont, 
            databaseModal, 
            databaseCargar, 
            wikiBoton, 
            contenedor, 
            wikiLink, 
            wikiID, 
            notas, 
            wikiImagen, 
            wikiExtract, 
            wikiTitulo, 
            consola, 
            btnGps, 
            buscarWikiBtn, 
            disLat, 
            disLon, 
            bdFront, 
            bdEsFilas, 
            bdEscritorio,
            btnCrear,
            btnUbicar,
            iconos,
        notasCtn };
}
