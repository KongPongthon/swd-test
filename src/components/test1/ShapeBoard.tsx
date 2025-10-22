'use client';
import { useEffect, useState } from 'react';
import styles from './Shape.module.css';

const initialShapes = [
  'oval',
  'circle',
  'rectangle',
  'parallelogram',
  'square',
  'trapezoid',
];

export default function ShapeBoard() {
  const [shapes, setShapes] = useState(initialShapes);

  const moveShape = (direction: 'left' | 'right' | 'up' | 'down') => {
    const newShapes = [...shapes];
    if (direction === 'left') {
      // เอาตัวแรกไปต่อท้าย
      const first = newShapes.shift();
      if (first) newShapes.push(first);
    } else if (direction === 'right') {
      // เอาตัวท้ายไปไว้หน้า
      const last = newShapes.pop();
      if (last) newShapes.unshift(last);
    } else if (direction === 'up') {
      setShapes((prev) => [...prev.slice(3), ...prev.slice(0, 3)]);
      return;
    } else if (direction === 'down') {
      setShapes((prev) => [...prev.slice(3), ...prev.slice(0, 3)]);
      return;
    }
    setShapes(newShapes);
  };

  return (
    <div className={styles['shape-board']}>
      <div className={styles.controls}>
        <div className={styles['shape-box']} onClick={() => moveShape('left')}>
          <div className={`${styles.shape} ${styles.triangleleft}`} />
        </div>
        <div className={styles['shape-box']} onClick={() => moveShape('up')}>
          <div className={`${styles.shape} ${styles.triangleup}`} />
        </div>
        <div className={styles['shape-box']} onClick={() => moveShape('down')}>
          <div className={`${styles.shape} ${styles.triangledown}`} />
        </div>
        <div className={styles['shape-box']} onClick={() => moveShape('right')}>
          <div className={`${styles.shape} ${styles.triangleright}`} />
        </div>
      </div>

      <div className={styles['shape-grid']}>
        <div></div>
        {shapes.map((shape, index) => (
          <div className={styles['shape-box']} key={index}>
            <div className={`${styles.shape} ${styles[shape]}`} />
          </div>
        ))}
        {/* <div className={styles['shape-box']}>
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
        </div> */}
      </div>
    </div>
  );
}
