'use client';
import { useState } from 'react';
import styles from './Shape.module.css';
import i18next from 'i18next';

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

  const shuffleShapes = () => {
    const shuffled = [...shapes].sort(() => Math.random() - 0.5);
    setShapes(shuffled);
  };

  return (
    <div className={styles['shape-board']}>
      <div className={styles.controls}>
        <div className={styles['shape-box']} onClick={() => moveShape('left')}>
          <div>
            <div className={`${styles.shape} ${styles.triangleleft}`} />
            <div className={styles['test-box']}>{i18next.t('moveshape')}</div>
          </div>
        </div>
        <div className={styles['shape-group']} onClick={() => moveShape('up')}>
          <div className={styles['divshape']}>
            <div className={`${styles.shape} ${styles.triangleup}`} />
          </div>
          <div className={styles['divshape']}>
            <div className={`${styles.shape} ${styles.triangledown}`} />
          </div>
          <div className={styles['test-box']}>{i18next.t('moveposition')}</div>
        </div>
        <div className={styles['shape-box']} onClick={() => moveShape('right')}>
          <div>
            <div className={`${styles.shape} ${styles.triangleright}`} />
            <div className={styles['test-box']}>{i18next.t('moveshape')}</div>
          </div>
        </div>
      </div>

      <div className={styles['shape-grid']}>
        <div></div>
        {shapes.map((shape, index) => (
          <div
            className={styles['shape-box']}
            key={index}
            onClick={shuffleShapes}
          >
            <div className={`${styles.shape} ${styles[shape]}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
