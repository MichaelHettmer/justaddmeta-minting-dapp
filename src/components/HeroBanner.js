import styles from 'styles/herobanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <label>OUR FIRST HOLISTIC NFT PROJECT</label>
          <h1>CHAPTER 1: OPERATION MORRABA</h1>
          <p>
            It{"'"}s April 2091. Due to your incredible achievments in the line of
            duty you have been part of an opereation lead by Detective Ivie
            {"\""}Perry{"\""} Lofton - a germany based manhunt specialist.
          </p>
          <div className={styles.heroImage}>
            <div className={styles.heroWrapper}>
              <div className={styles.heroContent}>
                <label>Lorem Ipsum</label>
                <h1>Lorem ipsum amet consectetur adipiscing elit.</h1>
                <p>
                  Opperation Morraba was a secretly launched mission with one
                  specific goal in mind: finding the safe house four fugitives
                  are using to hide from the authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
