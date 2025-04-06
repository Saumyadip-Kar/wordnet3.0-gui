//Graph.jsx
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useRef } from "react";

export default function Graph({ elements, word }) { 

  return (
    <CytoscapeComponent
      key={word} // force re-init when elements change
      elements={elements}
      style={{ width: "100%", height: "300px" }}
      layout={{ 
        name: "breadthfirst",
        directed: true,
        padding: 1,  // Adds space between nodes
        spacingFactor: 1,  // Controls spacing between levels
        avoidOverlap: true,  // Ensures nodes don’t overlap
        animate: true,  // Adds animation for better visualization
        fit: false,  // Ensures the graph is properly sized in the viewport
        nodeDimensionsIncludeLabels: true, // Considers labels in spacing
        maximalAdjustments: 3,  // Helps in avoiding overlaps further
      }}
      
      wheelSensitivity={0.2}
      stylesheet={[
        {
            selector: "node",
            style: {
                label: "data(label)",
                "background-color": "#ff5500",
                "text-valign": "center",
                "text-halign": "center",
                "color": "white",
                "font-size": "14px",
                "shape": "rectangle",
                "width": "mapData(label.length, 3, 15, 50, 150)",  // Dynamically map width
                "height": 30, // Fixed height (or adjust if needed)
                "padding": "5px",
            },
          },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "line-color": "#ddd",
            "target-arrow-color": "#ddd",
          },
        },
      ]}
    />
  );
}
