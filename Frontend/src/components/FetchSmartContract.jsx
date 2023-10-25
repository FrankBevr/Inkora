import { useWallet, useAllWallets } from "useink";
// import { useContract } from "useink";
// import metadata from "./moes_coaster.json";
// const CONTRACT_ADDRESS = "5GV5ZnPynJBjYXWXExsmVdQgdrePFXDfPy4CkEv7w5nssY7n";
// const contract = useContract(CONTRACT_ADDRESS, metadata);

const FetchSmartContract = () => {
  const { account, connect, disconnect } = useWallet();
  const wallets = useAllWallets();
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
    <>
      <h1>Hello FetchSmartContract</h1>;
      <p>You are connected as {account?.name || account.address}</p>
      <button onClick={disconnect}>Disconnect Wallet</button>
    </>
  );
};
export default FetchSmartContract;
