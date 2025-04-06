// Graph1.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';

class Graph1 extends React.Component {
  render() {
    const { elements, type = "KG", word = "default", setNodesLen, setEdgesLen } = this.props;
    const nodes = elements.filter(ele => !ele.data.source);
    const edges = elements.filter(ele => ele.data.source);
    setNodesLen(nodes.length);
    setEdgesLen(edges.length);
    console.log("Number of nodes:", nodes.length);  // Output: 3

    let layout = {
      name: "random",
      directed: true,
      padding: 0,
      spacingFactor: Math.min(20, 0.5 + 0.1 * nodes.length),
      avoidOverlap: true,
      animate: true,
      fit: true,
      nodeDimensionsIncludeLabels: true,
      maximalAdjustments: 3,
    }

    let nodeBGColor = "#ffd000";
    if (type=="KG"){
        // layout.name = "random";
        nodeBGColor = "#ffd000";
    }
    if (type=="hypernym-tree"){
      // layout.name = "random";
      nodeBGColor = "#00ff51";
    }
    if(type=="hyponym-tree"){
      layout.name = "breadthfirst";
      layout.spacingFactor = 1,
      layout.maximalAdjustments = 1,
      nodeBGColor = "#00ddff";
    }
    return (
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%", }}
        layout={layout}
        wheelSensitivity={0.2}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: "data(label)",
              "background-color": nodeBGColor,
              "text-valign": "center",
              "text-halign": "center",
              color: "black",
              "font-size": "14px",
              shape: "rectangle",
              width: "mapData(label.length, 3, 15, 50, 150)",
              height: 30,
              padding: "5px",
            },
          },
          {
            selector: "edge",
            style: {
              "curve-style": "bezier",
              "target-arrow-shape": "triangle",
              "line-color": "#ffffff",
              "target-arrow-color": "#ff0000",
            },
          },
        ]}
      />
    );
  }
}

export default Graph1;
