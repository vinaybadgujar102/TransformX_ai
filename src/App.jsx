import React, { useState } from "react";
import List from "./components/List";
import { generateCuesAndRewards } from "./Prompting/Langchain.js"; // Import the module

const App = () => {
  const [data, setData] = useState({ cues: [], rewards: [] });
  const [habit, setHabit] = useState("");

  const handleHabitChange = (event) => {
    setHabit(event.target.value);
  };

  const handleClick = async () => {
    const newData = await generateCuesAndRewards(habit);
    setData(newData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter habit"
        value={habit}
        onChange={handleHabitChange}
      />
      <button onClick={handleClick}>Generate</button>

      <div>
        <h1>Cues for {habit}</h1>
        <List response={data.cues} />
      </div>

      <div>
        <h1>Rewards for {habit}</h1>
        <List response={data.rewards} />
      </div>
    </div>
  );
};

export default App;
