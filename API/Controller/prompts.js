import { GoogleGenerativeAI } from '@google/generative-ai';
import { Prompt } from '../Models/prompts.js';
import { User } from '../Models/user.js';
// use react markdown in frontend to show the promptin a format given by api 
// Initialize the GoogleGenerativeAI client with your API key
const genAI = new GoogleGenerativeAI('AIzaSyBf7--nw90xSkhcAiXn6Hbj0HZtRHsbUng');
const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const createRecipePrompt = async (req, res) => {
  try {
    const {  prompt ,timegiven,ingridientlist,healthstatus1,healthstatus2,healthstatuslist,cusine,specialcookinginst,type} = req.body;
    const userId = req.user
    // Call the Google Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Save the prompt and response to the database
    const promptEntry = new Prompt({
      userId:userId,
      timegiven,ingridientlist,healthstatus1,healthstatus2,healthstatuslist,cusine,specialcookinginst,type,
      prompts: [{ prompt, response }]
    });

    const savedPrompt = await promptEntry.save();
    let user = await User.findById(userId)
    if (!user) return res.json({message:"User Not Found ",sucess:false})
      user.used_prompts += 1;
     
     await user.save();
    // Send the response back to the frontend
    res.status(200).json({
      sucess: true,
      data: {
        _id: savedPrompt._id, // Include the _id of the created record
        prompt: savedPrompt.prompts[0].prompt,
        response: savedPrompt.prompts[0].response
      }
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({
      sucess: false,
      message: 'Error generating content',
      error: error.message
    });
  }
};

export const getrecipeHistory = async (req, res) => {
  try {
    const userId = req.user; 

    const userPrompts = await Prompt.find({ userId }).sort({ createdAt: -1 });

    if (!userPrompts || userPrompts.length === 0) {
      return res.status(404).json({ message: "No prompts found for this user", success: false });
    }

    // Send the response back to the frontend
    res.status(200).json({
      success: true,
      data: userPrompts
    });
  } catch (error) {
    console.error('Error retrieving recipe history:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving recipe history',
      error: error.message
    });
  }
};

export const getParticularRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId; 

    const recipe = await Prompt.findById(recipeId);

    if (!recipe || recipe.length === 0) {
      return res.status(404).json({ message: "No recipe found ", success: false });
    }

    // Send the response back to the frontend
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Error retrieving recipe :', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving recipe ',
      error: error.message
    });
  }
};