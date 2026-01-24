import { GoogleGenAI, Chat } from "@google/genai";

// Check if Gemini API key is configured
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const isGeminiConfigured = (): boolean => {
  return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 0;
};

// Initialize Gemini Client only if API key is available
// IMPORTANT: In a real production app, ensure API_KEY is restricted or proxied.
const ai = isGeminiConfigured() ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

const SYSTEM_INSTRUCTION = `
You are "Vaka", the friendly AI assistant for Vakalova Dental Clinic.
Your goal is to help potential patients with questions about the clinic.

Clinic Details:
- Name: Vakalova Dental Clinic
- Address: 123 Health Ave, Medical District, NY
- Hours: Mon-Fri 8am-6pm, Sat 9am-2pm, Sun Closed
- Phone: (555) 123-4567

Services: General Dentistry, Cosmetic (Whitening, Veneers), Orthodontics (Invisalign), Implants, Pediatric Care, Root Canals.
Dr. Vakalova is the lead dentist.

Guidelines:
- Be warm, professional, and empathetic.
- Keep answers concise (under 3 sentences usually).
- If someone asks to book, guide them to use the "Book Appointment" button on the website.
- Do not give specific medical diagnoses; suggest a consultation for pain or specific issues.
- Use emojis occasionally to be friendly 🦷 ✨.
`;

export const createChatSession = (): Chat | null => {
  if (!ai) {
    console.warn('Gemini API key is not configured. Chat assistant will be disabled.');
    return null;
  }
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};
