import { connection } from "../../db_config.js";

export class ArtistaMd{
    static async getAll(nombre){
      if (!nombre){
        const [artistas, _info] = await connection.query(`SELECT nombre, paisOrigen, fechaDebut, id FROM artistas`);
          return artistas.length ? artistas : null; 
      }
        const [artistas, _info] = await connection.query(`SELECT nombre, paisOrigen, fechadebut FROM artistas WHERE nombre = ?`,
         [nombre]
      );
      return artistas.length ? artistas : null;
    }
    /* @param id number
    @return field list -> nombre, paisOrigen, fechaDebut, id */
    static async getById(id){
        const [artista, _info] = await connection.query(
          `
        SELECT nombre, paisOrigen, fechadebut, id FROM artistas WHERE id = ?`,
        [id]
        );
        return artista;
    }

    static async deleteOne(id){
        const [info] = await connection.query(`
        DELETE FROM artistas WHERE artistas.id = ?`, [id]
        );
        return info.affectedRows
    }
}