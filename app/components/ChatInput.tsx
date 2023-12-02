"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useGlobalContext } from "../context/store";
import { addNewMessage } from "../services/message";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { data: session } = useSession();
  const { messages, setMessages } = useGlobalContext();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = `24px`;
    }
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    setDisabled(true);
    const userChat = {
      chatID: chatId,
      text: input,
      name: "user",
    };

    const newMessages = [...messages, userChat];
    setMessages(newMessages);

    // Toast notification to say loading...
    const notification = toast.loading("ChatGPT is thinking ...");

    // fetch data of ChatBox
    setTimeout(async () => {
      // await addNewMessage({
      //   chatID: chatId,
      //   text: input,
      //   name: "user",
      // });
      const dataChatBox = {
        chatID: chatId,
        text: "Data test ChatBox",
        name: "ChatGPT",
      };

      setMessages([...messages, userChat, dataChatBox]);

      toast.success("ChatGPT has responded", {
        id: notification,
      });
      setDisabled(false);
    }, 2000);
  };
  return (
    <div className="bg-[#40414f] text-white rounded-xl text-sm m-4">
      <form onSubmit={sendMessage} className="py-4 pl-4 flex relative">
        <textarea
          className={`m-0 w-full overflow-hidden resize-none border-0 h-6 max-h-[200px] p-0 pr-10  focus:ring-0 focus-visible:ring-0 bg-transparent md:pr-12 pl-3 md:pl-0 focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300`}
          disabled={!session}
          value={prompt}
          onChange={(e) => {
            const textarea = document.querySelector("textarea");
            if (textarea) {
              if (textarea.scrollHeight > 200) {
                textarea.style.overflowY = "auto";
              } else if (textarea.scrollHeight === 180) {
                textarea.style.overflowY = "hidden";
              }
              textarea.style.height = `24px`;
              textarea.style.height = `${textarea.scrollHeight}px`;
            }
            setPrompt(e.target.value);
          }}
          placeholder="Send a message..."
        />
        <button
          disabled={!prompt || !session || disabled}
          type="submit"
          className=" absolute p-1 md:bottom-2 md:p-2 md:right-3 right-2 bottom-1.5 transition-colors disabled:opacity-40
           bg-[#11A37F] w-10 h-10 flexCenter hover:opacity-50 text-white font-bold rounded-md px-[10px] disabled:cursor-not-allowed disabled:bg-transparent"
        >
          <PaperAirplaneIcon className="h-5 w-5 -m-0.4 -rotate-0 " />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
