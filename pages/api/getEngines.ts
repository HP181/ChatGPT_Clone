import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../lib/ChatGPT";

type Options = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Options[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = await openai.listModels().then((res) => res.data.data);
  // console.log("models", models);
  // const modelOptions = models.map((model) => ({
  //   value: model.id,
  //   label: model.id,
  // }));

  const filterModels = models.filter((selectModel) => selectModel?.id === "gpt-3.5-turbo-instruct")

  const modelOptions = filterModels.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  // console.log("model options", modelOptions);

  // console.log("ms", a);
  res.status(200).json({
    modelOptions,
  });
}
