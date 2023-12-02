"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import { useGlobalContext } from "../context/store";
import { useRouter } from "next/navigation";

function SideBar() {
  const { data: session } = useSession();
  const { chats } = useGlobalContext();
  const router = useRouter();
  const handleSignOut = () => {
    router.push("/");
    setTimeout(() => {
      signOut();
    }, 500);
  };

  return (
    <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
      <div className="flex p-2 flex-1 flex-col h-screen">
        <div className="flex-1 overflow-auto">
          {/* NewChat */}
          <NewChat />
          {/* ModelSelection */}
          <div className="max-sm:hidden"></div>
          {/* {loading && (
            <div className="animate-pulse text-center mt-4">
              Loading Chats...
            </div>
          )} */}
          {/* Map thought the ChatRows */}
          {chats
            .map((chat) => {
              return <ChatRow key={chat._id} id={chat._id} />;
            })
            .reverse()}
        </div>
        {session && (
          <div className="flexCenter mb-2">
            <img
              onClick={handleSignOut}
              src={session?.user?.image!}
              alt="Profile pic"
              className="h-12 w-12 rounded-full cursor-pointer hover:opacity-50"
            />
            <h1 className="ml-2 max-sm:hidden">{session?.user?.name}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
