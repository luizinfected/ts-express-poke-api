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

    async createPokemon(req: Request): Promise<Pokemon> {
        const pokemonData: PokemonInterface = req.body;

        const imagePath = req.file?.path;  
        pokemonData.imagePath = imagePath;

        const pokemon = this.pokemonRepository.create(pokemonData);
        return await this.pokemonRepository.save(pokemon);
    }

    async updatePokemon(id: number,req: Request): Promise<Pokemon | null> {

        const pokemon = await this.pokemonRepository.findOneBy({ id });

        if (pokemon) {
            const pokemonData: Partial<PokemonInterface> = req.body

            if(req.file?.path){
                if(pokemon.imagePath){
                    try {
                        fs.unlinkSync(pokemon.imagePath)
                    } catch (error) {
                        console.error(`Erro ao deletar a imagem: ${error}`);
                    }
                }
            pokemonData.imagePath = req.file.path
            }

            const updatedPokemon = this.pokemonRepository.merge(pokemon, pokemonData);
            return await this.pokemonRepository.save(updatedPokemon);
        }
        return null;
    }

    async deletePokemon(id: number): Promise<boolean> {
        const pokemon = await this.pokemonRepository.findOneBy({id})

        if (pokemon) {
            if (pokemon.imagePath) {
                try {
                    fs.unlinkSync(pokemon.imagePath); 
                } catch (error) {
                    console.error(`Erro ao deletar a imagem: ${error}, \nVocê pode ignorar isso, essa mensagem só vai aparecer caso vc tenha deletado o pokemon com imagem, e deletado a imagem antes de apagar.`);
                }
            }
            const result = await this.pokemonRepository.delete(id);
            return result.affected !== 0;
        }
        return false;
    }

    async getAllPokemons(): Promise<Pokemon[]> {
        return await this.pokemonRepository.find();
    }

    async getPokemonById(id: number): Promise<Pokemon | null> {
        return await this.pokemonRepository.findOneBy({ id });
    }
}
