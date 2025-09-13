import OpenAI from "openai";
import { Prompt } from "../Models/prompts.js";
import { User } from "../Models/user.js";
import dotenv from "dotenv";
dotenv.config();

// Initialize Groq client
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // put your Groq API key in .env
  baseURL: "https://api.groq.com/openai/v1"
});

export const createRecipePrompt = async (req, res) => {
  try {
    const {
      prompt,
      timegiven,
      ingridientlist,
      healthstatus1,
      healthstatus2,
      healthstatuslist,
      cusine,
      specialcookinginst,
      type,
    } = req.body;

    const userId = req.user;

    // Call Groq API
    const result = await client.chat.completions.create({
      model: "llama-3.1-70b-versatile", // Groq model
      messages: [{ role: "user", content: prompt }],
    });

    const response = result.choices[0].message.content;

    // Save to DB
    const promptEntry = new Prompt({
      userId,
      timegiven,
      ingridientlist,
      healthstatus1,
      healthstatus2,
      healthstatuslist,
      cusine,
      specialcookinginst,
      type,
      prompts: [{ prompt, response }],
    });

    const savedPrompt = await promptEntry.save();

    let user = await User.findById(userId);
    if (!user) return res.json({ message: "User Not Found", success: false });

    user.used_prompts += 1;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: savedPrompt._id,
        prompt: savedPrompt.prompts[0].prompt,
        response: savedPrompt.prompts[0].response,
      },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      success: false,
      message: "Error generating content",
      error: error.message,
    });
  }
};

export const getrecipeHistory = async (req, res) => {
  try {
    const userId = req.user;
    const userPrompts = await Prompt.find({ userId }).sort({ createdAt: -1 });

    if (!userPrompts || userPrompts.length === 0) {
      return res.status(404).json({
        message: "No prompts found for this user",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: userPrompts,
    });
  } catch (error) {
    console.error("Error retrieving recipe history:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving recipe history",
      error: error.message,
    });
  }
};

export const getParticularRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Prompt.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        message: "No recipe found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error("Error retrieving recipe:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving recipe",
      error: error.message,
    });
  }
};
