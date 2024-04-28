import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import ChatArea from "@/components/ChatArea";

const Chat = async () => {
  const user = await currentUser();

  return (
    <div className="pb-12 w-full min-h-[540px] lg:min-h-max lg:max-w-[350px] border-gray-700 gap-4 relative lg:pb-0 lg:flex flex-col">
      <ChatArea avatar={user?.imageUrl} />
    </div>
  );
};

export default Chat;
