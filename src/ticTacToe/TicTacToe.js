import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./TicTacToe.css";
import PickPlayer from "./PickPlayer";
import Cube from "./Cube";
import Result from "./Result";

const TicTacToe = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // For CSS Transition
  const [inPlayerChoose, setInPlayerChoose] = useState(true);
  const [inGameBoard, setInGameBoard] = useState(false);

  const [record, setRecord] = useState(Array.from(Array(9), (x) => -1));
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const [gameResult, setGameResult] = useState(0);
  const [winP, setWinP] = useState(Array.from(Array(9)));

  const checkStatus = () => {
    const res = winPatterns.some((pattern) => {
      if (
        pattern.every(
          (item) =>
            record[item] === record[pattern[0]] && record[pattern[0]] !== -1
        )
      ) {
        showWinPattern(pattern);
        return true;
      } else {
        return false;
      }
    });

    if (res) {
      currentPlayer ? setGameResult(1) : setGameResult(2);
    } else if (record.every((item) => item !== -1)) {
      setGameResult(3);
    } else {
      switchPlayer();
    }
  };

  const switchPlayer = () => setCurrentPlayer(!currentPlayer);

  const showWinPattern = (pattern) => {
    const winCubes = [];
    pattern.forEach((index) => {
      const cube = document.querySelectorAll(
        `.cube:nth-of-type(${index + 1})`
      )[0];
      winCubes.push(cube);
    });
    setWinP([...winCubes]);
  };

  const restart = () => {
    setInGameBoard(false);
    setRecord(Array.from(Array(9), (x) => -1));
    setCurrentPlayer(false);
    setGameResult(0);
  };

  useEffect(() => {
    if (winP[0] !== undefined) {
      const blink = setInterval(() => {
        winP.forEach((cube) => {
          cube.classList.toggle("win");
        });
      }, 500);
      setTimeout(() => {
        clearInterval(blink);
        winP.forEach((cube) => {
          cube.classList.remove("win");
        });
      }, 2500);
    }
  }, [winP]);

  return (
    <>
      <CSSTransition
        in={inPlayerChoose}
        timeout={100}
        classNames="boardContainer"
        unmountOnExit
        onExited={() => {
          setInGameBoard(true);
        }}
      >
        <PickPlayer
          setInPlayerChoose={setInPlayerChoose}
          setCurrentPlayer={setCurrentPlayer}
        />
      </CSSTransition>
      <CSSTransition
        in={inGameBoard}
        timeout={500}
        classNames="boardContainer"
        unmountOnExit
        onExited={() => {
          setInPlayerChoose(true);
        }}
      >
        <div className="boardContainer">
          {record.map((__, index) => (
            <Cube
              key={"cube" + index}
              index={index}
              currentPlayer={currentPlayer}
              checkStatus={checkStatus}
              record={record}
              setRecord={setRecord}
            />
          ))}
        </div>
      </CSSTransition>
      {gameResult !== 0 && <Result gameResult={gameResult} restart={restart} />}
    </>
  );
};

export default TicTacToe;
