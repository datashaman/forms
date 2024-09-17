import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI();

  if (!process.env.OPENAI_THREAD_ID) {
    return {
      messages: [],
    };
  }

  const messages = [];

  for await (const message of openai.beta.threads.messages.list(
    process.env.OPENAI_THREAD_ID,
    {
      order: "asc",
    },
  )) {
    messages.push(message);
  }

  return {
    messages,
  };
});
