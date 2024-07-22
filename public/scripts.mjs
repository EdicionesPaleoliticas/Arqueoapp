import { agregarSitioYEnviar, crearSitio } from './agregarSitioYEnviar.js';
import { arrastre } from './arrastre.js';
import { cerrarVentana, abrirVentana } from './cerrarVentana.js';
import consultarMostrarBd from './consultarMostrarBd.js';
import { crearMapa } from './crearMapa.mjs';
import { guardarElemento, baseEscritorio, borrarTodo } from './elementoExiste.mjs';
import { obtenerElementosDOM } from './obtenerElementosDOM.mjs';
import { ubicarEnMapa, ubicarTodo } from './ubicarEnMapa.mjs';
import { buscarEnWikipedia } from './wikipedia.mjs';

const { 
    btnCrear,
    contenedor, 
    wikiLink, 
    wikiID, 
    notas, 
    wikiImagen, 
    wikiExtract, 
    wikiTitulo, 
    btnGps, 
    buscarWikiBtn, 
    disLat, 
    disLon,
    databaseCargar,
    databaseModal,
    databaseCont,
    btnUbicar,
    iconos,
    consola,
    bdEscritorio,
    bdEsFilas,bdFront
} = obtenerElementosDOM();
    
export const map = crearMapa();

databaseCargar.addEventListener('click', consultarMostrarBd(databaseCont));
baseEscritorio(bdFront); // Actualizar la visualización del escritorio


//BUSCAR EN WIKIPEDIA
buscarWikiBtn.addEventListener('click', buscarEnWikipedia);

// UBICAR TODO
btnUbicar.addEventListener('click', ubicarTodo);

// Agregar dataSitio a bdFront y enviar al servidor
const btnGuardar = document.getElementById('btn-guardar');
btnGuardar.addEventListener('click',guardarDatos);

function seleccionarIcono() {
    const divs = iconos.querySelectorAll(".div-selector");
    //const divs = iconos.querySelectorAll(".btn");

divs.forEach(function(div) {
    div.addEventListener("click", function() {

    // Remover la clase 'selected' de todos los divs
    divs.forEach(function(d) {
        d.classList.remove("selected");
        console.log('click');
    });

    // Agregar la clase 'selected' solo al div clickeado
    div.classList.add("selected");
    console.log('click')

    });
});
};

seleccionarIcono();

function getIcono(){

    try{
        const iconoElegido = iconos.querySelectorAll(".selected")[0].firstChild.src;
        return iconoElegido;

    } catch(err){
        consola.textContent = 'No elegiste ícono';
        return undefined;
    }
}

function guardarDatos() {
        const lat = parseFloat(disLat.textContent);
        const lon = parseFloat(disLon.textContent);
        const icono = getIcono();

    const dataSitio = {
            nombre: wikiTitulo.innerText,
            lat: lat,
            lon: lon,
            notas: notas.value,
            wikiURL: wikiLink.href,
            imgURL: wikiImagen.src,
            idWiki: parseInt(wikiID.textContent),
            tituloWiki: wikiTitulo.innerText,
            extracto: wikiExtract.innerHTML,
            icono: icono
        };

        agregarSitioYEnviar(dataSitio);
};

//CERRAR Y ABRIR IMPLEMENTANDO

//Función Abrir y cerrar la base de datos del escritorio
let isMaximized = false;

function toggleWindowState(window, btn) {
    return function() {
        if (isMaximized) {
            window.classList.remove('hidden');
            isMaximized = false;
            btn.textContent = "🔻";
            console.log('ismaxi');
            
        } else {
            window.classList.add('hidden');
            isMaximized = true;
            btn.textContent = "🔺";

            console.log('notmaxi');
        }
    }
}

const cerrarBdEscritorio = document.getElementById('x-bd-escritorio');
cerrarBdEscritorio.addEventListener('click', toggleWindowState(bdEsFilas, cerrarBdEscritorio));



function openWindow(window,btn){
    btn.addEventListener('click',()=>{
        window.classList.remove('hidden');
    })
}

function closeWindow(window,btn){
    btn.addEventListener('click',()=>{
        window.classList.add('hidden');
});
}

const modalCrear = document.getElementById('modal-container');
const BtnSalirCrear = document.getElementById('equis');
openWindow(modalCrear, btnCrear);
closeWindow(modalCrear, BtnSalirCrear);

const cerrarInfoCtn = document.getElementById("cerrar-info-ctn");
const infoCtn = document.getElementById('info-ctn');

cerrarInfoCtn.addEventListener('click', ()=>{
    infoCtn.classList.add('none');
})

const btnCrearSubmit = document.getElementById('crear-submit');
btnCrearSubmit.addEventListener('click',crearSitio);


// Obtener referencias a los botones
const abrirDatabaseBtn = document.getElementById('btn-bd');
const cerrarDatabaseBtn = document.getElementById('database-span-x');

// Agregar evento de clic para abrir la ventana modal
abrirDatabaseBtn.addEventListener('click', function() {
    databaseModal.classList.remove('hidden');
    consultarMostrarBd(databaseCont);
});

// Agregar evento de clic para cerrar la ventana modal
    closeWindow(databaseModal, cerrarDatabaseBtn);


const wikiBuscadorCtn = document.getElementById('wiki-buscador-ctn');
const wikiBuscadorCerrar = document.getElementById('wiki-buscador-cerrar');
const wikiBuscadorAbrir = document.getElementById('btn-buscador');

openWindow(wikiBuscadorCtn,wikiBuscadorAbrir);
closeWindow(wikiBuscadorCtn,wikiBuscadorCerrar);

arrastre(wikiBuscadorCtn);
arrastre(contenedor);

const btnFiltrar = document.getElementById('btn-filtrar');
const panelFiltro = document.getElementById('panel-filtro');
const cerrarFiltroCtn = document.getElementById('cerrar-filtro-ctn');

openWindow(panelFiltro, btnFiltrar);
closeWindow(panelFiltro, cerrarFiltroCtn);

const filtrarBtn = document.getElementById('filtrar-btn');
filtrarBtn.addEventListener('click',filtrarBase);

async function filtrarBase() {
    // Obtener las opciones seleccionadas por el usuario
    let seleccion = [];
    let selectElement = document.getElementById("filtro");
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            seleccion.push(selectElement.options[i].value);
            console.log("seleccion.value");
            console.log(selectElement.options[i].value);
        }
    }

    // Verificar si se seleccionaron opciones
    if (seleccion.length === 0) {
        console.log("Por favor, selecciona al menos una opción.");
        return;
    }

    // Construir las URLs de los iconos seleccionados
    const iconosSeleccionados = seleccion.map(opcion => `https://arqueoapp.onrender.com/img/icono_${opcion}.png`);

    // Filtrar los sitios localmente
    const sitiosFiltrados = filtrarPorIcono(sitios, iconosSeleccionados);
    console.log(sitiosFiltrados);

    // Procesar los sitios filtrados (por ejemplo, guardarlos o mostrarlos en la UI)
    for (let i = 0; i < sitiosFiltrados.length; i++) {
        const element = sitiosFiltrados[i];
        console.log("element");
        console.log(element);
        guardarElemento(element); // Asegúrate de que esta función esté definida
    }
}

function filtrarPorIcono(sitios, iconosSeleccionados) {
    return sitios.filter(sitio => iconosSeleccionados.includes(sitio.icono));
}



const borrarTodoBtn = document.getElementById('btn-limpiar-todo');
borrarTodoBtn.addEventListener('click',borrarTodo);
