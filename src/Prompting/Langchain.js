import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";


const llm = new OpenAI({
  openAIApiKey: "", // Replace with your OpenAI API key
  temperature: 0.4,
});

export async function generateCuesAndRewards(habit) {
  const data = { cues: [], rewards: [] };

  // Generate Cues
  const cuePrompt = `Based on atomic habits book, give me 3 possible cues for the habit I give. The output should only contain JSON format: {"cue1": "", "cue2": "", "cue3": ""}. Don't give any other text. Habit: ${habit}`;

  const cueChain = new LLMChain({
    llm,
    prompt: PromptTemplate.fromTemplate(cuePrompt),
  });

  const cueResponse = await cueChain.run(`${habit}`);
  const cueJson = JSON.parse(cueResponse);

  for (const key in cueJson) {
    if (Object.prototype.hasOwnProperty.call(cueJson, key)) {
      data.cues.push(cueJson[key]);
    }
  }

  // Generate Rewards
  const rewardPrompt = `Based on atomic habits book, give me 3 possible rewards a user can enjoy after completing the daily target for the habit I give. The output should only contain JSON format: {"reward1": "", "reward2": "", "reward3": ""}. Don't give any other text. Habit: ${habit}`;

  const rewardChain = new LLMChain({
    llm,
    prompt: PromptTemplate.fromTemplate(rewardPrompt),
  });

  const rewardResponse = await rewardChain.run(`${habit}`);
  const rewardJson = JSON.parse(rewardResponse);

  for (const key in rewardJson) {
    if (Object.prototype.hasOwnProperty.call(rewardJson, key)) {
      data.rewards.push(rewardJson[key]);
    }
  }

  return data;
}
