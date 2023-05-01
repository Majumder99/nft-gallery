import { useState } from "react";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [collection, setCollection] = useState("");
  const [wallet, setWallet] = useState("");
  const [isCollection, setIsCollection] = useState(false);
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
      const nft = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      console.log("nfts : ", nft);
      if (nft) {
        setNfts(nft.ownedNfts);
      }
    } else {
      console.log("Fetching nfts for collection");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      const nft = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      console.log("Collection nfts : ", nft);
      if (nft) {
        setNfts(nft.ownedNfts);
      }
    }
  };

  const collectionNft = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      // Replace with your Alchemy API key:
      // https://eth-mainnet.g.alchemy.com/nft/v2/docs-demo/getNFTsForCollection?contractAddress=0xe785E82358879F061BC3dcAC6f0444462D4b5330&withMetadata=true' \
      const apiKey = "z459oduy--5KqX2A1hp7DWBBCXCqSdxt";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection`;
      console.log("Fetching nfts for contract address only");
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true`;
      const nft = await fetch(fetchURL, requestOptions)
        .then((data) => data.json())
        .catch((e) => console.log(e));
      console.log("Contract address nfts : ", nft);
      // if (nft) {
      //   setNfts(nft.ownedNfts);
      // }
    }
  };

  console.log({ nfts });

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Wallet Address"
            disabled={isCollection}
          />
          <input
            type="text"
            onChange={(e) => setCollection(e.target.value)}
            placeholder="Collection means contract address"
          />
          <label htmlFor="">
            <input
              type="checkbox"
              name=""
              id=""
              onChange={(e) => setIsCollection(e.target.checked)}
            />
            For contract
          </label>
        </div>
        <button
          onClick={() => {
            if (isCollection) {
              collectionNft();
            } else {
              fetchNft();
            }
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}
