import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize API
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getConciergeResponse = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    // Graceful fallback if no API key is present for demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("I apologize, but I am currently offline. Please contact the front desk for immediate assistance.");
      }, 1000);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are 'Noir', an AI Concierge for a high-end luxury restaurant called 'NOIR DINING'. Your tone is sophisticated, elegant, slightly mysterious, and extremely helpful. You help guests choose dishes, wine pairings, or understand the ambiance. Keep responses concise (under 50 words) and polished.",
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster chat response
      }
    });
    
    return response.text || "I am unable to process that request at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our concierge service is momentarily unavailable.";
  }
};
