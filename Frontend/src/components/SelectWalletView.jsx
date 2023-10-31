import { useAllWallets, useWallet } from "useink";

const SelectWalletView = () => {
  const wallets = useAllWallets();
  const { connect } = useWallet();
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
};

export default SelectWalletView;
