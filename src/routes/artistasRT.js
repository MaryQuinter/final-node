import {Router} from "express";
export const router = Router();

import { ArtistaCt } from "../controllers/artistasCt.js";

router.get("/", ArtistaCt.getAll);

router.get("/:id", ArtistaCt.getById);

router.delete("/:id", ArtistaCt.deleteOne);

router.post("/", ArtistaCt.addOne); 





// query params: /movies ?year=1234
// params: /movies/12