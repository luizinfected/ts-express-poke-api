export interface IdParams {
  id: string;
}

export interface GroupInterface {
  name: string;
  pokemons: [];
}

export interface PokemonInterface {
  name: string;
  type: string;
  hp: number;
  evolve: boolean;
  imagePath?: string;
  mega_evolve: boolean;
  region: number;
}

export interface RegionInterface {
  name: string;
}
