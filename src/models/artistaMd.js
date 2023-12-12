import { connection } from "../../db_config.js";

export class ArtistaMd{
    static async getAll(nombre){
      if (!nombre){
        const [artistas, _info] = await connection.query(
            `SELECT a.nombre, g.genero, a.fechaDebut, a.paisOrigen, a.id as id FROM artistas a
            JOIN artista_genero ag ON ag.artista_id = a.id 
            JOIN generos g ON ag.genero_id = g.id`,
        );
          return artistas.length ? artistas : null; 
      }
        const [artistas, _info] = await connection.query(
            `SELECT a.nombre, g.genero, a.fechaDebut, a.paisOrigen, a.id as id FROM artistas a
            JOIN artista_genero ag ON ag.artista_id = a.id 
            JOIN generos g ON ag.genero_id = g.id`,
            [nombre]
      );
      return artistas.length ? artistas : null;
    }
    /* 
    @param id number
    @return field list -> nombre, paisOrigen, fechaDebut, id 
    */
    static async getById(id){
        const [artista, _info] = await connection.query( 
          `
        SELECT nombre, paisOrigen, fechadebut, id FROM artistas WHERE id = ?`,
        [id]
        );
        return artista;
    }

    static async addOne(artista) {
        const { nombre, foto, logo, descripcion, fechaDebut, paisOrigen, genero } = artista;
        console.log(genero);
        // Verificar si el artista ya existe en la tabla artistas
        const [existingArtista] = await connection.query(`
            SELECT id FROM artistas WHERE nombre = ?
        `, [nombre]);
    
        let artistaId;
    
        if (existingArtista.length > 0) {
            // Si el artista ya existe, obtenemos su ID
            artistaId = existingArtista[0].id;
        } else {
            // Si el artista no existe, lo insertamos en la tabla artistas
            const result = await connection.query(
                `
                INSERT INTO artistas (nombre, foto, logo, descripcion, fechaDebut, paisOrigen)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)
                `,
                [nombre, foto, logo, descripcion, fechaDebut, paisOrigen]
            );
    
            artistaId = result.insertId;
        }
    
        // InsertaMOS en la tabla intermedia solo si genero es un valor definido
        if (genero) {
            await connection.query(`
                INSERT INTO artista_genero (artista_id, genero_id)
                SELECT ?, g.id
                FROM generos g
                WHERE g.genero = ?
            `, [artistaId, genero]);
        }
    
        console.log(`Artista ${nombre} creado o actualizado con éxito.`);
        return { id: artistaId };
    }
    
}
