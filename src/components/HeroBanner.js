import styles from 'styles/herobanner.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.backgroundImage}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <label>OUR FIRST HOLISTIC NFT PROJECT</label>
            <h1>CHAPTER 1: OPERATION MORRABA</h1>
            <p>
              It{"'"}s April 2091. Due to your incredible achievments in the line of
              duty you have been part of an opereation lead by Detective Ivie
              {"\""}Perry{"\""} Lofton - a germany based manhunt specialist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
