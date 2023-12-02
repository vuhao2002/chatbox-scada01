"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addNewChat } from "../services/newchat";
import { useGlobalContext } from "../context/store";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  const { chats, setChats } = useGlobalContext();
  const createNewChat = async () => {
    const data = await addNewChat({
      userID: session?.user?.email!,
    });
    const newData = {
      _id: data._id,
    };
    setChats([...chats, newData]);
  };

  return (
    <div
      onClick={createNewChat}
      className="chatRow border-gray-700 border py-3"
    >
      <PlusIcon className="h-4 w-4" />
      <p className="ml-2 max-sm:hidden">New Chat</p>
    </div>
  );
}

export default NewChat;
