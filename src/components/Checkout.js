import React, { useState } from 'react';

import styles from 'styles/mintingProgress.module.css';

export default function Checkout({ txHash, tokenId }) {
  console.log(`Checkout.tokenId: ${tokenId}`);
  console.log(`Checkout.txHash: ${txHash}`);

  const openseaLink =
    'https://testnets.opensea.io/assets/rinkeby/0xb4b8f15c9ff18b01d6894713c2e7712fbe2871ca/' +
    tokenId;
  const etherscanLink = 'https://rinkeby.etherscan.io/tx/' + txHash;
  // TODO:// call checkout here with an onClick function for the <continue> button.
  console.log(`openseaLink: ${openseaLink}, etherscanLink: ${etherscanLink}`);
  return (
    <section className={styles.sectionMintingProgress}>
      <div className={styles.container}>
        <div className={styles.authorized}>
          <div className={styles.authorizedContent}>
            <h3>Checkout</h3>
          </div>
          <div>
            <a
              href={etherscanLink}
              target="_blank"
              className={styles.buttonSucess}
              onClick={() => console.log('clicked CheckTransaction')}
            >
              Check Transaction
            </a>
            <a
              className={styles.buttonSucess}
              onClick={() => console.log('clicked BrowseOpensea')}
              href={openseaLink}
              target="_blank"
            >
              Browse Opensea
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
