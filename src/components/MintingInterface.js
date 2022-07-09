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
              <div className={styles.cardImageWrapper}>
                <div className={styles.cardImage}>
                  <img
                    className={styles.image}
                    src="img/gläserPromo.png"
                    alt="SUMMERJAM NFTs"
                  ></img>
                </div>
              </div>
              <div className={styles.cardContent}>
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
