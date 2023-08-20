// const string = `{"Cue1": "Set an alarm for the same time every day", "Cue2": "Put your meditation cushion in a visible spot", "Cue3": "Put a reminder on your phone"}`;

// console.log(string)

// const s = JSON.parse(string);
// console.log(s)

// const valuesArray = [];

// for (const key in s) {
//   if (Object.prototype.hasOwnProperty.call(s, key)) {
//     valuesArray.push(s[key]);
//   }
// }

// console.log(valuesArray);

import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const habit = 'meditation'

const llm = new OpenAI({
    openAIApiKey: "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", // Replace with your OpenAI API key
    temperature: 0.2,
  });

  const cuePrompt = `Based on atomic habits book, give me 3 possible cues for the habit I give. The output should only contain JSON format: {"cue1": "", "cue2": "", "cue3": ""}. Don't give any other text. Habit: ${habit}`;

  const chain = new LLMChain({
    llm,
    prompt: PromptTemplate.fromTemplate(cuePrompt)
  });

  const response = await chain.run(`${habit}`);
  const json = JSON.parse(response)



const valuesArray = [];

for (const key in json) {
  if (Object.prototype.hasOwnProperty.call(json, key)) {
    valuesArray.push(json[key]);
  }
}

console.log(valuesArray);