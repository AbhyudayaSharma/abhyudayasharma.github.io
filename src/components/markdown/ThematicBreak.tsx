import React from 'react';

import styles from '../../scss/markdown.module.scss';

export const ThematicBreak: React.FC = () => {
  return (
    <hr className={styles.hr} />
  );
};
