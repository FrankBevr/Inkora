import { UseInkProvider } from "useink";
import { Custom } from "useink/chains";
import ArExperience from "./components/ArExperience";
import ScratchExperience from "./components/ScratchExperience";
import { useViewState } from "./store/store"; // import the ViewState store

const LocalChain = {
  ...Custom,
  id: "localnode",
  name: "localnode",
  rpcs: ["ws://localhost:9944"],
};

const App = () => {
  const currentIndex = useViewState((state) => state.currentIndex); // get the currentIndex state

  return (
    <UseInkProvider config={{ dappName: "MoesTaverne", chains: [LocalChain] }}>
      <div className="App">
        <ScratchExperience />
        <ArExperience />
        <p>Current Index: {currentIndex}</p> {/* display the currentIndex */}
      </div>
    </UseInkProvider>
  );
};

export default App;