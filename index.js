import express from "express";
import {router as artistasRT} from "./src/routes/artistasRT.js";
import dotenv from "dotenv";
dotenv.config(); 


 
const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json()); 
app.listen(PORT, err => {
    console.log( 
        err
        ? `Ocurrió un error: ${err}` 
        : `Servidor corre en http://localhost:${PORT}`     
    );
});

app.use("/artistas", artistasRT); //nombre del archivo enrutador que estamos definiendo);
//nombre del archivo enrutador que estamos definiendo);