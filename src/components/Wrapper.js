import React, { useState } from 'react';

import About from 'components/About';
import HeroBanner from 'components/HeroBanner';
import Card from 'components/Card';

import styles from 'styles/wrapper.module.css';

export default function Wrapper() {
  // this component will act as a dispatcher of state variables.
  // instead of values, passes functions to childs that'd propagate back
  // as a result of a button click calling that function via as part of props it receives.
  // to learn more about this trick, watch this: https://www.youtube.com/watch?v=UrpNtB61qyo
  const [displayAboveSections, setDisplayAboveSections] = useState(true);
  return (
    <main className={styles.sectionMain}>
      {displayAboveSections ? (
        <>
          <HeroBanner />
          <About />
        </>
      ) : null}
      <Card displayAboveSections={(x) => setDisplayAboveSections(x)} />
    
    </main>
  );
}
