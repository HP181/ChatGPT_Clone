"use client";

import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  const SignOut = () => {
    
  }

  return (
    <div className="p-2 flex flex-col  overflow-y-hidden h-screen sticky">
      <div className="flex-1">
        <div>
          {/* <NewChat /> */}
          <NewChat />

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
            {/* Map through the ChatRows  */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <img
          src={session.user?.image!}
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          onClick={() => signOut({callbackUrl : "/"})}
          alt="User Image"
        />
      )}
    </div>
  );
}

export default Sidebar;
