import { AppDataSource } from "../db/database";
import { Pokemon } from "../entity/Pokemon";
import { Repository } from "typeorm";
import { PokemonInterface } from "../interfaces/interfaces";
import { Request } from "express";
import fs from "fs"

export class PokemonService {
    private pokemonRepository: Repository<Pokemon>;

    constructor() {
        this.pokemonRepository = AppDataSource.getRepository(Pokemon);
    }

    async createPokemon(pokemonData: PokemonInterface, req: Request): Promise<Pokemon> {
        const imagePath = req.file?.path;  
        pokemonData.imagePath = imagePath;

        const pokemon = this.pokemonRepository.create(pokemonData);
        return await this.pokemonRepository.save(pokemon);
    }

    async updatePokemon(id: number, pokemonData: Partial<PokemonInterface>, req: Request): Promise<Pokemon | null> {
        const pokemon = await this.pokemonRepository.findOneBy({ id });
        if (pokemon) {
            const pokemonData: Partial<PokemonInterface> = req.body

            if(req.file?.path){
                if(pokemon.imagePath){
                    fs.unlinkSync(pokemon.imagePath)
                }
            pokemonData.imagePath = req.file.path
            }   
            const updatedPokemon = this.pokemonRepository.merge(pokemon, pokemonData);
            return await this.pokemonRepository.save(updatedPokemon);
        }
        return null;
    }

    async deletePokemon(id: number): Promise<boolean> {
        const result = await this.pokemonRepository.delete(id);
        return result.affected !== 0;
    }

    async getAllPokemons(): Promise<Pokemon[]> {
        return await this.pokemonRepository.find();
    }
}
