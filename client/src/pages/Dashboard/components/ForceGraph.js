import * as d3 from "d3";
import { useEffect, useState } from "react";
//import Modal from "./Modal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalReact from "./ModalReact";

export default function ForceGraph({ nodes, width, height }) {
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [intentName, setIntentName] = useState("");
  const [intentFrequency, setIntentFrequency] = useState(0);
  const [intentAssociates, setIntentAssociates] = useState("");

  // re-create animation every time nodes change
  useEffect(() => {

    // const onClick = (e) => {
    //   console.log(e.target.id)
    // }

    // window.addEventListener('mouseup', onClick)

    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(width))
      .force("y", d3.forceY(height/2))
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

  // window.addEventListener("mouseup", (e) => {

  //   console.log(e.target.id)
  // });

  const onClick = (e) => {
      let idString = JSON.parse(JSON.stringify(e.target.id))
      const iN = idString.substring(0, idString.indexOf(","))
      idString = idString.substring(idString.indexOf(",") + 1)
      const iF = idString.substring(0, idString.indexOf(","))
      idString = idString.substring(idString.indexOf(",") + 1)
      let iA = idString
      if (iA.length == 0) {iA = "None"}

      setIntentName(iN)
      setIntentFrequency(iF)
      setIntentAssociates(iA)

      console.log(e.target.id)
      setModalOpen(true)
      console.log(intentName)
      console.log(intentFrequency)
      console.log(intentAssociates)
  }

  return (
    <div width="1500" height="1000">
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
      {modalOpen && <ModalReact setOpenModal={setModalOpen} intentName={intentName} intentFrequency={intentFrequency} intentAssociates={intentAssociates} />}
    </div>
  );
}