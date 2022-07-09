import React from 'react';

import styles from 'styles/mintingProgress.module.css';



export default function MintingProgress({ tokenId, progress }) {
  // until the transactions on metamask complete, we'll display a spinner,
  // depending on the process, display minting success/fail
  // it will display in case of success or fail of a mint.
  // TODO:// if transaction is cancelled, then head back to minting interface.

  console.log(`progress.tokenId: ${progress.tokenId}`);
  console.log(`progress.txHash: ${progress.txHash}`);
  console.log(`progress.txHash: ${progress.txHash}`);

  // TODO:// call checkout here with an onClick function for the <continue> button.
  return (
    <>
      <section className={styles.sectionCard}>
        <div className={styles.container}>
          <div className={styles.authorized}>
            <div className={styles.authorized_content}>
              <h3>Follow steps in your Wallet</h3>
            </div>
            <div className={styles.buttonWrapper}>
              {progress.txStatus === 'IN_PROGRESS' ? (
                <>

                  <div className="spinner-container">
                    <div className="loading-spinner">
                    </div>
                  </div>
                  <h1>sign transaction</h1>
                  <button className={styles.buttonDisabled}>Continue</button>

                </>
              ) : null}

              {progress.txStatus === 'SUCCESS' ? (
                <>
                  <div className="icon-container">
                  <svg className={styles.icon} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V16.72C21.59,16.37 22,15.74 22,15V9C22,8.26 21.59,7.63 21,7.28V5A2,2 0 0,0 19,3H5M5,5H19V7H13A2,2 0 0,0 11,9V15A2,2 0 0,0 13,17H19V19H5V5M13,9H20V15H13V9M16,10.5A1.5,1.5 0 0,0 14.5,12A1.5,1.5 0 0,0 16,13.5A1.5,1.5 0 0,0 17.5,12A1.5,1.5 0 0,0 16,10.5Z"
                />
              </svg>
                  </div>

                  <h1>success</h1>
                  <button className={styles.buttonEnabled}>Continue</button>
                </>
              ) : null}

              {progress.txStatus === 'FAIL' ? (
                <>
                  <div className="icon-container">
                  <svg className={styles.icon} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V16.72C21.59,16.37 22,15.74 22,15V9C22,8.26 21.59,7.63 21,7.28V5A2,2 0 0,0 19,3H5M5,5H19V7H13A2,2 0 0,0 11,9V15A2,2 0 0,0 13,17H19V19H5V5M13,9H20V15H13V9M16,10.5A1.5,1.5 0 0,0 14.5,12A1.5,1.5 0 0,0 16,13.5A1.5,1.5 0 0,0 17.5,12A1.5,1.5 0 0,0 16,10.5Z"
                />
              </svg>
                  </div>
                  <h1>fail</h1>
                  <button className={styles.buttonEnabled}>Back</button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
