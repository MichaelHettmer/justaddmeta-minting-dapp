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

  const TOTAL_SUPPLY_TOKEN_0 = 5;
  const TOTAL_SUPPLY_TOKEN_1 = 55;
  const TOTAL_SUPPLY_TOKEN_2 = 555;
  // Grab the currently connected wallet's address
  const address = useAddress();
  const [mintingStarted, setMintingStarted] = useState(false);
  const [tokenToMint, setTokenToMint] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [totalMinted, setTotalMinted] = useState(0);
  const [totalMintable, setTotalMintable] = useState(100);
  const [mintableTokens, setMintableTokens] = useState(new Set([0, 1, 2]));
  const editionDrop = useEditionDrop(
    '0x5e3b3449fa71D503075892a2a0799251C2316b2F'
  );

  // let tokenToMint = null;
  // let totalMinted;
  // let metadata = null;

  // const setTotalMinted = (amount) => {
  //   totalMinted = amount;
  // };

  // const setTokenToMint = (tokenId) => {
  //   tokenToMint = tokenId;
  // };

  // const setMetadata = (_metadata) => {
  //   metadata = _metadata;
  // };

  // let mintableTokens = new Set([0, 1, 2]);
  // tokenId: 0 total minted 4
  // AuthCard.js?1dc9:41 setting token to mint: 0

  useEffect(() => {
    if (mintableTokens.size > 0) {
      const aRandomNumber = getRandomNumber();
      console.log(`generated a random number > ${aRandomNumber}`);
      if (mintableTokens.has(aRandomNumber)) {
        // if tokenId is still in mintable condition
        fetchAmountData(aRandomNumber)
          .then((total) => setTotalMinted(total))
          .catch(console.error);
      }
    }
    if (tokenToMint != null) {
      console.log();
      fetchMetadata(tokenToMint)
        .then((metadata) => setMetadata(metadata))
        .catch(console.error);
    }
  }, []);
  useEffect(() => {
    if (tokenToMint != null) {
      fetchMetadata(tokenToMint)
        .then((metadata) => setMetadata(metadata))
        .catch(console.error);
    }
  }, [tokenToMint]);

  // useEffect(() => {

  //     const fetchMetadata = async (randomTokenId) => {
  //       console.log(`getting metadata for token: ${randomTokenId}...`);
  //       const metadata = await getMetadata(randomTokenId);
  //       return metadata;
  //     };

  //     fetchMetadata(tokenToMint)
  //       .then((metadata) => setMetadata(metadata))
  //       .catch(console.error);

  // }, [tokenToMint]); // call this when we figure out amount left for tokenToMint.

  const fetchMetadata = async (randomTokenId) => {
    console.log(`getting metadata for token: ${randomTokenId}...`);
    const metadata = await getMetadata(randomTokenId);
    console.log(
      ` metadata for token: ${randomTokenId}... : ${JSON.stringify(metadata)}`
    );

    return metadata;
  };

  const fetchAmountData = async (randomTokenId) => {
    const currentAmount = await getCurrentAmount(randomTokenId);
    const totalSupply = getTokenSupply(randomTokenId);
    console.log(`for randomTokenId:`);
    console.log(`currentAmount: ${currentAmount}, totalSupply: ${totalSupply}`);

    if (currentAmount < totalSupply) {
      console.log(`minting ${randomTokenId}`);
      // setTokenToMint(randomTokenId);
      // if this gonna be the last one mintable from that token, then remove the tokenId from mintables.
      // if (currentAmount + 1 == totalSupply) {
      //   // setMintableTokens(mintableTokens.delete(tokenId));
      //   mintableTokens.delete(randomTokenId);
      // }
      setTokenToMint(randomTokenId);
      setTotalMintable(totalSupply);
      // setTotalMinted(currentAmount)
      setMintableTokens(new Set([]));
      return currentAmount.toNumber();
    } else {
      console.log(
        `all minted for tokenId: ${randomTokenId}, deleting from mintableTokens..`
      );
      setMintableTokens(mintableTokens.delete(randomTokenId));
      fetchAmountData(getRandomNumber());
    }
  };

  // generate a random token id
  // among three tokens: 0, 1 or 2.
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
    let totalSupply = 0;
    switch (tokenId) {
      case 0:
        totalSupply = TOTAL_SUPPLY_TOKEN_0;
        break;
      case 1:
        totalSupply = TOTAL_SUPPLY_TOKEN_1;
        break;

      case 2:
        totalSupply = TOTAL_SUPPLY_TOKEN_2;
        break;

      default:
        break;
    }
    return totalSupply;
  }

  return (
    <>
      {address && !mintingStarted ? (
        <section className={styles.sectionCard}>
          <div className={styles.backgroundImage}>
            <div className={styles.container}>
              <div className={styles.authorized}>
                <div className={styles.authorized_content}>
                  <h3>Authorized successfully</h3>
                  <div className={styles.iconWrapper}>
                    <div className={styles.iconInner}>
                      <svg className={styles.icon} viewBox="0 0 24 24">
                        <path
                          className={styles.path}
                          fill="currentColor"
                          d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonWrapper}>
                  <button
                    onClick={() => disconnectWallet()}
                    className={styles.buttonWallet}
                  >
                    {address
                      .slice(0, 4)
                      .concat('...')
                      .concat(address.slice(-3))}
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
          totalMintable={totalMintable}
          tokenId={tokenToMint}
          metadata={metadata}
        />
      ) : null}
    </>
  );
}
