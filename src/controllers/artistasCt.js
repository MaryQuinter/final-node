import { ArtistaMd } from "../models/artistaMd.js";

export class ArtistaCt{
    static async getAll(req, res){
        const {nombre} = req.query;
        const artistas = await ArtistaMd.getAll(nombre);
        artistas ?
        res.status(200).json(artistas)
        :
        res.status(404).json({message: "Artista Not Found"});
    }

    static async getById(req, res){
        const {id} = req.params;
        // Verificamos si el ID es válido según criterios
        if (!isValidID(id)) {                        
            return res.status(422).json({ message: "Not valid ID" });
        }

        const artista = await ArtistaMd.getById(id);
        if(!artista.length) return res.status(404).json({message:"Artista not Found"});
        res.status(200).json(artista);
    }

    static async deleteOne(req, res){
        const {id} = req.params
        // Verificamos si el ID es válido según criterios
        if (!isValidID(id)) return res.status(422).json({ message: "Not valid ID" });

        const result = await ArtistaMd.deleteOne(id);
        if(!result) return res.status(404).json({message:"Artista Not Found"});
        res.status(204); //artista eliminado
    }  
}
/* function isValidID(id) {
    // Para verificar si el ID es un número válido y está dentro del rango del 1 al 12
    const parsedID = parseInt(id);
    return !isNaN(parsedID) && parsedID >= 1 && parsedID <= 12;
}  */ 
function isValidID(id) {
    const parsedID = parseInt(id);
    return !isNaN(parsedID) && parsedID >= 1; // Permitir IDs mayores o iguales a 1
}







/* import { ArtistaMd } from "../models/artistaMd.js";

export class ArtistaCt{
    static async getAll(req, res){
        const {nombre} = req.query;
        const artistas = await ArtistaMd.getAll(nombre);
        artistas ?
        res.status(200).json(artistas)
        :
        res.status(404).json({message: "Artista Not Found"});
    }

    static async getById(req, res){
        const {id} = req.params;

        const artista = await ArtistaMd.getById(id);
        if(!artista.length) return res.status(404).json({message:"Artista not Found"});
        res.status(200).json(artista);
    }

    static async deleteOne(req, res){
        const {id} = req.params
        res.send(`Quiero borrar el artista con el ${id}`);
    }  
} 
 */

