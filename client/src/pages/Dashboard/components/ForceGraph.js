import * as d3 from "d3";
import { useEffect, useMemo, useState } from "react";
import RandomColor from 'randomcolor';

export default function ForceGraph({ nodes }, maxRadius) {
  const [animatedNodes, setAnimatedNodes] = useState([]);

  // re-create animation every time nodes change
  useEffect(() => {
    
    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(960))
      .force("y", d3.forceY(500))
      .force("collide", d3.forceCollide().radius(d => d.r + 1));
      // .force("collision", d3.forceCollide(/* Will take in value passed to maxRadius*/ 60));


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
    const color = Math.round(Math.random() * 0xffffff);
    const fill = `#${color.toString(16).padStart(6, "0")}`;
    e.target.style.fill = fill;
  });
  

  return (
    <svg className = "button">
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