import { useContract, useTx, useWallet } from "useink";
import metadata from "../assets/moes_coaster.json";
import PrimaryButton from "./PrimaryButton";
import styles from "./ParticipateView.module.css"

const ParticipateView = () => {
  const { account, disconnect } = useWallet();

  const CONTRACT_ADDRESS = "5H1LoNoxub4WpnViTj7DtkKS7v8oiFbJYPAk9xTmUAvnnY3K";
  const contract = useContract(CONTRACT_ADDRESS, metadata, "localnode");
  const participate = useTx(contract, "moesCoaster::participateScratchCard");

  const scratchIt = async () => {
    participate.signAndSend([5], { value: "100000000000000000" });
  };

  return (
    <>
      <div className={styles.participateViewFlex}>
        <PrimaryButton label={"Scratch Me"} labelVis={true} onClick={scratchIt}>
          Scratch Me
        </PrimaryButton>
        <PrimaryButton
          label={`Disconnect ${account?.name}`}
          labelVis={true}
          onClick={disconnect}
        >
          Disconnect Wallet
        </PrimaryButton>
      </div>
    </>
  );
};
export default ParticipateView;
