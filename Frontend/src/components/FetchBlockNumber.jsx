import { useEffect, useState } from "react";
import { useBlockHeader } from "useink";

const BlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState(null);
  let localnode = useBlockHeader("localnode");

  useEffect(() => {
    if (localnode) {
      setBlockNumber(localnode.blockNumber);
    }
  }, [localnode]);


  return (
    <>
      <h1>Hello FetchBlockNumber</h1>
      <p>
        Current Blocknumber
        {localnode === undefined ? " not fetch yet" : ` ${blockNumber}`}
      </p>
    </>
  );
};

export default BlockNumber;