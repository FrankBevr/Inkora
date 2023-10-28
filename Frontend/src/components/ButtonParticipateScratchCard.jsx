import { useWallet, useAllWallets } from "useink";

import { useContract, useTx } from "useink";
import metadata from "./moes_coaster.json";

const ButtonParticpateScratchCard = () => {
  const { account, connect, disconnect } = useWallet();
  const wallets = useAllWallets();

  const CONTRACT_ADDRESS = "5FQBQdZ4GKHnQGbXDL1GFStMFGBuSugHQKXaCLewn4aNUx9H";
  const contract = useContract(CONTRACT_ADDRESS, metadata, "localnode");
  const participateScratchCard = useTx(contract, "participate_scratch_card");

  const flipIt = () => {
    // ⚠️  that will not work yet, i assume
    participateScratchCard.participateScratchCard();
  };

  if (!account) {
    return (
      <ul>
        {wallets.map((w) => (
          <li key={w.title} style={{ listStyle: "none" }}>
            {w.installed ? (
              <button onClick={() => connect(w.extensionName)}>
                <img
                  src={w.logo.src}
                  style={{ width: 20, height: 20 }}
                  alt={w.logo.alt}
                />
                Connect to {w.title}
              </button>
            ) : (
              <a href={w.installUrl}>
                <img
                  src={w.logo.src}
                  style={{ width: 20, height: 20 }}
                  alt={w.logo.alt}
                />
                Install {w.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div style={{ border: "2px solid green", margin: 20, borderRadius: 10 }}>
      <h1>Hello ButtonParticpateScratchCard</h1>;
      <p>You are connected as {account?.name || account.address}</p>
      <button onClick={disconnect}>Disconnect Wallet</button>
      <button  onClick={participateScratchCard}>
        Scratch Me
      </button>
    </div>
  );
};
export default ButtonParticpateScratchCard;
