import styles from 'styles/about.module.css';

export default function About() {
  return (
    <section className={styles.sectionAbout}>
      <div className={styles.backgroundImage}>
        <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.colLeft}>
        <label>OUR FIRST HOLISTIC NFT PROJECT</label>
          <h2>PHASE 1: AMBROSIA</h2>
          <iframe
            className={styles.iFrame}
            src="https://www.youtube.com/embed/GEJplRDkPlE?controls=0"
            title="SUMMERJAM"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>{' '}
        </div>
        <div className={styles.colRight}>
          <label>STARTING TO DIG DEEPER</label>
          <h2>PHASE 1: AMBROSIA</h2>
          <p>
            Operation Morraba was a secretly launched mission with one specific goal in mind: finding the safe house four fugitives are using to hide from the authorities. During the hunt, your team didn’t pick up many clues. But you managed to intercept weird coded digital signals and were able to establish informant relationships in the inner circle.
          </p>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
