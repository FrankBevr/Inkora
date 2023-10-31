import { UseInkProvider } from "useink";
import { Custom } from "useink/chains";
import ArExperience from "./components/ArExperience";
import ScratchExperience from "./components/ScratchExperience";

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
        <ScratchExperience />
        <ArExperience />
      </div>
    </UseInkProvider>
  );
};

export default App;
