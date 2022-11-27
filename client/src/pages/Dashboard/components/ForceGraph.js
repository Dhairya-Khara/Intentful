import * as d3 from "d3";
import { useEffect, useState } from "react";
import ModalReact from "./ModalReact";

export default function ForceGraph({ nodes, width, height }) {
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [intentName, setIntentName] = useState("");
  const [intentFrequency, setIntentFrequency] = useState(0);
  const [intentAssociates, setIntentAssociates] = useState("");

  // re-create animation every time nodes change
  useEffect(() => {

    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(width))
      .force("y", d3.forceY(height/2))
      .force("collide", d3.forceCollide().radius(d => d.r + 1));
 
    simulation.on("tick", () => {
      setAnimatedNodes([...simulation.nodes()]);
    });

    simulation.nodes([...nodes]);

    simulation.alpha(0.1).restart();

    return () => simulation.stop();

  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [nodes]);

  const onClick = (e) => {
      // idString is in this format: "{intentName},{intentFrequency},{intentAssociates}"
      let idString = JSON.parse(JSON.stringify(e.target.id))
      const iN = idString.substring(0, idString.indexOf(","))
      idString = idString.substring(idString.indexOf(",") + 1)
      const iF = idString.substring(0, idString.indexOf(","))
      idString = idString.substring(idString.indexOf(",") + 1)
      let iA = idString
      if (iA.length === 0) {iA = "None"}
      //intentAssociates is in this format: "{associate1},{frequency1},{associate2},{frequency2},..."

      setIntentName(iN)
      setIntentFrequency(iF)
      setIntentAssociates(iA)

      setModalOpen(true)
  }

  return (
    <div width="1500" height="1000">
      {modalOpen && <ModalReact setOpenModal={setModalOpen} intentName={intentName} intentFrequency={intentFrequency} intentAssociates={intentAssociates} />}
      <svg className="button" svg width={width} height={height}>
        {animatedNodes.map((node) => (
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              key={node.id}
              stroke="black"
              fill={"AliceBlue"}
              pointerEvents="visiblePainted"
              id={node.id}
              onClick={onClick}
            />
        ))}
      </svg>
      
    </div>
  );
}