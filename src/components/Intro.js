import styles from 'styles/intro.module.css';

export default function HeroBanner() {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.backgroundImage}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <label>ENTER CHAPTER ONE</label>
            <h1><div>INTRO</div></h1>
            <p>
            After uneventful months, the mission was called off. But you and a group of friends continued the hunt in secrecy. Last week, your team identified different clues believed to be left by the four fugitives. In an abandoned crate you find 100 dirty jars as well as two pieces of paper. Upon inspection, you can’t understand the writing but identify the other document to be some sort of map.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
