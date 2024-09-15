import { AppDataSource } from "../db/database";
import { Group } from "../entity/Group";
import { Pokemon } from "../entity/Pokemon";
import { GroupInterface } from "../interfaces/interfaces";

export class GroupService {
    private groupRepository = AppDataSource.getRepository(Group);
    private pokemonRepository = AppDataSource.getRepository(Pokemon);

    async createGroup(
        groupData: GroupInterface
    ): 
        Promise<Group> 
    {
        const { name, pokemons } = groupData;

        const pokemonIds = pokemons.map((pokemon: { id: number }) => pokemon.id);

        const existingPokemons = await this.pokemonRepository.find({
            where: pokemonIds.map(id => ({ id })),
        });

        if (existingPokemons.length !== pokemons.length) {
            throw new Error("Algum dos pokémons não foi encontrado");
        }

        const group = new Group();
        group.name = name;
        group.pokemons = existingPokemons;

        const result = await this.groupRepository.save(group);
        return result;
    }

    async getGroup(): 
        Promise<Group[]>
    {
        const group = await this.groupRepository.find()
        return group
    }

    async updateGroup(
        id: number, 
        groupData: Partial<GroupInterface>
    ): 
        Promise<Group | null> 
    {
        const group = await this.groupRepository.findOneBy({ id });
        if (group) {
            const updatedGroup = this.groupRepository.merge(group, groupData);
            return await this.groupRepository.save(updatedGroup);
        }
        return null;
    }

    async deleteGroup(
        id:number
    ): 
        Promise<boolean>
    {
        const deleteGroup = await this.groupRepository.delete(id)
        return deleteGroup.affected !== 0;
    }
}

