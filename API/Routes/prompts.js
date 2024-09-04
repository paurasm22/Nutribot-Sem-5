import express from 'express';
import { createRecipePrompt, getParticularRecipe, getrecipeHistory } from '../Controller/prompts.js';
import { Authenticated } from '../Middleware/auth.js'
const router = express.Router();

router.post('/generate-recipe',Authenticated, createRecipePrompt);
router.get('/getrecipes',Authenticated, getrecipeHistory);
router.get('/getprecipe/:recipeId',Authenticated, getParticularRecipe);

export default router;
