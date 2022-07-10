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

export default function MintingInterface({ amountMinted, tokenId }) {
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [mintingComplete, setMintingComplete] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [justClaimed, setJustClaimed] = useState(false); // so we can show -mint another- instead -mint- text on button.
  const [mintingFailed, setMintingFailed] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const [progressInfo, setProgressInfo] = useState({
    tokenId: tokenId,
    txHash: txHash,
    txStatus: txStatus
  });
  const editionDropAddress = '0xB4B8f15C9FF18B01D6894713c2e7712fBE2871Ca';
  const editionDrop = useEditionDrop(editionDropAddress);
  const [displayProgress, setDisplayProgress] = useState(false);

  const updatePogressInfo = (tokenId, txHash, txStatus) => {
    let progressInfo = { tokenId: tokenId, txHash: txHash, txStatus: txStatus };
    setProgressInfo(progressInfo);
  };

  async function mintNFT(tokenId) {
    setDisplayProgress(true);
    updatePogressInfo(tokenId, null, 'IN_PROGRESS');
    // Ensure wallet connected
    if (!address) {
      alert('Please reconnect your wallet to continue.');
      return;
    }

    // Ensure correct network
    if (isOnWrongNetwork) {
      switchNetwork(ChainId.Rinkeby);
      return;
    }

    setIsClaiming(true);
    console.log(
      `minting a token for id: ${tokenId} at contract address: ${editionDropAddress}`
    );
    try {
      await editionDrop
        .claim(tokenId, 1)
        .then((result) => setTxHash(result.receipt.transactionHash));

      updatePogressInfo(tokenId, txHash, 'SUCCESS');
      setJustClaimed(true);
      setIsClaiming(false);
      return;
    } catch (error) {
      setMintingFailed(true);
      // to txHash in this case: null
      updatePogressInfo(tokenId, null, 'FAIL');

      console.log(`error on minting., \n ${error}`);
    }
  }

  return (
    <>
      {progressInfo.txStatus ? (
        <MintingProgress tokenId={tokenId} progress={progressInfo} />
      ) : null}

      {!progressInfo.txStatus ? (
        <section className={styles.sectionMintingInterface}>
          <div className={styles.container}>
            <div className={styles.cardContentWrapper}>
            <div className={styles.cardContentMobile}>
              <div className={styles.labelWrapper}>
                  <label class={styles.label}>
                    <div class={styles.iconWrapper}>
                      <svg className={styles.icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z" />
                      </svg>
                    </div>
                    <div class={styles.branding}>
                      <span>Justaddmeta</span>
                    </div>
                  </label>
                  </div>
                  <h3>Metaverse has never been this delightful</h3>
                </div>
              <div className={styles.cardImageWrapper}>

                <div className={styles.cardImage}>
                  <img className={styles.imageDesktop} src="img/nft-preview.png"></img>
                </div>
              </div>
              <div className={styles.cardContent}>
              <label class={styles.label}>
                    <div class={styles.iconWrapper}>
                      <svg className={styles.icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z" />
                      </svg>
                    </div>
                    <div class={styles.branding}>
                    <span>Justaddmeta</span>
                    </div>
                  </label>
                <h3>Metaverse has never been this delightful</h3>
                <p>
                  Remarkable virtual craftsmanship meets ostentatious yet
                  familiar design. Ingredients from a different dimension and
                  extravagant hints of fruits suiting everyone{"'"}s palate.{' '}
                  <br></br>
                  <br></br>{' '}
                  <strong>
                    Exclusive edition of XX limited edition summer jams in three
                    delightful varieties.
                  </strong>
                </p>
                <div className={styles.buttonWrapper}>
                  <button className={styles.amountTracker}>
                    Minted NFTs: {amountMinted}/100
                  </button>

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
        </section>
      ) : null}
    </>

    // <>
    //   {displayProgress ? (
    //     <MintingProgress tokenId={tokenId} progress={progressInfo} />
    //   ) : (
    //     <section className={styles.sectionMintingInterface}>
    //       <div className={styles.container}>
    //         <div className={styles.cardContentWrapper}>
    //           <div className={styles.cardImageWrapper}>
    //             <div className={styles.cardImage}>
    //               <img
    //                 className={styles.image}
    //                 src="img/gläserPromo.png"
    //                 alt="SUMMERJAM NFTs"
    //               ></img>
    //             </div>
    //           </div>
    //           <div className={styles.cardContent}>
    //             <h3>Metaverse has never been this delightful</h3>
    //             <p>
    //               Remarkable virtual craftsmanship meets ostentatious yet
    //               familiar design. Ingredients from a different dimension and
    //               extravagant hints of fruits suiting everyone{"'"}s palate.{" "}
    //               <br></br>
    //               <br></br>{" "}
    //               <strong>
    //                 Exclusive edition of XX limited edition summer jams in three
    //                 delightful varieties.
    //               </strong>
    //             </p>
    //             <div className={styles.buttonWrapper}>
    //               <button className={styles.amountTracker}>
    //                 {amountMinted}/100
    //               </button>

    //               <button
    //                 className={styles.button}
    //                 onClick={() => mintNFT(tokenId)}
    //               >
    //                 Mint
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   )}
    // </>
  );
}
