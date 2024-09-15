import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.regions)
  pokemon!: Pokemon;
}
