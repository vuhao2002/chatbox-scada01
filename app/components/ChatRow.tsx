import { TrashIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteChat, getAllNewChat } from "../services/newchat";
import { useGlobalContext } from "../context/store";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const { chats, setChats } = useGlobalContext();
  const [active, setActive] = useState(false);

  const removeChat = async () => {
    const newChats = chats.filter((e) => e._id !== id);
    setChats(newChats);
    router.replace("/");
    await DeleteChat(id);
  };

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  return (
    <div className={`flexCenter chatRow ${active && "bg-gray-700/50"}`}>
      <Link href={`/chat/${id}`} className="flex-1 flex py-3">
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 truncate md:inline-flex pl-2">
          {/* {massages?.docs[massages?.docs.length - 2]?.data().text || "New chat"} */}
          New Chat
        </p>
      </Link>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-600"
      />
    </div>
  );
}

export default ChatRow;
