import styles from 'styles/about.module.css';

export default function About() {
  return (
    <section className={styles.sectionAbout}>
      <div className={styles.container}>
        <div className={styles.colLeft}>
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
          <p>
            After uneventful months the mission was called off. But you and a
            group of friends continued the hunt in secrecy. Last week your team
            identified different clues believed to be left by the four
            fugitives. In an abandoned crate you find 50 dirty jars as well as
            two pieces of paper. Upon inspection, you can{"'"}t understand the
            writing but identify the other document to be some sort of map.
            <br></br>
            <br></br>
            The jars seem to be filled with a liquid. A note on the crate says
            the following: {'"'}Remarkable virtual craftsmanship meets
            ostentatious yet familiar design. Ingredients from a different
            dimension and extravagant hints of fruits suiting everyone{"'"}s
            palate.{'"'}
          </p>
        </div>
      </div>
    </section>
  );
}
