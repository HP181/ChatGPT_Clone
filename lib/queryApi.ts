import openai from "./ChatGPT";

const query = async (Input: string, ChatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt: Input,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `ChatGPT is unable to find an answer of your Question :( (Error: ${err.message})`
    );
  return res;

};

export default query;
