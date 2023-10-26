// import { useInk } from 'useink';

import { useEffect } from "react";

const BlockNumber = () => {
    // const { blockNumber } = useInk();
    const blockNumber = 1
    useEffect(() =>{
    },[])
    return (
        <>
            <h1>Hello FetchBlockNumber</h1>
            <p>Current Blocknumber { blockNumber}</p>
        </>
    );
}

export default BlockNumber