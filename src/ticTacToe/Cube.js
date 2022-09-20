import React from "react";
// import "./TicTacToe.css";
import hoverSound from "../sound/hover.mp3";
import clickSound from "../sound/click.mp3";

const Cube = ({ index, currentPlayer, checkStatus, record, setRecord }) => {
  const mark = record[index];
  const status = mark === -1 ? "" : mark === 0 ? "circle" : "cross";
  const nextPlayer = !currentPlayer ? "cross" : "circle";
  let enableHover = false;

  const hoverEffectOnCube = (cube, mousePosition) => {
    if (mark === -1 && enableHover && mousePosition) {
      new Audio(hoverSound).play();
      cube.classList.add(nextPlayer);
      cube.classList.add("hover");
    } else if (mark === -1 && enableHover && !mousePosition) {
      cube.classList.remove(nextPlayer);
      cube.classList.remove("hover");
    }
  };

  const onClick = () => {
    if (mark === -1) {
      new Audio(clickSound).play();
      const tempRecord = record;
      const value = currentPlayer ? 0 : 1;
      tempRecord[index] = value;
      setRecord([...tempRecord]);
      checkStatus();
    }
  };

  setTimeout(() => {
    enableHover = true;
  }, 100);

  return (
    <div
      className={`cube ${status}`}
      onClick={onClick}
      onMouseEnter={(e) => {
        hoverEffectOnCube(e.target, true);
      }}
      onMouseLeave={(e) => {
        hoverEffectOnCube(e.target, false);
      }}
    ></div>
  );
};

export default Cube;
