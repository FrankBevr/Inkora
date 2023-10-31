import { useContract, useTx, useWallet } from "useink";
import metadata from "./../assets/moes_coaster.json";

const ParticipateButton = () =>{
  const { account, disconnect } = useWallet();

  const CONTRACT_ADDRESS = "5H1LoNoxub4WpnViTj7DtkKS7v8oiFbJYPAk9xTmUAvnnY3K";
  const contract = useContract(CONTRACT_ADDRESS, metadata, "localnode");
  const participate = useTx(contract, "moesCoaster::participateScratchCard")

  const scratchIt = async () => {
    participate.signAndSend([5], {value:"100000000000000000"})
  };

    return(
    <div style={{ border: "2px solid green", margin: 20, borderRadius: 10 }}>
      <p>You are connected as {account?.name || account.address}</p>
      <button onClick={disconnect}>Disconnect Wallet</button>
      <button onClick={scratchIt}>Scratch Me</button>
    </div>
    )
}
export default ParticipateButton