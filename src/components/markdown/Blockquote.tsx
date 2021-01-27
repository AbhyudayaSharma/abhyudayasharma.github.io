import React from 'react';

import styles from '../../scss/Markdown.module.scss';

export const Blockquote: React.FC = ({ children }) => {
  return (
    <blockquote className={styles.blockquote}>
      {children}
    </blockquote>
  );
};
