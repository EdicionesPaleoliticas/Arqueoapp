import mysql from 'mysql2/promise';

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: ''
};

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

console.log(connection);
console.log(connectionString);

export class SitioModel {
/*   static async getAll({ icono }) {
    const [sitios] = await connection.query(
      `SELECT nombre, notas, lat, lon, wikiURL, imgURL, tituloWiki, idWiki, icono, extracto
        FROM sitio`
    )
    return sitios;
  } */
  static async getAll ({ icono }) {

    if (icono) {
      const lowerCaseSitio = "http://localhost:8080/img/icono_" + icono.toLowerCase() + ".png"
  
      const [iconos] = await connection.query(
        'SELECT idWiki FROM sitio WHERE LOWER(icono) = ?;',
        [lowerCaseSitio]
      )

      if (iconos.length === 0) return []
      const idsSitios = iconos.map(icono => icono.idWiki);

      const [sitios] = await connection.query(
      `SELECT nombre, notas, lat, lon, wikiURL, imgURL, tituloWiki, idWiki, icono, extracto
      FROM sitio WHERE idWiki IN (?);`,
      [idsSitios]
  );

  return sitios;
    }

    const [sitios] = await connection.query(
      `SELECT nombre, notas, lat, lon, wikiURL, imgURL, tituloWiki, idWiki, icono, extracto
      FROM sitio` )

    return sitios
  }

  static async getById ({ id }) {

    const [sitios] = await connection.query(
      `SELECT nombre, notas, lat, lon, wikiURL, imgURL, tituloWiki, idWiki, icono, extracto
        FROM sitio WHERE idWiki = ?;`,
      [id]
    )
  
    if (sitios.length === 0) return null
  
    return sitios[0]
  }
  
  static async create({ input }) {
    const {
      nombre,
      notas,
      lat,
      lon,
      wikiURL,
      imgURL,
      tituloWiki,
      idWiki,
      icono,
      extracto
    } = input;

    if (lat === undefined || null){
      lat = 0;
      lon = 0;
    }
  
    try {
      await connection.query(
        `INSERT INTO sitio (nombre, notas, lat, lon, wikiURL, imgURL, tituloWiki, idWiki, icono, extracto)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [nombre, notas, lat, lon, wikiURL, imgURL, tituloWiki, idWiki, icono, extracto]
      );

    } catch (e) {
      console.error(e);
      throw new Error('Error creating movie');
    }
  
    try{
    const [sitios] = await connection.query(
      `SELECT nombre, notas, lat, lon, wikiURL, imgURL, tituloWiki, idWiki, icono, extracto
        FROM sitio WHERE idWiki = ?;`,
      [idWiki]
    );
  
    return sitios[0];
  }catch(err){
    console.log(err)
  }

  }
  


  static async delete({ id }) {
    
    try{
      const [sitios] = await connection.query(
        `DELETE FROM sitio WHERE idWiki = ?;`,
        [id]
      );
  
      return[sitios]
        // ejercio fácil: crear el delete
    }catch(err){
      console.log(err)
    }  
  }

  static async update ({ id, input }) {
    console.log(id)
    console.log(input)

  const {notas, icono } = input;
  try {

    await connection.query(
      `UPDATE sitio SET notas = ?, icono = ? WHERE idWiki = ?;`,
      [notas, icono, id]
    );

    const [sitio] = await connection.query(
      `SELECT * FROM sitio WHERE idWiki = ?;`,
      [id]
    )
    return sitio[0]
  } catch (error) {
    console.log(error)
    throw new Error('Error al actualizar el sitio');
  }
}


}