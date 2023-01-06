import React from 'react';

import { kebabCase } from 'lodash';
import { innerText } from '../../utils/utils-react';
import { h1, h2, h3, h4, h5, h6 } from '../../scss/Markdown.module.scss';

export const getHeadingComponent: (level: number) => React.FC = (level) => {
  const className = ((): string => {
    switch (level) {
      case 1:
        return h1;
      case 2:
        return h2;
      case 3:
        return h3;
      case 4:
        return h4;
      case 5:
        return h5;
      case 6:
        return h6;
      default:
        throw new Error(`Unsupported heading level: ${level}`);
    }
  })();

  const component: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const id = kebabCase(innerText(children));
    return React.createElement(`h${level}`, { className, id }, (
      <a href={`#${id}`}>
        {children}
      </a>
    ));
  };

  return component;
};
