// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import AdminDb from "../../FirebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { Input, ChatId, model, session } = req.body;

  if (!Input) {
    res.status(400).json({ answer: "Please Provie an Input" });
  }

  if (!ChatId) {
    res.status(400).json({ answer: "Please Provie avalid chat ID!" });
  }
  // ChatGPT Query
  const response = await query(Input, ChatId, model);

  const message: Message = {
    text:
      response || "ChatGPT is unable to find an answer of your Question :( ",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await AdminDb.collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(ChatId)
    .collection("messages")
    .add(message);
  res.status(200).json({ answer: message.text });
}
