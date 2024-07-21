import { obtenerElementosDOM } from "./obtenerElementosDOM.mjs";
const {  iconos, consola, disLat, disLon, wikiLink, wikiID, wikiTitulo, wikiImagen, wikiExtract, wikiBoton, notas } = obtenerElementosDOM();

export async function buscarEnWikipedia() {
        const inputWiki = document.getElementById('wiki-buscador-input').value;
        const data = await obtenerDatosWiki(inputWiki);
        mostrarResultadosWiki(data);
    }

export async function obtenerDatosWiki(consulta){

    const url = `https://arqueoapp.onrender.com//api/wikipedia?q=${consulta}`; //Hay que cambiarla en PRODUCCION

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function mostrarResultadosWiki(data){

    const resultados = await data.query.search;
    const resultadosContainer = document.getElementById('lista-resultados');

    // Limpiar resultados antiguos
    resultadosContainer.textContent = '';

    for (let i = 0; i < resultados.length; i++) {
        const resultado = document.createElement('div');
        resultado.classList.add('resultados');
        resultado.id = resultados[i].pageid;
        resultado.textContent = resultados[i].title;

        resultado.addEventListener('click', ()=> {
            paginaPorID(resultado.id)
        });        

        resultadosContainer.appendChild(resultado);
    }
}

export async function paginaPorID(ID_Wiki) {

let urlWiki = `https://arqueoapp.onrender.com//api/wikipedia/porid?q=${ID_Wiki}`; //CAMBIAR EN PROD

const response = await fetch(urlWiki);
const data = await response.json();
    cargarData(data);
} 

export function cargarData(data) {
    console.log(data);

    const dataContainer = document.getElementById('info-ctn');
    dataContainer.classList.add('info-ctn');
    dataContainer.classList.remove('none');
    
if (data.sitioExistente){

    const sitio = data.sitioExistente;

    disLat.textContent = sitio.lat;
    disLon.textContent = sitio.lon;
    wikiImagen.src = sitio.imgURL;
    wikiTitulo.innerText = sitio.nombre;
    wikiLink.href = sitio.wikiURL;
    wikiID.textContent = sitio.idWiki;
    wikiExtract.innerHTML = sitio.extracto;
    notas.value = sitio.notas;
    consola.textContent = "El sitio ya existía y se cargó desde la Base de datos";
    
    return;

} else {

      //CARGAR DATOS EN EL FRONT
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    try{
        let coordinates = pages[pageId].coordinates[0];     
        disLat.textContent = coordinates.lat;
        disLon.textContent = coordinates.lon;
        
    } catch (err){
        disLat.textContent = "No hay data";
        disLon.textContent = "No hay data"; 
     }

     try {
        wikiImagen.src = pages[pageId].thumbnail.source;

     } catch {
        consola.textContent = "No tiene imagen";
     }

     wikiTitulo.innerText = pages[pageId].title;
     wikiLink.href = pages[pageId].canonicalurl;
     wikiID.textContent = pages[pageId].pageid;
     notas.value = ''
     wikiExtract.innerHTML = pages[pageId].extract;    
     wikiBoton.addEventListener('click', function(event) {
        event.preventDefault();
        consola.textContent = 'El sitio no existía y se cargó desde Wikipedia';
        window.open(wikiLink.href, '_blank');
    });    
};
}
