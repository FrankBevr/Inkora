import { UseInkProvider } from "useink";
import { Custom } from "useink/chains";
import ArExperience from "./components/ArExperience";
import ScratchExperience from "./components/ScratchExperience";
import { useViewState } from "./store/store"; // import the ViewState store
import { useState } from "react";

const LocalChain = {
  ...Custom,
  id: "localnode",
  name: "localnode",
  rpcs: ["ws://localhost:9944"],
};

const App = () => {
  const currentIndex = useViewState((state) => state.currentIndex); // get the currentIndex state
  const forward = useViewState((state) => state.forward); // get the currentIndex state
  const backward = useViewState((state) => state.backward); // get the currentIndex state

  const [started, setStarted] = useState(null);

  return (
    <>
      <UseInkProvider
        config={{ dappName: "MoesTaverne", chains: [LocalChain] }}
      >
        {currentIndex === 0 ? (
          <ArExperience started={started} />
        ) : (
          <ScratchExperience />
        )}
        <div className="button-container">
          <p>Current Index: {currentIndex}</p>
          <button
            onClick={() => {
              forward();
            }}
          >
            Forward
          </button>
          <button
            onClick={() => {
              backward();
            }}
          >
            Backward
          </button>
          <div className="buttonContainer">
            {started === null && (
              <button
                onClick={() => {
                  setStarted("three");
                }}
              >
                Start Coaster View
              </button>
            )}
            {started !== null && (
              <button
                onClick={() => {
                  setStarted(null);
                }}
              >
                Stop Coaster View
              </button>
            )}
          </div>
        </div>
      </UseInkProvider>
      <div className="frame"></div>
    </>
  );
};

export default App;
