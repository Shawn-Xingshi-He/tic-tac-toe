import "./TicTacToe.css";
import winSound from "../sound/win.mp3";
import drawSound from "../sound/draw.mp3";

const Result = ({ gameResult, restart }) => {
  const win = new Audio(winSound);
  const draw = new Audio(drawSound);
  const message = () => {
    if (gameResult === 1) {
      win.play();
      return "O's win !";
    } else if (gameResult === 2) {
      win.play();
      return "X's win !";
    } else if (gameResult === 3) {
      draw.play();
      return "It's a draw !";
    }
  };

  return (
    <div className="backdrop">
      <div className="MsgContainer">
        <div>{message()}</div>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
};
export default Result;
