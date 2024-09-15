import { DataSource } from "typeorm";
import { Pokemon } from '../entity/Pokemon';
import { Region } from "../entity/Region";
import { Group } from "../entity/Group";
import { Trainer } from "../entity/Trainer";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "db_pokemons",
  synchronize: true,
  logging: false,
  entities: [Pokemon, Region, Group, Trainer],
  migrations: [],
  subscribers: [],
});
