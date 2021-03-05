import React, { SyntheticEvent, AnchorHTMLAttributes } from 'react';

import { Link } from 'gatsby';
import { btn } from '../scss/BigButton.module.scss';

interface Props {
  url: string;
  text: string;
}

const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
  draggable: false,
  onDragStart: (e: SyntheticEvent): void => e.preventDefault(),
  className: btn,
  tabIndex: 0,
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
