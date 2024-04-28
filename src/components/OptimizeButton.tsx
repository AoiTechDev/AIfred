"use client";

import { useCurrentDayAllEventsStore } from "@/store/store";
import { useAssistant } from "ai/react";
import React from "react";

const SendMessageButton = () => {
  const { currentEvents } = useCurrentDayAllEventsStore();
  const { submitMessage, status } = useAssistant({
    api: "/api/assistant",
    body: {
      currentDayEvents: currentEvents,
    },
  });

  const superPrompt =
    "Please optimize my schedule for the day. Take into account event priorities mentioned in the descriptions. Make sure no events overlap, and that there is enough time between the events for a break.";

  const formEvent: React.FormEvent<HTMLFormElement> = {
    preventDefault: () => {},
    currentTarget: document.createElement("form"),
    target: document.createElement("form"),
    nativeEvent: undefined,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    isDefaultPrevented: function (): boolean {
      throw new Error("Function not implemented.");
    },
    stopPropagation: function (): void {
      throw new Error("Function not implemented.");
    },
    isPropagationStopped: function (): boolean {
      throw new Error("Function not implemented.");
    },
    persist: function (): void {
      throw new Error("Function not implemented.");
    },
    timeStamp: 0,
    type: "",
  };

  return (
    <button
      type="button"
      disabled={status !== "awaiting_message"}
      className="w-full p-2 border-2 rounded-lg"
      onClick={() => {        
        submitMessage(formEvent);
      }}
    >
      OPTIMIZE MY DAY!
    </button>
  );
};

export default SendMessageButton;
