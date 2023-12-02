"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import { useSession } from "next-auth/react";
import { getAllNewChat } from "../services/newchat";

type ChatType = {
  _id: string;
};

type MessagesType = {
  chatID: string;
  text: string;
  name: string;
};

interface ContextProps {
  chats: ChatType[];
  setChats: Dispatch<SetStateAction<ChatType[]>>;
  messages: MessagesType[];
  setMessages: Dispatch<SetStateAction<MessagesType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  chats: [],
  setChats: (): ChatType[] => [],
  messages: [],
  setMessages: (): MessagesType[] => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [chats, setChats] = useState<[] | ChatType[]>([]);
  const [messages, setMessages] = useState<[] | MessagesType[]>([]);

  const { data: session } = useSession();
  useEffect(() => {
    if (session && session !== undefined) {
      const data = async () => {
        const result = await getAllNewChat(session?.user?.email);
        return result;
      };
      data().then((result) => {
        const messages = result.data;
        const dataNew = messages.map((message) => {
          const _id = message._id;
          return { _id };
        });
        setChats(dataNew);
      });
    }
  }, [session]);
  return (
    <GlobalContext.Provider value={{ chats, setChats, messages, setMessages }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
