import React, { useState } from "react";
import "./App.css";
import MindARThreeViewer from "./components/mindar-three-viewer";
import FetchBackend from "./components/FetchBackend.jsx";

function App() {
  const [started, setStarted] = useState(null);

  return (
    <div className="App">
      <FetchBackend />

      <div className="control-buttons">
        {started === null && (
          <button
            onClick={() => {
              setStarted("three");
            }}
          >
            Start ThreeJS version
          </button>
        )}
        {started !== null && (
          <button
            onClick={() => {
              setStarted(null);
            }}
          >
            Stop
          </button>
        )}
      </div>
      {started === "three" && (
        <div className="container">
          <MindARThreeViewer />
        </div>
      )}
    </div>
  );
}

export default App;
