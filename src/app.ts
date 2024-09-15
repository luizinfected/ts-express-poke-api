import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db/database";
import pokemonRoutes from "./routes/routes";
import regionRoutes from "./routes/routes"; 

const app = express();
app.use(express.json());

// Conecte as rotas
app.use("/api", pokemonRoutes);
app.use("/api", regionRoutes); 

AppDataSource.initialize()
  .then(() => {
    app.listen(4000, () => {
      console.log("Servidor rodando em http://localhost:4000");
    });
  })
  .catch((error) => console.log("Erro ao iniciar o DataSource:", error));
