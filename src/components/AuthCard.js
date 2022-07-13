import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring';

// <Spring>
// {props => (
// <div style={props}>
// </div>
// )}
// </Spring>

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
  const totalSupply = 200; // for test purpose.

  // Grab the currently connected wallet's address
  const address = useAddress();
  const [mintingStarted, setMintingStarted] = useState(false);
  const [tokenToMint, setTokenToMint] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  // const editionDrop = useEditionDrop(
  //   '0xB4B8f15C9FF18B01D6894713c2e7712fBE2871Ca'
  // );

  const editionDrop = useEditionDrop(
    '0x089176d84f679497920523951D3E64c835646827'
  );
  const [totalMinted, setTotalMinted] = useState(0);

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

  // TODO:// get all metadata and get title, description and animation_url as well.
  const getImageUrl = async (tokenId) => {
    try {
      const metadata = await editionDrop.getTokenMetadata(tokenId);
      const imgUrl = metadata.image;
      setImageUrl(imgUrl);
      console.log(`image url : ${imgUrl}`);
      return imgUrl;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch number of minted tokens so far.
    // if all minted for that id, check another token via calling the function with a new random id
    // REFACTOR: use memoization (keep track of tried/failed tokens so far, not call it
    const fetchAmountData = async (randomTokenId) => {
      const currentAmount = await getCurrentAmount(randomTokenId);
      if (currentAmount < totalSupply) {
        console.log(`setting token to mint: ${randomTokenId}`);
        setTokenToMint(randomTokenId);
        return currentAmount.toNumber();
      } else {
        /////
        return fetchData(getRandomNumber());
      }
    };

    // call the recursive function fetchAmountData.
    fetchAmountData(getRandomNumber())
      .then((total) => setTotalMinted(total))
      .catch(console.error);

  }, []);

  useEffect(() => {
    const fetchImageUrl = async (randomTokenId) => {
      // getting on-chain data.
      const imageUrl = await getImageUrl(randomTokenId);
      return imageUrl;
    };

    fetchImageUrl(tokenToMint)
      .then((imageUrl) => setImageUrl(imageUrl))
      .catch(console.error);
  }, [tokenToMint]);

  return (
    <>
      {address && !mintingStarted ? (
        <section className={styles.sectionCard}>
          
            <Spring
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
              delay={200}
            >
              {props => (
                <div style={props}>
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
                
              )}
            </Spring>

        
        </section>
      ) : (
        <></>
      )}

      {!address && !mintingStarted ? (
        <section className={styles.sectionCard}>
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
        </section>
      ) : null}
      {mintingStarted ? (
        <MintingInterface
          amountMinted={totalMinted}
          tokenId={tokenToMint}
          imageUrl={imageUrl}
        />
      ) : null}
    </>
  );
}
