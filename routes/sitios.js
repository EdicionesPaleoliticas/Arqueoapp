import { Router } from 'express'
import { SitioController } from '../controllers/sitios.js'

export const createSitioRouter = ({ sitioModel }) => {
    const sitiosRouter = Router()
  
    const sitioController = new SitioController({ sitioModel })
  
    sitiosRouter.get('/', sitioController.getAll)
    sitiosRouter.post('/', sitioController.create)
    //sitiosRouter.post('/post', )
  
    sitiosRouter.get('/:id', sitioController.getById)
    sitiosRouter.delete('/:id', sitioController.delete)
    sitiosRouter.patch('/:id', sitioController.update)

    
  
    return sitiosRouter
  }