import React from 'react';

import styles from '../../scss/markdown.module.scss';

export const InlineCode: React.FC<{}> = ({ children }) => {
  return (
    <code className={styles.inlineCode}>
      {children}
    </code>
  );
};
