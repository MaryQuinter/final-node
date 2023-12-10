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
}