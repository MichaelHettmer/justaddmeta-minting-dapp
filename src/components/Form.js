import styles from 'styles/form.module.css';

export default function Form() {
  return (
    <div className={styles.card}>
      <h5>Vertical</h5>
      <div className={styles.field}>
        <label htmlFor="firstname1">Firstname</label>
        <input
          id="firstname1"
          type="text"
          className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="lastname1">Lastname</label>
        <input
          id="lastname1"
          type="text"
          className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
        />
      </div>
    </div>
  );
}
