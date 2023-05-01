import { useState } from "react";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [collection, setCollection] = useState("");
  const [wallet, setWallet] = useState("");

  const fetchNft = async () => {
    // Setup request options:
    var requestOptions = {
      method: "GET",
    };

    // Replace with your Alchemy API key:
    const apiKey = "z459oduy--5KqX2A1hp7DWBBCXCqSdxt";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
    if (!collection.length) {
      // Replace with the wallet address you want to query:
      const fetchURL = `${baseURL}?owner=${wallet}`;
      console.log("Fetching nfts");
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      console.log("nfts : ", nfts);
    } else {
      console.log("Fetching nfts for collection");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      console.log("Collection nfts : ", nfts);
    }
    if (nfts) {
      setNfts(nfts.ownedNfts);
    }
  };

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Wallet Address"
          />
          <input
            type="text"
            onChange={(e) => setCollection(e.target.value)}
            placeholder="Collection means contract address"
          />
          <label htmlFor="">
            <input type="checkbox" name="" id="" />
            For contract
          </label>
        </div>
        <button onClick={fetchNft}>Search</button>
      </div>
    </>
  );
}
