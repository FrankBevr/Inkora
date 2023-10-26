import { useWallet, useAllWallets } from "useink";
// import { useContract } from "useink";
// import metadata from "./moes_coaster.json";
// const CONTRACT_ADDRESS = "5GV5ZnPynJBjYXWXExsmVdQgdrePFXDfPy4CkEv7w5nssY7n";
// const contract = useContract(CONTRACT_ADDRESS, metadata);

import { useCall, useContract } from "useink";
import { pickDecoded } from "useink/utils";
import metadata from "./moes_coaster.json";
import { useEffect } from "react";

const FetchSmartContract = () => {
  const { account, connect, disconnect } = useWallet();
  const wallets = useAllWallets();

  //Use Call
  const CONTRACT_ADDRESS = "5GV5ZnPynJBjYXWXExsmVdQgdrePFXDfPy4CkEv7w5nssY7n";
  const contract = useContract(CONTRACT_ADDRESS, metadata, "local");
  const get = useCall(contract, "get");
  const args = ["arg-1", 2];

  useEffect(() => {
    const geto = async () => {
      const thing = await get.send();
    };
    geto();
  }, []);

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
      <h1>Call somethin</h1>
      <h1>
        Get the Result the hard way:{" "}
        {get.result?.ok ? get.result.value.decoded.foo : "--"}
      </h1>
      <button disabled={get.isSubmitting} onClick={() => get.send(args)}>
        Get Result
      </button>
    </>
  );
};
export default FetchSmartContract;
