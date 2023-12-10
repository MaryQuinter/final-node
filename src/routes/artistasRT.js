import {Router} from "express";
export const router = Router();

import { ArtistaCt } from "../controllers/artistasCt.js";

router.get("/", ArtistaCt.getAll);

router.get("/:id", (req, res) =>{
    res.json({message: "find by id"})
});

router.post("/", (req, res) =>{
    console.log(req.body); 
})




// query params: /movies ?year=1234
// params: /movies/12