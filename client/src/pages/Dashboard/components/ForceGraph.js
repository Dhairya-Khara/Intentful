// This file adheres to the Single Responsibility Principle since it is only responsible to D3BubbleChart
import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function ForceGraph({ nodes, width, height }) {
  const [animatedNodes, setAnimatedNodes] = useState([]);

  // re-create animation every time nodes change
  useEffect(() => {
    
    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(3*width/2))
      .force("y", d3.forceY(height/2))
      .force("collide", d3.forceCollide().radius(d => d.r + 1));


    // update state on every frame
    simulation.on("tick", () => {
      setAnimatedNodes([...simulation.nodes()]);
    });
    
    // copy nodes into simulation
    simulation.nodes([...nodes]);
    // slow down with a small alpha
    simulation.alpha(0.1).restart();

    // stop simulation on unmount
    return () => simulation.stop();

  }, [nodes]);

  // change color on mouse click
  window.addEventListener("mouseup", (e) => {
    const color = Math.round(Math.random() * 0xffffff);
    const fill = `#${color.toString(16).padStart(6, "0")}`;
    e.target.style.fill = fill;
  });
  
  // var svg = 
  return (
    <svg className = "button">
      {animatedNodes.map((node) => (
        <circle 
          cx={node.x}
          cy={node.y}
          r={node.r}
          key={node.id}
          stroke="black"
          fill= "aliceblue"
          pointer-events="visiblePainted"
        />
      ))}
    </svg>
  );
}