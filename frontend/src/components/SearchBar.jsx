//SearchBar.jsx
import axios from "axios";
import { useState } from "react";
import Graph1 from "./Graph1";
import { createRoot } from 'react-dom/client'; // 👈 use this, not ReactDOM.render
const backendUrl = import.meta.env.VITE_BACKEND_URL;

import React from 'react';

export default function SearchBar({ word, setWord, setWordInfo, setInfoType, setElements, setNodesLen, setEdgesLen, setLoading, cyRef }) {
  const [input, setInput] = useState(word);

  const [suggestions, setSuggestions] = useState([]);


  const handleSearch = async () => {
    setLoading(true)
    //Fetching word info
    try {
      const response = await axios.post(`${backendUrl}/Info`, {
        text: input,
      });
      setWord(input); // Update main word state
      setWordInfo(response.data.Info); // Update definitions
      setInfoType("all-info")
      //For debugging
      console.log("Response")
      console.log(response.data.Info)
    } catch (error) {
      console.error("Error fetching definitions:", error);
      setWordInfo(["Failed to load definitions"]);
    }

    //Fetching Knowledge Graph -- look here
    try {
      const responseKG = await axios.post(`${backendUrl}/KG`, { text: input });
      if (responseKG.data.KG) {
        //setElements(responseKG.data.KG);  // ✅ Now updates state in App.jsx

        //Using a nonreact way so it might create problems in future
        const container = document.getElementById("graph-container");
        if (container) {
          const root = createRoot(container);  // ✅ this is new in React 18
          root.render(
            React.createElement(Graph1, { elements: responseKG.data.KG,type:"KG", word: input, setNodesLen: setNodesLen, setEdgesLen: setEdgesLen, cyRef:cyRef })
          );


    }
      } else {
        console.log("No knowledge graph data found");
      }
      console.log("Knowledge Graph Response", responseKG.data.KG);
    } catch (error) {
      console.error("Knowledge Graph cannot be loaded", error);
    }
    setLoading(false);
  };
  
    return (
      <div className="relative flex items-center space-x-2 p-4 bg-gray-800 rounded-md">
        <input
          type="text"
          value={input} // ✅ Controlled component
          className="flex-1 p-2 bg-gray-700 text-white rounded-2xl"
          placeholder="Search a word..."
          onChange={async (e) => {
            const value = e.target.value;
            setInput(value); // Update input field
          
            if (value.length > 1) { // Fetch suggestions only if length > 1
              try {
                const response = await axios.get(`${backendUrl}/suggestions?query=${value}`);
                setSuggestions(response.data.suggestions);
              } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
              }
            } else {
              setSuggestions([]); // Clear suggestions if input is empty or too short
            }
          }}
           // ✅ Update input state, NOT word state
        />
        
          {suggestions.length > 0 && (
          <ul className="absolute mt-1 top-full bg-gray-700/70 text-white-200 text-left text-base rounded-xl border">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className="p-2 hover:bg-sky-400/60 cursor-pointer text-base text-left rounded-xl"
                onClick={() => { setInput(suggestion); setSuggestions([]); }} // Select word
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <button 
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-2xl">
          Search
        </button>
      </div>
    );
  }
  