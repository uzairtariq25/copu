
import { GoogleGenAI } from "@google/genai";
import { Task, AsyncUpdate, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTeamPulse(tasks: Task[], updates: AsyncUpdate[], members: User[]) {
  try {
    const prompt = `
      Act as a world-class Chief Product Officer (CPO). Your goal is to provide a "Momentum Check" for the team based on raw data.
      
      CONTEXT:
      - Team Members: ${members.map(m => `${m.name} (${m.role})`).join(', ')}
      - Active Tasks: ${JSON.stringify(tasks)}
      - Latest Async Updates: ${JSON.stringify(updates)}
      
      OUTPUT FORMAT:
      Provide a highly professional summary in 3 distinct sections:
      🚀 MOMENTUM: How much progress was made in the last 24h?
      ⚠️ RISKS: Identify any bottlenecks or specific tasks that are stalling.
      🎯 FOCUS: What should the team prioritize in the next 4 hours to maximize impact?
      
      Tone: Assertive, data-driven, and inspiring. Avoid fluff.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.65,
      }
    });

    return response.text || "Momentum report currently unavailable.";
  } catch (error) {
    console.error("Gemini Pulse Error:", error);
    return "The AI advisor is currently offline. Review the board manually for risks.";
  }
}
