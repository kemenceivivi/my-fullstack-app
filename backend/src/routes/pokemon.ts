import { Router } from "express";
import { pokemonController } from "../controllers/pokemonController";
import {authenticateToken} from "../middleware/authenticateToken";

const pokemonRoutes: Router = Router();


pokemonRoutes.post('/catch', authenticateToken, pokemonController.catchPokemon);
pokemonRoutes.post('/release',authenticateToken, pokemonController.releasePokemon);
pokemonRoutes.get('/caught', authenticateToken, pokemonController.listCaughtPokemons);

export default pokemonRoutes;
