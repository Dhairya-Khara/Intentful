import * as d3 from "d3";
import { useEffect, useState } from "react";
import RandomColor from 'randomcolor';

export default function ForceGraph({ nodes }, maxRadius) {
  const [animatedNodes, setAnimatedNodes] = useState([]);

  // re-create animation every time nodes change
  useEffect(() => {
    
    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(1500))
      .force("y", d3.forceY(500))
      .force("collision", d3.forceCollide(60 /* will take in maxRadius */));

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

  window.addEventListener("mouseup", (e) => {
    // Let's pick a random color between #000000 and #FFFFFF
    const color = Math.round(Math.random() * 0xffffff);
  
    // Let's format the color to fit CSS requirements
    const fill = `#${color.toString(16).padStart(6, "0")}`;
  
    // Let's apply our color in the
    // element we actually clicked on
    e.target.style.fill = fill;
  });
  

  return (
    <svg class = "button">
      {animatedNodes.map((node) => (
        <circle 
          cx={node.x}
          cy={node.y}
          r={node.r}
          key={node.id}
          stroke="black"
          fill={RandomColor()}
          pointer-events="visiblePainted"
        />
      ))}
    </svg>
  );
}