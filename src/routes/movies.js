import {Router} from "express";
export const router = Router();
import data from "../data/data.json" assert {type: "json"};

router.get("/", (req, res) => {
    const {director, genre} = req.query;
    if(!director)return res.status(200).json({info: data});
    const filteredByDirector = data.filter(
        m =>
          m.director.toLowerCase().includes(director.toLowerCase()) &&
          m.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
      
    if (!filteredByDirector.length) {
        return res.status(404).json({ message: "No hay coincidencias" });
      } else {
        return res.status(200).json({ info: filteredByDirector });
      }
    });

router.get("/:id", (req, res) =>{
    res.json({message: "find by id"})
});

router.post("/", (req, res) =>{
    console.log(req.body);
})




// query params: /movies ?year=1234
// params: /movies/12