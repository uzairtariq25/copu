
import { GoogleGenAI } from "@google/genai";
import { Task, AsyncUpdate, User } from "../types";

// Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTeamPulse(tasks: Task[], updates: AsyncUpdate[], members: User[]) {
  try {
    const prompt = `
      Act as a Chief Product Officer. Analyze the following team data and provide a concise "Team Pulse" summary.
      
      TEAM MEMBERS:
      ${JSON.stringify(members)}
      
      ACTIVE TASKS:
      ${JSON.stringify(tasks)}
      
      LATEST UPDATES:
      ${JSON.stringify(updates)}
      
      Provide your response in 3 short bullet points:
      1. Momentum Check (How fast are we moving?)
      2. Priority Alert (What's being ignored?)
      3. Blockers & Action Items (Who needs help right now?)
      
      Keep it professional yet encouraging.
    `;

    // Using gemini-3-flash-preview for basic text tasks as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        // Removed maxOutputTokens to follow guidelines recommending avoidance unless paired with thinkingBudget
      }
    });

    // Access the .text property directly (not as a method)
    return response.text || "Unable to generate pulse at this time.";
  } catch (error) {
    console.error("Gemini Pulse Error:", error);
    return "Error connecting to AI advisor. Please try again later.";
  }
}
