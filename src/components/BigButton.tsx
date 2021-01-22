import { Link } from 'gatsby';
import React, { SyntheticEvent } from 'react';
import '../scss/BigButton.scss';

interface Props {
  url: string;
  text: string;
}

const linkProps = {
  draggable: false,
  onDragStart: (e: SyntheticEvent): void => e.preventDefault(),
  className: 'BigButton',
};

export const BigButton: React.FC<Props> = (props) => {
  if (!props.url.startsWith('/')) {
    return (
      <a href={props.url} {...linkProps}>
        {props.text}
      </a>);
  } else {
    return (
      <Link to={props.url} {...linkProps}>
        {props.text}
      </Link>);
  }
};
