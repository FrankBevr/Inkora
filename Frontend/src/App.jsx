import { UseInkProvider } from "useink";
import { Custom } from "useink/chains";
import ArExperience from "./components/ArExperience";
import ScratchExperience from "./components/ScratchExperience";
import { useViewState } from "./store/store"; // import the ViewState store
import { useState } from "react";
import PrimaryButton from "./components/PrimaryButton";

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
        <div className="button-container-top">
          <PrimaryButton
            label={"Forward"}
            iconLeftVis={true}
            labelVis={false}
            onClick={() => {
              forward();
            }}
          >
            Forward
          </PrimaryButton>
        <h3 style={{whiteSpace: 'nowrap', alignSelf: 'center'}}>{currentIndex}</h3>
          <PrimaryButton
            label={"Backward"}
            iconRightVis={true}
            labelVis={false}
            onClick={() => {
              backward();
            }}
          >
            Backward
          </PrimaryButton>

          {/* {started === null && (
            <PrimaryButton
              label={"View Coaster"}
              onClick={() => {
                setStarted("three");
              }}
            >
              View Coaster
            </PrimaryButton>
          )}
          {started !== null && (
            <PrimaryButton
              label={"Stop View"}
              onClick={() => {
                setStarted(null);
              }}
            >
              Stop View
            </PrimaryButton>
          )} */}
        </div>
      </UseInkProvider>
      <div className="frame"></div>
    </>
  );
};

export default App;
