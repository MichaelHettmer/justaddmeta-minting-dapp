import styles from 'styles/about.module.css';

export default function About() {

  return (
    <section className={styles.sectionAbout}>
      <div className={styles.container}>
        <div className={styles.colLeft}>
          <label>Lorem Ipsum</label>
          <h1>Lorem ipsum amet consectetur adipiscing elit.</h1>
        </div>
        <div className={styles.colRight}>
          <p>
            You were part of the mission from day one. During the hunt your team
            picked up different clues and also weird coded digital signals.
            <br></br>
            <br></br>After months of unsuccessful hunting the mission was called
            off. But you and a group of friends continued the hunt in secrecy.
            Last week the fugitives left a couple clues behind while strolling
            through the streets.<br></br>
            <br></br>
            In a crate you find 50 jars of jam in three different kinds as well as
            two pieces of paper. Upon inspection you can’t understand the writing
            but identify the other document to be some kind of map. You keep an
            extra careful eye on the jam as you see something swimming inside the
            jar.
          </p>
        </div>
      </div>
    </section> );
}
