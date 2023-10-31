import { useWallet} from "useink";
import SelectWalletView from "./SelectWalletView";
import ParticipateButton from "./ParticipateButton";

const ScratchExperience = () => {
  const { account } = useWallet();

  if (!account) {
    return (
      <SelectWalletView/>
    );
  }
  return (
    <ParticipateButton/>
  );
};

export default ScratchExperience;
