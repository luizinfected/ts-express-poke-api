import { Router } from "express";
import { PokemonController } from "../controller/pokemon_controller";
import { RegionController } from "../controller/region_controller";
import { GroupController } from "../controller/group_controller";
import { upload } from "../services/multer_config";

const pokemonController = new PokemonController();
const regionController = new RegionController();
const groupController = new GroupController();

const router = Router();

// Pokemon
router.post("/pokemon", upload.single('image'), pokemonController.createPokemon);  
router.patch("/pokemon/:id", upload.single('image'), pokemonController.updatePokemon);  
router.delete("/pokemon/:id", pokemonController.deletePokemon);
router.get("/pokemons", pokemonController.getAllPokemons);
router.get("/pokemon/:id", pokemonController.getPokemonById);

// Region
router.post("/region", regionController.createRegion);

// Group
router.post("/group", groupController.createGroup);
router.get("/group", groupController.getGroup);
router.patch("/group/:id", groupController.updateGroup);
router.delete("/group/:id", groupController.deleteGroup);

export default router;
