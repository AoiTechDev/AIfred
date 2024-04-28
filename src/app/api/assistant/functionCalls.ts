import { insertNewCalendarEvent } from "@/app/actions/action";
import {
  assistantDeleteEvent,
  assistantInsertNewCalendarEvent,
  assistantUpdateEvent,
} from "./assistantActions";

export default async function functionCaller(
  toolCall: any,
  currentDayEvents: any
) {
  const parameters = JSON.parse(toolCall.function.arguments);

  console.log("\n\n\nFUNCTION CALLED: " + toolCall.function.name);
  console.log("\nPARAMETERS: " + toolCall.function.arguments + "\n\n\n");

  switch (toolCall.function.name) {
    case "addEvent": {
      const newEvent = await assistantInsertNewCalendarEvent(parameters);
      return {
        tool_call_id: toolCall.id,
        output: JSON.stringify(newEvent),
      };
    }
    case "listTodaysEvents": {
      return {
        tool_call_id: toolCall.id,
        output: JSON.stringify(currentDayEvents),
      };
    }
    case "updateEvent": {
      const updatedEvent = await assistantUpdateEvent(
        parameters.event,
        parameters.newDescription,
        parameters.newStart,
        parameters.newEnd
      );

      return {
        tool_call_id: toolCall.id,
        output: JSON.stringify(updatedEvent),
      };
    }
    case "deleteEvent": {
      const deleteResponse = await assistantDeleteEvent(parameters.event);
      return {
        tool_call_id: toolCall.id,
        output: JSON.stringify(deleteResponse),
      };
    }
    default:
      throw new Error(`Unknown tool call function: ${toolCall.function.name}`);
  }
}
