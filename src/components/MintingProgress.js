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
                  <div>
                    <div className="spinner-container">
                      <div className="loading-spinner">
                      </div>
                    </div>
                    <h1>sign transaction</h1>
                    <button className={styles.buttonDisabled}>Continue</button>
                  </div>
                </>
              ) : null}

              {progress.txStatus === 'SUCCESS' ? (
                <>

                  <h1>success</h1>
                  <button className={styles.buttonEnabled}>Continue</button>
                </>
              ) : null}

              {progress.txStatus === 'FAIL' ? (
                <>
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
