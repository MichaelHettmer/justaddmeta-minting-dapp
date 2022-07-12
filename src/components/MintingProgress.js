import React, {useState} from 'react';

import styles from 'styles/mintingProgress.module.css';
// or less ideally

import Checkout from './Checkout';

export default function MintingProgress({ tokenId, txStatus, txHash}) {
  // until the transactions on metamask complete, we'll display a spinner,
  // depending on the process, display minting success/fail
  // it will display in case of success or fail of a mint.
  // TODO:// if transaction is cancelled, then head back to minting interface.
  const [mintingComplete, setMintingComplete] = useState(false);

console.log(`@MintingProgress, received >>  tokenId: ${tokenId}, txStatus: ${txStatus}, txHash: ${txHash}`);


  // TODO:// call checkout here with an onClick function for the <continue> button.
  return (
   
      <section className={styles.sectionMintingProgress}>
        <div className={styles.container}>
          <div className={styles.authorized}>
            <div className={styles.authorizedContent}>
              <h3>
                Follow steps<br></br> in your Wallet
              </h3>
            </div>
            <div className={styles.buttonWrapper}>
              {txStatus === 'IN_PROGRESS' ? (
                <>
                    <button className={styles.buttonPending}>
                      <i className={styles.icon}>
                        {' '}
                        <svg className={styles.icon} viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                          />
                        </svg>
                      </i>
                      <span>Submit minting</span>
                    </button>
                    <button
                      className={styles.buttonDisabled}
                    >
                      Continue
                    </button>
                </>
              ) : null}

              {txStatus === 'SUCCESS' ? (
                <>
                  <div className={styles.buttonWrapper}>
                    <button className={styles.buttonSucess}>
                      <i className={styles.icon}>
                        {' '}
                        <svg className={styles.icon} viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                          />
                        </svg>
                      </i>
                      <span>Minting sucessful</span>
                    </button>
                    <button
                      className={styles.buttonEnabled}
                      onClick={() => setMintingComplete(true)}
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : null}

              {txStatus === 'FAIL' ? (
                <>
                  <div className={styles.iconWrapper}>
                    <div className={styles.buttonWrapper}>
                      <button className={styles.buttonFailed}>
                        <i className={styles.icon}>
                          {' '}
                          <svg className={styles.icon} viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
                            />
                          </svg>
                        </i>
                        <span>Minting failed</span>
                      </button>
                      <button href="" className={styles.buttonEnabled}>
                        Back
                      </button>
                    </div>
                  </div>
                </>
              ) : null}

              {mintingComplete ? (
                <Checkout txHash={txHash} tokenId={tokenId} />
              ) : null}
            </div>
          </div>
        </div>
      </section>

  );
}
