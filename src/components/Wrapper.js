import React, { useState } from 'react';

import About from 'components/About';
import HeroBanner from 'components/HeroBanner';
import Card from 'components/Card';
import Checkout from 'components/Checkout';

import styles from 'styles/wrapper.module.css';
import AuthCard from './AuthCard';
import MintingInterface from './MintingInterface';
import MintingProgress from './MintingProgress';

export default function Wrapper() {
  // this component will act as a dispatcher of state variables.
  // instead of values, passes functions to childs that'd propagate back
  // as a result of a button click calling that function via as part of props it receives.
  // to learn more about this trick, watch this: https://www.youtube.com/watch?v=UrpNtB61qyo
  const [displayAboveSections, setDisplayAboveSections] = useState(true);

  // Here's the rabbit-hole of our contracts:
  // From Card component, we dispatch to AuthCard, 
  // after the challenge is success, we call MintingInterface. 
  // In any case (even previously connected their wallets with the button @ header)
  // we'll display an Auth Success in case a wallet is connected.
  // Then MintingProgress, and finally, if transaction was a success,
  // will include Checkout window with etherscan and opensea links to NFT.

  return (
    <main className={styles.sectionMain}>
      {displayAboveSections ? (
        <>
          <HeroBanner />
          <About />
          <Intro />
        </>
      ) : null}
      <Card displayAboveSections={(x) => setDisplayAboveSections(x)} />
    </main>
  );
}
