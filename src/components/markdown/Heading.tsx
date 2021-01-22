import _ from 'lodash';
import React from 'react';

const MIN_HEADING_LEVEL = 1;
const MAX_HEADING_LEVEL = 6;

export const getHeadingComponent: (level: number) => React.FC = (level) => {
  if (!_.isInteger(level) || !_.inRange(level, MIN_HEADING_LEVEL, MAX_HEADING_LEVEL + 1)) {
    throw new Error(`Only heading levels ${MIN_HEADING_LEVEL}-${MAX_HEADING_LEVEL} allowed. Got level = ${level}`);
  }
  const type = `h${level}`;
  const component: React.FC = ({ children }): JSX.Element => React.createElement(type, { className: `md-${type}` }, children);
  component.displayName = type;
  return component;
};
