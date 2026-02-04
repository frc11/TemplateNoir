import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize API
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getConciergeResponse = async (userPrompt: string): Promise<string> => {
  if (!ai) {
    // Graceful fallback if no API key is present
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Mis disculpas. Aún no estoy conectado a la red neuronal central. Por favor, consulte con la recepción para obtener una llave de acceso.");
      }, 1000);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp', // Updated to latest flash model
      contents: userPrompt,
      config: {
        systemInstruction: "Eres 'Noir', un Concierge de IA para un restaurante de lujo llamado 'NOIR DINING'. Tu tono es sofisticado, elegante, misterioso y extremadamente servicial. Ayudas a los invitados a elegir platos, maridajes de vinos o entender el ambiente. Mantén las respuestas concisas (menos de 50 palabras) y pulidas. Responde siempre en el idioma que te hablen, preferiblemente Español si el usuario inicia en Español.",
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "No he podido descifrar su solicitud. ¿Podría reformularla?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Mis disculpas. La conexión con la bodega subterránea es inestable. Por favor, para asistencia inmediata, llame a recepción.";
  }
};
