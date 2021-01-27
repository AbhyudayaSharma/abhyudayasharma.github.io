import React from 'react';

import styles from '../../scss/markdown.module.scss';

export const Blockquote: React.FC = ({ children }) => {
  return (
    <blockquote className={styles.blockquote}>
      {children}
    </blockquote>
  );
};
