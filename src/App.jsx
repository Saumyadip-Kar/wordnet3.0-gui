//App.jsx

import { useEffect, useState } from 'react';
import axios from "axios";

import './App.css';
import Graph from "./components/Graph";
import Graph1 from './components/Graph1';
import SearchBar from "./components/SearchBar";
import DefinitionList from "./components/DefinitionList";
import ThemeToggle from "./components/ThemeToggle";
import Header from './components/Header';

function App() {
    const [word, setWord] = useState("");
    const [wordInfo, setWordInfo] = useState([]);  // ✅ Initialize as an empty array
    const [treeInfo, setTreeInfo] = useState([]);  // ✅ Initialize as an empty array
    const [elements, setElements] = useState([]);  // ✅ Move elements state here
    const [nodes_len, setNodesLen] = useState(0);
    const [edges_len, setEdgesLen] = useState(0);
    const [infoType, setInfoType] = useState("all-info");

    return (
        <div className="w-full h-full mx-auto flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white">
            <div className="w-full h-full mx-auto">
            <Header info={wordInfo} infoType={infoType} setInfoType={setInfoType} setWordInfo={setWordInfo} setNodesLen={setNodesLen} setEdgesLen={setEdgesLen} treeInfo={treeInfo} setTreeInfo={setTreeInfo}/>


                {/* Search Bar */}
                <SearchBar setWord={setWord} word={word} setWordInfo={setWordInfo} setInfoType={setInfoType} setElements={setElements} setNodesLen={setNodesLen} setEdgesLen={setEdgesLen}/>

                {/* Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 ">
                    {/* Left Panel (Word Definition & POS) */}
                    <div className="p-4 bg-gray-700 rounded-lg shadow-lg h-[70vh]">
                        <h2 className="text-xl font-bold">Senses of {word}</h2>
                        <DefinitionList word={word} info={wordInfo} type={infoType} treeInfo={treeInfo} setTreeInfo={setTreeInfo}/>

                        {/* Parts of Speech Section */}
                        {/* <h3 className="mt-4 text-lg font-semibold">Parts of Speech</h3>
                        <p className="text-gray-400">Noun / Verb / Adjective...</p> */}
                    </div>

                    {/* Right Panel (Synset Graph & Noun Forms) */}
                    <div className="p-4 bg-gray-700 rounded-lg shadow-lg h-[70vh]">
                        <h2 className="text-xl font-bold"> Synset Knowledge Graph : {nodes_len} nodes, {edges_len} edges</h2>
                        {/* <Graph1 elements={elements} word={word}/> */}
                        <div id="graph-container" className="p-4 bg-gray-800 rounded-lg shadow-lg h-[60vh]"></div>
                        {/* Noun Forms Section */}
                        {/* <h3 className="mt-4 text-lg font-semibold">Noun Forms</h3> */}
                        {/* <p className="text-gray-300">Related words go here...</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
