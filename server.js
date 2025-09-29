// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import bruxosRoutes from "./src/Routes/bruxosRoutes.js"

const app = express();
app.use(express.json());


dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.use("/bruxos", bruxosRoutes)

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});