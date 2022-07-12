import styles from 'styles/herobanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <label>CHAPTER 1: MISSION MORRABA </label>
          <h1>Introducing our first holistic web3 project.</h1>
          <p>
          Opperation Morraba was a secretly launched mission with one specific goal in mind: finding the safe house four fugitives are using to hide from the authorities. During the hunt your team didn’t pick up many clues. But you managed to intercept weird coded digital signals and were able to establish informant-relationships in close range of the fugitives. 
          </p>
        </div>
      </div>
    </section>
  );
}
