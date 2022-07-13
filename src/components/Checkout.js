import React, { useState } from 'react';

import styles from 'styles/checkout.module.css';

export default function Checkout({ txHash, tokenId, metadata }) {
  console.log(`Checkout.tokenId: ${tokenId}`);
  console.log(`Checkout.txHash: ${txHash}`);

  const openseaLink =
    'https://testnets.opensea.io/assets/rinkeby/0xAC8C0aA736c247f2171f78B3a22b948656518aFE/' +
    tokenId;
  const etherscanLink = 'https://rinkeby.etherscan.io/tx/' + txHash;
  // TODO:// call checkout here with an onClick function for the <continue> button.
  // TODO:// Fetch Title for Desktop and Mobile.
  console.log(`openseaLink: ${openseaLink}, etherscanLink: ${etherscanLink}`);
  return (
    <section className={styles.sectionCheckout}>
      <div className={styles.container}>
        <div className={styles.cardWrapper}>
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
                <h3>You successfully minted "fetch title".</h3>
                <p>fetch desc</p>
              </div>
          <div className={styles.cardImageWrapper}>
            <div className={styles.cardImage}>
              <img
                className={styles.imagePreview}
                src={metadata.animation_url}
              ></img>
              {/* <span>fetch mp4 preview</span> */}
            </div>
          </div>
          <div className={styles.cardContent}>
          <div className={styles.cardDescription}>
            <h3>You successfully minted {metadata.name}</h3>
            <p>{metadata.description}</p>
          </div>
          <div className={styles.buttonWrapper}>
            <a
              href={etherscanLink}
              target="_blank"
              className={styles.button}
            >
              Check Transaction
            </a>
            <a
              className={styles.button}
              href={openseaLink}
              target="_blank"
            >
              Browse Opensea
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
