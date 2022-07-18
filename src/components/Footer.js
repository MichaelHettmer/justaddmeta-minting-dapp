import React from 'react';


import JustaddmetaLogo from 'components/icons/JustaddmetaLogo';
import Link from 'next/link';

import styles from 'styles/footer.module.css';

export default function Footer() {
  return(
  <footer className={styles.footer}>
    <div className={styles.containerBranding}>
      <div className={styles.wrapperContent}>
        <div className={styles.colLeft}>
          <div className={styles.branding}>
            <JustaddmetaLogo />
          </div>
          <p>
            We enable your brand to make<br></br>
             a sustainable contribution <br></br>
            to the metaverse.
          </p>
          <button className={styles.button}>Enter Safe House</button>
          <div className={styles.socialWrapper}>
            <a href="https://www.instagram.com/justaddmeta.agency"></a>
            <a href="https://discord.gg/vnp4ccXvRD"></a>
          </div>
        </div>
        <div className={styles.colRightContent}>
          <h3>Office Hamburg </h3>
          <p>
            Justaddsugar GmbH <br></br>
            Rothenbaumchaussee 91 <br></br>
            20148 Hamburg, Germany
          </p>
          <div className={styles.contact}>
          <a href="tel:+4917634990063">
            <span className="buttonInner">
+49 (0) 17634990063
              </span>
          </a>
          <a href="mailto:hello@justaddmeta.com">
            <span className={styles.buttonInner}>hello@justaddmeta.com</span>
          </a>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.containerLegal}>
      <div className={styles.wrapperRights}>
        <div className={styles.colLeftRights}>
          <p>2022 © Justaddsugar - All rights reserved</p>
        </div>
        <div className={styles.colRightLegal}>
        <Link href="https://justaddmeta.com/terms-conditions/" target="_blank" rel="noreferrer noopener">Terms &amp; Conditions</Link>
          <Link href="https://justaddmeta.com/imprint/" target="_blank" rel="noreferrer noopener">Imprint</Link>
          <Link href="https://justaddmeta.com/privacy-policy/"target="_blank" rel="noreferrer noopener">Privacy Policy</Link>
        </div>
      </div>
    </div>
  </footer>
  );
}
