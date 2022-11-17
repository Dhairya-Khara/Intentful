import * as d3 from "d3";
import { useEffect, useState } from "react";
//import Modal from "./Modal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalReact from "./ModalReact";

export default function ForceGraph({ nodes, width, height }) {
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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
    setModalOpen(true)

    console.log(e.target.id)
  }

  return (
    <div width="1500" height="1000">
      <h1>Hello</h1>
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
              onClick={(e) => {
                setModalOpen(true);
                console.log(e.target.id)
              }}
            />
        ))}
      </svg>
      {modalOpen && <ModalReact setOpenModal={setModalOpen} />}
    </div>
  );
}