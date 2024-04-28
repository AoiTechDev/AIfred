import { AssistantResponse } from "ai";
import OpenAI from "openai";
import createAssistant from "./assistantCreate";
import { insertNewCalendarEvent } from "@/app/actions/action";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const dynamic = "force-dynamic";

const homeTemperatures = {
  bedroom: 20,
  "home office": 21,
  "living room": 21,
  kitchen: 22,
  bathroom: 23,
};

export async function POST(req: Request) {
  // Parse the request body

  const input: {
    threadId: string | null;
    message: string;
    currentDayEvents: any;
  } = await req.json();

  console.log(input.currentDayEvents);
  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  const assistant = await createAssistant(openai);

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.createAndStream(threadId, {
        assistant_id: assistant.id,
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              switch (toolCall.function.name) {
                case "addSimpleEvent": {
                  insertNewCalendarEvent(parameters);
                  return {
                    tool_call_id: toolCall.id,
                    output: toolCall.id.toString(),
                  };
                }
                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`
                  );
              }
            }
          );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs }
          )
        );
      }
    }
  );
}
