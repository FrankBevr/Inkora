import { useWallet, useAllWallets } from "useink";
import metadata from "./moes_coaster.json";

const FetchSmartContract = () => {
  const { account, connect, disconnect } = useWallet();
  const wallets = useAllWallets();
  if (!account) {
    return (
      <ul>
        {wallets.map((w) => (
          <li key={w.title}>
            {w.installed ? (
              <button onClick={() => connect(w.extensionName)}>
                <img src={w.logo.src} alt={w.logo.alt} />
                Connect to {w.title}
              </button>
            ) : (
              <a href={w.installUrl}>
                <img src={w.logo.src} alt={w.logo.alt} />
                Install {w.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  }

  const CONTRACT_ADDRESS = "..";
  const contract = useContract(CONTRACT_ADDRESS, metadata);
  return (
    <>
      <h1>Hello FetchSmartContract</h1>;
      <p>You are connected as {account?.name || account.address}</p>
      <button onClick={disconnect}>Disconnect Wallet</button>
    </>
  );
};
export default FetchSmartContract;
