import { Router } from "express";
import { PokemonController } from "../controller/pokemon_controller";
import { RegionController } from "../controller/region_controller";
import {GroupController} from "../controller/group_controller"

const pokemonController = new PokemonController();
const regionController = new RegionController()
const groupController = new GroupController()

const router = Router();

//pokemon
router.post("/pokemon", pokemonController.createPokemon);
router.patch("/pokemon/:id", pokemonController.updatePokemon);
router.delete("/pokemon/:id", pokemonController.deletePokemon);
router.get("/pokemons", pokemonController.getAllPokemons);

//region
router.post("/region", regionController.createRegion);

//group
router.post("/group", groupController.createGroup)
router.get("/group", groupController.getGroup)
router.patch("/group/:id", groupController.updateGroup)
router.delete("/group/:id", groupController.deleteGroup)

export default router;
