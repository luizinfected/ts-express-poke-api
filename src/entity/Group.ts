import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.group)
  pokemons!: Pokemon[];
}
