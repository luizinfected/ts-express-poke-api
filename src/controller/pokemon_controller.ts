import { Request, Response } from "express";
import { PokemonService } from "../services/pokemon_service";

export class PokemonController {
    private pokemonService: PokemonService;

    constructor() {
        this.pokemonService = new PokemonService();
    }

    createPokemon = async (req: Request, res: Response) => {
        try {
            const pokemon = await this.pokemonService.createPokemon(req);
            res.status(201).send({ result: pokemon });
        } catch (error) {
            res.status(500).send({ error: "Erro ao criar o Pokémon" });
        }
    };

    updatePokemon = async (req: Request<{ id: string }>, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const updatedPokemon = await this.pokemonService.updatePokemon(id, req);
            if (updatedPokemon) {
                res.status(201).send({ result: updatedPokemon });
            } else {
                res.status(404).send({ error: "Pokémon não encontrado" });
            }
        } catch (error) {
            res.status(500).send({ error: "Erro ao atualizar o Pokémon" });
        }
    };

    deletePokemon = async (req: Request<{ id: string }>, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const success = await this.pokemonService.deletePokemon(id);
            if (success) {
                res.status(201).send({ message: "Pokémon deletado com sucesso" });
            } else {
                res.status(404).send({ error: "Pokémon não encontrado" });
            }
        } catch (error) {
            res.status(500).send({ error: "Erro ao deletar o Pokémon" });
        }
    };

    getAllPokemons = async (req: Request, res: Response) => {
        try {
            const pokemons = await this.pokemonService.getAllPokemons();
            res.send(pokemons);
        } catch (error) {
            res.status(500).send({ error: "Erro ao buscar Pokémons" });
        }
    };

    getPokemonById = async (req: Request<{id: string}>, res: Response) => {
        const id = parseInt(req.params.id)
        try {
            const pokemons = await this.pokemonService.getPokemonById(id);
            res.send(pokemons);
        } catch (error) {
            res.status(500).send({ error: "Erro ao buscar Pokémons" });
        }
    };
}
