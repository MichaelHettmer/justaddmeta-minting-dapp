import styles from 'styles/intro.module.css';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Intro(props) {
  const [enteredPhaseOne, setEnteredPhaseOne] = useState(false);

  const readIntro = (event) => {
    setEnteredPhaseOne(true);
    props.enteredPhaseOne(true);
  };

  return (
    <section className={styles.heroBanner}>
      <div className={styles.backgroundImage}>
        <div className={styles.container}>
          <div className={styles.colLeft}>
            <Link href="https://minting.justaddmeta.com">
              <button className={styles.buttonBack}>
                <svg className={styles.icon} viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className={styles.colRight}>
            <div className={styles.heroWrapper}>
              <div className={styles.heroContent}>
                <label>ENTER CHAPTER ONE</label>
                <h1>
                  <div>INTRO</div>
                </h1>
                <p>
                  After uneventful months, the mission was called off. But you
                  and a group of friends continued the hunt in secrecy. Last
                  week, your team identified different clues believed to be left
                  by the four fugitives. In an abandoned crate you find 100
                  dirty jars as well as two pieces of paper. Upon inspection,
                  you can’t understand the writing but identify the other
                  document to be some sort of map.
                </p>
                <button onClick={() => readIntro()} className={styles.button}>
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
