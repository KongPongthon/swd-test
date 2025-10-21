'use client';
import styles from './Shape.module.css';

export default function ShapeBoard() {
  return (
    <div className={styles['shape-board']}>
      <div className={styles.controls}>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.triangleleft}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.triangleup}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.triangledown}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.triangleright}`} />
        </div>
        {/* <button className={`${styles.btn} ${styles.green}`}>Move Shape</button>
        <button className={`${styles.btn} ${styles.blue}`}>
          Move Position
        </button> */}
      </div>

      <div className={styles['shape-grid']}>
        <div></div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.oval}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.circle}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.rectangle}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.parallelogram}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.square}`} />
        </div>
        <div className={styles['shape-box']}>
          <div className={`${styles.shape} ${styles.trapezoid}`} />
        </div>
      </div>
    </div>
  );
}
