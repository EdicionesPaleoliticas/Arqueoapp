import { obtenerElementosDOM } from './obtenerElementosDOM.mjs';
const { bdFront, bdEsFilas, consola} = obtenerElementosDOM();
import { ubicarEnMapa } from './ubicarEnMapa.mjs'
import { cargarData, paginaPorID } from './wikipedia.mjs';
import { eliminarMarcador } from './ubicarEnMapa.mjs';

//GUARDAR ELEMENTO EN LA BASE DEL FRONT
export function guardarElemento(elemento) {
    let existe = bdFront.some(e => e.idWiki === elemento.idWiki);

    if (!existe && elemento.lat && elemento.lon) {
        bdFront.push(elemento);
        sessionStorage.setItem('bdFront', JSON.stringify(bdFront));
        ubicarEnMapa(elemento.lat, elemento.lon, elemento.nombre, elemento.idWiki, elemento.icono);
        consola.textContent = 'Elemento guardado en el escritorio';
    } else {
        consola.textContent = 'El elemento ya existe';
        let index = bdFront.findIndex(e => e.idWiki === elemento.idWiki);
        if (index !== -1) {
            if (bdFront[index].icono !== elemento.icono) {
                bdFront[index].icono = elemento.icono; // Actualizar el icono en bdFront
                // Actualizar la fila en la interfaz de usuario
                let fila = bdEsFilas.children[index];
                fila.removeChild(fila.firstChild); // Remover el icono anterior
                let nuevoIcono = document.createElement("div");
                nuevoIcono.textContent = elemento.icono;
                nuevoIcono.style.cursor = "pointer";
                nuevoIcono.addEventListener('click', function() {
                    ubicarEnMapa(elemento.lat, elemento.lon, elemento.nombre, elemento.idWiki, elemento.icono);
                });
                fila.insertBefore(nuevoIcono, fila.firstChild); // Agregar el nuevo icono
            }
        }
    }
    baseEscritorio(bdFront); // Actualizar la visualización del escritorio
}


export function baseEscritorio(objetos) {
    bdEsFilas.textContent = '';

    objetos.forEach(function (objeto) {
  
        // Crea un nuevo div para cada objeto
        let fila = document.createElement("div");
       
        fila.addEventListener('click', function() {
            ubicarEnMapa(objeto.lat, objeto.lon, objeto.nombre, objeto.idWiki, objeto.icono);
            
        });

        // Crea un elemento de cruz para eliminar el marcador
        let cruz = document.createElement("div");
        let searchBdEscritorio = document.createElement('div');
        cruz.textContent = "❌";
        searchBdEscritorio.textContent = "👀"
        cruz.style.cursor = "pointer";
        searchBdEscritorio.style.cursor = "pointer";
        cruz.style.marginLeft = "5px";
        
        // Agrega un evento de clic a la cruz para eliminar el marcador
        
        cruz.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el clic en la cruz se propague a la fila
            eliminarMarcador(objeto);
             // Suponiendo que objeto es el elemento que deseas eliminar de bdFront
            let index = bdFront.indexOf(objeto); // Encuentra el índice del objeto en el array
               if (index !== -1) { // Verifica si el objeto está presente en el array
             bdFront.splice(index, 1); // Elimina el objeto del array
    }
        });

        searchBdEscritorio.addEventListener('click',function(event){
            event.stopPropagation();
            paginaPorID(objeto.idWiki);
        })
    
        // Asigna algunas propiedades del objeto al div
        fila.textContent = objeto.nombre;
                
        //fila.addEventListener('click', ubicarEnMapa(objeto.lat, objeto.lon));
        fila.classList.add('bd-escritorio-filas');

        // Agrega la cruz a la fila
        fila.appendChild(searchBdEscritorio);
        fila.appendChild(cruz);


        // Agrega el div al contenedor
        bdEsFilas.appendChild(fila);

        }); 
    }

    export function borrarTodo() {
        // Eliminar los marcadores del mapa
        for (let i = 0; i < bdFront.length; i++) {
            eliminarMarcador(bdFront[i]);
        }
    
        // Limpiar el array
        bdFront.splice(0, bdFront.length);
    
        // Limpiar el almacenamiento
        sessionStorage.setItem('bdFront', JSON.stringify(bdFront));
    
        // Limpiar visualmente la lista de la base de datos (si es necesario)
        bdEsFilas.textContent = '';
    }