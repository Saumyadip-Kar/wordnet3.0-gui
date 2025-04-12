//MenuButton.jsx
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client'; // 👈 use this, not ReactDOM.render
import React from 'react';
import Graph1 from "./Graph1";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function MenuButton({ info, infoType, setInfoType, setWordInfo, setNodesLen, setEdgesLen, treeInfo, setTreeInfo, setLoading, cyRef }) {

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

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100); // Give the browser some time
  };
  
  
  return (
    <div className="relative flex-shrink-0" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md justify-end"
      >
        ☰ Menu
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
                        // setLoading(true); //For showing the load screen spinner but will cause the submenu to disappear
                        try {
                          console.log(item.synset)
                          const response = await axios.post(`${backendUrl}/Hypernym-Tree`, { text: item.synset });
                          
                          if (response.data.KG) {
                    
                            //Using a nonreact way so it might create problems in future
                            const container = document.getElementById("graph-container");
                            if (container) {
                              const root = createRoot(container);  // ✅ this is new in React 18
                              root.render(
                                React.createElement(Graph1, { elements: response.data.KG, type:"hypernym-tree", word: item, setNodesLen: setNodesLen, setEdgesLen: setEdgesLen, cyRef:cyRef })
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
                          const response = await axios.post(`${backendUrl}/Hypernym-Tree-Text`, { text: item.synset });
                          
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
                        // setLoading(false);
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
                      className="p-2 hover:bg-cyan-300/70 cursor-pointer"
                      onClick={async () => {
                        // setLoading(true); //Show the spinner during fetching
                        //Creating node based hyper tree
                        try {
                          console.log(item.synset);
                          const response = await axios.post(`${backendUrl}/Hyponym-Tree`, { text: item.synset });
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
                                  setEdgesLen: setEdgesLen,
                                  cyRef: cyRef
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
                          const response = await axios.post(`${backendUrl}/Hyponym-Tree-Text`, { text: item.synset });
                          
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
                        // setLoading(false); //Hide the spinner when data is fetched
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
                        // setLoading(true);
                        //Creating node based hyper tree
                        try {
                          console.log(item.synset);
                          const response = await axios.post(`${backendUrl}/Meronym-Tree`, { text: item.synset });
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
                                  setEdgesLen: setEdgesLen,
                                  cyRef: cyRef
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
                          const response = await axios.post(`${backendUrl}/Meronym-Tree-Text`, { text: item.synset });
                          
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
                        // setLoading(false);
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
              setLoading(true);
              try {
                if (infoType === "text") {
                  const textData = treeInfo.join("\n");
                  const blob = new Blob([textData], { type: "text/plain" });
                  downloadBlob(blob, "tree_info.txt");
                } else if (infoType === "all-info") {
                  const jsonData = JSON.stringify(info, null, 2);
                  const blob = new Blob([jsonData], { type: "application/json" });
                  downloadBlob(blob, "info.json");
                } else {
                  console.warn("Unsupported infoType:", infoType);
                }
            
                // Export graph SVG
                if (cyRef.current && typeof cyRef.current.svg === "function") {
                  // Store previous styles to restore later if needed
                  const originalEdgeStyles = cyRef.current.edges().map(edge => ({
                    edge,
                    style: edge.style()
                  }));

                  // Temporarily set edge color to aqua
                  cyRef.current.edges().style({
                    'line-color': 'red',
                    'target-arrow-color': 'red',
                    //'source-arrow-color': 'aqua' // Optional if you use source arrows
                  });

                  // Export SVG
                  const svgContent = cyRef.current.svg({ scale: 1, full: true });

                  // Restore original edge styles
                  originalEdgeStyles.forEach(({ edge, style }) => edge.style(style));
                  const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
                  downloadBlob(svgBlob, "graph.svg");
                } else {
                  console.warn("Cytoscape instance or svg plugin not available.");
                }
              } catch (error) {
                console.error("Export failed:", error);
              } finally {
                setLoading(false);
                setOpen(false);
              }
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
