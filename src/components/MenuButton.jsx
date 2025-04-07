//MenuButton.jsx
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client'; // 👈 use this, not ReactDOM.render
import React from 'react';
import Graph1 from "./Graph1";

export default function MenuButton({ info, infoType, setInfoType, setWordInfo, setNodesLen, setEdgesLen, treeInfo, setTreeInfo }) {

  console.log("Dbg: checking in the menubutton:", info)
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  // After:
  const [hypernymMenuOpen, setHypernymMenuOpen] = useState(false);
  const [hyponymMenuOpen, setHyponymMenuOpen] = useState(false);
  const [meronymMenuOpen, setMeronymMenuOpen] = useState(false);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
      >
        Menu
      </button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-700/70 text-left text-base rounded-xl border shadow-lg z-20">
          <ul className="py-1 text-white">
            <li
              className="relative group p-2 hover:bg-sky-400/60 cursor-pointer text-base text-left rounded-xl"
              onMouseEnter={() => setHypernymMenuOpen(true)}
              onMouseLeave={() => setHypernymMenuOpen(false)}
            >
              Create Hypernym Tree
              {/* Submenu */}
              {hypernymMenuOpen && (
                <ul className="absolute left-full top-0 w-56 max-h-96 overflow-y-auto bg-gray-700/70 text-white-200 text-left text-base rounded-xl border">

                  {info.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-lime-400/70 cursor-pointer"
                      onClick={async () => {
                         //Creating node based hyper-tree
                        try {
                          console.log(item.synset)
                          const response = await axios.post("http://localhost:8000/Hypernym-Tree", { text: item.synset });
                          
                          if (response.data.KG) {
                    
                            //Using a nonreact way so it might create problems in future
                            const container = document.getElementById("graph-container");
                            if (container) {
                              const root = createRoot(container);  // ✅ this is new in React 18
                              root.render(
                                React.createElement(Graph1, { elements: response.data.KG, type:"hypernym-tree", word: item, setNodesLen: setNodesLen, setEdgesLen: setEdgesLen })
                              );
                            }
                          } else {
                            console.log("No hypernym tree found");
                          }
                          console.log("Response", response.data.KG);
                        } catch (error) {
                          console.error("Hypernym tree cannot be loaded", error);
                        }

                         //Creating text based hyper-tree
                        try {
                          console.log(item.synset)
                          const response = await axios.post("http://localhost:8000/Hypernym-Tree-Text", { text: item.synset });
                          
                          if (response.data.TreeInfo) {
                           setInfoType("text")
                           setTreeInfo([response.data.TreeInfo]);
                            
                          } else {
                            console.log("No hypernym tree found");
                          }
                          console.log(response.data.TreeInfo);
                        } catch (error) {
                          console.error("Hypernym tree text data cannot be loaded", error);
                        }
                      }}
                    >
                      {item.synset}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li
              className="relative group p-2 hover:bg-sky-400/60 cursor-pointer text-base text-left rounded-xl"
              onMouseEnter={() => setHyponymMenuOpen(true)}
              onMouseLeave={() => setHyponymMenuOpen(false)}
            >
              Create Hyponym Tree
              {/* Submenu */}
              {hyponymMenuOpen && (
                <ul className="absolute left-full top-0 w-56 max-h-96 overflow-y-auto bg-gray-700/70 text-white-200 text-left text-base rounded-xl border">
                  {info.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-amber-400/70 cursor-pointer"
                      onClick={async () => {
                        //Creating node based hyper tree
                        try {
                          console.log(item.synset);
                          const response = await axios.post("http://localhost:8000/Hyponym-Tree", { text: item.synset });
                          if (response.data.KG) {
                            const container = document.getElementById("graph-container");
                            if (container) {
                              const root = createRoot(container);
                              root.render(
                                React.createElement(Graph1, {
                                  elements: response.data.KG,
                                  type: "hyponym-tree",
                                  word: item,
                                  setNodesLen: setNodesLen,
                                  setEdgesLen: setEdgesLen
                                })
                              );
                            }
                          } else {
                            console.log("No hyponym tree found");
                          }
                          console.log("Response", response.data.KG);
                        } catch (error) {
                          console.error("Hyponym tree cannot be loaded", error);
                        }

                        //Creating text based hypo-tree
                        try {
                          const response = await axios.post("http://localhost:8000/Hyponym-Tree-Text", { text: item.synset });
                          
                          if (response.data.TreeInfo) {
                           setInfoType("text")
                           setTreeInfo([response.data.TreeInfo]);
                            
                          } else {
                            console.log("No hyponym tree found");
                          }
                          console.log(response.data.TreeInfo);
                        } catch (error) {
                          console.error("Hyponym tree text data cannot be loaded", error);
                        }
                      }}
                    >
                      {item.synset}
                    </li>
                  ))}
                </ul>
              )}
            </li>


            <li
              className="relative group p-2 hover:bg-sky-400/60 cursor-pointer text-base text-left rounded-xl"
              onMouseEnter={() => setMeronymMenuOpen(true)}
              onMouseLeave={() => setMeronymMenuOpen(false)}
            >
              Create Meronym Tree
              {/* Submenu */}
              {meronymMenuOpen && (
                <ul className="absolute left-full top-0 w-56 max-h-96 overflow-y-auto bg-gray-700/70 text-white-200 text-left text-base rounded-xl border">
                  {info.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-amber-400/70 cursor-pointer"
                      onClick={async () => {
                        //Creating node based hyper tree
                        try {
                          console.log(item.synset);
                          const response = await axios.post("http://localhost:8000/Meronym-Tree", { text: item.synset });
                          if (response.data.KG) {
                            const container = document.getElementById("graph-container");
                            if (container) {
                              const root = createRoot(container);
                              root.render(
                                React.createElement(Graph1, {
                                  elements: response.data.KG,
                                  type: "meronym-tree",
                                  word: item,
                                  setNodesLen: setNodesLen,
                                  setEdgesLen: setEdgesLen
                                })
                              );
                            }
                          } else {
                            console.log("No meronym tree found");
                          }
                          console.log("Response", response.data.KG);
                        } catch (error) {
                          console.error("Meronym tree cannot be loaded", error);
                        }

                        //Creating text based hypo-tree
                        try {
                          const response = await axios.post("http://localhost:8000/Meronym-Tree-Text", { text: item.synset });
                          
                          if (response.data.TreeInfo) {
                           setInfoType("text")
                           setTreeInfo([response.data.TreeInfo]);
                            
                          } else {
                            console.log("No meronym tree found");
                          }
                          console.log(response.data.TreeInfo);
                        } catch (error) {
                          console.error("Meronym tree text data cannot be loaded", error);
                        }
                      }}
                    >
                      {item.synset}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li
              className="p-2 hover:bg-sky-400/60 cursor-pointer text-base text-left rounded-xl"
              onClick={() => {
                setInfoType("similarity");
                setOpen(false);
              }}
            >
              Export Data
            </li>
          </ul>

        </div>
      )}
    </div>
  );
}
