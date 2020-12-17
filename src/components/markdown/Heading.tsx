import React, { FunctionComponent } from 'react';

export interface HeadingProps {
  level: number;
}

export const Heading: FunctionComponent<HeadingProps> = ({ level, children }) => {
  if (level === 1) {
    console.warn('Heading level = 1 detected. Are you sure you want it?\n' +
      'Blog title is already an h1 element.');
  }
  return <h1 className={`md-h${level}`}>{children}</h1>;
};
