"use client";

import { useCurrentDayAllEventsStore } from "@/store/store";
import { Message, useAssistant } from "ai/react";
import Image from "next/image";
import { useEffect } from "react";
import logo from "@/assets/logo.png";
const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "black",
  function: "blue",
  assistant: "black",
  data: "orange",
  tool: "",
};

export default function ChatArea({ avatar }: { avatar: string | undefined }) {
  const { currentEvents } = useCurrentDayAllEventsStore();
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    setMessages,
  } = useAssistant({
    api: "/api/assistant",
    body: {
      currentDayEvents: currentEvents,
    },
  });

  useEffect(() => {
    // Add an initial message
    setMessages([
      {
        id: "unique-id", // Replace with a unique ID
        content:
          "Good day, sir! I am AIfred, your dedicated AI valet. How may I be of service to you today?",
        role: "assistant", // Or any other valid role
      },
    ]);
  }, []);


  return (
    <>
      <div className="h-full border-2  rounded-lg overflow-y-auto">
        {messages.map((m: Message) => (
          <div
            key={m.id}
            className={`${
              m.role === "user" ? "justify-end" : "justify-start"
            } whitespace-pre-wrap p-4 flex gap-2`}
            style={{ color: roleToColorMap[m.role] }}
          >
            {m.role === "user" ? (
              <div className="shrink-0 order-2">
                <Image
                  className=" rounded-full flex "
                  src={avatar ? avatar : ""}
                  alt="user"
                  width={48}
                  height={48}
                />
              </div>
            ) : (
              <div className="shrink-0 order-2">
                <Image
                  className=" rounded-full flex "
                  src={logo ? logo : ""}
                  alt="user"
                  width={48}
                  height={48}
                />
              </div>
            )}

            <div
              className={`${
                m.role === "user" ? "order-1" : "order-2"
              } border-2 p-2 rounded-lg  bg-gray-200`}
            >
              {m.content}
            </div>
            {m.role === "data" && (
              <>
                {/* here you would provide a custom display for your app-specific data:*/}
                {(m.data as any).description}
                <br />
                <pre className={"bg-gray-200"}>
                  {JSON.stringify(m.data, null, 2)}
                </pre>
              </>
            )}
            <br />
            <br />
          </div>
        ))}

        {status === "in_progress" && (
          <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
        )}
      </div>
      <form onSubmit={submitMessage}>
        <input
          disabled={status !== "awaiting_message"}
          className="w-full p-2 border-2  rounded-lg"
          value={input}
          placeholder="Create a event called Hackathon."
          onChange={handleInputChange}
        />
      </form>
    </>
  );
}
