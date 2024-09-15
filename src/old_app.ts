//api
import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";

//connection
import { AppDataSource } from "./db/database";

//model
import { Pokemon } from './entity/Pokemon';
import { Region } from "./entity/Region";

//interface
import {GroupInterface, IdParams, PokemonInterface} from "./interfaces/interfaces"

const app = express();
app.use(express.json());


AppDataSource.initialize()
  .then(async () => {
    const pokemonRepository = AppDataSource.getRepository(Pokemon);
    const regionRepository = AppDataSource.getRepository(Region)

                                     //parametro | req.query(consulta | req.body)
   app.post("/group/:id", async (req: Request< IdParams, {}, GroupInterface>, res: Response) => {
       const { pokemon, id } = req.body;

       // Lógica para criar o grupo usando `name` e `description`
       res.status(201).json({ message: "Grupo criado com sucesso" });
     }
   );

     app.post("/pokemon", async (req: Request<{}, {}, PokemonInterface>, res: Response) => {
       try {
            const pokemon = pokemonRepository.create(req.body);
            const result = await pokemonRepository.save(pokemon);
            res.status(201).send({ result });
       } catch (error) {
            res.status(500).send({ error: "Erro ao criar o Pokémon" });
       }
     });

    app.post('/region', async (req, res) => {
        try{
            const region = regionRepository.create(req.body)
            const result = await regionRepository.save(region)
            res.status(201).send({result})
        }catch(error){
            res.status(500).send({ error: "Erro ao criar region" });
        }
    })

  
    
    app.delete('/pokemon/:id', async (req, res)=>{
        const id = parseInt(req.params.id)
        try {
            const result = await pokemonRepository.delete(id)
            res.status(201).send({ result });
        } catch (error) {
            res.status(500).send({ error: "Erro ao deletar o Pokémon" });
        }
    })

    app.patch('/pokemon/:id', async(req, res)=> {
        const id = parseInt(req.params.id);
        try {
            const pokemon: any = await pokemonRepository.findOneBy({ id : id });
            const updatePokemon = pokemonRepository.merge(pokemon, req.body)
            const result = await pokemonRepository.save(updatePokemon)
            res.status(201).send({ result });
        } catch (error) {
            res.status(500).send({ error: "Erro ao atualizar o Pokémon" });
        }
        
    })

    app.get("/pokemons", async (req, res ) => {
        try{
            const pokemons = await pokemonRepository.find();
            res.send(pokemons);
        }catch(error){
            res.status(500).send({ error: "Erro ao buscar Pokemons" });
        }
        });

    app.listen(4000, () => {
        console.log("Servidor rodando em http://localhost:4000");
        });
    })
    .catch((error) => console.log("Erro ao iniciar o DataSource:", error));
