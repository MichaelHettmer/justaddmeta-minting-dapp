import { React, useState } from 'react';

import {
  useAddress,
  useNetwork,
  useNetworkMismatch,
  useEditionDrop,
  ChainId
} from '@thirdweb-dev/react';

import MintingProgress from 'components/MintingProgress';
// import gläserPromo from "../public/img/gläserPromo.png";

import styles from 'styles/mintingInterface.module.css';

export default function MintingInterface({ amountMinted, tokenId, metadata }) {
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const [mintingComplete, setMintingComplete] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const editionDropAddress = '0x79BC1691E06C56f72B61401F7E331082c1971C63';
  const editionDrop = useEditionDrop(editionDropAddress);

  async function mintNFT(tokenId) {
    setTxStatus('IN_PROGRESS');
    // Ensure correct network
    if (isOnWrongNetwork) {
      switchNetwork(ChainId.Rinkeby);
      return;
    }

    // setProgressInfo({
    //   tokenId: tokenId,
    //   txHash: '',
    //   txStatus: 'IN_PROGRESS'
    // });
    try {

      const _txHash = await editionDrop
        .claim(tokenId, 1)
        .then((result) => result.receipt.transactionHash);

      if (_txHash.length > 0) {
        setTxHash(_txHash);
        setTxStatus('SUCCESS');
        console.log(`tokenId: ${tokenId}, txStatus: ${txStatus}, txHash: ${txHash}`);
        return;
      }

    } catch (error) {
      setTxStatus('FAIL');
      console.log(`error on minting., \n ${error}`);
    }
  }

  return (
    <>
      {txStatus === 'SUCCESS' ||
        txStatus === 'IN_PROGRESS' ||
        txStatus === 'FAIL' ? (
        <MintingProgress
          tokenId={tokenId}
          amountMinted={amountMinted}
          txStatus={txStatus}
          txHash={txHash}
          metadata={metadata}
        />
      ) : (
        <section className={styles.sectionMintingInterface}>
          <div className={styles.backgroundImage}>
            <div className={styles.container}>
              <div className={styles.cardContentWrapper}>
                <div className={styles.cardContentMobile}>
                  <div className={styles.labelWrapper}>
                    <label className={styles.label}>
                      <div className={styles.iconWrapper}>
                        <svg className={styles.icon} viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z"
                          />
                        </svg>
                      </div>
                      <div className={styles.branding}>
                        <span>Justaddmeta</span>
                      </div>
                    </label>
                  </div>
                  <h3>Operation Morraba</h3>
                  <div className={styles.sublineMobile}>
                    Phase 1
                  </div>
                </div>
                <div className={styles.cardImageWrapper}>
                  <div className={styles.cardImage}>
                    <img
                      className={styles.imageDesktop}
                      src="img/glitch.gif"
                    ></img>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <label className={styles.label}>
                    <div className={styles.iconWrapper}>
                      <svg className={styles.icon} viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z"
                        />
                      </svg>
                    </div>
                    <div className={styles.branding}>
                      <span>Justaddmeta</span>
                    </div>
                  </label>
                  <h3>Operation Morraba</h3>
                  <div className={styles.subline}>
                    Phase 1
                  </div>
                  <div className={styles.amountTracker}>
                    Minted: {amountMinted}/100
                  </div>
                  <div className={styles.info}>
                    <div className={styles.content}>
                      <div className={styles.highlight}>
                        Exclusive and limited edition in<br></br> <br></br>  three delightful varieties.
                      </div>
                    
                    <div className={styles.description}>
                      The jars seem to be filled with a liquid. A note on the crate says the following: “Remarkable virtual craftsmanship meets ostentatious yet familiar design. Ingredients from a different dimension and extravagant.
                    </div>
                  </div>
                  </div>

                  <div className={styles.buttonWrapper}>
                    <button
                      className={styles.button}
                      onClick={() => mintNFT(tokenId)}
                    >
                      Mint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
