"use client";

import Message from "./Message";
import { useEffect } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "../context/store";
import { getAllMessage } from "../services/message";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { messages, setMessages } = useGlobalContext();
  useEffect(() => {
    const data = async () => {
      const result = await getAllMessage(chatId);
      return result;
    };
    data().then((result) => {
      const messages = result.data;
      const dataNew = messages.map((message) => {
        const { chatID, text, name } = message;
        return { chatID, text, name };
      });
      setMessages(dataNew);
    });
  }, []);
  console.log(messages);

  // const [messages] = useCollection(
  //   session &&
  //     query(
  //       collection(
  //         db,
  //         "users",
  //         session?.user?.email!,
  //         "chats",
  //         chatId,
  //         "messages"
  //       ),
  //       orderBy("createAt", "asc")
  //     )
  // );
  return (
    <div className="flex-1 overflow-auto">
      {messages?.length === 0 && (
        <>
          <p className="mt-10 text-center">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 animate-bounce" />
        </>
      )}

      {messages?.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </div>
  );
}

export default Chat;
