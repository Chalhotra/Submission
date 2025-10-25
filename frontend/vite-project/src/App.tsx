import "./App.css";

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-slate-800 h-screen">
        <div className="flex ">
          <img src={"../public/Chess_Board.svg"} className="max-w-96"></img>
          <button
            onClick={() => {
              navigate("/game");
            }}
            className="bg-green-600 w-30 h-10  font-bold text-white"
          >
            Play!
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
