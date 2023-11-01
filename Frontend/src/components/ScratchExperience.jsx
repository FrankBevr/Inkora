import { useWallet } from "useink";
import SelectWalletView from "./SelectWalletView";
import ParticipateButton from "./ParticipateButton";

const ScratchExperience = () => {
  const { account } = useWallet();

  if (!account) {
    return (
      <div className="button-container">
        <SelectWalletView />
      </div>
    );
  }
  return (
    <div className="button-container">
      <ParticipateButton />
    </div>
  );
};

export default ScratchExperience;
