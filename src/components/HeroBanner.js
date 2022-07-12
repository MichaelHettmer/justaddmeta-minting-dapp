import styles from 'styles/herobanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.heroBanner}>
      <div src="img/gläserPromo.png" className={styles.heroImage}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <label>Lorem Ipsum</label>
            <h1>Lorem ipsum amet consectetur adipiscing elit.</h1>
            <p>
              Opperation Morraba was a secretly launched mission with one specific
              goal in mind: finding the safe house four fugitives are using to
              hide from the authorities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
