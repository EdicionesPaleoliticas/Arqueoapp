import { validateSitio, validatePartialSitio } from '../schemas/sitios.js'

export class SitioController {
    constructor ({ sitioModel }) {
      this.sitioModel = sitioModel
    }
  
    getAll = async (req, res) => {
      const { icono } = req.query
      console.log(req.query)
      const sitios = await this.sitioModel.getAll({ icono: icono })
      res.json({ message: "Base de datos cargada", sitios })
    }

    getById = async (req, res) => {
      const { id } = req.params;
      const idNumero = parseInt(id); // Convertir id a número
      const sitio = await this.sitioModel.getById({ id: idNumero });
      
      if (sitio) {
        return res.json(sitio);
      } else {
        return res.status(404).json({ message: 'No se encontró la búsqueda / Cannot find it' });
      }
    }
    create = async (req, res) => {
      const result = validateSitio(req.body)
      console.log(result)
      if (!result.success) {
      // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      } 

      const newSitio = await this.sitioModel.create({ input: result.data }) 
      res.status(201).json(`El nuevo sitio se creó/actualizó correctamente: ${newSitio.nombre}`)
    }

    delete = async (req, res) => {
      const { id } = req.params
      const result = await this.sitioModel.delete({ id })
      if (result === false) {
        return res.status(404).json({ message: 'Sitio no encontrado' })
      }
  
      return res.json({ message: 'Sitio borrado' })
    }

    update = async (req, res) => {
      const result = validatePartialSitio(req.body)
      console.log(req.body)
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { id } = req.params
      console.log("resutldata",result)
      const updatedSitio = await this.sitioModel.update({ id, input: result.data })
      return res.json(updatedSitio)
    }
}