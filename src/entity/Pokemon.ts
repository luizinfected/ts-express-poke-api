import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Region } from "./Region";
import { Group } from "./Group";

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  hp!: number;

  @Column()
  evolve!: boolean;

  @Column()
  mega_evolve!: boolean;

  @Column({ nullable: true })
  imagePath!: string;

  @ManyToOne(() => Region, (region) => region.pokemon)
  regions!: Region[];

  @ManyToOne(() => Group, (group) => group.pokemons)
  group!: Group;
}
