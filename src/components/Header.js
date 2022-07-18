import React from 'react';
import Link from 'next/link';
import styles from 'styles/header.module.css';
import JustaddmetaLogo from 'components/icons/JustaddmetaLogo';
// import walletOutline from "./icons/walletOutline";

import {
  useAddress,
  useNetwork,
  useMetamask,
  useNetworkMismatch,
  ChainId
} from '@thirdweb-dev/react';
export default function Header() {
  const connectWallet = useMetamask();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress();

  // if (!address) {
  //   connectWallet();
  // }

  // Ensure correct network
  // if (isOnWrongNetwork) {
  //   switchNetwork(ChainId.Polygon);
  //   // return;
  // }

  return (
    <header className={styles.sectionHeader}>
      <nav className={styles.headerWrapper}>
        <div className={styles.branding}>
          <JustaddmetaLogo className={styles.brand} />
        </div>

        {/* depending on an existence of a connected wallet address, it shows first or second */}
        {address ? (
          <div className={styles.navitems}>
            <button className={styles.buttonConnected}>
              <svg className={styles.icon} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V16.72C21.59,16.37 22,15.74 22,15V9C22,8.26 21.59,7.63 21,7.28V5A2,2 0 0,0 19,3H5M5,5H19V7H13A2,2 0 0,0 11,9V15A2,2 0 0,0 13,17H19V19H5V5M13,9H20V15H13V9M16,10.5A1.5,1.5 0 0,0 14.5,12A1.5,1.5 0 0,0 16,13.5A1.5,1.5 0 0,0 17.5,12A1.5,1.5 0 0,0 16,10.5Z"
                />
              </svg>
              <span>Wallet Connected</span>
            </button>
          </div>
        ) : (
          <div className={styles.navitems}>
            <button
              onClick={() => connectWallet()}
              className={styles.buttonConnect}
            >
              <svg className={styles.icon} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3 0V3H0V5H3V8H5V5H8V3H5V0H3M10 3V5H19V7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19V19H5V10H3V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28V5C21 3.9 20.1 3 19 3H10M13 9H20V15H13V9M16 10.5A1.5 1.5 0 0 0 14.5 12A1.5 1.5 0 0 0 16 13.5A1.5 1.5 0 0 0 17.5 12A1.5 1.5 0 0 0 16 10.5Z"
                />
              </svg>
              <span>Connect Wallet</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
