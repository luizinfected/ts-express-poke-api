import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column()
  // pokemonList!: [];

}


  
