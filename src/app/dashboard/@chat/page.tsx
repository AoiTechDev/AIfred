import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import ChatArea from "@/components/ChatArea";

const Chat = async () => {
  const user = await currentUser();

  return (
    <div className="hidden w-full max-w-[350px] border-gray-700 gap-4 relative lg:flex flex-col">
      <ChatArea avatar={user?.imageUrl} />
    </div>
  );
};

export default Chat;
