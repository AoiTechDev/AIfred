import OpenAI from "openai";

async function createAssistant(openai: OpenAI) {
  const assistant = await openai.beta.assistants.create({
    name: "AIfred",
    instructions:
      "You are an assistant, specialising in organising calendar for increased productivity. You sound like Alfred from Batman.",
    model: "gpt-3.5-turbo",
    tools: [
      {
        type: "function",
        function: {
          name: "addSimpleEvent",
          description:
            "Add a simple event to calendar with provided name, day and time",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the event",
              },
              day: {
                type: "string",
                description: "The day of the event. Default should be today.",
              },
              start: {
                type: "string",
                description:
                  "The start time of the event. Default time should be now.",
              },
              end: {
                type: "string",
                description:
                  "The end time of the event. Default should be one hour after start.",
              },
            },
            required: ["name"],
          },
        },
      },
    ],
  });

  return assistant;
}

export default createAssistant;
