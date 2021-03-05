import React from 'react';

import { hr } from '../../scss/Markdown.module.scss';

export const ThematicBreak: React.FC = () => {
  return (
    <hr className={hr} />
  );
};
