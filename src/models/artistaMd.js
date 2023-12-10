import { connection } from "../../db_config.js";

export class ArtistaMd{
    static async getAll(nombre){
      if (!nombre){
        const [artistas, _info] = await connection.query(`SELECT nombre, paisOrigen, fechaDebut FROM artistas`);
          return artistas.length ? artistas : null; 
      }
        const [artistas, _info] = await connection.query(`SELECT nombre, paisOrigen, fechadebut FROM artistas WHERE nombre = ?`, [nombre]);
          return artistas.length ? artistas : null;
    }
}