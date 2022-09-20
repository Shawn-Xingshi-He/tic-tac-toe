import React from "react";
import { BsRecord, BsX } from "react-icons/bs";
import hoverSound from "../sound/hover.mp3";
import clickSound from "../sound/click.mp3";

const PickPlayer = ({ setInPlayerChoose, setCurrentPlayer }) => {
  const hoverEffect = (num) => {
    const player = document.getElementsByClassName("player")[num];
    player.classList.toggle("hoverEffect");
  };

  const click = new Audio(clickSound);
  const hover = new Audio(hoverSound);

  return (
    <div className="pickPlayer">
      <div
        className="player"
        onClick={() => {
          click.play();
          setCurrentPlayer(false);
          setInPlayerChoose(false);
        }}
        onMouseEnter={() => {
          hover.play();
          hoverEffect(0);
        }}
        onMouseLeave={() => {
          hoverEffect(0);
        }}
      >
        <BsX style={{ color: "gold", width: "100%", height: "100%" }} />
      </div>
      <div
        className="player"
        onClick={() => {
          click.play();
          setCurrentPlayer(true);
          setInPlayerChoose(false);
        }}
        onMouseEnter={() => {
          hover.play();
          hoverEffect(1);
        }}
        onMouseLeave={() => {
          hoverEffect(1);
        }}
      >
        <BsRecord style={{ color: "gold", width: "85%", height: "85%" }} />
      </div>
    </div>
  );
};

export default PickPlayer;
