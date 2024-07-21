import { readJSON } from '../../utils.js'

const bd = readJSON('./sitios.json')

export class SitioModel {
  static async getAll({ icono }) {
    console.log('gente', icono);
    if (icono) {
        const lowerCaseIcono = "https://arqueoapp.onrender.com/" + icono.toLowerCase() + ".png";
        console.log(lowerCaseIcono);

        return bd.filter(
            sitio => sitio.icono && sitio.icono.toLowerCase() === lowerCaseIcono
        );
    }

    return bd;
}



  static async getById ({ id }) {
    const idParseado = parseInt(id)
    const sitio = await bd.find(sitio => sitio.idWiki === idParseado)
    return sitio
  }

  static async create ({ input }) {
    const newSitio = {
      //id: randomUUID(),
      ...input
    }

    bd.push(newSitio)

    return newSitio
  }

  static async delete ({ id }) {
    const sitioIndex = bd.findIndex(sitio => sitio.idWiki === parseInt(id))
    if (sitioIndex === -1) return false
    bd.splice(sitioIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const idParseado = parseInt(id);
    const sitioIndex = bd.findIndex(sitio => sitio.idWiki === idParseado)
    if (sitioIndex === -1) return false

    bd[sitioIndex] = {
      ...bd[sitioIndex],
      ...input
    }

    return bd[sitioIndex]
  }

}
