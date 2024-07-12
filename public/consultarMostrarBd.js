import { obtenerElementosDOM } from './obtenerElementosDOM.mjs';
const { consola, databaseCont, bdFront } = obtenerElementosDOM();
import { guardarElemento }from './elementoExiste.mjs'

export async function consultarMostrarBd(databaseCont) {
    try {
        const response = await fetch('http://localhost:1234/sitios');
        if (!response.ok) {
            consola.textContent = 'Hubo un problema al cargar la base de datos';
            throw new Error('No respondió el servidor');
        }

        const responseData = await response.json(); // Parsea la respuesta como JSON

        // Verificar si hay un mensaje en los datos recibidos
        if (responseData.message) {
            consola.textContent = responseData.message; // Mostrar el mensaje en la consola
        }

        const data = responseData.sitios;

        // Objeto original
        const objetos = data;

        // Función para extraer solo el nombre, latitud y longitud de cada objeto
        const filtrarPropiedades = objeto => ({
            nombre: objeto.nombre,
            lat: objeto.lat,
            lon: objeto.lon,
            notas: objeto.notas,
            idWiki: objeto.idWiki,
            icono: objeto.icono // Agregar también el idWiki para poder eliminar el objeto
        });

        // Aplicar la función de filtrado a cada objeto en el array
        const objetosFiltrados = objetos.map(filtrarPropiedades);

        // Limpiar el contenedor antes de agregar la nueva tabla
        databaseCont.textContent = '';

        // Crear elemento de la tabla
        const table = document.createElement('div');
        table.classList.add('table');

        // Crear fila de encabezado
        const headerRow = document.createElement('div');
        headerRow.classList.add('row', 'header');

        for (const key in objetosFiltrados[0]) {
            if (key !== 'idWiki' && key !== 'icono') {
                const cell = document.createElement('div');
                cell.classList.add('cell', 'header-cell');
                cell.textContent = key;
                headerRow.appendChild(cell);
            }
        }
        // Añadir un encabezado adicional para los botones de acción
        const actionsCell = document.createElement('div');
        actionsCell.classList.add('cell', 'header-cell');
        actionsCell.textContent = 'Acciones';
        headerRow.appendChild(actionsCell);
        table.appendChild(headerRow);

        // Crear filas de datos
objetosFiltrados.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('row');

    for (const key in item) {
        if (key !== 'idWiki' && key !== 'icono') { // Evitar agregar la columna 'icono'
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = item[key];
            row.appendChild(cell);
        }
    }

    // Agregar botones de acciones a cada fila
    const actionsCell = document.createElement('div');
    actionsCell.classList.add('cell');

    // Botón Agregar
    const addButton = document.createElement('div');
    addButton.textContent = '➕';
    addButton.addEventListener('click', ()=>{
        guardarElemento(item);
    })
    // Aquí puedes añadir la lógica para agregar nuevos elementos si lo deseas

    actionsCell.appendChild(addButton);

    row.appendChild(actionsCell);
    table.appendChild(row);
});

        // Agregar la tabla al contenedor
        databaseCont.appendChild(table);

    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
        consola.textContent = 'Hubo un problemilla:' + error;
    }
}

export default consultarMostrarBd;