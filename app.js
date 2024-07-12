import express, {json} from "express"
import { corsMiddleware } from './middlewares/cors.js'
import { createSitioRouter } from './routes/sitios.js'
import { readJSON } from './utils.js'

const bd = readJSON('./sitios.json')

export const createApp = ({ sitioModel }) => {
    const app = express()
    app.use(json())

    // X SEGURIDAD
    app.disable('x-powered-by')
    
    //USAR EL CORS
    app.use(corsMiddleware())

//ROUTER Y MODELOS---> LOCALFILE/SQL
app.use('/sitios', createSitioRouter({ sitioModel }))
    
//Consulltar wikipedia api 5 opciones
app.get('/api/wikipedia', async (req, res) => {
    
    const apiUrl = 'https://es.wikipedia.org/w/api.php';
        
    const params = {
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: req.query.q,
        srlimit: 5
    };

    const url = `${apiUrl}?${new URLSearchParams(params)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
});

//Consultar a wiki api pagina por ID

app.get('/api/wikipedia/porid', async (req, res) => {

const pageid = req.query.q; // ID de la página de Wikipedia que se desea consultar

//const sitioExistente = await bd.find(sitio => sitio.idWiki === parseInt(pageid));
const response = await fetch(`http://localhost:1234/sitios/${pageid}`)
const sitioExistente = await response.json()

if(response.status !== 404){
    res.json({ sitioExistente }) // Esto debería imprimir el objeto encontrado o undefined si no se encuentra
    return

} else {
    const apiUrl = 'https://es.wikipedia.org/w/api.php';

    let params = {
        action: 'query',
        prop: 'extracts|pageimages|coordinates|info',
        inprop: 'url',
        exchars: '850',
        pageids: pageid, // Utiliza el pageid del resultado
        format: 'json',
        piprop: 'thumbnail', // Solicitamos la miniatura
        pithumbsize: 300
        
    };
    const url = `${apiUrl}?${new URLSearchParams(params)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al consultar la API de Wikipedia');
        }
        const data = await response.json()
        res.json(data); // Devolver los datos obtenidos de Wikipedia al frontend

    } catch (error) {
        console.error('Error al obtener los datos de Wikipedia:', error);
        res.status(500).json({ error: 'Error al obtener los datos de Wikipedia' });
    }   
}

})

// CONFIGURACION DE PUERTO Y LISTEN
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Corriendo el Servidor en: http://localhost:${PORT}`)
    })
}

