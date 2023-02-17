"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../Firebase";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  ChatId: string;
};

function ChatInput({ ChatId }: Props) {
  const [Input, setInput] = useState("");
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Input) return;

    const trinInput = Input.trim();
    setInput("");

    const message: Message = {
      text: trinInput,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        ChatId,
        "messages"
      ),
      message
    );

    // Toast Notification To say Loading
    const Notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/AskQuestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Input: trinInput,
        ChatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast Notification Succefull
      toast.success("ChatGPT has responded!", {
        id: Notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-white rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          type="text"
          placeholder="Type Your Message Here..."
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={Input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          disabled={!Input || !session}
          className="bg=[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden text-black">
        {/* <ModelSelection />   */}
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
