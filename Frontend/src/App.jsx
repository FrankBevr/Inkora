import React, { useState } from "react";
import "./App.css";
import MindARThreeViewer from "./components/mindar-three-viewer";
import FetchBackend from "./components/FetchBackend.jsx";
import FetchSmartContract from "./components/FetchSmartContract";
import FetchBlockNumber from "./components/FetchBlockNumber";
import { UseInkProvider } from "useink";
import { Custom } from "useink/chains";

const LocalChain = {
  ...Custom,
  id: "localnode",
  name: "localnode",
  rpcs: ["ws://localhost:9944"],
};

const App = () => {
  const [started, setStarted] = useState(null);

  return (
    <UseInkProvider config={{ dappName: "MoesTaverne", chains: [LocalChain] }}>
      <div className="App">
        <FetchBackend />
        <FetchSmartContract />
        <FetchBlockNumber/>

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
    </UseInkProvider>
  );
};

export default App;
