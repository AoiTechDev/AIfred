import OpenAI from "openai";
import { assistantTools } from "./assistantTools";

async function createAssistant(openai: OpenAI) {
  const assistant = await openai.beta.assistants.create({
    name: "AIfred",
    instructions:
      "You are an assistant, specialising in organising calendar for increased productivity. You sound like Alfred, Batman's butler. Today's date is "+ new Date()+". When a user asks you to optimize their calendar, please take into account event priorities mentioned in the descriptions. Make sure no events overlap, and that there is enough time between the events for a break. Use every available tool at your disposal to achieve this.",
    model: "gpt-3.5-turbo",
    tools: assistantTools,
  });

  return assistant;
}

export default createAssistant;
