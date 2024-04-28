import { AssistantTool } from "openai/resources/beta/assistants.mjs";

export const assistantTools: AssistantTool[] = [
  {
    type: "function",
    function: {
      name: "addEvent",
      description: "Add an event to calendar with provided name, day and time",
      parameters: {
        type: "object",
        properties: {
          description: {
            type: "string",
            description: "The name of the event",
          },
          start: {
            type: "string",
            description:
              "The start time of the event. Default time should be now.",
          },
          end: {
            type: "string",
            description:
              "The end time of the event. If not provided, should be one hour after start.",
          },
        },
        required: ["description", "start"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteEvent",
      description: "Delete an event specified by user.",
      parameters: {
        type: "object",
        properties: {
          event: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier of the event",
              },
              summary: {
                type: "string",
                description: "A brief summary or title of the event",
              },
              start: {
                type: "object",
                properties: {
                  dateTime: {
                    type: "string",
                    description:
                      "The start date and time of the event in ISO 8601 format",
                  },
                },
              },
              end: {
                type: "object",
                properties: {
                  dateTime: {
                    type: "string",
                    description:
                      "The end date and time of the event in ISO 8601 format",
                  },
                },
              },
            },
            required: ["id", "summary", "start", "end"],
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "listTodaysEvents",
      description: "List events from the calendar requested by the user.",
    },
  },
  {
    type: "function",
    function: {
      name: "updateEvent",
      description:
        "You are to update the event as requested by user. The event can be moved to a different date or hour, and the description can also",
      parameters: {
        type: "object",
        properties: {
          event: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The unique identifier of the event",
              },
              summary: {
                type: "string",
                description: "A brief summary or title of the event",
              },
              start: {
                type: "object",
                properties: {
                  dateTime: {
                    type: "string",
                    description:
                      "The start date and time of the event in ISO 8601 format",
                  },
                },
              },
              end: {
                type: "object",
                properties: {
                  dateTime: {
                    type: "string",
                    description:
                      "The end date and time of the event in ISO 8601 format",
                  },
                },
              },
            },
            required: ["id", "summary", "start", "end"],
          },
          newDescription: {
            type: "string",
            description:
              "The new description of the event. If not indicated by the user, leave undefined.",
          },
          newStart: {
            type: "string",
            description:
              "The new start time of the event indicated by the user.",
          },
          newEnd: {
            type: "string",
            description:
              "The new end time of the event, if indicated by the user. Default should be one hour after start.",
          },
        },
        required: ["event"],
      },
    },
  },
];
