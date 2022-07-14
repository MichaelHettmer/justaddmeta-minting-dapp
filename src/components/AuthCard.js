import React, { useState, useEffect } from 'react';
// import { useSpring, animated } from '@react-spring/web';

import {
  useAddress,
  useMetamask,
  useDisconnect,
  useEditionDrop
} from '@thirdweb-dev/react';

import MintingInterface from 'components/MintingInterface';
import styles from 'styles/authcard.module.css';

export default function AuthCard() {
  const connectWallet = useMetamask();
  const disconnectWallet = useDisconnect();

  const TOTAL_SUPPLY_TOKEN_0 = 3;
  const TOTAL_SUPPLY_TOKEN_1 = 50;
  const TOTAL_SUPPLY_TOKEN_2 = 47;
  // Grab the currently connected wallet's address
  const address = useAddress();
  const [mintingStarted, setMintingStarted] = useState(false);
  const [tokenToMint, setTokenToMint] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [totalMinted, setTotalMinted] = useState(0);
  const [tokensMinted, setTokensMinted] = useState(new Set([])); // it'll be used in case current amount is not smaller than total supply

  const editionDrop = useEditionDrop(
    '0xA6d0716F4C2e17E1ECA3ADe33F93E28f96c6974e'
  );

  // generate a random token id;
  // among three tokens, ids as 0, 1 or 2.
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 3);
  };

  const getCurrentAmount = async (tokenId) => {
    try {
      const x = await editionDrop.get(tokenId);
      const total = x.supply; //
      console.log(`tokenId: ${tokenId} total minted ${total}`);
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const getMetadata = async (tokenId) => {
    try {
      const metadata = await editionDrop.getTokenMetadata(tokenId);
      // console.log(`metadata : ${JSON.stringify(metadata)}`);
      return metadata;
    } catch (error) {
      console.log(error);
    }
  };


  function getTokenSupply(tokenId) {
    let totalSupply;
    switch (tokenId) {
      case 0:
        totalSupply = TOTAL_SUPPLY_TOKEN_0;
      case 1:
        totalSupply = TOTAL_SUPPLY_TOKEN_1;
      case 2:
        totalSupply = TOTAL_SUPPLY_TOKEN_2;
      default:
        break;
    }
    return totalSupply;
  }

  useEffect(() => {
    // fetch number of minted tokens so far.
    // if all minted for that id, check another token via calling the function with a new random id
    // REFACTOR: use memoization (keep track of tried/failed tokens so far, not call it
    const fetchAmountData = async (randomTokenId) => {
      const currentAmount = await getCurrentAmount(randomTokenId);
      const totalSupply = getTokenSupply(randomTokenId);

      if (currentAmount < totalSupply) {
        console.log(`setting token to mint: ${randomTokenId}`);
        setTokenToMint(randomTokenId);
        return currentAmount.toNumber();
      } else {
        console.log(`all minted for tokenId: ${randomTokenId}`);
        setTokensMinted(tokensMinted.add(randomTokenId)); // if supply is achieved, add this to tokensMinted set.
        return fetchAmountData(getRandomNumber());
      }
    };

    // call the recursive function fetchAmountData.
    const aRandomNumber = getRandomNumber();
    if (!tokensMinted.has(aRandomNumber)) {
      fetchAmountData(aRandomNumber)
        .then((total) => setTotalMinted(total))
        .catch(console.error);
    }else{}

    if(tokensMinted.size == 3) {
      console.log("all 100 tokens minted. LOL.");

    }
  }, []);

  useEffect(() => {
    const fetchMetadata = async (randomTokenId) => {
      console.log(`getting metadata for token: ${randomTokenId}...`);
      const metadata = await getMetadata(randomTokenId);
      return metadata;
    };

    fetchMetadata(tokenToMint)
      .then((metadata) => setMetadata(metadata))
      .catch(console.error);
  }, [tokenToMint]); // call this when we figureOut tokenToMint with fetchAmountData @ above useEffect.

  return (
    <>
      {address && !mintingStarted ? (
        <section className={styles.sectionCard}>
          <div className={styles.backgroundImage}>
          <div className={styles.container}>
            <div className={styles.authorized}>
              <div className={styles.authorized_content}>
                <h3>Authorized successfully</h3>
              </div>

              <div className={styles.buttonWrapper}>
                <button
                  onClick={() => disconnectWallet()}
                  className={styles.buttonWallet}
                >
                  {address.slice(0, 4).concat('...').concat(address.slice(-3))}
                </button>

                <button
                  onClick={() => setMintingStarted(true)}
                  className={styles.buttonConnect}
                >
                  Launch
                </button>
              </div>
            </div>
          </div>
          </div>
        </section>
      ) : (
        <></>
      )}

      {!address && !mintingStarted ? (
        <section className={styles.sectionCard}>
           <div className={styles.backgroundImage}>
          <div className={styles.container}>
            <div className={styles.authorized}>
              <div className={styles.authorized_content}>
                <h3>
                  AUTHORIZED<br></br> ACCESS ONLY{' '}
                </h3>
                <p>Connect your wallet to participate.</p>
              </div>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.buttonConnect}
                  onClick={() => connectWallet()}
                >
                  Connect Wallet
                </button>

                <button disabled className={styles.buttonLaunch}>
                  Launch
                </button>
              </div>
            </div>
          </div>
          </div>
        </section>
      ) : null}
      {mintingStarted ? (
        <MintingInterface
          amountMinted={totalMinted}
          tokenId={tokenToMint}
          metadata={metadata}
        />
      ) : null}
    </>
  );

}
