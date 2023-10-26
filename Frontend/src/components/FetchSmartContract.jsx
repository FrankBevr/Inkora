import { useWallet, useAllWallets } from "useink";

import { useCall, useContract, useTx } from "useink";
import metadata from "./moes_coaster.json";
import { useEffect, useState } from "react";

const FetchSmartContract = () => {
  const [flipValue, setFlipValue] = useState(null);
  const { account, connect, disconnect } = useWallet();
  const wallets = useAllWallets();

  //Use Call
  const CONTRACT_ADDRESS = "5FQBQdZ4GKHnQGbXDL1GFStMFGBuSugHQKXaCLewn4aNUx9H";
  const contract = useContract(CONTRACT_ADDRESS, metadata, "localnode");
  const get = useCall(contract, "get");
  const flip = useTx(contract, "flip");

  const getValue = async () => {
    get.send().then((result) => {
      console.log(result.value.decoded)
      setFlipValue(result.value.decoded);
    });
  };
  useEffect(() => {
    if(flipValue){
      getValue()
    }
  }, [flipValue]);

  const flipIt = () => {
    flip.signAndSend();
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
    <>
      <h1>Hello FetchSmartContract</h1>;
      <p>You are connected as {account?.name || account.address}</p>
      <button onClick={disconnect}>Disconnect Wallet</button>
      <h1>Call something</h1>
      <button disabled={get.isSubmitting} onClick={flipIt}>
        Flip Value
      </button>
      <p>
        Current flipValue is {flipValue === false ? "its false" : "its true"}
      </p>
    </>
  );
};
export default FetchSmartContract;
