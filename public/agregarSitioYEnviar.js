import { guardarElemento } from "./elementoExiste.mjs";
import { obtenerElementosDOM } from "./obtenerElementosDOM.mjs";
import { cargarData } from "./wikipedia.mjs";

const { consola } = obtenerElementosDOM();

export async function agregarSitioYEnviar(dataSitio) {
    
    const url = `https://arqueoapp.onrender.com/sitios/${dataSitio.idWiki}`;
    
    let existe = await fetch(url);
    
    if (existe.status === 404) {

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataSitio)
        };
    
        try {
            //const response = await fetch('https:/arqueoapp.onrender.com/sitios', options);
            //const json = await response.json();
            guardarElemento(dataSitio);

            //consola.textContent = `¡Nooo se pudo guardar!`;
            console.log(json.error)
            return;
            
        } catch (error) {
            consola.textContent = `Error al enviar datos al servidor:  ${error}`;
            console.log('Error al enviar datos al servidor:',error);
        }
 } else {
            
    //HACER EL PATFCH
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataSitio)
    };
    try {
        //const response = await fetch(`https://arqueoapp.onrender.com/sitios/${dataSitio.idWiki}`, options);
        //const json = await response.json();
        consola.textContent = json;
        console.log(json);
        guardarElemento(dataSitio);

    } catch (error) {
        consola.textContent = `Error al enviar datos al servidor: + ${error}`;
        console.log(error)
    }
    }}


export async function crearSitio(){
    const nombre = document.getElementById('crear-nombre').value;
    const latitud = document.getElementById('crear-latitud').value;
    const longitud = document.getElementById('crear-longitud').value;
    const urlImagen = document.getElementById('crear-imagen').value;
    const descripcion = document.getElementById('crear-descripcion').value;
    const notas = document.getElementById('crear-notas').value;
    

    const dataSitio = {
        nombre: nombre,
        lat: latitud,
        lon: longitud,
        notas: notas,
        wikiURL: '(sin url)',
        imgURL: urlImagen,
        idWiki: Math.floor(Math.random() * (999999999 - 999999 + 1)) + 999999,
        tituloWiki: nombre,
        extracto: descripcion,
        icono: 'sin icono por ahora'
    };

    agregarSitioYEnviar(dataSitio);
    cargarData(dataSitio);

    // Evitar que el formulario se envíe y recargue la página
    return false;
}
