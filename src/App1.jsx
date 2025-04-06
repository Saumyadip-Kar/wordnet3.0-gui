import { useEffect, useState } from 'react'

import './App.css'
import axios from "axios";
import Graph from "./Graph1";

function App() {

  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http:///localhost:8000/messages")
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleReverse = async () => {
    try {
      const response = await axios.post("http://localhost:8000/reverse", { text });
      setText(response.data.reversed_text); // Update input box with reversed text
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-xl font-bold text-blue-400">React@vite + Tailwind + FastAPI + Cytoscape</h1>
      <p className="mt-4 text-lg">{message || "Loading..."}</p>

      <h1 className="text-2xl font-bold mb-4">Reverse String App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border rounded text-white"
      />
      <button
        onClick={handleReverse}
        className="mt-2 p-2 bg-white-500 rounded hover:bg-blue-700"
      >
        Reverse String
      </button>
      <h1 className="text-2xl font-bold mb-4">Cytoscape.js Test</h1>
      <Graph />
    </div>
    

  );
}

export default App
