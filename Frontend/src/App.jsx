import { UseInkProvider } from "useink";
import { Custom } from "useink/chains";
import ArExperience from "./components/ArExperience";
import ScratchExperience from "./components/ScratchExperience";
import ViewStore from './playground/FloorB/ViewStore'

const LocalChain = {
  ...Custom,
  id: "localnode",
  name: "localnode",
  rpcs: ["ws://localhost:9944"],
};

const App = () => {
  return (
    <UseInkProvider config={{ dappName: "MoesTaverne", chains: [LocalChain] }}>
      <div className="App">
        {/*
        <ScratchExperience />
        <ArExperience />
      */}
        <ViewStore />
      </div>
    </UseInkProvider>
  );
};

export default App;
