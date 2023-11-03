import { useContract, useTx, useWallet } from "useink";
import metadata from "../assets/moes_coaster.json";
import PrimaryButton from "./PrimaryButton";
import styles from "./ParticipateView.module.css";
import { SupportedChainId } from "@azns/resolver-core";
import { useResolveAddressToDomain } from "@azns/resolver-react";

const ParticipateView = () => {
  const { account, disconnect } = useWallet();

  const CONTRACT_ADDRESS = "5FHoLBmE5ooiPgZ8y2Vsekiy35b2KajFBZNuDAR7Jj5bGYgn";
  const contract = useContract(CONTRACT_ADDRESS, metadata, "aleph-testnet");
  const participate = useTx(contract, "moesCoaster::participateScratchCard");

  const scratchIt = async () => {
    // 100000000000000000
    try {
      participate.signAndSend([5], { value: "100000000000000" });
      console.log("Its clicked")
    } catch (e) {
      console.log(e)
    }
  };

  const { primaryDomain, error } = useResolveAddressToDomain(account?.address, {
    chainId: SupportedChainId.AlephZeroTestnet,
  });

  return (
    <>
      <div className={styles.participateViewFlex}>
        <PrimaryButton label={"Scratch Me"} labelVis={true} onClick={scratchIt}>
          Scratch Me
        </PrimaryButton>
        <div className={styles.pushDown}>
          <PrimaryButton
            label={`Disconnect`}
            labelVis={true}
            onClick={disconnect}
          >
            Disconnect Wallet
          </PrimaryButton>
          <code>{primaryDomain ? primaryDomain : account?.name}</code>
        </div>
      </div>
    </>
  );
};
export default ParticipateView;
